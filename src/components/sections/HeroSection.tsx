"use client";

import Link from "next/link";
import { IMAGES } from "@/lib/images";
import { FadeIn } from "@/components/motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Clock01Icon, Restaurant01Icon, Calendar03Icon } from "@hugeicons/core-free-icons";

export function HeroSection() {
  return (
    <section className="relative h-dvh w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={IMAGES.hero.video}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-32 lg:pb-40 px-6">
        <div className="text-center">
          <FadeIn delay={0.2}>
            <p className="text-white/80 text-[11px] tracking-[0.4em] uppercase mb-6">
              Zámek Vlašim
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <h1 className="font-serif text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-8">
              Kulinářský zážitek
            </h1>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="w-16 h-px bg-[var(--color-gold)] mx-auto mb-8" />
          </FadeIn>
          <FadeIn delay={0.8}>
            <p className="text-white/90 text-sm tracking-[0.15em] uppercase">
              v srdci historického zámku
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Bottom Booking Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12">
            <div className="hidden sm:flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
                <HugeiconsIcon icon={Clock01Icon} size={14} strokeWidth={1.5} className="text-[var(--color-gold-dark)]" />
                Otevírací doba
              </span>
              <div className="flex items-center border border-[var(--color-stone)]">
                {[
                  { days: "Po–Čt", hours: "11–22" },
                  { days: "Pá–So", hours: "11–23" },
                  { days: "Ne", hours: "11–21" },
                ].map((slot, i) => (
                  <span
                    key={slot.days}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] tracking-wide ${i > 0 ? "border-l border-[var(--color-stone)]" : ""}`}
                  >
                    <span className="font-semibold uppercase text-[var(--color-charcoal)]">{slot.days}</span>
                    <span className="text-[var(--color-text-muted)]">{slot.hours}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-[var(--color-stone)]" />

            <div className="flex gap-3 sm:gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-[var(--color-charcoal)] text-white text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-[var(--color-gold)] transition-colors duration-300"
              >
                <HugeiconsIcon icon={Restaurant01Icon} size={14} strokeWidth={1.5} />
                Menu
              </Link>
              <Link
                href="/rezervace"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
              >
                <HugeiconsIcon icon={Calendar03Icon} size={14} strokeWidth={1.5} />
                Rezervovat stůl
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
