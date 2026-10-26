import Link from "next/link";
import type { LicenseCategory } from "@/data/license-categories";
import { IndicativeBadge } from "@/components/ui/Badge";
import { ArrowRightIcon } from "@radix-ui/react-icons";

function CategoryGlyph({ slug }: { slug: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
  };
  if (slug === "am")
    return <><path {...common} d="M7 16h10l-1.2-5H9.2L7 16Zm2.2-5L11 7h2l1.8 4M5 16h14M8 18v1m8-1v1" /><circle {...common} cx="9" cy="17" r="1" /><circle {...common} cx="15" cy="17" r="1" /></>;
  if (slug === "a")
    return <><circle {...common} cx="12" cy="12" r="2.5" /><path {...common} d="M5 16h4l2-4m0 0 2-4h3l2 8h-4m-7 0-2-3m9-5 2-2" /><circle {...common} cx="7" cy="17" r="1.5" /><circle {...common} cx="17" cy="17" r="1.5" /></>;
  if (slug === "be")
    return <><path {...common} d="M5 15h9V9H7l-2 6Zm9-4h3l2 4h-5M7 18v1m8-1v1" /><circle {...common} cx="8" cy="17" r="1.5" /><circle {...common} cx="17" cy="17" r="1.5" /></>;
  if (slug === "c")
    return <><path {...common} d="M4 16V8h11v8H4Zm11-5h3l2 3v2h-5M7 18v1m9-1v1" /><circle {...common} cx="7" cy="17" r="1.5" /><circle {...common} cx="17" cy="17" r="1.5" /></>;
  if (slug === "d")
    return <><path {...common} d="M5 7h10a3 3 0 0 1 3 3v6H5V7Zm3 0v9m4-9v9m4-5H6M8 18v1m7-1v1" /><circle {...common} cx="8" cy="17" r="1.5" /><circle {...common} cx="15" cy="17" r="1.5" /></>;
  if (slug === "t")
    return <><path {...common} d="M5 15h9V9H9l-2 6Zm9-3h3l2 3H14M8 18v1m8-1v1" /><circle {...common} cx="8" cy="17" r="1.5" /><circle {...common} cx="17" cy="17" r="1.5" /></>;
  return <><path {...common} d="M5 15h14v3H5zM8 12h8l2 3H6l2-3Zm1-4h6v4H9zM8 18v1m8-1v1" /><circle {...common} cx="8" cy="17" r="1.5" /><circle {...common} cx="16" cy="17" r="1.5" /></>;
}

export function CategoryCard({ cat }: { cat: LicenseCategory }) {
  return (
    <Link
      href={`/rijbewijzen/${cat.slug}`}
      className="group flex min-h-[270px] flex-col rounded-[15.2px] border border-fog/60 bg-pure-white p-5 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-vivid-indigo/45 hover:bg-pale-lilac/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vivid-indigo focus-visible:ring-offset-2"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-[15.2px] bg-pale-lilac text-vivid-indigo">
          <svg aria-hidden viewBox="0 0 24 24" className="h-8 w-8">
            <CategoryGlyph slug={cat.slug} />
          </svg>
        </span>
        <div className="flex shrink-0 flex-col items-end gap-2 text-right">
          <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-vivid-indigo">{cat.code}</span>
          <IndicativeBadge />
        </div>
      </div>
      <p className="mt-4 text-[19px] font-bold leading-[1.27]">
        {cat.vehicleType}
      </p>
      <p className="mt-2 text-slate">{cat.shortDescription}</p>
      {cat.subcategories.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {cat.subcategories.map((sub) => (
            <span key={sub.code} className="rounded-full bg-frost-gray px-2.5 py-1 text-[12px] font-medium text-slate">
              {sub.code}
            </span>
          ))}
        </div>
      )}
      <div className="mt-auto border-t border-fog/70 pt-4">
        <span className="block text-[11px] font-bold uppercase tracking-[0.08em] text-slate">
          Richtprijs
        </span>
        <span className="mt-1 block text-[24px] font-bold leading-none tracking-[-0.02em] text-vivid-indigo">
          {cat.priceLabel}
        </span>
      </div>
      <span className="mt-3 inline-flex items-center gap-1 text-[14px] font-bold text-graphite transition-colors group-hover:text-vivid-indigo">
        Bekijk categorie <ArrowRightIcon aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
