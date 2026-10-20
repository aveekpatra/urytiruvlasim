/**
 * Full restaurant menu data — sourced from the official printed menu PDFs.
 * Page 1 (STRANA 1): Drinks / Nápojový lístek
 * Page 2 (STRANA 2): Food / Jídelní lístek
 */

export interface FullMenuItem {
  name: string;
  description?: string;
  allergens?: string;
  weight?: string;
  price: number;
  isVegetarian?: boolean;
}

export interface DrinkItem {
  name: string;
  volume?: string;
  note?: string;
  price: number;
}

export interface SideItem {
  name: string;
  price: number;
}

export interface WineItem {
  name: string;
  classification: string;
  taste: string;
  price: number;
}

// ────────────────────────────────────────────────────────────────────
//  FOOD MENU  (Jídelní lístek — page 2)
// ────────────────────────────────────────────────────────────────────

export const PREDKRMY: FullMenuItem[] = [
  {
    name: "Míchaný tatarský biftek z pravé svíčkové",
    description: "Topinky 3 ks",
    allergens: "1,3",
    weight: "150g",
    price: 349,
  },
  {
    name: "Grilovaný kozí sýr ve slanině",
    description: "Rukolový salát s brusinkami, domácí focaccia",
    allergens: "1,7",
    weight: "100g",
    price: 179,
  },
  {
    name: "Domácí pomazánka z pečeného bůčku",
    description: "Rozpečený chléb",
    allergens: "1",
    weight: "100g",
    price: 119,
  },
];

export const POLEVKY: FullMenuItem[] = [
  {
    name: "Silný vývar z hovězích líček",
    description: "Kořenová zelenina, celestýnské nudle",
    allergens: "1,3,9",
    price: 85,
  },
  {
    name: "Zámecká cibulačka se slaninou",
    description: "Vídeňská cibulka, bylinkové krutony",
    allergens: "1,3,7",
    price: 89,
  },
];

export const SALATY: FullMenuItem[] = [
  {
    name: "Caesar salát s kuřecím masem",
    description: "Římský salát, slanina, krutony a parmazán",
    allergens: "1,3,7",
    weight: "300g",
    price: 289,
  },
  {
    name: "Salát s grilovaným kozím sýrem",
    description:
      "Listové saláty, červená řepa, vlašské ořechy a medový dresink, focaccia",
    allergens: "1,7,8,10",
    weight: "300g",
    price: 299,
  },
];

export const HOVEZI_MASO: FullMenuItem[] = [
  {
    name: "Steak z pravé svíčkové",
    description: "Domácí hranolky, pepřová omáčka",
    allergens: "1,7",
    weight: "250g",
    price: 595,
  },
  {
    name: "Hovězí nudličky z pravé svíčkové",
    description: "S restovanou zeleninou, jasmínová rýže",
    allergens: "1,6",
    weight: "150g",
    price: 395,
  },
  {
    name: "Hovězí burger",
    description:
      "Čedar, slanina, karamelizovaná cibule, slaninová majonéza, hranolky",
    allergens: "1,3,7,11",
    weight: "180g",
    price: 335,
  },
];

export const VEPROVE_MASO: FullMenuItem[] = [
  {
    name: "Steak z pečeně Duroc",
    description: "Sázené vejce, slaninový chips, domácí hranolky",
    allergens: "1,3",
    weight: "250g",
    price: 345,
  },
  {
    name: 'Na másle smažený řízek „Tomahawk"',
    description: "Vařené brambory s máslem a petrželkou",
    allergens: "1,3,7,10",
    weight: "350g",
    price: 295,
  },
  {
    name: "Medailonky z vepřové panenky",
    description:
      "Slaninové fazolky s česnekem, omáčka z italské gorgonzoly",
    allergens: "1,7",
    weight: "200g",
    price: 339,
  },
  {
    name: "Konfitovaná vepřová líčka",
    description: "Hříbková omáčka, restované špecle na másle",
    allergens: "1,3,7,10",
    weight: "200g",
    price: 310,
  },
];

export const DRUBEZI_MASO_A_RYBY: FullMenuItem[] = [
  {
    name: "Kuřecí prso se smetanovo-liškovou omáčkou",
    description: "Domácí bramborové placky",
    allergens: "1,3,7",
    weight: "200g",
    price: 310,
  },
  {
    name: "Pomalu pečené kachní stehno",
    description: "Karlovarský špalíček, červené brusinkové zelí",
    allergens: "7",
    weight: "300g",
    price: 349,
  },
  {
    name: "Grilovaný candát",
    description:
      "Gratinované brambory s kořenovou zeleninou, citronová omáčka",
    allergens: "4,7,9",
    weight: "200g",
    price: 380,
  },
];

export const VEGETARIANSKA_JIDLA: FullMenuItem[] = [
  {
    name: "Linguine s restovanou cuketou",
    description: "Nakládaná šalotka v bazalkové omáčce",
    allergens: "1",
    weight: "300g",
    price: 249,
    isVegetarian: true,
  },
  {
    name: "Bramborové noky v omáčce z italské gorgonzoly",
    description: "Smažená rukola",
    allergens: "1,3,7",
    weight: "300g",
    price: 265,
    isVegetarian: true,
  },
];

export const DETSKA_JIDLA: FullMenuItem[] = [
  {
    name: "Linguine s boloňskou omáčkou",
    description: "Parmazán",
    allergens: "1,3",
    weight: "200g",
    price: 169,
  },
  {
    name: "Kuřecí řízek",
    description: "Vařené brambory",
    allergens: "1,3,7",
    weight: "100g",
    price: 179,
  },
];

export const PRILOHY: SideItem[] = [
  { name: "Vařené brambory", price: 45 },
  { name: "Šťouchané brambory", price: 50 },
  { name: "Bramborové placky", price: 65 },
  { name: "Domácí hranolky", price: 65 },
  { name: "Jasmínová rýže", price: 50 },
  { name: "Grilovaná zelenina", price: 85 },
  { name: "Fazolky se slaninou", price: 85 },
  { name: "Miska čerstvé zeleniny", price: 90 },
];

export const OMACKY_STUDENE: SideItem[] = [
  { name: "Tatarská omáčka", price: 45 },
  { name: "Slaninový dip", price: 55 },
  { name: "Kečup", price: 35 },
];

export const OMACKY_TEPLE: SideItem[] = [
  { name: "Lišková omáčka", price: 65 },
  { name: "Pepřová omáčka", price: 65 },
  { name: "Demi glace", price: 55 },
  { name: "Omáčka z modrého sýru", price: 65 },
  { name: "Hříbková omáčka", price: 65 },
];

export const DEZERTY: FullMenuItem[] = [
  {
    name: "Čokoládový fondant",
    description:
      "Jahodová zmrzlina, zakysaná smetana a čerstvé ovoce",
    allergens: "1,3,7",
    price: 189,
  },
  {
    name: "Karamelové Crème brûlée",
    description: "Křehká krusta, čerstvé ovoce",
    allergens: "3,7",
    price: 159,
  },
  {
    name: "Dukátová buchta",
    description: "Vanilková omáčka s višněmi",
    allergens: "1,3,7",
    price: 149,
  },
  {
    name: "Zmrzlinový pohár",
    description: "Lesní ovoce, šlehačka",
    allergens: "1,3,7,12",
    price: 179,
  },
  {
    name: "Horké maliny",
    description: "Vanilková zmrzlina se šlehačkou",
    allergens: "3,7",
    price: 169,
  },
  {
    name: "Kopeček zmrzliny",
    allergens: "7",
    price: 49,
  },
];

// ────────────────────────────────────────────────────────────────────
//  DRINKS MENU  (Nápojový lístek — page 1)
// ────────────────────────────────────────────────────────────────────

export const NEALKO: DrinkItem[] = [
  { name: "Mattoni", volume: "0,33 l", note: "Neperlivá / jemně perlivá", price: 45 },
  { name: "Stolní voda", volume: "1,0 l", note: "Džbán, led, citron", price: 65 },
  { name: "Stolní voda", volume: "0,5 l", note: "Neperlivá / perlivá", price: 35 },
  { name: "Domácí limonáda", volume: "0,5 l", price: 75 },
  { name: "Poctivá kola", volume: "0,1 l", price: 10 },
  { name: "Pepsi Cola / Pepsi Zero", volume: "0,25 l", price: 50 },
  { name: "7UP", volume: "0,25 l", price: 50 },
  { name: "Mirinda", volume: "0,25 l", price: 50 },
  { name: "Schweppes", volume: "0,25 l", note: "Classic / Ginger / Pink", price: 50 },
  { name: "Džus Granini", volume: "0,25 l", note: "Jahoda / Pomeranč / Jablko / Grapefruit", price: 50 },
  { name: "Ledový čaj", volume: "0,25 l", price: 50 },
];

export const NEALKO_APERITIVY: DrinkItem[] = [
  { name: "Crodino", volume: "0,1 l", price: 65 },
];

export const APERITIVY: DrinkItem[] = [
  { name: "Cinzano Bianco", volume: "0,1 l", price: 65 },
  { name: "Cinzano Rosso", volume: "0,1 l", price: 65 },
  { name: "Martini Dry", volume: "0,1 l", price: 70 },
  { name: "Campari", volume: "0,05 l", price: 65 },
];

export const PIVO_TOCENE: DrinkItem[] = [
  { name: "Pilsner Urquell 12°", volume: "0,5 l", price: 65 },
  { name: "Pilsner Urquell 12°", volume: "0,3 l", price: 45 },
];

export const PIVO_LAHVOVE: DrinkItem[] = [
  { name: "Birell – světlé", volume: "0,33 l", price: 45 },
  { name: "Birell – Pomelo & Grep", volume: "0,33 l", price: 45 },
];

export const ROZLEVANA_VINA: DrinkItem[] = [
  { name: "Bílé víno", volume: "0,1 l", price: 50 },
  { name: "Červené víno", volume: "0,1 l", price: 50 },
  { name: "Prosecco", volume: "0,1 l", price: 65 },
];

export const LIKERY: DrinkItem[] = [
  { name: "Griotte", volume: "0,04 l", price: 45 },
  { name: "Becherovka", volume: "0,04 l", price: 60 },
  { name: "Jägermeister", volume: "0,04 l", price: 65 },
  { name: "Medovina", volume: "0,04 l", price: 45 },
];

export const WHISKEY: DrinkItem[] = [
  { name: "Jameson", volume: "0,04 l", price: 80 },
  { name: "Jack Daniels", volume: "0,04 l", price: 85 },
  { name: "Jack Daniels Honey", volume: "0,04 l", price: 85 },
  { name: "Jack Daniels Barell", volume: "0,04 l", price: 120 },
  { name: "Glenlivet 12YO", volume: "0,04 l", price: 140 },
  { name: "Dalwhinie 15YO", volume: "0,04 l", price: 165 },
];

export const DESTILATY: DrinkItem[] = [
  { name: "Zelená Bartida", volume: "0,04 l", price: 45 },
  { name: "Myslivec", volume: "0,04 l", price: 50 },
  { name: "Bacardi", volume: "0,04 l", price: 60 },
  { name: "Rum Diplomático", volume: "0,04 l", price: 135 },
  { name: "Rum Bumbu", volume: "0,04 l", price: 130 },
  { name: "Rum Bumbu Crema", volume: "0,04 l", price: 90 },
  { name: "Blue Mauricius", volume: "0,04 l", price: 165 },
  { name: "Vodka Finlandia", volume: "0,04 l", price: 65 },
  { name: "Grey Goose", volume: "0,04 l", price: 110 },
  { name: "Gin Gordons", volume: "0,04 l", price: 60 },
  { name: "Gin Mare", volume: "0,04 l", price: 105 },
  { name: "Slivovice Bartida", volume: "0,04 l", price: 85 },
  { name: "Hruškovice Bartida", volume: "0,04 l", price: 85 },
  { name: "Sierra Tequila Antiguo Plata", volume: "0,04 l", price: 75 },
];

export const KONAKY: DrinkItem[] = [
  { name: "Metaxa 7*", volume: "0,04 l", price: 85 },
  { name: "Cognac Frapin 1270", volume: "0,04 l", price: 140 },
  { name: "Frapin VSOP", volume: "0,04 l", price: 205 },
  { name: "Armagnac VS", volume: "0,04 l", price: 195 },
];

export const MICHANE_NAPOJE: DrinkItem[] = [
  {
    name: "Americká limonáda",
    volume: "0,4 l",
    note: "Kompotované ovoce, grenadina, pomerančový džus, soda, led (nealkoholické)",
    price: 125,
  },
  {
    name: "Virgin Mojito",
    volume: "0,4 l",
    note: "Tonic, ginger, máta, limety, třtinový cukr, led (nealkoholické)",
    price: 140,
  },
  { name: "Aperol Spritz", volume: "0,33 l", price: 155 },
  { name: "Mojito", volume: "0,4 l", price: 165 },
];

export const TEPLE_NAPOJE: DrinkItem[] = [
  { name: "Turecká káva", price: 55 },
  { name: "Espresso", price: 65 },
  { name: "Espresso Lungo", price: 65 },
  { name: "Espresso Macchiato", price: 70 },
  { name: "Cappuccino", price: 79 },
  { name: "Americano", price: 70 },
  { name: "Caffé Latté", price: 85 },
  { name: "Flat White", price: 75 },
  { name: "Babyccino pro děti", price: 35 },
  { name: "Čaj v konvičce", note: "Výběr z čajů Dallmayr, med, citron", price: 70 },
  { name: "Čaj čerstvý", note: "Máta / zázvor", price: 90 },
  { name: "Horká griotka", price: 70 },
  { name: "Svařené víno", price: 80 },
  { name: "Grog", price: 75 },
];

// ────────────────────────────────────────────────────────────────────
//  WINE LIST  (Vinařství Buchtovi)
// ────────────────────────────────────────────────────────────────────

export const BILA_VINA: WineItem[] = [
  { name: "Veltlínské zelené", classification: "VOC Vinice Velké Pavlovice | Vinařství Buchtovi", taste: "suché", price: 419 },
  { name: "Ryzlink rýnský 2023", classification: "výběr z hroznů | Vinařství Buchtovi", taste: "suché", price: 489 },
  { name: "Rulandské šedé 2023", classification: "výběr z hroznů | Vinařství Buchtovi", taste: "suché", price: 349 },
  { name: "Sauvignon 2023", classification: "pozdní sběr | Vinařství Buchtovi", taste: "polosuché", price: 429 },
  { name: "Tramín červený", classification: "VOC Vinice Velké Pavlovice | Vinařství Buchtovi", taste: "polosuché", price: 439 },
  { name: "Chardonnay 2022", classification: "pozdní sběr | Vinařství Buchtovi", taste: "polosladké", price: 489 },
  { name: "Pálava 2023", classification: "výběr z hroznů | Vinařství Buchtovi", taste: "polosladké", price: 499 },
  { name: "Pálava 2024", classification: "výběr z hroznů | Vinařství Buchtovi", taste: "polosladké", price: 359 },
];

export const CERVENA_VINA: WineItem[] = [
  { name: "Cabernet Moravia 2021", classification: "jakostní | Vinařství Buchtovi", taste: "suché", price: 359 },
  { name: "Dunaj 2023", classification: "výběr z hroznů | Vinařství Buchtovi", taste: "suché", price: 489 },
];

export const RUZOVE_VINO: WineItem[] = [
  { name: "Cabernet Moravia Rosé 2023", classification: "pozdní sběr | Vinařství Buchtovi", taste: "polosuché", price: 389 },
];

export const SUMIVA_VINA: WineItem[] = [
  { name: "Muškát moravský", classification: "Frizzante | Vinařství Buchtovi", taste: "polosladké", price: 359 },
  { name: "Ryzlink rýnský SEKT", classification: "charmat | Vinařství Buchtovi", taste: "Brut", price: 489 },
];

// ────────────────────────────────────────────────────────────────────
//  NOTES & ALLERGENS
// ────────────────────────────────────────────────────────────────────

export const ALLERGEN_LIST =
  "1 — obiloviny, 2 — korýši, 3 — vejce, 4 — ryby, 5 — arašídy, 6 — sója, 7 — mléko, 8 — skořápkové plody, 9 — celer, 10 — hořčice, 11 — sezam, 12 — oxid siřičitý, 13 — vlčí bob, 14 — měkkýši";

export const MENU_NOTES = [
  "Za poloviční porci jídla účtujeme 75 % z ceny.",
  "Při změně přílohy účtován doplatek 20 Kč.",
  "Standardní čekací doba na jídlo je 25 min.",
];
