"use client";

import { localeLabels, locales, type Locale } from "@/i18n/translations";
import { useLocale } from "./LanguageProvider";
import { ChevronDownIcon } from "@radix-ui/react-icons";

function LocaleFlag({ locale }: { locale: Locale }) {
  const stripes = {
    nl: ["#AE1C28", "#FFFFFF", "#21468B"],
    fr: ["#0055A4", "#FFFFFF", "#EF4135"],
    it: ["#009246", "#FFFFFF", "#CE2B37"],
    es: ["#AA151B", "#F1BF00", "#AA151B"],
    en: ["#012169", "#FFFFFF", "#C8102E"],
  }[locale];

  return (
    <svg aria-hidden="true" viewBox="0 0 24 16" className="h-4 w-6 shrink-0 overflow-hidden rounded-[2px]">
      {locale === "en" ? (
        <>
          <rect width="24" height="16" fill={stripes[0]} />
          <path d="M0 0 24 16M24 0 0 16" stroke={stripes[1]} strokeWidth="3" />
          <path d="M0 0 24 16M24 0 0 16" stroke={stripes[2]} strokeWidth="1" />
          <path d="M12 0v16M0 8h24" stroke={stripes[1]} strokeWidth="5" />
          <path d="M12 0v16M0 8h24" stroke={stripes[2]} strokeWidth="3" />
        </>
      ) : (
        stripes.map((color, index) => (
          <rect
            key={`${locale}-${index}`}
            x={locale === "fr" || locale === "it" ? index * 8 : 0}
            y={locale === "fr" || locale === "it" ? 0 : index * 16 / 3}
            width={locale === "fr" || locale === "it" ? 8 : 24}
            height={locale === "fr" || locale === "it" ? 16 : 16 / 3}
            fill={color}
          />
        ))
      )}
    </svg>
  );
}

export function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { locale, setLocale } = useLocale();
  const availableLocales = locales.filter((item) => item !== locale);

  return (
    <div className={mobile ? "flex items-center justify-between gap-3 border-t border-fog/40 px-4 py-4 text-sm" : "inline-flex items-center gap-2 text-[12px] text-slate"}>
      <span className={mobile ? "font-medium" : "sr-only"}>Taal</span>
      <details className={mobile ? "group w-auto max-w-full" : "group relative"}>
        <summary aria-controls={`taal-keuzelijst-${mobile ? "mobile" : "desktop"}`} className={`flex cursor-pointer list-none items-center justify-between gap-3 rounded-[7.6px] border border-vivid-indigo bg-pure-white px-3.5 py-2.5 text-left text-[13px] font-medium text-midnight-ink outline-none transition hover:bg-frost-gray focus-visible:ring-2 focus-visible:ring-vivid-indigo/20 [&::-webkit-details-marker]:hidden ${mobile ? "w-auto min-w-0" : "min-w-[190px]"}`}>
          <span className="flex min-w-0 items-center gap-2.5">
            <LocaleFlag locale={locale} />
            <span className="truncate">{localeLabels[locale]}</span>
          </span>
          <ChevronDownIcon aria-hidden className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
        </summary>
        <div
          id={`taal-keuzelijst-${mobile ? "mobile" : "desktop"}`}
          role="listbox"
          aria-label="Taal kiezen"
          className={`language-dropdown-panel ${mobile ? "mt-2 w-full min-w-0" : "absolute right-0 top-[calc(100%+8px)] z-50 min-w-[190px]"} overflow-hidden rounded-[7.6px] border border-fog bg-pure-white p-1.5 text-midnight-ink shadow-[0_8px_24px_rgba(8,9,63,0.12)]`}
        >
          {availableLocales.map((item) => (
            <button
              key={item}
              type="button"
              role="option"
              aria-selected={item === locale}
              onClick={(event) => {
                setLocale(item);
                event.currentTarget.closest("details")?.removeAttribute("open");
              }}
              className="flex w-full items-center gap-2.5 rounded-[5px] px-2.5 py-2 text-left text-[13px] transition hover:bg-frost-gray focus:bg-frost-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-vivid-indigo/30"
            >
              <LocaleFlag locale={item} />
              <span>{localeLabels[item]}</span>
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}
