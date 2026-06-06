import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { DailyMenuData } from "./DailyMenuPDF";

// Font and design match the restaurant's printed menu
// (public/MENU_FINAL 21.3._TISK_TEST.pdf), which uses Cinzel Regular + Bold
// in near-black on a white page with no decorative borders or ornaments.
//
// Static TTFs are self-hosted in /public/fonts and bundle latin + latin-ext
// subsets per file (needed for Czech diacritics — see the earlier comment
// block in DailyMenuPDF.tsx for the full rationale).
const CINZEL_REGULAR = "/fonts/Cinzel-Regular.ttf";
const CINZEL_BOLD = "/fonts/Cinzel-Bold.ttf";

Font.register({
  family: "Cinzel",
  fonts: [
    { src: CINZEL_REGULAR, fontWeight: 400 },
    { src: CINZEL_BOLD, fontWeight: 700 },
  ],
});

// Disable hyphenation — the default engine can split Czech words at codepoint
// boundaries and corrupt diacritic layout even when the glyphs exist.
Font.registerHyphenationCallback((word) => [word]);

// Colors sampled from the reference PDF: 100% K (pure black) for emphasized
// elements and rich-black (CMYK 0.71/0.65/0.58/0.75 ≈ #14181C) for body. We
// flatten to a single charcoal since the visible difference is negligible
// when rendered on screen / printed at 1:1.
const ink = "#1C1C1C";

// Spacing is tight by design so a typical 4-section daily menu fits on a
// single A4 page. Frames are absolutely positioned and `fixed`, so the borders
// repeat correctly on every page when content does overflow — they no longer
// get sliced by a page break.
const s = StyleSheet.create({
  page: {
    fontFamily: "Cinzel",
    backgroundColor: "#FFFFFF",
    color: ink,
    paddingTop: 56,
    paddingBottom: 50,
    paddingHorizontal: 70,
  },
  // Outer border frame — drawn on every page at fixed coordinates
  pageFrameOuter: {
    position: "absolute",
    top: 28,
    left: 28,
    right: 28,
    bottom: 28,
    borderWidth: 0.7,
    borderColor: ink,
  },
  // Inner border frame — second thin rule for the classic nested look
  pageFrameInner: {
    position: "absolute",
    top: 36,
    left: 36,
    right: 36,
    bottom: 36,
    borderWidth: 0.4,
    borderColor: ink,
  },
  // Date subtitle at the top
  dateLine: {
    fontSize: 8,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: ink,
    textAlign: "center",
    marginBottom: 18,
  },
  // Section heading — POLÉVKA / HLAVNÍ CHOD / DEZERT / NÁPOJE
  sectionHeader: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 4,
    textTransform: "uppercase",
    textAlign: "center",
    color: ink,
    marginBottom: 12,
  },
  // Vertical breathing room before each section *after* the first
  sectionGap: {
    height: 16,
  },
  // Wrapper around a single dish
  itemBlock: {
    marginBottom: 12,
  },
  // Item name — Cinzel Regular ~14pt, centered, uppercase
  itemName: {
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    textAlign: "center",
    color: ink,
    marginBottom: 4,
    lineHeight: 1.3,
  },
  // Description — Cinzel Regular, slightly looser leading
  itemDesc: {
    fontSize: 10.5,
    fontWeight: 400,
    letterSpacing: 0.6,
    textAlign: "center",
    color: ink,
    lineHeight: 1.45,
    marginBottom: 2,
  },
  // Allergens in parentheses
  itemAllergens: {
    fontSize: 9,
    fontWeight: 400,
    letterSpacing: 0.5,
    textAlign: "center",
    color: ink,
    marginTop: 1,
    marginBottom: 2,
  },
  // Vegetarian tag
  veg: {
    fontSize: 8.5,
    fontWeight: 700,
    textAlign: "center",
    color: ink,
    marginTop: 1,
  },
  // Decorated price row — "—— 295 Kč ——"
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  priceRule: {
    width: 38,
    height: 0.6,
    backgroundColor: ink,
  },
  priceText: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.8,
    textAlign: "center",
    color: ink,
    marginHorizontal: 9,
  },
  // Footer
  footerWrap: {
    marginTop: 16,
    paddingTop: 10,
    textAlign: "center",
  },
  footerText: {
    fontSize: 6.5,
    fontWeight: 400,
    color: ink,
    lineHeight: 1.6,
    textAlign: "center",
    marginBottom: 4,
  },
});

function formatAllergens(allergens?: string): string | null {
  if (!allergens || !allergens.trim()) return null;
  return `(${allergens.trim()})`;
}

function PriceLine({ price }: { price: number }) {
  return (
    <View style={s.priceRow}>
      <View style={s.priceRule} />
      <Text style={s.priceText}>{price} Kč</Text>
      <View style={s.priceRule} />
    </View>
  );
}

interface ItemFields {
  name: string;
  description?: string;
  allergens?: string;
  price: number;
  isVegetarian?: boolean;
}

// Renders a single dish block (name → description → allergens → vegetarian
// tag → price). Used both inside and outside of the section-header bundle.
function ItemBlock({ item }: { item: ItemFields }) {
  const allergens = formatAllergens(item.allergens);
  return (
    <View style={s.itemBlock} wrap={false}>
      <Text style={s.itemName}>{item.name}</Text>
      {item.description ? (
        <Text style={s.itemDesc}>{item.description}</Text>
      ) : null}
      {allergens ? <Text style={s.itemAllergens}>{allergens}</Text> : null}
      {item.isVegetarian ? <Text style={s.veg}>(V)</Text> : null}
      <PriceLine price={item.price} />
    </View>
  );
}

// Renders a section. The heading is bundled with the first item inside a
// `wrap={false}` View so the heading never lands alone at the bottom of a
// page. Subsequent items are independent wrap={false} blocks so the section
// can still split across pages cleanly when it's long.
function Section({
  title,
  items,
  isFirst,
}: {
  title: string;
  items: ItemFields[];
  isFirst: boolean;
}) {
  if (items.length === 0) return null;
  const [first, ...rest] = items;
  return (
    <View>
      {!isFirst && <View style={s.sectionGap} />}
      <View wrap={false}>
        <Text style={s.sectionHeader}>{title}</Text>
        <ItemBlock item={first} />
      </View>
      {rest.map((item, i) => (
        <ItemBlock key={i} item={item} />
      ))}
    </View>
  );
}

export function DailyMenuPDFDocument({ menu }: { menu: DailyMenuData }) {
  const formatted = new Date(menu.date + "T12:00:00").toLocaleDateString(
    "cs-CZ",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  // Build the section list in display order, skipping empty ones. The first
  // present section gets no top spacer; the rest each get a small gap above.
  const builtSections: Array<{ title: string; items: ItemFields[] }> = [];
  if (menu.soup) {
    builtSections.push({
      title: "Polévka",
      items: [
        {
          name: menu.soup,
          description: menu.soupDescription,
          allergens: menu.soupAllergens,
          price: menu.soupPrice,
        },
      ],
    });
  }
  if (menu.items.length > 0) {
    builtSections.push({ title: "Hlavní chod", items: menu.items });
  }
  if (menu.dessert && typeof menu.dessertPrice === "number") {
    builtSections.push({
      title: "Dezert",
      items: [
        {
          name: menu.dessert,
          description: menu.dessertDescription,
          allergens: menu.dessertAllergens,
          price: menu.dessertPrice,
        },
      ],
    });
  }
  if (menu.drinks && menu.drinks.length > 0) {
    builtSections.push({ title: "Nápoje", items: menu.drinks });
  }

  return (
    <Document
      title={`Denní menu — ${formatted}`}
      author="Restaurace Adéla"
    >
      <Page size="A4" style={s.page}>
        {/* Frames are `fixed` so they repeat on every page at the same coords
            instead of being part of the content flow (which would slice them
            at each page break). */}
        <View fixed style={s.pageFrameOuter} />
        <View fixed style={s.pageFrameInner} />

        <Text style={s.dateLine}>Denní nabídka — {formatted}</Text>

        {builtSections.map((sec, i) => (
          <Section
            key={sec.title}
            title={sec.title}
            items={sec.items}
            isFirst={i === 0}
          />
        ))}

        {/* Footer — allergen reference and disclaimer */}
        <View style={s.footerWrap}>
          <Text style={s.footerText}>
            1 — obiloviny · 2 — korýši · 3 — vejce · 4 — ryby · 5 — arašídy · 6 — sója · 7 — mléko · 8 — skořápkové plody · 9 — celer · 10 — hořčice · 11 — sezam · 12 — oxid siřičitý · 13 — vlčí bob · 14 — měkkýši
          </Text>
          <Text style={s.footerText}>(V) — vegetariánské</Text>
          <Text style={s.footerText}>
            Informujte nás prosím o případných alergiích.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
