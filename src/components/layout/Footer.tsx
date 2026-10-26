import Link from "next/link";
import { nav, site } from "@/data/site";

export function Footer() {
  return (
    <footer data-i18n-scope className="on-dark bg-midnight-ink text-pure-white">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-16 md:grid-cols-4">
        <div>
          <p className="font-bold">{site.name}</p>
          <p className="mt-2 text-sm text-soft-violet">{site.address}</p>
        </div>
        <div>
          <p className="text-sm font-bold">Navigatie</p>
          <ul className="mt-2 space-y-1 text-sm text-soft-violet">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold">Contact</p>
          <ul className="mt-2 space-y-1 text-sm text-soft-violet">
            <li>
              <a href={site.emailHref}>{site.email}</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold">Juridisch</p>
          <ul className="mt-2 space-y-1 text-sm text-soft-violet">
            <li>
              <Link href="/privacy">Privacybeleid</Link>
            </li>
            <li>
              <Link href="/algemene-voorwaarden">Algemene voorwaarden</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-pure-white/10">
        <p className="mx-auto max-w-[1200px] px-4 py-4 text-[13px] text-soft-violet">
          © {new Date().getFullYear()} {site.name}. Prijzen per rijbewijs zijn
          richtprijzen.
        </p>
      </div>
    </footer>
  );
}
