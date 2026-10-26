import Link from "next/link";
import type { Package } from "@/data/packages";
import { CheckIcon } from "@radix-ui/react-icons";

export function PackageCard({ pkg }: { pkg: Package }) {
  const featured = pkg.slug === "beginner";
  return (
    <div className={`relative flex flex-col rounded-[15.2px] border bg-pure-white p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 ${featured ? "border-vivid-indigo/70 ring-1 ring-vivid-indigo/15" : "border-fog/60"}`}>
      {featured && (
        <span className="absolute right-5 top-5 rounded-full bg-pale-lilac px-3 py-1 text-[12px] font-bold text-vivid-indigo">
          Meest gekozen
        </span>
      )}
      <p className={`max-w-[15rem] text-[19px] font-bold leading-[1.27] ${featured ? "pr-24" : ""}`}>{pkg.name}</p>
      <p className="mt-1 text-slate">{pkg.description}</p>
      <p className="mt-5 text-[32px] font-bold leading-none tracking-[-0.03em]">
        {pkg.priceLabel}
      </p>
      <p className="mt-1 text-[13px] text-slate">
        {pkg.duration}, inclusief btw
      </p>
      <ul className="mt-4 space-y-1 text-[14px]">
        {pkg.includes.map((i) => (
          <li key={i} className="flex gap-2">
            <CheckIcon aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-vivid-indigo" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
      {pkg.note && (
        <p className="mt-3 rounded-[7.6px] bg-frost-gray p-3 text-[13px] text-slate">
          {pkg.note}
        </p>
      )}
      <div className="mt-auto pt-6">
        <Link
          href={`/reserveren?pakket=${pkg.slug}`}
          className="inline-flex w-full items-center justify-center rounded-[7.6px] bg-vivid-indigo px-[19px] py-[11px] font-medium text-pure-white hover:bg-[#3c3eb3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vivid-indigo focus-visible:ring-offset-2"
        >
          Vraag dit pakket aan
        </Link>
      </div>
    </div>
  );
}
