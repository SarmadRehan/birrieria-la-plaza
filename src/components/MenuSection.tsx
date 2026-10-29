import Image from "next/image";

import { alsoOnTheMenu, menu, ramenPhoto } from "@/data/laPlaza";

import { SectionHeading } from "./SectionHeading";
import { OrderButton } from "./SiteProvider";

export function MenuSection() {
  const withPhotos = menu.filter((group) => group.photo);
  // Groups with no photo of their own go text-only rather than borrowing another dish's picture.
  const textOnly = menu.filter((group) => !group.photo);

  return (
    <section id="menu" aria-labelledby="menu-title" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="menu-title"
          eyebrow="El menú"
          title="Birria, Every Way"
          intro="Slow-cooked 4 hours, no preservatives, from our family's 3-generation recipe. Choose your carne: birria, asada, pastor, pollo or chorizo."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {withPhotos.map((group) => (
            <article key={group.id} aria-labelledby={`menu-${group.id}`} className="flex flex-col overflow-hidden rounded-3xl bg-cream ring-1 ring-ink/10">
              {group.photo && (
                <figure className="relative aspect-[4/3] overflow-hidden">
                  <Image src={group.photo.src} alt={group.photo.alt} fill sizes="(min-width: 1024px) 22rem, (min-width: 768px) 45vw, 92vw" className="object-cover" />
                  {group.photo.caption && (
                    <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold">{group.photo.caption}</figcaption>
                  )}
                </figure>
              )}
              <div className="flex-1 p-6">
                <h3 id={`menu-${group.id}`} className="font-display text-2xl font-bold uppercase">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3.5">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <p className="font-bold text-red-deep">{item.name}</p>
                      <p className="mt-0.5 leading-relaxed text-stone">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

          <div className="flex flex-col justify-center rounded-3xl bg-ink p-8 text-center text-white">
            <p className="font-display text-3xl font-bold uppercase">¿Tienes hambre?</p>
            <p className="mt-3 leading-relaxed text-sand">Order ahead from the cart on Foster or downtown at Flock.</p>
            <OrderButton className="mt-6 rounded-full bg-red-deep px-6 py-3 font-bold text-white transition-colors hover:bg-red-dark">Order online</OrderButton>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {textOnly.map((group) => (
            <article key={group.id} aria-labelledby={`menu-${group.id}`} className="rounded-3xl bg-cream p-6 ring-1 ring-ink/10">
              <h3 id={`menu-${group.id}`} className="font-display text-2xl font-bold uppercase">
                {group.title}
                {group.titleEs && <span className="block text-base font-semibold text-marigold-ink normal-case">{group.titleEs}</span>}
              </h3>
              <ul className="mt-4 space-y-3.5">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <p className="mt-0.5 leading-relaxed text-stone">{item.description}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <article aria-labelledby="menu-more" className="rounded-3xl bg-cream p-6 ring-1 ring-ink/10">
            <div className="flex items-start gap-4">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl">
                <Image src={ramenPhoto.src} alt={ramenPhoto.alt} fill sizes="5rem" className="object-cover" />
              </div>
              <h3 id="menu-more" className="font-display text-2xl font-bold uppercase">
                Y más
                <span className="block text-base font-semibold text-marigold-ink normal-case">And more</span>
              </h3>
            </div>
            <ul className="mt-4 space-y-2.5">
              {alsoOnTheMenu.map((item) => (
                <li key={item.name} className="leading-snug text-stone">
                  <span className="font-bold text-ink">{item.name}:</span> {item.description}
                </li>
              ))}
            </ul>
          </article>

        </div>

        <p className="mt-8 text-center text-sm text-stone">Descriptions from our online menu. Ask at the window about today&apos;s specials.</p>
      </div>
    </section>
  );
}
