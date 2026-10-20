"use client";

import Link from "next/link";
import { IMAGES } from "@/lib/images";
import { Reveal, AnimatedImage } from "@/components/motion";

const features = [
  "Pronájem restaurace pro vaši akci",
  "Menu a dekorace na míru",
  "Svatby, firemní akce, soukromé oslavy",
  "Vinárna, terasa, rytířský salonek",
  "Kapacita až 80 hostů",
];

export function WeddingsSection() {
  return (
    <section id="svatby" className="relative py-24 lg:py-40 bg-[var(--color-charcoal)] text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <AnimatedImage
          src={IMAGES.wedding.background}
          alt=""
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-charcoal)] via-[var(--color-charcoal)]/90 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <Reveal>
            <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--color-gold)] mb-6 block">
              Svatby & Oslavy
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl mb-8 leading-tight">
              Váš výjimečný den
              <span className="block italic text-[var(--color-gold)]">v zámeckém prostředí</span>
            </h2>
            <div className="w-16 h-px bg-[var(--color-gold)] mb-8" />
            <p className="text-white/70 leading-relaxed mb-10 max-w-lg">
              Hledáte prostory pro svatbu, firemní akci nebo soukromou oslavu?
              Nabízíme pronájem restaurace přímo ve vlašimském zámku —
              dekorace i menu připravíme přesně podle vašich představ.
            </p>

            {/* Features */}
            <div>
              <ul className="space-y-4 mb-12">
                {features.map((feature, index) => (
                  <Reveal key={index}>
                    <li className="flex items-center gap-4">
                      <span className="w-8 h-px bg-[var(--color-gold)]" />
                      <span className="text-white/80 text-sm tracking-wide">{feature}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kontakt"
                className="inline-block px-10 py-4 bg-[var(--color-gold)] text-[var(--color-charcoal)] text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-white transition-colors duration-300 text-center"
              >
                Nezávazná poptávka
              </Link>
              <Link
                href="/svatby"
                className="inline-block px-10 py-4 border border-white/30 text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-white hover:text-[var(--color-charcoal)] transition-all duration-300 text-center"
              >
                Více informací
              </Link>
            </div>
          </Reveal>

          {/* Image Collage */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <Reveal>
                <div className="relative aspect-3/4 overflow-hidden">
                  <AnimatedImage
                    src={IMAGES.wedding.gallery[0]}
                    alt="Svatební hostina"
                    fill
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <Reveal>
                <div className="relative aspect-square overflow-hidden">
                  <AnimatedImage
                    src={IMAGES.wedding.gallery[1]}
                    alt="Zámecký park"
                    fill
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
            <div className="pt-12 space-y-4">
              <Reveal>
                <div className="relative aspect-square overflow-hidden">
                  <AnimatedImage
                    src={IMAGES.wedding.gallery[2]}
                    alt="Svatební tabule"
                    fill
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <Reveal>
                <div className="relative aspect-3/4 overflow-hidden">
                  <AnimatedImage
                    src={IMAGES.wedding.gallery[3]}
                    alt="Novomanželé"
                    fill
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
