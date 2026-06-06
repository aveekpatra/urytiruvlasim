import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { IMAGES, cdn } from "@/lib/images";
import { FadeIn, SlideIn, StaggerContainer, StaggerItem, AnimatedImage } from "@/components/motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { CallIcon, Mail01Icon } from "@hugeicons/core-free-icons";

export const metadata: Metadata = {
  title: "Svatby & Oslavy",
  description:
    "Pronájem prostor pro svatby, firemní akce a soukromé oslavy v historickém vlašimském zámku. Kapacita až 80 hostů, menu a dekorace na míru.",
  alternates: {
    canonical: "https://www.ublanickychrytiru.cz/svatby",
  },
  openGraph: {
    title: "Svatby & Oslavy — U Blanických rytířů",
    description:
      "Pronájem prostor pro svatby a oslavy v historickém vlašimském zámku. Kapacita až 80 hostů.",
    images: [
      {
        url: cdn("/images/JHK09458-Enhanced-NR.jpg"),
        width: 1200,
        height: 630,
        alt: "Svatby a oslavy v zámecké restauraci U Blanických rytířů",
      },
    ],
  },
};

const spaces = [
  {
    name: "Restaurace",
    capacity: "až 80 hostů",
    description:
      "Dva nekuřácké salonky s krbem v historických prostorách zámku. Ideální pro svatební hostiny, firemní večeře a velké oslavy.",
    image: cdn("/images/JHK09452-Enhanced-NR.jpg"),
  },
  {
    name: "Venkovní terasa",
    capacity: "až 58 míst",
    description:
      "Letní terasa s výhledem do zámeckého parku. Skvělá pro letní oslavy, přípitky a posezení v přírodě.",
    image: cdn("/images/JHK09524.jpg"),
  },
  {
    name: "Pivnice",
    capacity: "20–40 hostů",
    description:
      "Komorní nekuřácký prostor pro menší oslavy, zásnuby, narozeniny nebo intimní posezení v naprostém soukromí.",
    image: cdn("/images/JHK09424-Enhanced-NR.jpg"),
  },
];

const eventTypes = [
  {
    title: "Svatby",
    description:
      "Pronájem celé restaurace pro vaši svatební hostinu. Připravíme dekorace i menu přesně podle vašich představ.",
  },
  {
    title: "Firemní akce",
    description:
      "Prostory pro firemní večírky, teambuildingy, vánoční večeře a obchodní jednání v historickém prostředí.",
  },
  {
    title: "Narozeniny & jubilea",
    description:
      "Oslava narozenin nebo výročí v komorním salonku nebo v celé restauraci — podle velikosti vaší akce.",
  },
  {
    title: "Soukromé oslavy",
    description:
      "Křtiny, promoce, zásnuby nebo jakákoliv jiná příležitost. Prostory přizpůsobíme vašim potřebám.",
  },
];

const features = [
  {
    title: "Menu na míru",
    description:
      "Sestavíme menu přesně podle vašich přání — od přípitku po dezert.",
  },
  {
    title: "Dekorace dle přání",
    description:
      "Připravíme výzdobu prostor podle vašich představ a charakteru akce.",
  },
  {
    title: "Exkluzivní pronájem",
    description:
      "Celá restaurace může být jen vaše. Žádní cizí hosté, jen vaše oslava.",
  },
  {
    title: "Vinárna",
    description:
      "Elegantní vinárna s výběrem tuzemských i zahraničních vín pro slavnostní přípitek.",
  },
  {
    title: "Wi-Fi v celém objektu",
    description:
      "Připojení k internetu ve všech prostorách restaurace.",
  },
];

const galleryImages = [
  {
    src: cdn("/images/JHK09452-Enhanced-NR.jpg"),
    alt: "Restaurace — dlouhý stůl pod klenbou",
  },
  {
    src: cdn("/images/JHK09524.jpg"),
    alt: "Terasa s výhledem do parku",
  },
  {
    src: cdn("/images/JHK09405-Edit.jpg"),
    alt: "Obsluha připravuje stůl",
  },
  {
    src: cdn("/images/JHK09490.jpg"),
    alt: "Restaurace — hosté při oslavě",
  },
  {
    src: cdn("/images/JHK09378.jpg"),
    alt: "Květiny v pivnici",
  },
  {
    src: cdn("/images/dishes/JHK09587.jpg"),
    alt: "Salát na prostřeném stole",
  },
];

export default function SvatbyPage() {
  return (
    <>
      <Navigation />

      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <AnimatedImage
          src={IMAGES.wedding.background}
          alt="Oslavy v zámeckém prostředí"
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
            <h1 className="font-serif text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-6">
              Svatby & Oslavy
            </h1>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="w-16 h-px bg-[var(--color-gold)] mb-6" />
          </FadeIn>
          <FadeIn delay={0.8}>
            <p className="text-white/70 text-sm sm:text-base max-w-lg tracking-wide">
              Pronájem prostor pro vaši akci v historickém zámku
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Overview Section */}
      <section className="bg-[var(--color-cream)] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text */}
            <SlideIn direction="left">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-4 block">
                Oslavy na zámku
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--color-charcoal)] mb-6 leading-tight">
                Vaše akce
                <span className="block italic text-[var(--color-gold-dark)]">
                  v historických prostorách
                </span>
              </h2>
              <div className="w-12 h-px bg-[var(--color-gold)] mb-8" />
              <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
                Hledáte prostory pro svatbu, firemní akci nebo soukromou oslavu?
                Nabízíme pronájem restaurace přímo ve vlašimském zámku —
                nekuřácké salonky s krbem, venkovní terasu s výhledem do parku
                i komorní rytířský salonek.
              </p>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                Dekorace i menu připravíme přesně podle vašich přání.
                Stačí nás kontaktovat a domluvit si nezávaznou schůzku.
              </p>
            </SlideIn>

            {/* Image with gold frame */}
            <SlideIn direction="right">
              <div className="relative">
                <div className="absolute -inset-4 border border-[var(--color-gold)]/20" />
                <div className="relative aspect-[4/5] overflow-hidden">
                  <AnimatedImage
                    src={cdn("/images/JHK09458-Enhanced-NR.jpg")}
                    alt="Restaurace — slavnostní tabule"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Event Types Section */}
      <section className="bg-[var(--color-ivory)] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16 lg:mb-20">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-4 block">
                Příležitosti
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)] mb-4">
                Jakou akci plánujete?
              </h2>
              <div className="w-12 h-px bg-[var(--color-gold)] mx-auto" />
            </div>
          </FadeIn>

          {/* Event Types Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {eventTypes.map((event, index) => (
              <StaggerItem key={index}>
                <div className="bg-white border border-[var(--color-stone)]/40 p-8 hover:shadow-lg transition-shadow duration-500">
                  <h3 className="font-serif text-xl text-[var(--color-charcoal)] mb-3">
                    {event.title}
                  </h3>
                  <div className="w-8 h-px bg-[var(--color-gold)] mb-4" />
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Spaces Section */}
      <section className="bg-[var(--color-cream)] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16 lg:mb-20">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-4 block">
                Prostory k pronájmu
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)] mb-4">
                Vyberte si prostor
              </h2>
              <div className="w-12 h-px bg-[var(--color-gold)] mx-auto" />
            </div>
          </FadeIn>

          {/* Space Cards */}
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {spaces.map((space, index) => (
              <StaggerItem key={index}>
                <div className="group bg-white border border-[var(--color-stone)]/40 overflow-hidden hover:shadow-lg transition-shadow duration-500">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <AnimatedImage
                      src={space.image}
                      alt={space.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                {/* Content */}
                <div className="p-8">
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="font-serif text-xl text-[var(--color-charcoal)]">
                      {space.name}
                    </h3>
                    <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-gold-dark)] font-medium">
                      {space.capacity}
                    </span>
                  </div>
                  <div className="w-8 h-px bg-[var(--color-gold)] mb-4" />
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                    {space.description}
                  </p>
                </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* What We Provide */}
      <section className="bg-[var(--color-charcoal)] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16 lg:mb-20">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold)] mb-4 block">
                Co zajistíme
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl mb-4">
                Vše pro vaši akci
              </h2>
              <div className="w-12 h-px bg-[var(--color-gold)] mx-auto" />
            </div>
          </FadeIn>

          {/* Features Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <div className="group">
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-px bg-[var(--color-gold)] mt-3 shrink-0 group-hover:w-12 transition-all duration-300" />
                    <div>
                      <h3 className="font-serif text-lg mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-[var(--color-ivory)] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16 lg:mb-20">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-4 block">
                Inspirace
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)] mb-4">
                Galerie
              </h2>
              <div className="w-12 h-px bg-[var(--color-gold)] mx-auto" />
            </div>
          </FadeIn>

          {/* Gallery Grid */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((img, index) => (
              <StaggerItem
                key={index}
                className="group relative aspect-[4/3] overflow-hidden"
              >
                <AnimatedImage
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA / Inquiry Section */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        <AnimatedImage
          src={cdn("/images/JHK09411-Enhanced-NR.jpg")}
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />

        <FadeIn>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-[var(--color-gold)] text-[10px] tracking-[0.4em] uppercase mb-6 block">
            Máte zájem?
          </span>
          <h2 className="font-serif text-white text-3xl sm:text-4xl lg:text-5xl mb-6">
            Domluvte si nezávaznou schůzku
          </h2>
          <div className="w-16 h-px bg-[var(--color-gold)] mx-auto mb-8" />
          <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-12 max-w-xl mx-auto">
            Zavolejte nám nebo napište e-mail. Rádi vás provedeme prostory
            a probereme možnosti pro vaši akci.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="tel:+420732878238"
              className="inline-flex items-center gap-2 px-10 py-4 bg-[var(--color-gold)] text-[var(--color-charcoal)] text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-white transition-colors duration-300"
            >
              <HugeiconsIcon icon={CallIcon} size={14} strokeWidth={1.5} />
              +420 732 878 238
            </Link>
            <Link
              href="mailto:ublanickychrytiru@seznam.cz?subject=Poptávka%20pronájmu%20prostor"
              className="inline-flex items-center gap-2 px-10 py-4 border border-white/40 text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-white hover:text-[var(--color-charcoal)] transition-all duration-300"
            >
              <HugeiconsIcon icon={Mail01Icon} size={14} strokeWidth={1.5} />
              Napsat e-mail
            </Link>
          </div>

          <p className="text-white/40 text-xs mt-8 tracking-wide">
            ublanickychrytiru@seznam.cz
          </p>
        </div>
        </FadeIn>
      </section>

      <Footer />
    </>
  );
}
