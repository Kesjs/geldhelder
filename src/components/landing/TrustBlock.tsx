const points = [
  {
    title: "Duidelijke afspraken",
    body: "We bespreken vooraf wat je traject inhoudt.",
  },
  {
    title: "Fysieke lessen",
    body: "Praktijklessen altijd bij een echte instructeur.",
  },
  {
    title: "Persoonlijke begeleiding",
    body: "Een pakket dat past bij jouw tempo en niveau.",
  },
];

export function TrustBlock() {
  return (
    <section className="bg-midnight-ink py-16 text-pure-white">
      <div className="mx-auto max-w-[1200px] px-4">
        <h2 className="text-2xl font-bold">Waarom Stuurvast</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {points.map((p) => (
            <div key={p.title}>
              <p className="font-bold">{p.title}</p>
              <p className="mt-1 text-sm text-soft-violet">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
