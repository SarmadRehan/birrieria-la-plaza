import { press, story } from "@/data/laPlaza";

import { Logo } from "./Logo";
import { SectionHeading } from "./SectionHeading";

/** Our story plus "As featured in": press named in plain text only, no logos or quotes (brief). */
export function OurStory() {
  return (
    <section id="story" aria-labelledby="story-title" className="relative overflow-hidden bg-ink py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="story-title" tone="dark" eyebrow="Nuestra historia" title="A Family Recipe" />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="mx-auto w-full max-w-xs">
            <Logo className="w-full" />
          </div>

          <div>
            <div className="space-y-4 text-lg leading-relaxed text-sand">
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ol className="mt-8 grid gap-3 sm:grid-cols-3">
              {story.milestones.map((milestone) => (
                <li key={milestone.label} className="rounded-2xl border-2 border-coal-line bg-coal p-4 text-center">
                  <p className="font-display text-2xl font-bold text-marigold uppercase">{milestone.label}</p>
                  <p className="mt-1 text-sm text-sand">{milestone.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border-2 border-coal-line p-6 sm:p-8">
          <h3 className="text-center text-sm font-bold tracking-[0.22em] text-marigold uppercase">As featured in</h3>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {press.map((item) => (
              <li key={item.outlet} className="text-center">
                <p className="font-display text-2xl font-bold uppercase">{item.outlet}</p>
                <p className="mt-1 text-sm text-sand">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
