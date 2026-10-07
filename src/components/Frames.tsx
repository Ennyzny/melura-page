import Image from "next/image";

type BrowserFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  url?: string;
  preload?: boolean;
  className?: string;
};

export function BrowserFrame({
  src,
  alt,
  width,
  height,
  url = "admin.melura.ba",
  preload,
  className = "",
}: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_30px_80px_-20px_rgba(27,29,33,0.35)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-black/5 bg-[#f3f3f1] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 hidden truncate rounded-md bg-white px-3 py-0.5 text-xs text-muted sm:block">
          {url}
        </span>
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        preload={preload}
        sizes="(min-width: 1024px) 900px, 100vw"
        className="block h-auto w-full"
      />
    </div>
  );
}

type PhoneFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  preload?: boolean;
  objectPosition?: string;
  className?: string;
};

export function PhoneFrame({
  src,
  alt,
  width,
  height,
  preload,
  objectPosition = "50% 0%",
  className = "",
}: PhoneFrameProps) {
  return (
    <div
      className={`rounded-[2.4rem] bg-night p-2 shadow-[0_30px_60px_-15px_rgba(27,29,33,0.45)] ring-1 ring-black/20 ${className}`}
    >
      <div className="relative aspect-[402/874] overflow-hidden rounded-[2rem] bg-black">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          preload={preload}
          sizes="(min-width: 1024px) 300px, 60vw"
          style={{ objectPosition }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}
