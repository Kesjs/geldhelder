import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { licenseCategories } from "@/data/license-categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/rijbewijzen",
    "/pakketten",
    "/theorie",
    "/over-ons",
    "/instructeurs",
    "/contact",
    "/reserveren",
    "/faq",
    "/privacy",
    "/algemene-voorwaarden",
  ];
  return [
    ...pages,
    ...licenseCategories.map((c) => `/rijbewijzen/${c.slug}`),
  ].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: new Date(),
  }));
}
