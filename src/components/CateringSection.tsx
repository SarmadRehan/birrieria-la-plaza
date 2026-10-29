"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { catering, contactOptions, eventTypes, pickupOptions } from "@/data/laPlaza";

import { SectionHeading } from "./SectionHeading";
import { FORM_FIRST_FIELD_ID, FORM_SECTION_ID, useSite } from "./SiteProvider";

const fieldClass =
  "mt-2 block w-full rounded-xl border-2 border-ink/15 bg-white px-4 py-3 text-base text-ink placeholder:text-stone/70 focus:border-red-deep focus:outline-none focus:ring-4 focus:ring-red/25";
const labelClass = "font-bold";
const choiceClass =
  "flex cursor-pointer items-center gap-2.5 rounded-xl border-2 border-ink/15 bg-white px-4 py-3 font-semibold has-[:checked]:border-red-deep has-[:checked]:bg-red-soft has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-red/30";

/** Today's date in Portland as YYYY-MM-DD, so the date picker never offers a past day (the visitor may be anywhere). */
function portlandToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles" }).format(new Date());
}

const fieldId = (option: string) => `event-type-${option.toLowerCase().normalize("NFD").replace(/[^a-z]/g, "")}`;

/**
 * Catering & taco packs. The form has no action and makes no network request: submitting only opens the
 * "this is a demo" panel, and nothing is kept once the page closes.
 */
export function CateringSection() {
  const { openPanel } = useSite();
  // Set after mount: the static build has no "today".
  const [minDate, setMinDate] = useState<string>();
  useEffect(() => setMinDate(portlandToday()), []);

  return (
    <section id={FORM_SECTION_ID} aria-labelledby="catering-title" className="bg-cream-deep py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="catering-title" eyebrow="Catering & taco packs" title="Feed the Whole Party" intro={catering.line} />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <div className="order-2 space-y-6 lg:sticky lg:top-24 lg:order-1 lg:self-start">
            <figure className="overflow-hidden rounded-3xl bg-white lift">
              <div className="relative aspect-[4/3]">
                <Image src={catering.photo.src} alt={catering.photo.alt} fill sizes="(min-width: 1024px) 26rem, 92vw" className="object-cover" />
              </div>
              <figcaption className="px-5 py-3 text-center text-sm font-semibold text-stone">{catering.photo.caption}</figcaption>
            </figure>
            <div className="rounded-3xl bg-white p-6 ring-1 ring-ink/10">
              <h3 className="font-display text-2xl font-bold uppercase">For a crowd</h3>
              <ul className="mt-4 space-y-3.5">
                {catering.packs.map((pack) => (
                  <li key={pack.name}>
                    <p className="font-bold text-red-deep">{pack.name}</p>
                    <p className="mt-0.5 leading-relaxed text-stone">{pack.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <form
            aria-labelledby="inquiry-title"
            className="order-1 rounded-3xl bg-white p-6 lift sm:p-8 lg:order-2"
            onSubmit={(event) => {
              // Native validation has already passed when this fires; nothing is sent anywhere.
              event.preventDefault();
              openPanel("form");
            }}
          >
            <h3 id="inquiry-title" className="font-display text-3xl font-bold uppercase">
              Tell us about your event
            </h3>
            <p className="mt-1 text-stone">Cuéntanos de tu evento. A few details and we&apos;ll get back to you.</p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <fieldset className="sm:col-span-2">
                <legend className={labelClass}>Event type</legend>
                <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-3">
                  {eventTypes.map((type, index) => (
                    <label key={type} className={choiceClass}>
                      <input
                        id={index === 0 ? FORM_FIRST_FIELD_ID : fieldId(type)}
                        type="radio"
                        name="eventType"
                        value={type}
                        required={index === 0}
                        className="size-4 shrink-0 accent-[var(--color-red-deep)]"
                      />
                      <span className="min-w-0">{type}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="event-date" className={labelClass}>
                  Event date
                </label>
                <input id="event-date" name="eventDate" type="date" required min={minDate} className={fieldClass} />
              </div>
              <div>
                <label htmlFor="event-guests" className={labelClass}>
                  Guest count
                </label>
                <input
                  id="event-guests"
                  name="guests"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={5000}
                  required
                  className={fieldClass}
                  placeholder="About how many?"
                />
              </div>

              <fieldset className="sm:col-span-2">
                <legend className={labelClass}>Location preference</legend>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {pickupOptions.map((option, index) => (
                    <label key={option} className={choiceClass}>
                      <input type="radio" name="location" value={option} required={index === 0} className="size-4 shrink-0 accent-[var(--color-red-deep)]" />
                      <span className="min-w-0">{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="contact-name" className={labelClass}>
                  Your name
                </label>
                <input id="contact-name" name="name" required autoComplete="name" className={fieldClass} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="contact-detail" className={labelClass}>
                  Phone or email
                </label>
                <input id="contact-detail" name="contact" required autoComplete="email" className={fieldClass} placeholder="How we can reach you" />
              </div>

              <fieldset className="sm:col-span-2">
                <legend className={labelClass}>Preferred contact</legend>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {contactOptions.map((option, index) => (
                    <label key={option} className={choiceClass}>
                      <input type="radio" name="preferredContact" value={option} required={index === 0} className="size-4 shrink-0 accent-[var(--color-red-deep)]" />
                      <span className="min-w-0">{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="sm:col-span-2">
                <label htmlFor="event-notes" className={labelClass}>
                  Anything else? <span className="font-normal text-stone">(optional)</span>
                </label>
                <textarea id="event-notes" name="notes" rows={3} maxLength={1000} className={fieldClass} placeholder="Taco packs, consomé, timing..." />
              </div>
            </div>

            <button type="submit" className="mt-7 w-full rounded-full bg-red-deep px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-red-dark">
              Send request
            </button>
            <p className="mt-4 text-center text-sm text-stone">Demo form: nothing is sent. You&apos;ll see how to reach La Plaza instead.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
