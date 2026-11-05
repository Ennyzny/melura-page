import * as THREE from "three";

/*
 * Pošalje GPU-u sve teksture iz scene i kompajlira sve materijale, bez obzira
 * na to da li je objekat u kadru. Uređaji su pri zagrijavanju van kadra
 * (ulijeću sa strane), pa ih obično crtanje preskoči i sve to bi se desilo tek
 * u prvom kadru kad sekcija naiđe — vidljiv trzaj.
 */
export function zagrijScenu(gl: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) {
  scene.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const m of mats) {
      for (const v of Object.values(m as unknown as Record<string, unknown>)) {
        if (v instanceof THREE.Texture) gl.initTexture(v);
      }
      const u = (m as THREE.ShaderMaterial).uniforms;
      if (u) for (const x of Object.values(u)) if (x.value instanceof THREE.Texture) gl.initTexture(x.value);
    }
  });
  if (scene.environment) gl.initTexture(scene.environment);
  gl.compile(scene, camera);
}
