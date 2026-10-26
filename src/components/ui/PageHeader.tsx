import Image from "next/image";
import { EyebrowBadge } from "./Badge";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
  image,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  image?: { src: string; alt: string };
}) {
  return (
    <header className="dot-grid border-b border-fog/40 bg-pure-white">
      <div
        className={`mx-auto max-w-[1200px] px-4 py-12 sm:px-6 md:py-20 ${image ? "grid items-center gap-12 lg:grid-cols-2 lg:gap-16" : ""}`}
      >
        <div>
          {eyebrow && <EyebrowBadge>{eyebrow}</EyebrowBadge>}
          <h1 className="mt-4 max-w-2xl text-[34px] font-bold leading-[1.15] md:text-[46px] md:leading-[1.1]">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 max-w-2xl text-[17px] text-slate">{intro}</p>
          )}
          {children && (
            <div className="mt-6 flex flex-wrap gap-3">{children}</div>
          )}
        </div>
        {image && (
          <div className="image-frame relative min-w-0 min-h-[260px] w-full aspect-[4/3] overflow-hidden rounded-[15.2px] lg:min-h-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload
              sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), 560px"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </header>
  );
}
