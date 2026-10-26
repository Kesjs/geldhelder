import type { Metadata } from "next";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-700.css";
import "./globals.css";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
    title: {
    default: "GeldHelder | Lenen met overzicht",
    template: "%s | GeldHelder",
  },
  description:
    "Een helder overzicht van je leenmogelijkheden en een persoonlijke aanvraag in Nederland.",
  icons: {
    icon: [{ url: "/brand/stuurvast-logo-mark.png", type: "image/png" }],
    apple: "/brand/stuurvast-logo-mark.png",
  },
  openGraph: { type: "website", locale: "nl_NL", siteName: "GeldHelder" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "GeldHelder",
  areaServed: "NL",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body>
        <>
          <a
          href="#inhoud"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[7.6px] focus:bg-vivid-indigo focus:px-4 focus:py-2 focus:text-pure-white"
        >
          Ga naar de inhoud
          </a>
          {children}
          {process.env.BUSINESS_DETAILS_VERIFIED === "true" && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
              }}
            />
          )}
        </>
      </body>
    </html>
  );
}
