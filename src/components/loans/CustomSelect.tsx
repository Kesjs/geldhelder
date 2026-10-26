"use client";

import { useEffect, useRef, useState } from "react";

type Option = { value: string; label: string };

export function CustomSelect({
  name,
  value,
  onChange,
  options,
  placeholder,
  required,
  error,
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder: string;
  required?: boolean;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={root} className="relative">
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={`flex min-h-[52px] w-full items-center justify-between rounded-xl border bg-white px-4 py-3 text-left font-normal outline-none transition-[border-color,box-shadow] duration-200 focus-visible:border-[#0f766e] ${error ? "border-[#b3261e]" : "border-[#c8dcd8]"}`}
      >
        <span className={selected ? "text-[#073b3a]" : "text-[#71908b]"}>
          {selected?.label ?? placeholder}
        </span>
        <span aria-hidden className={`text-[#0f766e] transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>
      {open && (
        <div role="listbox" className="select-menu-enter absolute left-0 right-0 top-[calc(100%+6px)] z-40 overflow-hidden rounded-xl border border-[#c8dcd8] bg-white p-1 shadow-[0_16px_35px_rgba(7,59,58,.14)]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={value === option.value}
              onClick={() => { onChange(option.value); setOpen(false); }}
              className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-[#eef7f5] ${value === option.value ? "bg-[#eef7f5] font-semibold text-[#0f766e]" : "text-[#073b3a]"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
