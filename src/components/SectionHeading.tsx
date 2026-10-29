type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
  /** "dark" for headings on the black sections. */
  tone?: "light" | "dark";
};

export function SectionHeading({ eyebrow, title, intro, id, tone = "light" }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className={`text-sm font-bold uppercase tracking-[0.22em] ${dark ? "text-marigold" : "text-red-deep"}`}>{eyebrow}</p>
      <h2 id={id} className={`mt-3 font-display text-4xl font-bold text-balance uppercase sm:text-6xl ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      <div aria-hidden="true" className="mx-auto mt-5 flex w-24 gap-1.5">
        <span className="h-1.5 flex-1 rounded-full bg-red" />
        <span className="h-1.5 w-4 rounded-full bg-marigold" />
      </div>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-sand" : "text-stone"}`}>{intro}</p>}
    </div>
  );
}
