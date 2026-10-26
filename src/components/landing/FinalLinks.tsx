import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const links = [
  {
    href: "/faq",
    title: "Veelgestelde vragen",
    text: "Lees de antwoorden voordat je begint.",
    image: "/images/faq.webp",
    alt: "Notities voor veelgestelde vragen over rijlessen",
  },
  {
    href: "/contact",
    title: "Neem contact op",
    text: "Vertel ons wat je nodig hebt.",
    image: "/images/contact.webp",
    alt: "Telefoon en notitieboek voor contact met de rijschool",
  },
];

export function FinalLinks() {
  return (
    <section className="bg-frost-gray py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-vivid-indigo">
          Nog vragen?
        </p>
        <h2 className="mt-3 text-[32px] font-bold tracking-[-0.035em] sm:text-[42px]">
          We helpen je verder.
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group grid grid-cols-1 overflow-hidden rounded-[15.2px] border border-fog/40 bg-pure-white sm:grid-cols-[0.8fr_1fr]"
            >
              <div className="image-frame relative aspect-[16/9] overflow-hidden sm:aspect-[4/3]">
                <Image
                  src={link.image}
                  alt={link.alt}
                  fill
                  sizes="(max-width:767px) 40vw, 30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                />
              </div>
              <div className="flex min-w-0 flex-col justify-center p-5 sm:p-7">
                <h3 className="text-[21px] font-bold">{link.title}</h3>
                <p className="mt-2 text-slate">{link.text}</p>
                <span className="mt-5 inline-flex items-center text-sm font-bold text-vivid-indigo">
                  Ontdek meer{" "}
                  <ArrowRightIcon
                    aria-hidden
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
