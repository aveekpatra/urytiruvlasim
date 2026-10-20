"use client";

import Link from "next/link";
import { RESTAURANT_INFO } from "@/lib/constants";
import { cdn } from "@/lib/images";
import { Reveal } from "@/components/motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Facebook01Icon, InstagramIcon, Location01Icon, CallIcon, Mail01Icon, Clock01Icon } from "@hugeicons/core-free-icons";

export function Footer() {
  return (
    <footer id="kontakt" className="bg-[var(--color-charcoal)] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <Reveal className="lg:col-span-1">
            <div className="mb-6 flex items-center gap-3">
              <img
                src={cdn("/Logo.svg")}
                alt="U Blanických rytířů"
                className="h-12 w-auto"
              />
              <div className="leading-none">
                <span className="block font-serif text-base uppercase tracking-[0.05em]">
                  Zámecká restaurace
                </span>
                <span className="block font-serif text-[11px] uppercase tracking-[0.08em] mt-0.5 text-white/80">
                  U Blanických rytířů
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Výjimečná gastronomie v srdci vlašimského zámku.
            </p>
          </Reveal>

          {/* Contact */}
          <Reveal>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold)] mb-6">
              Kontakt
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <HugeiconsIcon icon={Location01Icon} size={16} strokeWidth={1.5} className="text-[var(--color-gold)] mt-0.5 shrink-0" />
                <p className="text-white/80">
                  {RESTAURANT_INFO.address.street}<br />
                  {RESTAURANT_INFO.address.postalCode} {RESTAURANT_INFO.address.city}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <HugeiconsIcon icon={CallIcon} size={16} strokeWidth={1.5} className="text-[var(--color-gold)] shrink-0" />
                <a
                  href={`tel:${RESTAURANT_INFO.phone.replace(/\s/g, "")}`}
                  className="text-white/80 hover:text-[var(--color-gold)] transition-colors"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <HugeiconsIcon icon={Mail01Icon} size={16} strokeWidth={1.5} className="text-[var(--color-gold)] shrink-0" />
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="text-white/80 hover:text-[var(--color-gold)] transition-colors"
                >
                  {RESTAURANT_INFO.email}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Hours */}
          <Reveal>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold)] mb-6 flex items-center gap-2">
              <HugeiconsIcon icon={Clock01Icon} size={14} strokeWidth={1.5} />
              Otevírací doba
            </h4>
            <div className="space-y-3 text-sm">
              {RESTAURANT_INFO.openingHours.map((oh, index) => (
                <div key={index} className="flex justify-between max-w-[200px]">
                  <span className="text-white/60">{oh.days}</span>
                  <span className="text-white/80">{oh.hours}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Reservation */}
          <Reveal>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold)] mb-6">
              Rezervace
            </h4>
            <p className="text-white/60 text-sm mb-6">
              Pro rezervaci stolu nás kontaktujte telefonicky nebo e-mailem.
            </p>
            <Link
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s/g, "")}`}
              className="inline-block px-8 py-3 border border-[var(--color-gold)] text-[var(--color-gold)] text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-[var(--color-gold)] hover:text-[var(--color-charcoal)] transition-all duration-300"
            >
              Zavolat nyní
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} {RESTAURANT_INFO.name}. Všechna práva vyhrazena.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/restaurace_u_blanickych_rytiru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/40 hover:text-[var(--color-gold)] transition-colors text-xs"
              >
                <HugeiconsIcon icon={InstagramIcon} size={18} strokeWidth={1.5} />
                Instagram
              </a>
              <a
                href="https://facebook.com/ublanickychrytiru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/40 hover:text-[var(--color-gold)] transition-colors text-xs"
              >
                <HugeiconsIcon icon={Facebook01Icon} size={18} strokeWidth={1.5} />
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
