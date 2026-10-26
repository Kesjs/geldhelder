"use client";
import { Button } from "@/components/ui/Button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-24 text-center">
      <h1 className="text-[34px] font-bold">Er ging iets mis</h1>
      <p className="mt-3 text-slate">
        Probeer het opnieuw. Blijft het fout gaan, neem dan contact met ons op.
      </p>
      <Button onClick={reset} className="mt-6">
        Opnieuw proberen
      </Button>
    </main>
  );
}
