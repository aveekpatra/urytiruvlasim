import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { InteractivePhotoGrid } from "@/components/InteractivePhotoGrid";
import { FadeIn, AnimatedImage } from "@/components/motion";
import { cdn } from "@/lib/images";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Fotogalerie restaurace U Blanických rytířů — interiéry, terasa, jídlo a nápoje. Vlašimský zámek, Zámek 1, Vlašim.",
  alternates: {
    canonical: "https://www.ublanickychrytiru.cz/galerie",
  },
  openGraph: {
    title: "Galerie — U Blanických rytířů",
    description:
      "Fotogalerie restaurace U Blanických rytířů — interiéry, terasa, jídlo a nápoje.",
    images: [
      {
        url: cdn("/images/JHK09424-Enhanced-NR.jpg"),
        width: 1200,
        height: 630,
        alt: "Fotogalerie restaurace U Blanických rytířů",
      },
    ],
  },
};

const pivnicePhotos = [
  { src: cdn("/images/JHK09458-Enhanced-NR.jpg"), alt: "Restaurace — slavnostní tabule u okna" },
  { src: cdn("/images/JHK09452-Enhanced-NR.jpg"), alt: "Restaurace — dlouhý stůl pod klenbou" },
  { src: cdn("/images/JHK09486-Enhanced-NR.jpg"), alt: "Restaurace — intimní stůl pro dva" },
  { src: cdn("/images/JHK09487.jpg"), alt: "Restaurace — květiny a hosté v pozadí" },
  { src: cdn("/images/JHK09490.jpg"), alt: "Restaurace — atmosféra s hosty" },
  { src: cdn("/images/JHK09493.jpg"), alt: "Nástěnná malba vlašimského zámku" },
];

const salonekPhotos = [
  { src: cdn("/images/JHK09411-Enhanced-NR.jpg"), alt: "Pivnice — interiér s klenbou a rostlinami" },
  { src: cdn("/images/JHK09408-Enhanced-NR-Edit.jpg"), alt: "Pivnice — lavice podél stěny" },
  { src: cdn("/images/JHK09424-Enhanced-NR.jpg"), alt: "Pivnice — pohled do hloubky sálu" },
  { src: cdn("/images/JHK09343.jpg"), alt: "Pivnice — pohled s obsluhou" },
  { src: cdn("/images/JHK09380.jpg"), alt: "Pivnice — bar s květinami a logem" },
  { src: cdn("/images/JHK09415-Enhanced-NR.jpg"), alt: "Pivnice — detail prostření" },
];

const terasaPhotos = [
  { src: cdn("/images/JHK09524.jpg"), alt: "Terasa — celkový pohled s výhledem do parku" },
  { src: cdn("/images/JHK09525.jpg"), alt: "Terasa — řada stolů s květinami" },
  { src: cdn("/images/JHK09526.jpg"), alt: "Terasa — stůl s výhledem do zahrady" },
  { src: cdn("/images/JHK09528.jpg"), alt: "Terasa — posezení u zídky" },
];

const detailPhotos = [
  { src: cdn("/images/JHK09347.jpg"), alt: "Rytířská zbroj u okna" },
  { src: cdn("/images/JHK09361.jpg"), alt: "Vstupní chodba s lustrem a zbrojí" },
  { src: cdn("/images/JHK09351.jpg"), alt: "Směrovky — pivnice a vinárna" },
  { src: cdn("/images/JHK09447.jpg"), alt: "Historická mapa Království českého" },
  { src: cdn("/images/JHK09377.jpg"), alt: "Rostliny a svíčka na parapetu" },
  { src: cdn("/images/JHK09387.jpg"), alt: "Pilsner Urquell — pivní kohouty" },
];

const dishPhotos = [
  { src: cdn("/images/dishes/JHK09557.jpg"), alt: "Hovězí biftek s pepřovou omáčkou a hranolky" },
  { src: cdn("/images/dishes/JHK09551.jpg"), alt: "Krémová polévka s krutonky a slaninou" },
  { src: cdn("/images/dishes/JHK09579.jpg"), alt: "Caesar salát s parmazánem" },
  { src: cdn("/images/dishes/JHK09591.jpg"), alt: "Crème brûlée s čerstvým ovocem" },
  { src: cdn("/images/dishes/JHK09587.jpg"), alt: "Salát na stole s prostřením" },
  { src: cdn("/images/dishes/JHK09573.jpg"), alt: "Hovězí steak — pohled z výšky" },
];

const drinkPhotos = [
  { src: cdn("/images/drinks/JHK09520-Enhanced-NR.jpg"), alt: "Pivo ve sklenicích U Blanických rytířů" },
  { src: cdn("/images/drinks/JHK09516-Enhanced-NR.jpg"), alt: "Čepování piva" },
  { src: cdn("/images/drinks/JHK09509-Enhanced-NR.jpg"), alt: "Dallmayr espresso" },
  { src: cdn("/images/drinks/JHK09605.jpg"), alt: "Dallmayr cappuccino s rostlinami" },
  { src: cdn("/images/drinks/JHK09504-Enhanced-NR.jpg"), alt: "Bumbu rum na baru" },
  { src: cdn("/images/drinks/JHK09400.jpg"), alt: "Káva na stole" },
];

export default function GaleriePage() {
  return (
    <>
      <Navigation />

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <AnimatedImage
          src={cdn("/images/JHK09345.jpg")}
          alt="Restaurace U Blanických rytířů — interiér"
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
              Galerie
            </h1>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="w-16 h-px bg-[var(--color-gold)]" />
          </FadeIn>
        </div>
      </section>

      {/* Restaurace */}
      <section className="bg-[var(--color-cream)] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
          <div className="text-center mb-16 lg:mb-20">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-4 block">
              Hlavní prostor
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)] mb-4">
              Restaurace
            </h2>
            <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mb-6" />
            <p className="text-[var(--color-text-muted)] text-sm max-w-lg mx-auto">
              Elegantní prostor s bílými ubrusy, pohodlnými křesly
              a komorní atmosférou pro slavnostní příležitosti.
            </p>
          </div>
          </FadeIn>
          <InteractivePhotoGrid photos={pivnicePhotos} />
        </div>
      </section>

      {/* Pivnice */}
      <section className="bg-[var(--color-ivory)] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
          <div className="text-center mb-16 lg:mb-20">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-4 block">
              Nekuřácký salonek
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)] mb-4">
              Pivnice
            </h2>
            <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mb-6" />
            <p className="text-[var(--color-text-muted)] text-sm max-w-lg mx-auto">
              Historický klenutý prostor s kamennou zdí, moderním dřevěným nábytkem
              a stylovou atmosférou.
            </p>
          </div>
          </FadeIn>
          <InteractivePhotoGrid photos={salonekPhotos} />
        </div>
      </section>

      {/* Terasa */}
      <section className="bg-[var(--color-cream)] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
          <div className="text-center mb-16 lg:mb-20">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-4 block">
              Venkovní posezení
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)] mb-4">
              Terasa
            </h2>
            <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mb-6" />
            <p className="text-[var(--color-text-muted)] text-sm max-w-lg mx-auto">
              Zastřešená terasa se skleněnými stěnami a výhledem do zámeckého parku.
            </p>
          </div>
          </FadeIn>
          <InteractivePhotoGrid photos={terasaPhotos} columns={2} />
        </div>
      </section>

      {/* Details & Atmosphere */}
      <section className="bg-[var(--color-ivory)] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
          <div className="text-center mb-16 lg:mb-20">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-4 block">
              Zámecké prostředí
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)] mb-4">
              Detaily & atmosféra
            </h2>
            <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mb-6" />
            <p className="text-[var(--color-text-muted)] text-sm max-w-lg mx-auto">
              Rytířská zbroj, historické mapy a zámecké chodby — každý kout restaurace
              vypráví příběh.
            </p>
          </div>
          </FadeIn>
          <InteractivePhotoGrid photos={detailPhotos} />
        </div>
      </section>

      {/* Dishes */}
      <section className="bg-[var(--color-cream)] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
          <div className="text-center mb-16 lg:mb-20">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-4 block">
              Z naší kuchyně
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)] mb-4">
              Jídlo
            </h2>
            <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mb-6" />
            <p className="text-[var(--color-text-muted)] text-sm max-w-lg mx-auto">
              Česká kuchyně z lokálních surovin — steaky, polévky, saláty a dezerty.
            </p>
          </div>
          </FadeIn>
          <InteractivePhotoGrid photos={dishPhotos} />
        </div>
      </section>

      {/* Drinks */}
      <section className="bg-[var(--color-ivory)] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
          <div className="text-center mb-16 lg:mb-20">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-4 block">
              Nápoje
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)] mb-4">
              Pivo & Káva
            </h2>
            <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mb-6" />
            <p className="text-[var(--color-text-muted)] text-sm max-w-lg mx-auto">
              Pilsner Urquell z tanku, Dallmayr káva a výběr destilátů.
            </p>
          </div>
          </FadeIn>
          <InteractivePhotoGrid photos={drinkPhotos} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-charcoal)] py-20 lg:py-24">
        <FadeIn>
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-white text-3xl sm:text-4xl mb-6">
            Přijďte se podívat osobně
          </h2>
          <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mb-8" />
          <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-xl mx-auto">
            Fotky jsou jen začátek. Rezervujte si stůl a zažijte atmosféru
            vlašimského zámku na vlastní kůži.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="tel:+420732878238"
              className="px-10 py-4 bg-[var(--color-gold)] text-[var(--color-charcoal)] text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-white transition-colors duration-300"
            >
              +420 732 878 238
            </Link>
            <Link
              href="/"
              className="px-10 py-4 border border-white/30 text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-white hover:text-[var(--color-charcoal)] transition-all duration-300"
            >
              Zpět na hlavní stránku
            </Link>
          </div>
        </div>
        </FadeIn>
      </section>

      <Footer />
    </>
  );
}
