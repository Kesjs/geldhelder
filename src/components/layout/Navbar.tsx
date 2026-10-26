"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { nav, site } from "@/data/site";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const firstMobileLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => firstMobileLink.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open]);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header data-i18n-scope className="sticky top-0 z-50 border-b border-fog/40 bg-pure-white">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Image
            src="/brand/stuurvast-logo-mark.png"
            alt=""
            width={40}
            height={40}
            priority
            className="h-10 w-10 object-contain"
          />
          <span>{site.name}</span>
        </Link>
        <nav
          aria-label="Hoofdnavigatie"
          className="hidden items-center gap-5 text-[14px] xl:flex"
        >
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "font-bold text-vivid-indigo"
                    : "text-graphite hover:text-vivid-indigo"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <Link
            href="/pakketten"
            className="hidden rounded-[7.6px] bg-vivid-indigo px-[19px] py-[9px] text-[14px] font-medium text-pure-white hover:bg-[#3c3eb3] sm:inline-block"
          >
            Pakketten bekijken
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-[7.6px] border border-fog md:hidden"
            aria-expanded={open}
            aria-controls="mobiel-menu"
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? (
              <Cross1Icon aria-hidden width={18} height={18} />
            ) : (
              <HamburgerMenuIcon aria-hidden width={18} height={18} />
            )}
          </button>
        </div>
      </div>
      <nav
        aria-label="Navigatie op tablet"
        className="hidden flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-fog/25 px-5 py-3 text-[14px] md:flex xl:hidden"
      >
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={active ? "font-bold text-vivid-indigo" : "hover:text-vivid-indigo"}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <nav
        id="mobiel-menu"
        aria-label="Mobiel menu"
        hidden={!open}
        className="fixed inset-x-0 top-[72px] z-40 max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain border-t border-fog/40 bg-pure-white md:hidden"
      >
        <ul className="mx-auto max-w-[1200px] px-4 py-2 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          {nav.map((item, index) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return <li key={item.href}>
              <Link
                href={item.href}
                ref={index === 0 ? firstMobileLink : undefined}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="block py-3 text-[17px] font-medium"
              >
                {item.label}
              </Link>
            </li>
          })}
          <li className="py-3">
            <Link
              href="/reserveren"
              onClick={() => setOpen(false)}
              className="inline-flex w-full justify-center rounded-[7.6px] bg-vivid-indigo px-[19px] py-[11px] font-medium text-pure-white"
            >
              Aanvraag sturen
            </Link>
          </li>
          <li>
            <LanguageSwitcher mobile />
          </li>
        </ul>
      </nav>
    </header>
  );
}
