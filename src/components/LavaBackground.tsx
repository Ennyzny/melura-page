"use client";

import { useEffect, useRef } from "react";

const fragment = `
precision mediump float;
uniform vec2 size;
uniform vec4 blobs[8];
void main() {
  vec2 p = vec2(gl_FragCoord.x, size.y - gl_FragCoord.y) / min(size.x, size.y);
  float coral = 0.0;
  float blue = 0.0;
  for (int i = 0; i < 8; i++) {
    vec2 delta = p - blobs[i].xy;
    delta.y *= 0.88;
    float d = dot(delta, delta);
    float r = blobs[i].z * blobs[i].z;
    float field = r / max(d, 0.0001) *
      (1.0 - smoothstep(4.0*r + 0.000001, 9.0*r + 0.000002, d));
    coral += field * (1.0 - blobs[i].w);
    blue += field * blobs[i].w;
  }
  float field = coral + blue;
  float body = smoothstep(0.9, 1.15, field);
  float glow = smoothstep(0.12, 1.0, field) * 0.12;
  vec3 color = mix(vec3(0.933,0.424,0.302), vec3(0.239,0.353,0.502),
    blue / max(field,0.0001));
  float alpha = body * 0.85 + glow * (1.0 - body);
  gl_FragColor = vec4(color * alpha, alpha);
}`;

/** Decorative metaballs; static CSS fallback remains behind the canvas. */
export function LavaBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, depth: false });
    if (!gl) return;
    const shaders: WebGLShader[] = [];
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };
    const vertex = compile(gl.VERTEX_SHADER,
      "attribute vec2 position; void main(){gl_Position=vec4(position,0.0,1.0);}");
    const pixel = compile(gl.FRAGMENT_SHADER, fragment);
    const program = gl.createProgram();
    const cleanupShaders = () => shaders.forEach(shader => gl.deleteShader(shader));
    if (!vertex || !pixel || !program) {
      cleanupShaders();
      if (program) gl.deleteProgram(program);
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, pixel);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      cleanupShaders();
      gl.deleteProgram(program);
      return;
    }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const size = gl.getUniformLocation(program, "size");
    const blobs = gl.getUniformLocation(program, "blobs[0]");
    const renew = () => ({
      progress: 0, x: 0.05 + Math.random() * 0.9,
      radius: 0.16 + Math.random() * 0.2,
      duration: 30 + Math.random() * 30,
      phase: Math.random() * Math.PI * 2,
      direction: Math.random() < 0.25 ? -1 : 1,
      blue: Math.random() < 0.5 ? 1 : 0,
    });
    const particles = Array.from({ length: 8 }, (_, index) => ({ ...renew(), blue: index % 2, progress: Math.random() }));
    const values = new Float32Array(32);
    const smooth = (t: number) => {
      const v = Math.max(0, Math.min(1, t));
      return v * v * (3 - 2 * v);
    };
    const draw = (seconds = 0) => {
      const scale = Math.min(canvas.width, canvas.height);
      if (!scale || gl.isContextLost()) return;
      particles.forEach((b, i) => {
        b.progress += seconds / b.duration;
        if (b.progress >= 1) Object.assign(b, renew(), { blue: b.blue });
        const y = b.direction > 0 ? 1 - b.progress : b.progress;
        values[i*4] = (b.x + Math.sin(b.progress * Math.PI * 2 + b.phase)*0.08) * canvas.width/scale;
        values[i*4+1] = y * (canvas.height/scale + b.radius*4) - b.radius*2;
        values[i*4+2] = b.radius * smooth(b.progress/0.12) * smooth((1-b.progress)/0.12)
          * (1 + 0.1*Math.sin(b.progress*Math.PI*4+b.phase));
        values[i*4+3] = b.blue;
      });
      gl.uniform2f(size, canvas.width, canvas.height);
      gl.uniform4fv(blobs, values);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    let frame = 0;
    let previous = 0;
    let visible = false;
    let lost = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tick = (now: number) => {
      if (now - previous >= 1000/30) {
        draw(previous ? Math.min((now-previous)/1000,0.1) : 0);
        previous = now;
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      if (visible && !document.hidden && !reduced.matches && !lost) frame = requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(() => {
      // Cap pixel count rather than rendering at the device's full retina DPR.
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(1, 1200 / Math.max(bounds.width, 1));
      canvas.width = Math.max(1, Math.round(bounds.width * ratio));
      canvas.height = Math.max(1, Math.round(bounds.height * ratio));
      gl.viewport(0, 0, canvas.width, canvas.height);
      draw();
    });
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    const contextLost = (event: Event) => { event.preventDefault(); lost = true; sync(); };
    canvas.addEventListener("webglcontextlost", contextLost);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    resize.observe(canvas);
    intersection.observe(canvas);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      canvas.removeEventListener("webglcontextlost", contextLost);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      cleanupShaders();
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_60%,#ee6c4d33,transparent_55%),radial-gradient(ellipse_at_85%_35%,#3d5a8055,transparent_55%)]" />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#15171c88,transparent_85%)]" />
    </div>
  );
}
