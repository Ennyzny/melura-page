"use client";

import Image from "next/image";
import { IPhoneMockup } from "react-device-mockup";
import { useEffect, useRef, useState } from "react";

export function DevicePreview({ src, alt, preload = false }: { src: string; alt: string; preload?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(260);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(80, Math.floor(entry.contentRect.width * 0.93))));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="w-full">
      <IPhoneMockup screenWidth={width} screenType="island" frameColor="#242529" hideStatusBar hideNavBar>
        <Image src={src} alt={alt} width={1290} height={2796} preload={preload}
          sizes="(min-width: 768px) 280px, 44vw" className="h-full w-full object-contain" />
      </IPhoneMockup>
    </div>
  );
}
