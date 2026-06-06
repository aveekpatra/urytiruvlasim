"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { RESTAURANT_INFO } from "@/lib/constants";
import { FadeIn, SlideIn, AnimatedImage } from "@/components/motion";
import { cdn } from "@/lib/images";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick01Icon, CallIcon } from "@hugeicons/core-free-icons";

const timeSlots = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00",
];

const occasions = [
  "Běžná návštěva",
  "Narozeniny",
  "Výročí",
  "Firemní akce",
  "Jiné",
];

export default function ReservacePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      date: (form.elements.namedItem("date") as HTMLInputElement).value,
      time: (form.elements.namedItem("time") as HTMLSelectElement).value,
      guests: Number((form.elements.namedItem("guests") as HTMLInputElement).value),
      occasion: (form.elements.namedItem("occasion") as HTMLSelectElement).value || undefined,
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value || undefined,
    };

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Něco se pokazilo. Zkuste to prosím znovu.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Nepodařilo se odeslat rezervaci. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navigation />

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <AnimatedImage
          src={cdn("/images/JHK09452-Enhanced-NR.jpg")}
          alt="Rezervace — U Blanických rytířů"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <FadeIn delay={0.2}>
            <span className="text-white/60 text-[10px] tracking-[0.4em] uppercase mb-6 block">
              Zámecká restaurace
            </span>
          </FadeIn>
          <FadeIn delay={0.4}>
            <h1 className="font-serif text-white text-4xl sm:text-5xl lg:text-6xl mb-6">
              Rezervace
            </h1>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="w-16 h-px bg-[var(--color-gold)]" />
          </FadeIn>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-[var(--color-cream)] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20">
            {/* Form — 2/3 width */}
            <SlideIn direction="left" className="lg:col-span-2">
              <div
                className="bg-[#FFFEF9] px-6 py-12 sm:px-12 sm:py-16 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[var(--color-stone)]/30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  backgroundBlendMode: "soft-light",
                }}
              >
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-[var(--color-gold)] flex items-center justify-center">
                      <HugeiconsIcon icon={Tick01Icon} size={32} color="var(--color-gold)" strokeWidth={1.5} />
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[var(--color-charcoal)] mb-4">
                      Děkujeme za váš zájem
                    </h2>
                    <p className="text-[var(--color-text-muted)] text-sm leading-relaxed max-w-md mx-auto mb-8">
                      Vaši rezervaci jsme přijali. Brzy vás budeme kontaktovat
                      s potvrzením. V případě dotazů nás neváhejte kontaktovat
                      telefonicky.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link
                        href={`tel:${RESTAURANT_INFO.phone.replace(/\s/g, "")}`}
                        className="px-8 py-3 bg-[var(--color-charcoal)] text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[var(--color-gold)] transition-colors duration-300"
                      >
                        {RESTAURANT_INFO.phone}
                      </Link>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-8 py-3 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
                      >
                        Nová rezervace
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-12">
                      <h2 className="font-serif text-2xl sm:text-3xl text-[var(--color-charcoal)] mb-3">
                        Rezervujte si stůl
                      </h2>
                      <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mb-4" />
                      <p className="text-[var(--color-text-muted)] text-sm">
                        Vyplňte formulář a my se vám ozveme s potvrzením.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                      {/* Personal Info */}
                      <div>
                        <h3 className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-6">
                          Kontaktní údaje
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-[11px] tracking-[0.1em] text-[var(--color-text-muted)] mb-2"
                            >
                              Jméno a příjmení *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              className="w-full bg-transparent border-b border-[var(--color-stone)] py-3 text-[var(--color-charcoal)] text-sm outline-none focus:border-[var(--color-gold)] transition-colors duration-300 placeholder:text-[var(--color-text-muted)]/40"
                              placeholder="Jan Novák"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-[11px] tracking-[0.1em] text-[var(--color-text-muted)] mb-2"
                            >
                              E-mail *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              className="w-full bg-transparent border-b border-[var(--color-stone)] py-3 text-[var(--color-charcoal)] text-sm outline-none focus:border-[var(--color-gold)] transition-colors duration-300 placeholder:text-[var(--color-text-muted)]/40"
                              placeholder="jan@example.cz"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="phone"
                              className="block text-[11px] tracking-[0.1em] text-[var(--color-text-muted)] mb-2"
                            >
                              Telefon *
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              required
                              className="w-full bg-transparent border-b border-[var(--color-stone)] py-3 text-[var(--color-charcoal)] text-sm outline-none focus:border-[var(--color-gold)] transition-colors duration-300 placeholder:text-[var(--color-text-muted)]/40"
                              placeholder="+420 123 456 789"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-8 h-px bg-[var(--color-stone)]" />
                        <div className="w-1 h-1 bg-[var(--color-gold)] rotate-45" />
                        <div className="w-8 h-px bg-[var(--color-stone)]" />
                      </div>

                      {/* Reservation Details */}
                      <div>
                        <h3 className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-6">
                          Detaily rezervace
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                          <div>
                            <label
                              htmlFor="date"
                              className="block text-[11px] tracking-[0.1em] text-[var(--color-text-muted)] mb-2"
                            >
                              Datum *
                            </label>
                            <input
                              type="date"
                              id="date"
                              name="date"
                              required
                              min={today}
                              className="w-full bg-transparent border-b border-[var(--color-stone)] py-3 text-[var(--color-charcoal)] text-sm outline-none focus:border-[var(--color-gold)] transition-colors duration-300"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="time"
                              className="block text-[11px] tracking-[0.1em] text-[var(--color-text-muted)] mb-2"
                            >
                              Čas *
                            </label>
                            <select
                              id="time"
                              name="time"
                              required
                              defaultValue=""
                              className="w-full bg-transparent border-b border-[var(--color-stone)] py-3 text-[var(--color-charcoal)] text-sm outline-none focus:border-[var(--color-gold)] transition-colors duration-300"
                            >
                              <option value="" disabled>
                                Vyberte čas
                              </option>
                              {timeSlots.map((slot) => (
                                <option key={slot} value={slot}>
                                  {slot}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="guests"
                              className="block text-[11px] tracking-[0.1em] text-[var(--color-text-muted)] mb-2"
                            >
                              Počet osob *
                            </label>
                            <input
                              type="number"
                              id="guests"
                              name="guests"
                              required
                              min={1}
                              max={80}
                              defaultValue={2}
                              className="w-full bg-transparent border-b border-[var(--color-stone)] py-3 text-[var(--color-charcoal)] text-sm outline-none focus:border-[var(--color-gold)] transition-colors duration-300"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="occasion"
                              className="block text-[11px] tracking-[0.1em] text-[var(--color-text-muted)] mb-2"
                            >
                              Příležitost
                            </label>
                            <select
                              id="occasion"
                              name="occasion"
                              defaultValue=""
                              className="w-full bg-transparent border-b border-[var(--color-stone)] py-3 text-[var(--color-charcoal)] text-sm outline-none focus:border-[var(--color-gold)] transition-colors duration-300"
                            >
                              <option value="">—</option>
                              {occasions.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      <div>
                        <label
                          htmlFor="notes"
                          className="block text-[11px] tracking-[0.1em] text-[var(--color-text-muted)] mb-2"
                        >
                          Poznámka
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          className="w-full bg-transparent border-b border-[var(--color-stone)] py-3 text-[var(--color-charcoal)] text-sm outline-none focus:border-[var(--color-gold)] transition-colors duration-300 resize-none placeholder:text-[var(--color-text-muted)]/40"
                          placeholder="Zvláštní přání, alergie, dětská židlička…"
                        />
                      </div>

                      {/* Error */}
                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm text-center">
                          {error}
                        </div>
                      )}

                      {/* Submit */}
                      <div className="pt-4 text-center">
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-12 py-4 bg-[var(--color-charcoal)] text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[var(--color-gold)] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? "Odesílání..." : "Odeslat rezervaci"}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </SlideIn>

            {/* Sidebar — 1/3 width */}
            <SlideIn direction="right">
              <div className="space-y-10">
                {/* Opening Hours */}
                <div>
                  <h3 className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] font-medium mb-6">
                    Otevírací doba
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
                  <p className="text-[var(--color-text-muted)] text-xs mt-4 leading-relaxed">
                    Kuchyně se zavírá 1 hodinu před koncem otevírací doby.
                  </p>
                </div>

                {/* Divider */}
                <div className="w-12 h-px bg-[var(--color-stone)]" />

                {/* Contact */}
                <div>
                  <h3 className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] font-medium mb-4">
                    Raději telefonicky?
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4">
                    Pro okamžitou rezervaci nás můžete kontaktovat přímo:
                  </p>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 text-[var(--color-charcoal)] text-lg font-medium hover:text-[var(--color-gold-dark)] transition-colors duration-200"
                  >
                    <HugeiconsIcon icon={CallIcon} size={16} strokeWidth={1.5} />
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>

                {/* Divider */}
                <div className="w-12 h-px bg-[var(--color-stone)]" />

                {/* Note */}
                <div>
                  <h3 className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] font-medium mb-4">
                    Důležité informace
                  </h3>
                  <ul className="space-y-3 text-[var(--color-text-muted)] text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-[var(--color-gold)] rotate-45 mt-2 shrink-0" />
                      Rezervace potvrdíme telefonicky nebo e-mailem
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-[var(--color-gold)] rotate-45 mt-2 shrink-0" />
                      Pro skupiny nad 20 osob nás prosím kontaktujte telefonicky
                    </li>
                  </ul>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
