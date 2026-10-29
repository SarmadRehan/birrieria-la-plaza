import { locations, shop } from "@/data/laPlaza";

// "Pregúntale a La Plaza / Ask La Plaza" is scripted: keyword matching (English and Spanish) over fixed
// answers from the brief, replied in the language the guest picked. There is no AI model, no API key and no
// network call. Hours, prices, allergies and anything it can't match get the brief's fallback, so it never
// states an hour, a price or an allergy claim.

export type Lang = "en" | "es";

export type BotAction = "cater" | "order" | "menu" | "locations" | "contact";

export type BotLink = { label: string; href: string };

export type BotReply = {
  text: string;
  action?: BotAction;
  /** Real pages (Google Maps listings), shown as links under the reply. */
  links?: BotLink[];
  /** Run the action by itself after the reply (scroll to the form or open a panel), not just offer it. */
  auto?: boolean;
};

export type Suggestion = { label: string; question: string };

export const suggestions: Record<Lang, Suggestion[]> = {
  en: [
    { label: "Where are you?", question: "Where are you?" },
    { label: "Order online", question: "Can I order online?" },
    { label: "What's birria?", question: "What's birria?" },
    { label: "Plaza Plate", question: "What's the Plaza Plate?" },
    { label: "Vegetarian", question: "Do you have vegetarian options?" },
    { label: "Catering", question: "Do you do catering or big orders?" },
    { label: "Hours", question: "What are your hours?" },
  ],
  es: [
    { label: "¿Dónde están?", question: "¿Dónde están?" },
    { label: "Pedir en línea", question: "¿Puedo pedir en línea?" },
    { label: "¿Qué es la birria?", question: "¿Qué es la birria?" },
    { label: "Plato La Plaza", question: "¿Qué trae el Plato La Plaza?" },
    { label: "Vegetariano", question: "¿Tienen opciones vegetarianas?" },
    { label: "Catering", question: "¿Hacen catering o pedidos grandes?" },
    { label: "Horario", question: "¿Cuál es su horario?" },
  ],
};

const mapsLinks = (lang: Lang): BotLink[] =>
  locations.map((location) => ({
    label: lang === "en" ? `${location.name} on Google Maps` : `${location.name} en Google Maps`,
    href: location.mapsUrl,
  }));

const [foster, flock] = locations;

const replies = {
  hello: {
    en: { text: "¡Hola! Ask me where we are, how to order online, about the menu or catering." },
    es: { text: "¡Hola! Pregúntame dónde estamos, cómo pedir en línea, del menú o del catering." },
  },
  where: {
    en: {
      text: `Two spots: our cart at ${foster.name} (${foster.street}) and our stall downtown at Flock (${flock.street}).`,
      action: "locations",
    },
    es: {
      text: `Dos lugares: nuestro carrito en ${foster.name} (${foster.street}) y nuestro puesto en Flock, en el centro (${flock.street}).`,
      action: "locations",
    },
  },
  order: {
    en: { text: "Yes! Pick your location: the Foster cart takes orders on Square, downtown at Flock on Toast.", action: "order" },
    es: { text: "¡Sí! Elige tu lugar: el carrito de Foster recibe pedidos por Square y el del centro (Flock) por Toast.", action: "order" },
  },
  birria: {
    en: { text: "Beef slow-cooked for 4 hours in a chile broth from our family's 3-generation recipe, served with consomé for dipping." },
    es: { text: "Res cocida lentamente por 4 horas en un caldo de chiles, con la receta de 3 generaciones de nuestra familia, servida con consomé para remojar." },
  },
  plazaPlate: {
    en: { text: "One quesadilla, one mulita, one taco and one tostada, plus consomé to dip.", action: "menu" },
    es: { text: "Una quesadilla, una mulita, un taco y una tostada, más consomé para remojar.", action: "menu" },
  },
  // Not the brief's wording: their Square menu says the cheese quesadilla is fried in beef tallow, so Sarmad
  // chose to leave it out and say how the tortillas are usually cooked.
  vegetarian: {
    en: {
      text: "Try the bean burrito or veg burrito. Our tortillas are usually cooked in beef tallow, so ask us how yours is made.",
      action: "contact",
    },
    es: {
      text: "Prueba el burrito de frijoles o el burrito vegetariano. Nuestras tortillas normalmente se cocinan con sebo de res, así que pregúntanos cómo se prepara el tuyo.",
      action: "contact",
    },
  },
  cater: {
    en: { text: "Taco packs and catering available. Tell us about your event.", action: "cater", auto: true },
    es: { text: "Tenemos paquetes de tacos y catering. Cuéntanos de tu evento.", action: "cater", auto: true },
  },
  menu: {
    en: { text: "Platos, tacos and quesatacos, quesadillas and vampiros, burritos, birria en caldo, consomé and birria by the pound.", action: "menu" },
    es: { text: "Platos, tacos y quesatacos, quesadillas y vampiros, burritos, birria en caldo, consomé y birria por libra.", action: "menu" },
  },
  // The brief: hours are never stated (their listings conflict). Point to each Google Maps listing.
  hours: {
    en: { text: `Check today's hours on Google, or DM @${shop.instagramHandle} / call ${shop.phone}.`, links: mapsLinks("en") },
    es: { text: `Revisa el horario de hoy en Google, o mándanos DM a @${shop.instagramHandle} / llama al ${shop.phone}.`, links: mapsLinks("es") },
  },
  thanks: {
    en: { text: "¡Gracias! Enjoy your birria." },
    es: { text: "¡Gracias a ti! Que disfrutes tu birria." },
  },
  fallback: {
    en: { text: `Great question! Check today's hours on Google, or DM @${shop.instagramHandle} / call ${shop.phone}.`, action: "contact", auto: true },
    es: { text: `¡Buena pregunta! Revisa el horario en Google, o mándanos DM a @${shop.instagramHandle} / llama al ${shop.phone}.`, action: "contact", auto: true },
  },
} satisfies Record<string, Record<Lang, BotReply>>;

type Topic = keyof typeof replies;

// Checked in order, on text with accents removed. Prices, allergies and special diets go straight to the
// fallback, even inside a menu or catering question, so "how much is a taco pack" or "is the consomé
// gluten-free" is never answered here. Hours come next, so "when do you open downtown" gets the Maps links
// rather than the addresses. Catering wins over ordering ("order 50 tacos for a party"), and menu items over the birria explainer
// ("birria ramen", "birria by the pound").
const rules: { topic: Topic; pattern: RegExp }[] = [
  // A bare greeting only, so "hola, do you cater?" still reaches the catering answer.
  { topic: "hello", pattern: /^(hi|hey|hello|hola|buenas|buenos dias|buenas tardes|buenas noches|que tal|good (morning|afternoon|evening))( there)?$/ },
  {
    topic: "fallback",
    pattern:
      /\b(prices?|pricing|cost|costs|how much|cuanto|cuesta|cuestan|precios?|cobran|rates?|fees?|deposits?|minimums?|budget|cheap|expensive|deals?|happy hour|specials?|allerg\w*|alergi\w*|gluten|celiac|nuts?|peanuts?|cacahuates?|nueces|dairy|lacteos?|lactose|lactosa|eggs?|huevos?|sesame|soy|soya|shellfish|vegan\w*|plant[- ]based|halal|kosher|calories|calorias|spicy|picante|pica|deliver\w*|entrega\w*|a domicilio|doordash|uber ?eats|grubhub|jobs?|hiring|trabajo|empleo|gift cards?)\b/,
  },
  {
    topic: "hours",
    pattern: /\b(hours?|horarios?|horas?|open|opens|opening|abren|abierto|abiertos|close|closes|closing|cierran|cerrado|what time|que hora|a que hora|today|hoy|tonight|late|tarde|noche)\b/,
  },
  {
    topic: "cater",
    pattern:
      /\b(cater\w*|banquetes?|events?|eventos?|party|parties|fiestas?|weddings?|bodas?|quinceaneras?|quince|xv|birthdays?|cumpleanos|office|oficina|corporate|large orders?|big orders?|pedidos? grandes?|taco packs?|paquetes?|trays?|charolas?|bulk)\b/,
  },
  {
    topic: "order",
    pattern: /\b(order\w*|online|en linea|pedir|pedido|ordenar|orden|square|toast|pick ?up|recoger|para llevar|takeout|take out|to go|app)\b/,
  },
  {
    topic: "where",
    pattern:
      /\b(where|wheres|donde|location|locations|ubicacion\w*|located|address|direccion|direcciones|directions|foster|flock|downtown|centro|alder|cart|carrito|lonchera|truck|food hall|find you|near)\b/,
  },
  { topic: "vegetarian", pattern: /\b(vegetarian\w*|vegetarianas?|vegetarianos?|veggie|veg|meatless|sin carne|no meat|beans only|frijoles)\b/ },
  { topic: "plazaPlate", pattern: /\b(plaza plate|plato la plaza|plato de la plaza|plaza)\b/ },
  {
    topic: "menu",
    pattern:
      /\b(menu|food|comida|eat|comer|dish(es)?|platos?|tacos?|quesatacos?|quesabirria|quesadillas?|vampiros?|mulitas?|tostadas?|burritos?|bowls?|caldo|consome|consomme|ramen|nachos?|fries|papas|by the pound|libra|kids|ninos|drinks?|bebidas?|jarritos?|coffee|cafe)\b/,
  },
  { topic: "birria", pattern: /\b(birria|recipe|receta|beef|res|chile|chiles|how is it made|como se hace)\b/ },
  { topic: "thanks", pattern: /\b(thanks|thank you|thx|ty|gracias|muchas gracias)\b/ },
];

export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’'¿¡?!]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function greeting(lang: Lang): BotReply {
  return lang === "en"
    ? { text: "¡Hola! I'm La Plaza's helper. Ask about our two locations, ordering online, the menu or catering. Tap a question or type your own." }
    : { text: "¡Hola! Soy el asistente de La Plaza. Pregunta por nuestros dos lugares, pedidos en línea, el menú o el catering. Toca una pregunta o escribe la tuya." };
}

export function answer(input: string, lang: Lang): BotReply {
  const text = normalize(input);
  if (!text) return replies.hello[lang];
  const match = rules.find(({ pattern }) => pattern.test(text));
  return (match ? replies[match.topic] : replies.fallback)[lang];
}
