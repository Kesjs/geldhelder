export function EyebrowBadge({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-block rounded-[35.8px] px-[15px] py-[4px] text-[13px] ${
        dark ? "bg-pale-lilac text-midnight-ink" : "bg-frost-gray text-graphite"
      }`}
    >
      {children}
    </span>
  );
}

/** Badge « richtprijs »: neutre (le jaune est réservé au décor). */
export function IndicativeBadge() {
  return (
    <span className="inline-block rounded-[7.6px] border border-fog px-2 py-[2px] text-[12px] text-slate">
      Richtprijs
    </span>
  );
}
