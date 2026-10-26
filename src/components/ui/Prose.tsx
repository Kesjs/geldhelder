export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main>
      <header className="border-b border-fog/40">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h1 className="text-[34px] font-bold leading-[1.15] md:text-[46px]">
            {title}
          </h1>
          <p className="mt-2 text-[14px] text-slate">
            Laatst bijgewerkt: {updated}
          </p>
        </div>
      </header>
      <article className="mx-auto max-w-3xl space-y-4 px-4 py-12 text-slate [&_h2]:mt-8 [&_h2]:text-[21px] [&_h2]:font-bold [&_h2]:text-graphite [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </article>
    </main>
  );
}
