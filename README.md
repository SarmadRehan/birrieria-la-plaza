# Birrieria La Plaza: Landing Page Prototype

A demo site for Birrieria La Plaza, Oracio Hernandez's family birria business in Portland, Oregon. It is
built as a client prototype and is not the official website; banners at the top and bottom of the page say
so. It is unlisted (`noindex`) and meant to be shared only with Birrieria La Plaza.

Live demo: https://sarmadrehan.github.io/birrieria-la-plaza/

The pitch: their own website domain expired around 2026-10-01, so the website link on their Google listing,
the "Order Tacos!" button in their Instagram bio and the email on their Square site all lead to a registrar
page. This demo shows what that domain could serve once it's renewed: one home for every location. The
domain is never linked or written out on the page (Instagram previews bare domains).

## Main features

- **Locations, the core of the page** (`src/components/LocationsSection.tsx`). One card each for the
  Foster Food Carts cart and the downtown stall at Flock: address, "See today's hours" (their Google Maps
  listing), Directions, and a big **Order** button that links that location's real ordering page (Square
  for Foster, Toast for Flock). Foster also gets Call, since their posts list the phone there.
- **Order online** (header, hero, menu, mobile bar) opens a location picker, then Square or Toast.
- **"Pregúntale a La Plaza / Ask La Plaza" chatbot** (`src/lib/plazaBot.ts`). A floating, scripted,
  bilingual helper with an EN/ES switch, suggested-question chips in each language and free text, answered
  by keyword matching in English and Spanish. There is no AI model, no API key and no network call.
  - Where are you, order online, what's birria, the Plaza Plate and catering use the brief's answers
    (catering opens the form).
  - Vegetarian: "Try the bean burrito or veg burrito. Our tortillas are usually cooked in beef tallow, so
    ask us how yours is made." (Not the brief's wording; see Notes.)
  - Hours: "Check today's hours on Google…", with links to both Maps listings. It never states hours.
  - Prices, allergies, vegan, delivery, parking and anything else: the fallback, then the demo panel. It
    never gives a price or an allergy claim.
- **Catering & taco packs form** (`src/components/CateringSection.tsx`). Event type, date (no past days,
  by Portland's clock), guest count, location preference, name, phone or email, preferred contact and
  notes. The form has no action and makes no network request: submitting only opens the demo panel ("This
  is a demo. For now, DM @birrierialaplaza or call (503) 753-4495.").
- Our story with "As featured in" (press names in plain text, no logos or quotes), and the menu in the
  brief's groups.

## Stack

- Next.js 15 (App Router) with static export (`output: "export"`)
- TypeScript (strict) and Tailwind CSS v4
- Fonts via `next/font`: Oswald (bold condensed headings, per the brief) and Source Sans 3 (body)
- Hosted on GitHub Pages from the `gh-pages` branch

## Project layout

```
src/
  app/            layout, page, global styles (palette, logo rings, checkered strip), icons
  assets/images/  logo and photos from their own Instagram, imported statically
  components/     one component per page section, plus the chatbot and the shared panel
  data/           laPlaza.ts: facts, locations, story, menu, press, catering (with sources)
  lib/            plazaBot.ts: the scripted bilingual chatbot's answers and keyword rules
```

## Palette

A blend Sarmad chose: the logo's black `#0b0b0b`, white and red `#ea1d25` lead (sampled from the round
Instagram logo), with the brief's warm cream `#fbf4e6` as the light background and a small marigold
`#f2a900` accent. Red text and buttons use the deeper `#c8161e` for WCAG AA contrast. Values and ratios are
in the `@theme` comment in `src/app/globals.css`.

## Content sources

Facts come from the verified table in the demo brief (checked 2026-10-29) and their own channels:

| Fact | Source |
| --- | --- |
| Owner Oracio Hernandez; family recipe, 3 generations; from his mom's cooking for quinceañeras and weddings | Wikipedia; Eater Portland (2023-01-10); Willamette Week (2020-10-13); Portland Monthly (2020); IG bio |
| Started 2019 as a red food cart on Stark St, in a discount store's lot | Wikipedia; Intentionalist |
| Foster Food Carts cart, 5205 SE Foster Rd, Portland, OR 97206 | IG bio; Square store; Google Maps |
| Flock food hall stall, 917 SW Alder St (Block 216), Portland, OR 97205; Flock opened 2025-02-02 | Wikipedia; Toast; Google Maps ("Located in: Flock") |
| Phone (503) 753-4495 | Square; Yelp; IG posts |
| Press: Eater Portland, The Oregonian, Portland Monthly, Willamette Week | Wikipedia (with citations) |
| Birria slow-cooked 4 hours, no preservatives | Square menu text |
| Ordering: Square (Foster), Toast (Flock) | Brief; Square store checked live (accepting orders, pickup at the Foster address) |

- **Menu**: item names and descriptions from their Square Online store (72 items, read 2026-10-29), prices
  removed, lightly shortened. Items with no photo of their own (birria by the pound, the "Y más" strip) go
  text-only.
- **Catering**: the Taco Pack (15 tacos + 15 quesatacos, add a large consomé) from Square; catering from
  their own posts ("We are catering for a part of the county!", "We will be catering a wedding!").
- **Photos**: 8 photos from their own Instagram posts, each with its caption noted in `src/data/laPlaza.ts`.
  Meme posts, collab posts from other accounts, customer-credited photos, posts showing children and an
  edited joke photo of the cart flipped over were left out. The logo is their Instagram profile logo, masked
  to its circle.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npx tsc --noEmit -p .
npm run build    # static export to out/
```

## Deploy

```bash
npm run deploy   # builds with NEXT_PUBLIC_BASE_PATH=/birrieria-la-plaza and pushes out/ to gh-pages
```

## Notes

- **SE Division restaurant left out.** The brief listed a third location at 10114 SE Division St. Their own
  Instagram post of 2025-10-11 says the restaurant was closing ("el ciclo de nuestro Restaurante va
  cerrar"), keeping the truck and the downtown spot; their bio and the 2025-10-31 post list only Foster
  and Downtown, and Google Maps has no business at that address. Sarmad chose two locations. Outreach
  draft 52 still mentions "Foster, Division and Flock" and needs updating in the BD Agent.
- **Vegetarian answer.** Their Square menu says the cheese quesadilla is "fried with our house rendered red
  beef tallow" and the tortillas are "painted red with our house rendered beef tallow", so the brief's
  "Try the cheese quesadilla…" was changed (Sarmad's choice).
- **No hours** anywhere: Instagram, Square and their posts list different hours, so each location links
  its Google Maps listing.
- **Toast** is blocked from Pakistan, so the Flock ordering link was used as given in the brief and not
  opened from here. Worth one click from a US connection.
