"use client";
import {
  Accordion as Root,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./shadcn/accordion";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Root
      type="single"
      collapsible
      className="rounded-[15.2px] border border-slate bg-pure-white"
    >
      {items.map((item, i) => (
        <AccordionItem
          key={item.q}
          value={`faq-${i}`}
          className="border-fog/50"
        >
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Root>
  );
}
