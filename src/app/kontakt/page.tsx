import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { RESTAURANT_INFO } from "@/lib/constants";
import { FadeIn, SlideIn, AnimatedImage, StaggerContainer, StaggerItem } from "@/components/motion";
import { cdn } from "@/lib/images";
import { HugeiconsIcon } from "@hugeicons/react";
import { Facebook01Icon, InstagramIcon, Location01Icon, CallIcon, Mail01Icon, Clock01Icon, MapsLocation01Icon } from "@hugeicons/core-free-icons";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktní údaje restaurace U Blanických rytířů. Zámek 1, 258 01 Vlašim. Telefon: +420 732 878 238. Rezervace telefonicky nebo e-mailem.",
  alternates: {
    canonical: "https://www.ublanickychrytiru.cz/kontakt",
  },
  openGraph: {
    title: "Kontakt — U Blanických rytířů",
    description:
      "Kontaktní údaje restaurace U Blanických rytířů. Zámek 1, Vlašim. Telefon: +420 732 878 238.",
    images: [
      {
        url: cdn("/images/JHK09411-Enhanced-NR.jpg"),
        width: 1200,
        height: 630,
        alt: "Restaurace U Blanických rytířů — kontakt",
      },
    ],
  },
};

export default function KontaktPage() {
  return (
    <>
      <Navigation />

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <AnimatedImage
          src={cdn("/images/JHK09361.jpg")}
          alt="Restaurace U Blanických rytířů — vstup"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <FadeIn delay={0.2}>
            <span className="text-white/60 text-[10px] tracking-[0.4em] uppercase mb-6 block">
              Zámecká restaurace
            </span>
          </FadeIn>
          <FadeIn delay={0.4}>
            <h1 className="font-serif text-white text-4xl sm:text-5xl lg:text-6xl mb-6">
              Kontakt
            </h1>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="w-16 h-px bg-[var(--color-gold)]" />
          </FadeIn>
        </div>
      </section>

      {/* Contact Info + Map */}
      <section className="bg-[var(--color-cream)] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left — Contact Details */}
            <SlideIn direction="left">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-4 block">
                Kde nás najdete
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)] mb-6">
                Navštivte nás
              </h2>
              <div className="w-12 h-px bg-[var(--color-gold)] mb-10" />

              {/* Address */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] font-medium mb-3 flex items-center gap-2">
                    <HugeiconsIcon icon={Location01Icon} size={14} strokeWidth={1.5} />
                    Adresa
                  </h3>
                  <p className="text-[var(--color-text)] leading-relaxed">
                    {RESTAURANT_INFO.name}
                    <br />
                    {RESTAURANT_INFO.address.street}
                    <br />
                    {RESTAURANT_INFO.address.postalCode}{" "}
                    {RESTAURANT_INFO.address.city}
                    <br />
                    {RESTAURANT_INFO.address.country}
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <h3 className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] font-medium mb-3 flex items-center gap-2">
                    <HugeiconsIcon icon={CallIcon} size={14} strokeWidth={1.5} />
                    Telefon
                  </h3>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone.replace(/\s/g, "")}`}
                    className="text-[var(--color-text)] text-lg hover:text-[var(--color-gold-dark)] transition-colors"
                  >
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>

                {/* Email */}
                <div>
                  <h3 className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] font-medium mb-3 flex items-center gap-2">
                    <HugeiconsIcon icon={Mail01Icon} size={14} strokeWidth={1.5} />
                    E-mail
                  </h3>
                  <a
                    href={`mailto:${RESTAURANT_INFO.email}`}
                    className="text-[var(--color-text)] hover:text-[var(--color-gold-dark)] transition-colors"
                  >
                    {RESTAURANT_INFO.email}
                  </a>
                </div>

                {/* Social */}
                <div>
                  <h3 className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] font-medium mb-3">
                    Sociální sítě
                  </h3>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://facebook.com/ublanickychrytiru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[var(--color-text)] hover:text-[var(--color-gold-dark)] transition-colors"
                    >
                      <HugeiconsIcon icon={Facebook01Icon} size={20} strokeWidth={1.5} />
                      Facebook
                    </a>
                    <a
                      href="https://www.instagram.com/restaurace_u_blanickych_rytiru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[var(--color-text)] hover:text-[var(--color-gold-dark)] transition-colors"
                    >
                      <HugeiconsIcon icon={InstagramIcon} size={20} strokeWidth={1.5} />
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </SlideIn>

            {/* Right — Map */}
            <SlideIn direction="right">
              <div className="aspect-square lg:aspect-auto lg:h-full min-h-[400px] bg-[var(--color-stone)]">
                <iframe
                  src={`https://maps.google.com/maps?q=${RESTAURANT_INFO.coordinates.lat},${RESTAURANT_INFO.coordinates.lng}&z=16&output=embed&hl=cs`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa — U Blanických rytířů, Zámek 1, Vlašim"
                />
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Opening Hours + Parking */}
      <section className="bg-[var(--color-ivory)] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Opening Hours */}
            <StaggerItem>
              <h3 className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] font-medium mb-6 flex items-center gap-2">
                <HugeiconsIcon icon={Clock01Icon} size={14} strokeWidth={1.5} />
                Otevírací doba — Restaurace
              </h3>
              <div className="space-y-3">
                {RESTAURANT_INFO.openingHours.map((oh, index) => (
                  <div
                    key={index}
                    className="flex justify-between max-w-[240px]"
                  >
                    <span className="text-[var(--color-text-muted)] text-sm">
                      {oh.days}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        oh.hours === "Zavřeno"
                          ? "text-red-700"
                          : "text-[var(--color-text)]"
                      }`}
                    >
                      {oh.hours}
                    </span>
                  </div>
                ))}
              </div>
            </StaggerItem>

            {/* Getting There */}
            <StaggerItem>
              <h3 className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] font-medium mb-6 flex items-center gap-2">
                <HugeiconsIcon icon={MapsLocation01Icon} size={14} strokeWidth={1.5} />
                Jak se k nám dostanete
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                Restaurace se nachází přímo v areálu vlašimského zámku
                v centru města Vlašim. Z Prahy cca 70 km po dálnici D1
                a dále po silnici 3. třídy směr Vlašim.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="bg-[var(--color-charcoal)] py-20 lg:py-24">
        <FadeIn>
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-[var(--color-gold)] text-[10px] tracking-[0.4em] uppercase mb-6 block">
            Rezervace
          </span>
          <h2 className="font-serif text-white text-3xl sm:text-4xl mb-6">
            Rezervujte si stůl
          </h2>
          <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mb-8" />
          <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-xl mx-auto">
            Pro rezervaci stolu nás kontaktujte telefonicky nebo e-mailem.
            Těšíme se na vaši návštěvu.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 px-10 py-4 bg-[var(--color-gold)] text-[var(--color-charcoal)] text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-white transition-colors duration-300"
            >
              <HugeiconsIcon icon={CallIcon} size={14} strokeWidth={1.5} />
              {RESTAURANT_INFO.phone}
            </Link>
            <Link
              href={`mailto:${RESTAURANT_INFO.email}`}
              className="inline-flex items-center gap-2 px-10 py-4 border border-white/30 text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-white hover:text-[var(--color-charcoal)] transition-all duration-300"
            >
              <HugeiconsIcon icon={Mail01Icon} size={14} strokeWidth={1.5} />
              Napsat e-mail
            </Link>
          </div>
        </div>
        </FadeIn>
      </section>

      <Footer />
    </>
  );
}
