export const inputClass =
  "min-h-11 w-full rounded-[7.6px] border border-fog bg-pure-white px-3 py-[10px] text-[16px] placeholder:text-fog transition-[border-color,box-shadow] focus:border-vivid-indigo focus:outline-none focus:ring-2 focus:ring-vivid-indigo/20 sm:text-[15px] aria-[invalid=true]:border-error";

export const selectClass = `${inputClass} appearance-none pr-10`;

export function Field({
  id,
  label,
  error,
  hint,
  required,
  optionalLabel = "(optioneel)",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  optionalLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-0.5">
      <label htmlFor={id} className="mb-1 block text-[14px] font-bold">
        {label}
        {required ? (
          <span className="text-error" aria-hidden>
            {" "}
            *
          </span>
        ) : (
          <span className="font-medium text-slate"> {optionalLabel}</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-[13px] text-slate">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[13px] text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function Consent({
  checked,
  onChange,
  error,
  consentLabel = "Ik geef toestemming om mijn gegevens te verwerken voor deze aanvraag, zoals beschreven in het",
  privacyLabel = "privacybeleid",
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  consentLabel?: string;
  privacyLabel?: string;
}) {
  return (
    <div>
      <label className="group flex cursor-pointer items-start gap-3 text-[14px]">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
          aria-describedby={error ? "toestemming-error" : undefined}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-fog bg-pure-white text-[13px] font-bold text-pure-white transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-vivid-indigo peer-checked:border-vivid-indigo peer-checked:bg-vivid-indigo"
        >
          ✓
        </span>
        <span>
          {consentLabel}{" "}
          <a href="/privacy" className="font-bold text-vivid-indigo underline">
            {privacyLabel}
          </a>
          .
        </span>
      </label>
      {error && (
        <p id="toestemming-error" className="mt-1 text-[13px] text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function AgreementCheckbox({
  checked,
  onChange,
  error,
  children,
  errorId,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  children: React.ReactNode;
  errorId: string;
}) {
  return (
    <div>
      <label className="group flex cursor-pointer items-start gap-3 text-[14px]">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-fog bg-pure-white text-[13px] font-bold text-pure-white transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-vivid-indigo peer-checked:border-vivid-indigo peer-checked:bg-vivid-indigo"
        >
          ✓
        </span>
        <span>{children}</span>
      </label>
      {error && (
        <p id={errorId} className="mt-1 text-[13px] text-error">
          {error}
        </p>
      )}
    </div>
  );
}
