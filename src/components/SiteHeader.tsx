"use client";

import { useEffect, useState } from "react";

import { shop } from "@/data/laPlaza";

import { Logo } from "./Logo";
import { OrderButton } from "./SiteProvider";

const navLinks = [
  { href: "#locations", label: "Locations" },
  { href: "#menu", label: "Menu" },
  { href: "#story", label: "Our story" },
  { href: "#catering", label: "Catering" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-coal-line bg-ink/95 text-white backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label="Birrieria La Plaza, back to top">
          <Logo className="w-12" priority />
          <span className="hidden font-display text-lg leading-none font-bold uppercase min-[360px]:block">
            Birrieria La Plaza
            <span className="mt-1 block font-sans text-[0.7rem] font-bold tracking-[0.22em] text-marigold">Portland · PDX</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-5 text-[0.95rem] font-semibold lg:gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sand transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={shop.phoneHref} className="font-bold whitespace-nowrap hover:text-marigold">
            {shop.phone}
          </a>
          <OrderButton className="rounded-full bg-red-deep px-5 py-2.5 font-bold whitespace-nowrap text-white transition-colors hover:bg-red-dark">
            Order online
          </OrderButton>
        </div>

        <button
          type="button"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-coal text-white ring-1 ring-coal-line md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-coal-line bg-ink md:hidden">
          <ul className="flex flex-col px-4 py-2 text-base font-bold">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="block py-3" onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
