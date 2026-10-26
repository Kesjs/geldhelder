import Link from "next/link";
import type { ComponentProps } from "react";
import { Button as ShadcnButton } from "./shadcn/button";

type Variant = "primary" | "ghost" | "ghost-dark";

const base =
  "inline-flex items-center justify-center rounded-[7.6px] px-[19px] py-[11px] text-[15px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60";
const variants: Record<Variant, string> = {
  primary: "bg-vivid-indigo text-pure-white hover:bg-[#3c3eb3]",
  ghost:
    "border border-graphite bg-transparent text-graphite hover:bg-frost-gray",
  "ghost-dark":
    "border border-pure-white bg-transparent text-pure-white hover:bg-pure-white/10",
};

export const buttonClass = (variant: Variant = "primary", extra = "") =>
  `${base} ${variants[variant]} ${extra}`.trim();

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <ShadcnButton
      asChild
      variant={variant === "primary" ? "default" : "outline"}
      className={buttonClass(
        variant,
        `h-auto whitespace-normal shadow-none ${className}`,
      )}
      data-i18n-scope
    >
      <Link {...props} />
    </ShadcnButton>
  );
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <ShadcnButton
      variant={variant === "primary" ? "default" : "outline"}
      className={buttonClass(
        variant,
        `h-auto whitespace-normal shadow-none ${className}`,
      )}
      data-i18n-scope
      {...props}
    />
  );
}
