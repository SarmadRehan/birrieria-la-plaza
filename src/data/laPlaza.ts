import type { StaticImageData } from "next/image";

import birriaRamen from "@/assets/images/birria-ramen.jpg";
import burrito from "@/assets/images/burrito.jpg";
import platoLaPlaza from "@/assets/images/plato-la-plaza.jpg";
import quesadillaPull from "@/assets/images/quesadilla-pull.jpg";
import quesatacoDip from "@/assets/images/quesataco-dip.jpg";
import tacoConsomeLogo from "@/assets/images/taco-consome-logo.jpg";
import tacoConsomeRed from "@/assets/images/taco-consome-red.jpg";
import tacoTray from "@/assets/images/taco-tray.jpg";

// Content for the Birrieria La Plaza demo. Every fact comes from the verified-facts table in the brief
// (drafts/demos/53-birrieria-la-plaza-brief.md, checked 2026-10-29) or from their own channels, with the
// source beside it. No prices, hours, ratings or review quotes anywhere (brief rules).
//
// Their own website domain expired around 2026-10-01 and now shows a registrar page. It is never linked
// or written out on this page (Instagram previews bare domains).

export type Photo = { src: StaticImageData; alt: string; caption?: string };

export const shop = {
  name: "Birrieria La Plaza",
  // Their logo, IG handle and Square store all spell it without an accent.
  tagline: "Portland's birria, 3 generations in the making",
  description:
    "Birrieria La Plaza: family birria from Portland, at Foster Food Carts and downtown at Flock. Tacos, quesatacos, consomé, platos and taco packs.",
  demoNotice: "Demo by Sarmad Rehan · not the official Birrieria La Plaza website",
  owner: "Oracio Hernandez",
  // Square store contact, Yelp, and their IG posts.
  phone: "(503) 753-4495",
  phoneHref: "tel:+15037534495",
  instagramHandle: "birrierialaplaza",
  instagramUrl: "https://www.instagram.com/birrierialaplaza/",
} as const;

export type LocationId = "foster" | "flock";

export type Location = {
  id: LocationId;
  name: string;
  nameEs: string;
  kind: string;
  street: string;
  city: string;
  note: string;
  /** Their Google Maps listing, which shows today's hours (the brief: no hours on the page). */
  mapsUrl: string;
  directionsUrl: string;
  order: { label: string; platform: string; href: string };
  /** Only the Foster cart lists the phone number in their own posts. */
  phone?: boolean;
};

// The brief listed a third spot, the SE Division restaurant (10114 SE Division St). Their own IG post of
// 2025-10-11 says that restaurant closed ("el ciclo de nuestro Restaurante va cerrar"), their bio and the
// 2025-10-31 post list only these two, and Google Maps has no business at that address. Sarmad chose to show
// two locations.
export const locations: Location[] = [
  {
    id: "foster",
    name: "Foster Food Carts",
    nameEs: "El carrito",
    kind: "Food cart",
    // IG bio; Square store address (Portland, OR 97206-2935); Google Maps.
    street: "5205 SE Foster Rd",
    city: "Portland, OR 97206",
    note: "Our red cart at the Foster Food Carts pod.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Birrieria%20La%20Plaza%2C%205205%20SE%20Foster%20Rd%2C%20Portland%2C%20OR%2097206",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=5205%20SE%20Foster%20Rd%2C%20Portland%2C%20OR%2097206",
    // Square Online store, live and accepting orders (checked 2026-10-29); its pickup address is this cart.
    order: { label: "Order on Square", platform: "Square", href: "https://birrierialaplaza.square.site" },
    phone: true,
  },
  {
    id: "flock",
    name: "Downtown at Flock",
    nameEs: "En el centro",
    kind: "Food hall stall",
    // Wikipedia (Flock, Block 216, opened 2025-02-02); Toast; Google Maps "Located in: Flock".
    street: "917 SW Alder St",
    city: "Portland, OR 97205",
    note: "Our stall at Flock, the food hall in Block 216.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Birrieria%20La%20Plaza%2C%20917%20SW%20Alder%20St%2C%20Portland%2C%20OR%2097205",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=917%20SW%20Alder%20St%2C%20Portland%2C%20OR%2097205",
    // From the brief. Toast is blocked from Pakistan, so it was linked as given and not opened from here.
    order: { label: "Order on Toast", platform: "Toast", href: "https://toast.app/birrieria-la-plaza-downtown-pdx/order" },
  },
];

// IG post "An explosion of flavor in every bite", shot in front of the cart's own logo sign.
export const heroPhoto: Photo = {
  src: tacoConsomeLogo,
  alt: "A taco de birria with cilantro and onion held over a cup of consomé, the Birrieria La Plaza sign behind it",
};

export const story = {
  // Wikipedia; Eater Portland 2023-01-10; Willamette Week 2020-10-13; Portland Monthly 2020 (via the brief).
  paragraphs: [
    "Oracio Hernandez's family has made birria for three generations. The recipe comes from his mom's cooking for quinceañeras and weddings.",
    "In 2019 he opened a red food cart on Stark Street, in the parking lot of a discount store. Today you'll find La Plaza at Foster Food Carts and downtown at Flock.",
  ],
  milestones: [
    { label: "3 generations", detail: "A family recipe" },
    { label: "2019", detail: "A red cart on Stark St" },
    { label: "2025", detail: "Downtown at Flock" },
  ],
};

export type MenuItem = { name: string; description: string };
export type MenuGroup = { id: string; title: string; titleEs?: string; items: MenuItem[]; photo?: Photo };

// Names and descriptions from their Square Online store (72 items, read 2026-10-29), shortened, prices removed.
// "Your favorite carne" on Square means birria, asada, pastor, pollo or chorizo (their 2-for deals list).
export const menu: MenuGroup[] = [
  {
    id: "platos",
    title: "Platos",
    items: [
      { name: "Plato La Plaza", description: "Our famous Plaza Plate: 1 quesadilla, 1 mulita, 1 taco and 1 tostada, plus a cup of consomé to dip it all in." },
      { name: "Cheesy Plato La Plaza", description: "The cheesy version: 1 quesataco, 1 mulita, 1 vampiro, 1 quesadilla and a small consomé." },
      { name: "Plato de Birria", description: "Our birria, slow-cooked 4 hours, with cilantro and cebolla, rice, beans and 5 tortillas." },
      { name: "Quesataco Plato", description: "3 quesatacos (quesabirria), rice and beans, and a mini consomé." },
      { name: "Quesadilla Plato", description: "2 quesadillas, rice and beans, and a mini consomé." },
    ],
    // IG post "What's your favorite on the Plaza Plate / Cual le gusta más del Plato La Plaza".
    photo: { src: platoLaPlaza, alt: "A Plato La Plaza on checkered paper: taco, quesadilla and mulita with lime and radish" },
  },
  {
    id: "tacos",
    title: "Tacos & quesatacos",
    items: [
      { name: "Taco", description: "Corn tortilla painted red with our house-rendered beef tallow, your carne, cilantro and cebolla." },
      { name: "Quesataco (quesabirria)", description: "Melted cheese and our 4-hour birria in a red corn tortilla, with cilantro and cebolla." },
      { name: "Tostada", description: "A tortilla fried crunchy in beef tallow, topped with your carne, cilantro and cebolla." },
      { name: "Mulita", description: "Your carne, cilantro and cebolla between 2 tortillas, with melted cheese on each side." },
      { name: "Keto Taco", description: "A tortilla made of grilled crispy cheese, with cilantro and cebolla." },
    ],
    // IG post, a quesataco dipped in a La Plaza consomé cup.
    photo: { src: quesatacoDip, alt: "A cheesy quesataco de birria dipped into a cup of red consomé" },
  },
  {
    id: "quesadillas",
    title: "Quesadillas & vampiros",
    items: [
      { name: "Quesadilla", description: "Handmade 6\" flour tortilla painted red with beef tallow, filled with your carne, cilantro and onion." },
      { name: "Vampiro", description: "A tostada with cheese melted on the flattop, your carne, cilantro and cebolla." },
      { name: "Pizza-Dilla", description: "3 giant flour tortillas layered with cheese and your meat, cut in 8 slices and served in a pizza box." },
    ],
    // IG post "Today is a good day to go for some birria quesadillas".
    photo: { src: quesadillaPull, alt: "A red birria quesadilla pulled apart with a long cheese stretch" },
  },
  {
    id: "burritos",
    title: "Burritos",
    items: [
      { name: "Burrito", description: "Your carne, frijoles, arroz, queso, cilantro and cebolla in a huge flour tortilla." },
      { name: "Burrito Bowl", description: "Rice, beans, birria, cheese, cilantro and cebolla, without the tortilla." },
      { name: "Bean Burrito", description: "Our pinto beans and melted cheese." },
      { name: "Veg Burrito", description: "Rice, beans, cheese, cilantro and cebolla." },
    ],
    // IG post "One half of the burrito for now and the rest for later".
    photo: { src: burrito, alt: "A birria burrito cut in half in front of the Birrieria La Plaza logo" },
  },
  {
    id: "caldo",
    title: "Birria en caldo & consomé",
    items: [
      { name: "Birria en Caldo", description: "A huge pile of birria in a bowl of consomé, topped with cilantro and cebolla, with 5 corn tortillas." },
      { name: "Consomé", description: "The broth the meat is cooked in, with chunks of birria, cilantro and cebolla. Dip your taco or make it a meal. Mini, small, medium or large." },
    ],
    // IG post "Un taco de birria con su consome".
    photo: { src: tacoConsomeRed, alt: "A taco de birria dipped into a cup of consomé with cilantro" },
  },
  {
    id: "pound",
    title: "Birria by the pound",
    titleEs: "Libra de birria",
    items: [
      {
        name: "Libra de Birria",
        description: "Take our birria home and make tacos your way. Our family recipe for 3 generations, made with real ingredients and no preservatives.",
      },
    ],
  },
];

/** Smaller items, shown as a text strip under the cards (they have no photo of their own here). */
export const alsoOnTheMenu: MenuItem[] = [
  { name: "Birria Ramen", description: "Our birria with fresh ramen noodles." },
  { name: "Birria Nachos", description: "Homemade chips and beans, your carne, cheese, crema, pico and guacamole." },
  { name: "Nacho Fries", description: "Crispy fries loaded the same way." },
  { name: "Café de Olla", description: "Mexican coffee from the pot, with piloncillo, Mexican chocolate and cinnamon." },
  { name: "Jarritos & Mexican Coke", description: "Glass-bottle sodas, Topo Chico and Squirt." },
];

// IG post "Authentic Fresh Ramen Noodles >>> Birria Ramen".
export const ramenPhoto: Photo = { src: birriaRamen, alt: "Birria ramen noodles lifted from a Birrieria La Plaza cup" };

// Press named in plain text only, no logos or quotes (brief). Sources: Wikipedia, with its citations.
export const press = [
  { outlet: "Eater Portland", detail: "Essential restaurants and food carts (2022) · Best food carts (2025)" },
  { outlet: "The Oregonian", detail: "Portland's 10 best new food carts (2020)" },
  { outlet: "Portland Monthly", detail: "Best quesabirria taco in Portland (2021)" },
  { outlet: "Willamette Week", detail: "Covered since 2020" },
];

export const catering = {
  // Square "Taco Pack: 15 Tacos 15 Quesatacos Add a Large Consome"; Yelp menu highlights (brief).
  packs: [
    { name: "Taco Pack", description: "15 tacos and 15 quesatacos. Add a large consomé for dipping." },
    { name: "Libra de Birria", description: "Birria by the pound, to build your own tacos at home." },
    { name: "Consomé Grande", description: "A large consomé with birria, cilantro, cebolla and 6 tortillas." },
  ],
  // IG posts: "We are catering for a part of the county!" and "Closing at 5:00 today! We will be catering a wedding!"
  line: "Taco packs and catering for your party, quinceañera or wedding.",
  // IG post "Just one taco maybe 😇", a full tray of tacos de birria.
  photo: { src: tacoTray, alt: "A full catering tray of red tacos de birria topped with radish and lime", caption: "Pictured: a tray of our tacos de birria" },
};

export const eventTypes = ["Birthday", "Quinceañera", "Wedding", "Office", "Party", "Other"] as const;
export const pickupOptions = ["Foster Food Carts", "Downtown at Flock", "Not sure yet"] as const;
export const contactOptions = ["Call", "Text", "Email"] as const;
