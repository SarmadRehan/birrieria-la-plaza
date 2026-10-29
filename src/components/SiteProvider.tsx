"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

import { locations, shop } from "@/data/laPlaza";

import { Logo } from "./Logo";

/** "order" is the location picker; "form" and "chat" are the honest demo panel the brief asks for. */
export type PanelKind = "order" | "form" | "chat";

type SiteContextValue = {
  /** Scrolls to the catering form and focuses its first field. */
  goToForm: () => void;
  openPanel: (kind: PanelKind) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export const FORM_SECTION_ID = "catering";
export const FORM_FIRST_FIELD_ID = "event-type-birthday";

const leadIn: Record<Exclude<PanelKind, "order">, string> = {
  form: "This demo form doesn't send anything. ",
  chat: "This chat is scripted and doesn't send anything. ",
};

const buttonBase = "rounded-full px-5 py-3 text-center font-bold transition-colors";

/**
 * The single shared dialog plus a way to reach the catering form. Ordering is real: the picker links each
 * location's own ordering page (Square for Foster, Toast for Flock). The form and the chat send nothing and
 * end in the demo panel.
 */
export function SiteProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<PanelKind>("order");

  const openPanel = useCallback((next: PanelKind) => {
    setKind(next);
    dialogRef.current?.showModal();
  }, []);

  const goToForm = useCallback(() => {
    document.getElementById(FORM_SECTION_ID)?.scrollIntoView({ block: "start" });
    // Without scrolling again, so smooth scrolling into the section isn't cut short.
    document.getElementById(FORM_FIRST_FIELD_ID)?.focus({ preventScroll: true });
  }, []);

  const value = useMemo(() => ({ goToForm, openPanel }), [goToForm, openPanel]);
  const close = () => dialogRef.current?.close();

  return (
    <SiteContext.Provider value={value}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="panel-title"
        aria-describedby="panel-description"
        className="m-auto w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-3xl bg-cream p-0 text-ink shadow-2xl backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
        onClick={(event) => {
          // Clicks on the backdrop land on the <dialog> itself, not its content.
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="flex justify-center bg-ink pt-6 pb-4">
          <Logo className="w-24" />
        </div>
        <div aria-hidden="true" className="checker" />
        <div className="p-6 text-center sm:p-8">
          {kind === "order" ? (
            <>
              <h2 id="panel-title" className="font-display text-3xl font-bold uppercase">
                Order online <span className="block text-lg font-semibold text-red-deep normal-case">Pide en línea</span>
              </h2>
              <p id="panel-description" className="mt-3 leading-relaxed text-stone">
                Pick your location. Each one takes orders on its own page.
              </p>
              <ul className="mt-6 space-y-3 text-left">
                {locations.map((location) => (
                  <li key={location.id}>
                    <a
                      href={location.order.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-3 rounded-2xl bg-white p-4 ring-2 ring-ink/10 transition-colors hover:ring-red-deep"
                    >
                      <span className="min-w-0">
                        <span className="block font-display text-xl font-bold uppercase">{location.name}</span>
                        <span className="block text-sm text-stone">{location.street}</span>
                      </span>
                      <span className="shrink-0 rounded-full bg-red-deep px-4 py-2 text-sm font-bold text-white transition-colors group-hover:bg-red-dark">
                        {location.order.platform}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-stone">
                Rather call? <a href={shop.phoneHref} className="font-bold whitespace-nowrap text-red-deep underline underline-offset-4">{shop.phone}</a>
              </p>
            </>
          ) : (
            <>
              <h2 id="panel-title" className="font-display text-3xl font-bold uppercase">
                This is a demo
              </h2>
              <p id="panel-description" className="mt-3 leading-relaxed text-stone">
                {leadIn[kind]}For now, DM <span className="font-bold whitespace-nowrap text-ink">@{shop.instagramHandle}</span> or call{" "}
                <span className="font-bold whitespace-nowrap text-ink">{shop.phone}</span>.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a href={shop.instagramUrl} target="_blank" rel="noopener noreferrer" className={`${buttonBase} bg-red-deep text-white hover:bg-red-dark`}>
                  Instagram DM
                </a>
                <a href={shop.phoneHref} className={`${buttonBase} border-2 border-ink text-ink hover:bg-ink hover:text-white`}>
                  Call {shop.phone}
                </a>
              </div>
            </>
          )}
          <button
            type="button"
            autoFocus
            onClick={close}
            className="mt-5 text-sm font-bold text-stone underline underline-offset-4 hover:text-ink"
          >
            Close
          </button>
        </div>
      </dialog>
    </SiteContext.Provider>
  );
}

export function useSite(): SiteContextValue {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used inside SiteProvider");
  return context;
}

/** "Order online": opens the location picker. */
export function OrderButton({ className, children }: { className?: string; children: React.ReactNode }) {
  const { openPanel } = useSite();
  return (
    <button type="button" className={className} onClick={() => openPanel("order")}>
      {children}
    </button>
  );
}

/** "Catering & taco packs": jumps to the demo catering form. */
export function CateringButton({ className, children }: { className?: string; children: React.ReactNode }) {
  const { goToForm } = useSite();
  return (
    <button type="button" className={className} onClick={goToForm}>
      {children}
    </button>
  );
}
