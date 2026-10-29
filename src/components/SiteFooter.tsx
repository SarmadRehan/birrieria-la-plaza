import { locations, shop } from "@/data/laPlaza";

import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-sand">
      <div aria-hidden="true" className="checker" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-14 sm:px-6 md:grid-cols-[0.8fr_1.4fr_1fr]">
        <div>
          <Logo className="w-28" />
          <p className="mt-4 max-w-xs leading-relaxed">{shop.tagline}. ¡Gracias, Portland!</p>
        </div>

        <div>
          <h2 className="text-sm font-bold tracking-[0.2em] text-marigold uppercase">Find us</h2>
          <ul className="mt-3 grid gap-4 sm:grid-cols-2">
            {locations.map((location) => (
              <li key={location.id} className="leading-relaxed">
                <span className="font-bold text-white">{location.name}</span>
                <br />
                {location.street}
                <br />
                {location.city}
                <br />
                <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-white underline underline-offset-4 hover:text-marigold">
                  See today&apos;s hours<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold tracking-[0.2em] text-marigold uppercase">Say hola</h2>
          <p className="mt-3 leading-relaxed">
            <a href={shop.phoneHref} className="font-bold text-white hover:text-marigold">
              {shop.phone}
            </a>
            <br />
            <a href={shop.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-marigold">
              Instagram <span className="whitespace-nowrap">@{shop.instagramHandle}</span>
            </a>
          </p>
          <p className="mt-3">Tacos · Quesatacos · Consomé · Taco packs</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-12 pb-40 sm:px-6 md:pb-24">
        <p className="rounded-full bg-red-deep px-4 py-2.5 text-center text-sm font-semibold text-white">{shop.demoNotice}</p>
      </div>
    </footer>
  );
}
