"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { DailyMenuPreview } from "@/components/DailyMenuPDF";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Delete02Icon,
  EyeIcon,
  Calendar03Icon,
  ReloadIcon,
  Tick02Icon,
  AlertCircleIcon,
  Leaf02Icon,
  Coffee01Icon,
  Cupcake01Icon,
  ChefHatIcon,
  SparklesIcon,
  Pdf01Icon,
  Sent02Icon,
} from "@hugeicons/core-free-icons";

interface MenuItem {
  name: string;
  description: string;
  allergens?: string;
  price: number;
  isVegetarian?: boolean;
}

const ALLERGEN_LIST = [
  "1 — obiloviny",
  "2 — korýši",
  "3 — vejce",
  "4 — ryby",
  "5 — arašídy",
  "6 — sója",
  "7 — mléko",
  "8 — skořápky",
  "9 — celer",
  "10 — hořčice",
  "11 — sezam",
  "12 — siřičitany",
  "13 — vlčí bob",
  "14 — měkkýši",
];

function AllergenHint() {
  return (
    <p className="text-[10px] text-[var(--color-text-muted)]/80 mt-2 leading-relaxed">
      {ALLERGEN_LIST.join(" · ")}
    </p>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] tracking-[0.25em] uppercase text-[var(--color-text-muted)] mb-2">
      {children}
    </label>
  );
}

function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { suffix?: React.ReactNode }
) {
  const { suffix, className, ...rest } = props;
  return (
    <div className="relative">
      <input
        {...rest}
        className={cn(
          "w-full px-4 py-3 border border-[var(--color-stone)] bg-white text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-text-muted)]/60 focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]/30 transition-colors",
          suffix && "pr-12",
          className
        )}
      />
      {suffix && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs tracking-wider uppercase text-[var(--color-text-muted)] pointer-events-none">
          {suffix}
        </span>
      )}
    </div>
  );
}

function SectionCard({
  icon,
  title,
  subtitle,
  action,
  children,
}: {
  icon: typeof SparklesIcon;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white border border-[var(--color-stone)]/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <header className="flex items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-[var(--color-stone)]/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center bg-[var(--color-ivory)] text-[var(--color-gold-dark)]">
            <HugeiconsIcon icon={icon} size={18} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="font-serif text-lg text-[var(--color-charcoal)] leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {action}
      </header>
      <div className="px-6 sm:px-8 py-6">{children}</div>
    </section>
  );
}

export function MenuEditor({ token }: { token: string }) {
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [soup, setSoup] = useState("");
  const [soupDescription, setSoupDescription] = useState("");
  const [soupAllergens, setSoupAllergens] = useState("");
  const [soupPrice, setSoupPrice] = useState(0);
  const [items, setItems] = useState<MenuItem[]>([
    { name: "", description: "", allergens: "", price: 0, isVegetarian: false },
  ]);
  const [dessert, setDessert] = useState("");
  const [dessertDescription, setDessertDescription] = useState("");
  const [dessertAllergens, setDessertAllergens] = useState("");
  const [dessertPrice, setDessertPrice] = useState(0);
  const [drinks, setDrinks] = useState<MenuItem[]>([]);
  const [isPublished, setIsPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const existingMenu = useQuery(api.dailyMenu.getByDate, { date });
  const recentMenus = useQuery(api.dailyMenu.listRecent, { token });
  const history = useQuery(
    api.dailyMenu.getHistory,
    showHistory ? { token, date } : "skip"
  );
  const upsert = useMutation(api.dailyMenu.upsert);
  const remove = useMutation(api.dailyMenu.remove);
  const restoreVersion = useMutation(api.dailyMenu.restoreVersion);

  useEffect(() => {
    if (existingMenu) {
      setSoup(existingMenu.soup);
      setSoupDescription(existingMenu.soupDescription || "");
      setSoupAllergens(existingMenu.soupAllergens || "");
      setSoupPrice(existingMenu.soupPrice);
      setItems(
        existingMenu.items.map((i) => ({
          name: i.name,
          description: i.description,
          allergens: i.allergens || "",
          price: i.price,
          isVegetarian: i.isVegetarian || false,
        }))
      );
      setDessert(existingMenu.dessert || "");
      setDessertDescription(existingMenu.dessertDescription || "");
      setDessertAllergens(existingMenu.dessertAllergens || "");
      setDessertPrice(existingMenu.dessertPrice || 0);
      setDrinks(
        (existingMenu.drinks || []).map((d) => ({
          name: d.name,
          description: d.description,
          allergens: d.allergens || "",
          price: d.price,
          isVegetarian: false,
        }))
      );
      setIsPublished(existingMenu.isPublished);
    } else if (existingMenu === null) {
      setSoup("");
      setSoupDescription("");
      setSoupAllergens("");
      setSoupPrice(0);
      setItems([{ name: "", description: "", allergens: "", price: 0, isVegetarian: false }]);
      setDessert("");
      setDessertDescription("");
      setDessertAllergens("");
      setDessertPrice(0);
      setDrinks([]);
      setIsPublished(false);
    }
  }, [existingMenu]);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const filteredItems = items.filter((i) => i.name.trim() !== "");
      await upsert({
        token,
        date,
        soup,
        soupDescription: soupDescription || undefined,
        soupAllergens: soupAllergens || undefined,
        soupPrice,
        items: filteredItems.map((i) => ({
          name: i.name,
          description: i.description,
          allergens: i.allergens || undefined,
          price: i.price,
          isVegetarian: i.isVegetarian || undefined,
        })),
        dessert: dessert || undefined,
        dessertDescription: dessertDescription || undefined,
        dessertAllergens: dessertAllergens || undefined,
        dessertPrice: dessertPrice || undefined,
        drinks:
          drinks.filter((d) => d.name.trim() !== "").length > 0
            ? drinks
                .filter((d) => d.name.trim() !== "")
                .map((d) => ({
                  name: d.name,
                  description: d.description,
                  allergens: d.allergens || undefined,
                  price: d.price,
                  isVegetarian: undefined,
                }))
            : undefined,
        isPublished,
      });
      setMessage({ kind: "ok", text: "Menu uloženo" });
      setTimeout(() => setMessage(null), 2500);
    } catch {
      setMessage({ kind: "err", text: "Chyba při ukládání" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: Id<"dailyMenu">) => {
    if (!confirm("Opravdu smazat toto menu?")) return;
    try {
      await remove({ token, id });
    } catch {
      alert("Chyba při mazání");
    }
  };

  const handleRestore = async (historyId: Id<"dailyMenuHistory">) => {
    if (!confirm("Obnovit tuto verzi? Aktuální verze bude uložena do historie.")) return;
    try {
      await restoreVersion({ token, historyId });
      setMessage({ kind: "ok", text: "Verze obnovena" });
      setTimeout(() => setMessage(null), 2500);
    } catch {
      alert("Chyba při obnovování");
    }
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: "", description: "", allergens: "", price: 0, isVegetarian: false },
    ]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (
    index: number,
    field: keyof MenuItem,
    value: string | number | boolean
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addDrink = () => {
    setDrinks([...drinks, { name: "", description: "", allergens: "", price: 0 }]);
  };

  const removeDrink = (index: number) => {
    setDrinks(drinks.filter((_, i) => i !== index));
  };

  const updateDrink = (
    index: number,
    field: keyof MenuItem,
    value: string | number | boolean
  ) => {
    const newDrinks = [...drinks];
    newDrinks[index] = { ...newDrinks[index], [field]: value };
    setDrinks(newDrinks);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("cs-CZ", {
      weekday: "short",
      day: "numeric",
      month: "numeric",
    });
  };

  const formatLongDate = (dateStr: string) => {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("cs-CZ", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleString("cs-CZ", {
      day: "numeric",
      month: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isToday = date === new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-8 lg:py-10">
        {/* Page header */}
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 mb-8">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-2">
              Editor denního menu
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)]">
              {formatLongDate(date)}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              {existingMenu && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-stone)]/40 text-[var(--color-charcoal)] text-[10px] tracking-[0.15em] uppercase">
                  Verze {existingMenu.version || 1}
                </span>
              )}
              {existingMenu?.isPublished ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-800 text-[10px] tracking-[0.15em] uppercase border border-green-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                  Publikováno
                </span>
              ) : existingMenu ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 text-[10px] tracking-[0.15em] uppercase border border-amber-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Koncept
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-cream)] text-[var(--color-text-muted)] text-[10px] tracking-[0.15em] uppercase border border-[var(--color-stone)]/60">
                  Nové menu
                </span>
              )}
              {isToday && (
                <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold-dark)]">
                  · Dnes
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <div>
              <Label>Datum</Label>
              <div className="relative">
                <HugeiconsIcon
                  icon={Calendar03Icon}
                  size={16}
                  strokeWidth={1.5}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setShowHistory(false);
                  }}
                  className="pl-11 pr-4 py-3 border border-[var(--color-stone)] bg-white text-sm text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]/30 transition-colors"
                />
              </div>
            </div>
            {existingMenu && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-3 border text-[11px] tracking-[0.2em] uppercase transition-colors",
                  showHistory
                    ? "border-[var(--color-charcoal)] bg-[var(--color-charcoal)] text-white"
                    : "border-[var(--color-stone)] text-[var(--color-charcoal)] hover:border-[var(--color-charcoal)]"
                )}
              >
                <HugeiconsIcon icon={ReloadIcon} size={14} strokeWidth={1.5} />
                Historie
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8">
          {/* Editor column */}
          <div className="space-y-6 min-w-0">
            {/* Version History Panel */}
            {showHistory && history && (
              <SectionCard
                icon={ReloadIcon}
                title="Historie verzí"
                subtitle={`Pro datum ${formatDate(date)}`}
              >
                {history.length === 0 ? (
                  <p className="text-sm text-[var(--color-text-muted)] py-4">
                    Žádná předchozí verze.
                  </p>
                ) : (
                  <div className="divide-y divide-[var(--color-stone)]/50 -mx-2">
                    {history.map((h) => (
                      <div
                        key={h._id}
                        className="flex items-center justify-between py-3 px-2"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-[var(--color-charcoal)]">
                              Verze {h.version}
                            </span>
                            {h.isPublished && (
                              <span className="text-[9px] tracking-[0.2em] uppercase px-1.5 py-0.5 bg-green-50 text-green-800 border border-green-200">
                                Publ.
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[var(--color-text-muted)] mt-0.5 truncate">
                            {formatTime(h.savedAt)} · {h.soup} · {h.items.length} jídel
                          </p>
                        </div>
                        <button
                          onClick={() => handleRestore(h._id)}
                          className="ml-4 shrink-0 text-xs tracking-[0.2em] uppercase text-[var(--color-gold-dark)] hover:text-[var(--color-charcoal)] transition-colors"
                        >
                          Obnovit
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </SectionCard>
            )}

            {/* Soup */}
            <SectionCard
              icon={SparklesIcon}
              title="Polévka"
              subtitle="Hlavní polévka dne"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_140px] gap-3">
                <TextInput
                  value={soup}
                  onChange={(e) => setSoup(e.target.value)}
                  placeholder="Název polévky"
                />
                <TextInput
                  type="number"
                  value={soupPrice || ""}
                  onChange={(e) => setSoupPrice(Number(e.target.value))}
                  placeholder="0"
                  suffix="Kč"
                />
              </div>
              <div className="mt-3 space-y-3">
                <TextInput
                  value={soupDescription}
                  onChange={(e) => setSoupDescription(e.target.value)}
                  placeholder="Popis (volitelný)"
                />
                <TextInput
                  value={soupAllergens}
                  onChange={(e) => setSoupAllergens(e.target.value)}
                  placeholder="Alergeny — např. 1, 3, 7"
                />
              </div>
              <AllergenHint />
            </SectionCard>

            {/* Main courses */}
            <SectionCard
              icon={ChefHatIcon}
              title="Hlavní jídla"
              subtitle={`${items.filter((i) => i.name.trim()).length} ${
                items.filter((i) => i.name.trim()).length === 1 ? "položka" : "položek"
              }`}
              action={
                <button
                  onClick={addItem}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[var(--color-charcoal)] text-white text-[10px] tracking-[0.2em] uppercase hover:bg-[var(--color-gold)] transition-colors"
                >
                  <HugeiconsIcon icon={Add01Icon} size={12} strokeWidth={2} />
                  Přidat jídlo
                </button>
              }
            >
              <div className="space-y-5">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="relative pl-4 pb-5 border-l-2 border-[var(--color-stone)] last:pb-0"
                  >
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[var(--color-gold)]" />
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-text-muted)]">
                        Jídlo č. {i + 1}
                      </p>
                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center gap-1.5 cursor-pointer text-[10px] tracking-[0.15em] uppercase">
                          <input
                            type="checkbox"
                            checked={item.isVegetarian || false}
                            onChange={(e) =>
                              updateItem(i, "isVegetarian", e.target.checked)
                            }
                            className="accent-green-700 w-3.5 h-3.5"
                          />
                          <HugeiconsIcon
                            icon={Leaf02Icon}
                            size={12}
                            strokeWidth={1.5}
                            className="text-green-700"
                          />
                          <span className="text-green-700">Vegetariánské</span>
                        </label>
                        {items.length > 1 && (
                          <button
                            onClick={() => removeItem(i)}
                            className="inline-flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase text-red-500 hover:text-red-700 transition-colors"
                            aria-label="Odebrat jídlo"
                          >
                            <HugeiconsIcon
                              icon={Delete02Icon}
                              size={12}
                              strokeWidth={1.5}
                            />
                            Odebrat
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_140px] gap-3">
                      <TextInput
                        value={item.name}
                        onChange={(e) => updateItem(i, "name", e.target.value)}
                        placeholder="Název jídla"
                      />
                      <TextInput
                        type="number"
                        value={item.price || ""}
                        onChange={(e) =>
                          updateItem(i, "price", Number(e.target.value))
                        }
                        placeholder="0"
                        suffix="Kč"
                      />
                    </div>
                    <div className="mt-3 space-y-3">
                      <TextInput
                        value={item.description}
                        onChange={(e) =>
                          updateItem(i, "description", e.target.value)
                        }
                        placeholder="Popis / příloha"
                      />
                      <TextInput
                        value={item.allergens || ""}
                        onChange={(e) =>
                          updateItem(i, "allergens", e.target.value)
                        }
                        placeholder="Alergeny — např. 1, 3, 7"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <AllergenHint />
            </SectionCard>

            {/* Dessert */}
            <SectionCard
              icon={Cupcake01Icon}
              title="Dezert"
              subtitle="Volitelné"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_140px] gap-3">
                <TextInput
                  value={dessert}
                  onChange={(e) => setDessert(e.target.value)}
                  placeholder="Název dezertu"
                />
                <TextInput
                  type="number"
                  value={dessertPrice || ""}
                  onChange={(e) => setDessertPrice(Number(e.target.value))}
                  placeholder="0"
                  suffix="Kč"
                />
              </div>
              <div className="mt-3 space-y-3">
                <TextInput
                  value={dessertDescription}
                  onChange={(e) => setDessertDescription(e.target.value)}
                  placeholder="Popis (volitelný)"
                />
                <TextInput
                  value={dessertAllergens}
                  onChange={(e) => setDessertAllergens(e.target.value)}
                  placeholder="Alergeny — např. 7, 8, 12"
                />
              </div>
              <AllergenHint />
            </SectionCard>

            {/* Drinks */}
            <SectionCard
              icon={Coffee01Icon}
              title="Nápoje"
              subtitle={
                drinks.length === 0
                  ? "Volitelné"
                  : `${drinks.length} ${drinks.length === 1 ? "položka" : "položek"}`
              }
              action={
                <button
                  onClick={addDrink}
                  className="inline-flex items-center gap-1.5 px-3 py-2 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-[10px] tracking-[0.2em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-colors"
                >
                  <HugeiconsIcon icon={Add01Icon} size={12} strokeWidth={2} />
                  Přidat nápoj
                </button>
              }
            >
              {drinks.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Žádné nápoje nebyly přidány.
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]/70 mt-1">
                    Klikněte „Přidat nápoj“ pro přidání první položky.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {drinks.map((drink, i) => (
                    <div
                      key={i}
                      className="relative pl-4 pb-5 border-l-2 border-[var(--color-stone)] last:pb-0"
                    >
                      <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[var(--color-gold)]" />
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-text-muted)]">
                          Nápoj č. {i + 1}
                        </p>
                        <button
                          onClick={() => removeDrink(i)}
                          className="inline-flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase text-red-500 hover:text-red-700 transition-colors"
                          aria-label="Odebrat nápoj"
                        >
                          <HugeiconsIcon
                            icon={Delete02Icon}
                            size={12}
                            strokeWidth={1.5}
                          />
                          Odebrat
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_140px] gap-3">
                        <TextInput
                          value={drink.name}
                          onChange={(e) => updateDrink(i, "name", e.target.value)}
                          placeholder="Název nápoje"
                        />
                        <TextInput
                          type="number"
                          value={drink.price || ""}
                          onChange={(e) =>
                            updateDrink(i, "price", Number(e.target.value))
                          }
                          placeholder="0"
                          suffix="Kč"
                        />
                      </div>
                      <div className="mt-3 space-y-3">
                        <TextInput
                          value={drink.description}
                          onChange={(e) =>
                            updateDrink(i, "description", e.target.value)
                          }
                          placeholder="Popis (volitelný)"
                        />
                        <TextInput
                          value={drink.allergens || ""}
                          onChange={(e) =>
                            updateDrink(i, "allergens", e.target.value)
                          }
                          placeholder="Alergeny — např. 1, 12"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
            {/* Recent menus */}
            <div className="bg-white border border-[var(--color-stone)]/60">
              <div className="px-5 py-4 border-b border-[var(--color-stone)]/50">
                <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-text-muted)]">
                  Poslední menu
                </p>
              </div>
              <div className="max-h-[420px] overflow-y-auto">
                {recentMenus === undefined ? (
                  <p className="px-5 py-4 text-xs text-[var(--color-text-muted)]">
                    Načítání...
                  </p>
                ) : recentMenus.length === 0 ? (
                  <p className="px-5 py-6 text-xs text-[var(--color-text-muted)]">
                    Zatím žádné menu.
                  </p>
                ) : (
                  <ul className="divide-y divide-[var(--color-stone)]/40">
                    {recentMenus.map((menu) => {
                      const active = menu.date === date;
                      return (
                        <li
                          key={menu._id}
                          className={cn(
                            "group flex items-center justify-between gap-2 px-5 py-3 transition-colors",
                            active
                              ? "bg-[var(--color-ivory)]"
                              : "hover:bg-[var(--color-ivory)]/50"
                          )}
                        >
                          <button
                            onClick={() => {
                              setDate(menu.date);
                              setShowHistory(false);
                            }}
                            className="flex-1 text-left min-w-0"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "w-1.5 h-1.5 rounded-full shrink-0",
                                  menu.isPublished ? "bg-green-500" : "bg-amber-400"
                                )}
                              />
                              <span
                                className={cn(
                                  "text-sm truncate",
                                  active
                                    ? "text-[var(--color-charcoal)] font-medium"
                                    : "text-[var(--color-charcoal)]/80"
                                )}
                              >
                                {formatDate(menu.date)}
                              </span>
                              <span className="text-[10px] text-[var(--color-text-muted)] tabular-nums">
                                v{menu.version || 1}
                              </span>
                            </div>
                            <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5 truncate pl-3.5">
                              {menu.soup}
                            </p>
                          </button>
                          <button
                            onClick={() => handleDelete(menu._id)}
                            className="shrink-0 p-1.5 text-[var(--color-text-muted)]/60 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                            aria-label="Smazat menu"
                          >
                            <HugeiconsIcon
                              icon={Delete02Icon}
                              size={14}
                              strokeWidth={1.5}
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

            {/* Allergen reference */}
            <div className="bg-white border border-[var(--color-stone)]/60 p-5">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-text-muted)] mb-3 flex items-center gap-1.5">
                <HugeiconsIcon
                  icon={AlertCircleIcon}
                  size={12}
                  strokeWidth={1.5}
                />
                Alergeny — přehled
              </p>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-[var(--color-text-muted)]">
                {ALLERGEN_LIST.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Bottom action bar */}
        <div className="sticky bottom-0 -mx-5 sm:-mx-8 lg:-mx-12 -mb-8 lg:-mb-10 mt-10 px-5 sm:px-8 lg:px-12 py-4 bg-white/95 backdrop-blur-md border-t border-[var(--color-stone)]">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <label className="inline-flex items-center gap-3 cursor-pointer select-none">
              <span className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="sr-only peer"
                />
                <span className="w-10 h-5 bg-[var(--color-stone)] peer-checked:bg-[var(--color-gold)] transition-colors rounded-full" />
                <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-[var(--color-charcoal)] inline-flex items-center gap-1.5">
                  <HugeiconsIcon
                    icon={Sent02Icon}
                    size={14}
                    strokeWidth={1.5}
                    className={
                      isPublished
                        ? "text-[var(--color-gold-dark)]"
                        : "text-[var(--color-text-muted)]"
                    }
                  />
                  Publikovat na web
                </p>
                <p className="text-[11px] text-[var(--color-text-muted)] leading-tight">
                  {isPublished
                    ? "Menu bude viditelné hostům"
                    : "Uloženo jako koncept"}
                </p>
              </div>
            </label>

            <div className="flex items-center gap-3 flex-wrap">
              {message && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 text-xs tracking-wide",
                    message.kind === "ok" ? "text-green-700" : "text-red-600"
                  )}
                >
                  <HugeiconsIcon
                    icon={message.kind === "ok" ? Tick02Icon : AlertCircleIcon}
                    size={14}
                    strokeWidth={1.5}
                  />
                  {message.text}
                </span>
              )}
              <button
                onClick={() => setShowPreview(true)}
                disabled={!soup}
                className="inline-flex items-center gap-2 px-5 py-3 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-[11px] tracking-[0.2em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <HugeiconsIcon icon={EyeIcon} size={14} strokeWidth={1.5} />
                Náhled
                <span className="text-[var(--color-text-muted)] group-hover:text-white">
                  /
                </span>
                <HugeiconsIcon icon={Pdf01Icon} size={14} strokeWidth={1.5} />
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-charcoal)] text-white text-[11px] tracking-[0.2em] uppercase hover:bg-[var(--color-gold)] transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Ukládání
                  </>
                ) : (
                  <>
                    <HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={1.5} />
                    Uložit menu
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {showPreview && (
        <DailyMenuPreview
          menu={{
            date,
            soup,
            soupDescription: soupDescription || undefined,
            soupAllergens: soupAllergens || undefined,
            soupPrice,
            items: items.filter((i) => i.name.trim() !== ""),
            dessert: dessert || undefined,
            dessertDescription: dessertDescription || undefined,
            dessertAllergens: dessertAllergens || undefined,
            dessertPrice: dessertPrice || undefined,
            drinks: drinks.filter((d) => d.name.trim() !== ""),
          }}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}
