"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { FadeIn } from "@/components/motion";

function PriceLine({ price }: { price: number }) {
  return (
    <div className="flex items-center justify-center gap-3 mt-3 mb-8">
      <div className="w-14 h-px bg-[var(--color-charcoal)]" />
      <span className="font-serif text-base sm:text-lg font-bold text-[var(--color-charcoal)] tracking-wider">
        {price} Kč
      </span>
      <div className="w-14 h-px bg-[var(--color-charcoal)]" />
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="text-center mt-14 mb-8 first:mt-0">
      <h3 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-[0.25em] text-[var(--color-charcoal)]">
        {title}
      </h3>
    </div>
  );
}

function MenuItem({
  name,
  description,
  allergens,
  price,
  isVegetarian,
}: {
  name: string;
  description?: string;
  allergens?: string;
  price: number;
  isVegetarian?: boolean;
}) {
  return (
    <div className="text-center">
      <h4 className="font-serif text-base sm:text-lg uppercase tracking-[0.15em] text-[var(--color-charcoal)] leading-snug">
        {name}
      </h4>
      {description && (
        <p className="font-serif text-sm tracking-wide text-[var(--color-charcoal)] mt-2.5 leading-relaxed">
          {description}
          {allergens && <span className="ml-1">({allergens})</span>}
        </p>
      )}
      {!description && allergens && (
        <p className="font-serif text-sm tracking-wide text-[var(--color-charcoal)] mt-2">
          ({allergens})
        </p>
      )}
      {isVegetarian && (
        <p className="font-serif text-xs tracking-wide uppercase text-[var(--color-charcoal)] mt-2 font-bold">
          (V)
        </p>
      )}
      <PriceLine price={price} />
    </div>
  );
}

export function DailyMenuSection() {
  const todayMenu = useQuery(api.dailyMenu.getToday);

  // Loading state
  if (todayMenu === undefined) {
    return (
      <section id="menu" className="py-24 lg:py-40 bg-[var(--color-ivory)]">
        <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-[var(--color-charcoal)]/60 text-sm">
            Načítání menu...
          </p>
        </div>
      </section>
    );
  }

  // No menu published today
  if (!todayMenu) {
    return (
      <section id="menu" className="py-24 lg:py-40 bg-[var(--color-ivory)]">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-4 block">
                Denní nabídka
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)] mb-4">
                Menu
              </h2>
              <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mb-8" />
              <p className="text-[var(--color-text-muted)] text-sm">
                Denní menu bude brzy zveřejněno.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="text-center">
              <Link
                href="/menu"
                className="inline-block px-10 py-4 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
              >
                Kompletní menu
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    );
  }

  const formatted = new Date(todayMenu.date + "T12:00:00").toLocaleDateString(
    "cs-CZ",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <section id="menu" className="py-24 lg:py-40 bg-[var(--color-ivory)]">
      <div className="max-w-2xl mx-auto px-6 lg:px-12">
        <FadeIn>
          {/* Card — simple double border in charcoal, like the printed PDF.
              Generous padding because this is read on screen, not folded. */}
          <div className="bg-white p-2 sm:p-3 border border-[var(--color-charcoal)]">
            <div className="border border-[var(--color-charcoal)] px-6 py-14 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
              {/* Date */}
              <p className="text-center font-serif text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[var(--color-charcoal)] mb-12">
                Denní nabídka — {formatted}
              </p>

              {/* Soup */}
              {todayMenu.soup && (
                <div>
                  <SectionHeader title="Polévka" />
                  <MenuItem
                    name={todayMenu.soup}
                    description={todayMenu.soupDescription}
                    allergens={todayMenu.soupAllergens}
                    price={todayMenu.soupPrice}
                  />
                </div>
              )}

              {/* Main Courses */}
              {todayMenu.items.length > 0 && (
                <div>
                  <SectionHeader title="Hlavní chod" />
                  {todayMenu.items.map((item, index) => (
                    <MenuItem
                      key={index}
                      name={item.name}
                      description={item.description}
                      allergens={item.allergens}
                      price={item.price}
                      isVegetarian={item.isVegetarian}
                    />
                  ))}
                </div>
              )}

              {/* Dessert */}
              {todayMenu.dessert && (
                <div>
                  <SectionHeader title="Dezert" />
                  <MenuItem
                    name={todayMenu.dessert}
                    description={todayMenu.dessertDescription}
                    allergens={todayMenu.dessertAllergens}
                    price={todayMenu.dessertPrice ?? 0}
                  />
                </div>
              )}

              {/* Drinks */}
              {todayMenu.drinks && todayMenu.drinks.length > 0 && (
                <div>
                  <SectionHeader title="Nápoje" />
                  {todayMenu.drinks.map((drink, index) => (
                    <MenuItem
                      key={index}
                      name={drink.name}
                      description={drink.description}
                      allergens={drink.allergens}
                      price={drink.price}
                    />
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="mt-10 pt-8 border-t border-[var(--color-charcoal)]/15 text-center space-y-3">
                <p className="font-serif text-[10px] sm:text-[11px] tracking-wide text-[var(--color-charcoal)] leading-relaxed max-w-md mx-auto">
                  1 — obiloviny, 2 — korýši, 3 — vejce, 4 — ryby, 5 — arašídy,
                  6 — sója, 7 — mléko, 8 — skořápkové plody, 9 — celer,
                  10 — hořčice, 11 — sezam, 12 — oxid siřičitý, 13 — vlčí bob,
                  14 — měkkýši
                </p>
                <p className="font-serif text-[10px] sm:text-[11px] tracking-wide uppercase text-[var(--color-charcoal)]">
                  (v) — vegetariánské
                </p>
                <p className="font-serif text-[10px] sm:text-[11px] tracking-wide text-[var(--color-charcoal)]">
                  Informujte nás prosím o případných alergiích.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.2}>
          <div className="mt-12 text-center">
            <Link
              href="/menu"
              className="inline-block px-10 py-4 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
            >
              Kompletní menu
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
