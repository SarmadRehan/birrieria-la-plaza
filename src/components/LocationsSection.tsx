import { locations, shop } from "@/data/laPlaza";

import { SectionHeading } from "./SectionHeading";

const pinIcon = (
  <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

const newTab = <span className="sr-only"> (opens in a new tab)</span>;

/**
 * One card per location, the core of the pitch. No hours on the page (their listings conflict): each card
 * links its Google Maps listing for today's hours. Order buttons link that location's real ordering page.
 */
export function LocationsSection() {
  return (
    <section id="locations" aria-labelledby="locations-title" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="locations-title"
          eyebrow="Encuéntranos"
          title="Two Spots, One Birria"
          intro="Same family recipe at the cart on Foster and downtown at Flock. Order ahead from either one."
        />

        <ul className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {locations.map((location, index) => (
            <li key={location.id}>
              <article aria-labelledby={`location-${location.id}`} className="flex h-full flex-col overflow-hidden rounded-3xl bg-white lift ring-1 ring-ink/10">
                <div className="relative overflow-hidden bg-ink px-6 py-6 text-white">
                  <div aria-hidden="true" className="plaza-rings absolute -top-24 -right-24 size-56 opacity-40" />
                  <p className="relative text-sm font-bold tracking-[0.2em] text-marigold uppercase">
                    #{index + 1} · {location.kind} · {location.nameEs}
                  </p>
                  <h3 id={`location-${location.id}`} className="relative mt-2 font-display text-3xl font-bold uppercase">
                    {location.name}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-start gap-2 text-lg leading-snug">
                    <span className="mt-0.5 text-red-deep">{pinIcon}</span>
                    <span>
                      <span className="font-bold">{location.street}</span>
                      <br />
                      {location.city}
                    </span>
                  </p>
                  <p className="mt-3 text-stone">{location.note}</p>
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block w-fit font-bold text-red-deep underline underline-offset-4 hover:text-red-dark"
                  >
                    See today&apos;s hours{newTab}
                  </a>

                  {/* Big, thumb-friendly buttons: Order first, then Directions (and Call where their posts list the phone). */}
                  <div className="mt-6 grid gap-3 pt-2 sm:mt-auto">
                    <a
                      href={location.order.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-red-deep px-5 py-3.5 text-center text-lg font-bold text-white transition-colors hover:bg-red-dark"
                    >
                      {location.order.label}
                      {newTab}
                    </a>
                    <div className={`grid gap-3 ${location.phone ? "grid-cols-2" : ""}`}>
                      <a
                        href={location.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border-2 border-ink px-4 py-3 text-center font-bold transition-colors hover:bg-ink hover:text-white"
                      >
                        Directions{newTab}
                      </a>
                      {location.phone && (
                        <a href={shop.phoneHref} className="rounded-full border-2 border-ink px-4 py-3 text-center font-bold transition-colors hover:bg-ink hover:text-white">
                          Call
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
