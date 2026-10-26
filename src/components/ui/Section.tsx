type Tone = "white" | "gray" | "dark";
const tones: Record<Tone, string> = {
  white: "bg-pure-white",
  gray: "bg-frost-gray",
  dark: "bg-midnight-ink text-pure-white on-dark",
};

export function Section({
  tone = "white",
  title,
  intro,
  children,
  id,
}: {
  tone?: Tone;
  title?: string;
  intro?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={`${tones[tone]} py-16 lg:py-24`}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {title && (
          <div className="mb-10 max-w-3xl">
            <h2 className="text-[30px] font-bold leading-[1.14] md:text-[34px]">{title}</h2>
            {intro && (
              <p
                className={`mt-2 ${tone === "dark" ? "text-soft-violet" : "text-slate"}`}
              >
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
