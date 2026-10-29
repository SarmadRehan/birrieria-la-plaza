import Image from "next/image";

import { heroPhoto, locations, shop } from "@/data/laPlaza";

import { CateringButton, OrderButton } from "./SiteProvider";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="plaza-rings absolute -top-40 -left-56 size-[34rem] opacity-25 lg:-left-40" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-16 sm:px-6 sm:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
        <div className="min-w-0 text-center lg:text-left">
          <p className="inline-block rounded-full bg-marigold px-4 py-1.5 text-sm font-bold text-ink">Birria de res · Since 2019</p>
          <h1 id="hero-title" className="mt-6 font-display text-[2.7rem] leading-[0.95] font-bold uppercase min-[360px]:text-5xl sm:text-7xl lg:text-8xl">
            {shop.name}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-xl leading-relaxed text-sand sm:text-2xl lg:mx-0">{shop.tagline}.</p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <OrderButton className="w-full rounded-full bg-red-deep px-6 py-3.5 text-lg font-bold text-white transition-colors lift hover:bg-red-dark sm:w-auto">
              Order online
            </OrderButton>
            <a
              href="#locations"
              className="w-full rounded-full border-2 border-white px-6 py-3 text-center text-lg font-bold transition-colors hover:bg-white hover:text-ink sm:w-auto"
            >
              Find us
            </a>
            <CateringButton className="w-full rounded-full border-2 border-marigold px-6 py-3 text-lg font-bold text-marigold transition-colors hover:bg-marigold hover:text-ink sm:w-auto">
              Catering &amp; taco packs
            </CateringButton>
          </div>
          <p className="mt-6 text-sm font-semibold text-sand">{locations.map((location) => location.name).join(" · ")}</p>
        </div>

        <figure className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-4 ring-red lift">
            <Image src={heroPhoto.src} alt={heroPhoto.alt} fill priority sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 92vw" className="object-cover" />
          </div>
          <p aria-hidden="true" className="absolute -bottom-4 left-1/2 -translate-x-1/2 rotate-[-3deg] rounded-full bg-marigold px-5 py-2 font-display text-lg font-bold whitespace-nowrap text-ink uppercase lift">
            Con su consomé
          </p>
        </figure>
      </div>
      <div aria-hidden="true" className="checker" />
    </section>
  );
}
