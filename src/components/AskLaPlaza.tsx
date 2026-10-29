"use client";

import { useEffect, useId, useRef, useState } from "react";

import { answer, greeting, suggestions, type BotAction, type BotLink, type BotReply, type Lang } from "@/lib/plazaBot";

import { Logo } from "./Logo";
import { useSite } from "./SiteProvider";

type Message = { id: number; from: "bot" | "guest"; text: string; lang: Lang; action?: BotAction; links?: BotLink[] };

// A short pause before each reply reads as a conversation; the follow-up step (catering form or demo
// panel) waits a little longer so the reply can be read first.
const REPLY_DELAY_MS = 450;
const FOLLOW_UP_DELAY_MS = 1400;

const actionLabels: Record<Lang, Record<BotAction, string>> = {
  en: { cater: "Plan your event", order: "Choose a location", menu: "See the menu", locations: "See our locations", contact: "How to reach us" },
  es: { cater: "Planea tu evento", order: "Elige tu lugar", menu: "Ver el menú", locations: "Ver ubicaciones", contact: "Cómo contactarnos" },
};

const ui: Record<Lang, { title: string; subtitle: string; placeholder: string; ask: string; typing: string; suggested: string }> = {
  en: { title: "Ask La Plaza", subtitle: "Scripted demo · nothing is sent", placeholder: "Type a question", ask: "Ask", typing: "La Plaza is typing", suggested: "Suggested questions" },
  es: { title: "Pregúntale a La Plaza", subtitle: "Demo con guion · no se envía nada", placeholder: "Escribe tu pregunta", ask: "Enviar", typing: "La Plaza está escribiendo", suggested: "Preguntas sugeridas" },
};

const actionClass = "mt-2 inline-block rounded-full bg-red-deep px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-dark";

function ChatBubble({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12z" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" strokeWidth="2.6" />
    </svg>
  );
}

/**
 * "Pregúntale a La Plaza / Ask La Plaza": a floating, scripted, bilingual helper. Replies come from
 * `answer()` in lib/plazaBot.ts, on the page itself; nothing typed here leaves the browser or is stored.
 */
export function AskLaPlaza() {
  const { goToForm, openPanel } = useSite();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "bot", lang: "en", ...greeting("en") }]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const nextId = useRef(1);
  const timers = useRef<number[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef(false);
  const panelId = useId();
  const t = ui[lang];

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else if (returnFocus.current) {
      // The launcher is hidden while the panel is open, so focus it only once it's back.
      returnFocus.current = false;
      launcherRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, typing]);

  const later = (callback: () => void, delay: number) => {
    timers.current.push(window.setTimeout(callback, delay));
  };

  const close = (focusLauncher = true) => {
    returnFocus.current = focusLauncher;
    setOpen(false);
  };

  const switchLang = (next: Lang) => {
    if (next === lang) return;
    setLang(next);
    setMessages((current) => [...current, { id: nextId.current++, from: "bot", lang: next, ...greeting(next) }]);
  };

  const runAction = (action: BotAction) => {
    if (action === "cater") {
      close(false);
      goToForm();
    } else if (action === "menu" || action === "locations") {
      close(false);
      document.getElementById(action)?.scrollIntoView({ block: "start" });
    } else if (action === "order") {
      openPanel("order");
    } else {
      openPanel("chat");
    }
  };

  const ask = (question: string) => {
    const text = question.trim().slice(0, 200);
    if (!text || typing) return;
    const replyLang = lang;
    const reply: BotReply = answer(text, replyLang);
    setMessages((current) => [...current, { id: nextId.current++, from: "guest", lang: replyLang, text }]);
    setDraft("");
    setTyping(true);
    later(() => {
      setTyping(false);
      setMessages((current) => [...current, { id: nextId.current++, from: "bot", lang: replyLang, ...reply }]);
      // The brief: catering opens the form, and prices, allergies and anything off-script end in the demo
      // panel. The other answers only offer their button (no `auto`).
      if (reply.auto && reply.action) {
        const action = reply.action;
        later(() => runAction(action), FOLLOW_UP_DELAY_MS);
      }
    }, REPLY_DELAY_MS);
  };

  return (
    <>
      {open && (
        <section
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={`${panelId}-title`}
          lang={lang}
          className="fixed right-3 bottom-24 z-50 flex max-h-[min(38rem,calc(100dvh-8rem))] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl bg-white lift ring-1 ring-ink/10 md:right-6 md:bottom-6"
          onKeyDown={(event) => {
            if (event.key === "Escape") close();
          }}
        >
          <header className="flex items-center gap-3 bg-ink px-4 py-3 text-white">
            <Logo className="w-11 shrink-0" />
            <div className="min-w-0 flex-1">
              <h2 id={`${panelId}-title`} className="font-display text-xl leading-tight font-bold uppercase">
                {t.title}
              </h2>
              <p className="text-xs font-semibold text-sand">{t.subtitle}</p>
            </div>
            <div role="group" aria-label="Language / Idioma" className="flex shrink-0 rounded-full bg-coal p-0.5 ring-1 ring-coal-line">
              {(["en", "es"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  lang={option}
                  aria-pressed={lang === option}
                  aria-label={option === "en" ? "English" : "Español"}
                  onClick={() => switchLang(option)}
                  className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase transition-colors ${lang === option ? "bg-marigold text-ink" : "text-sand hover:text-white"}`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => close()}
              aria-label={lang === "en" ? "Close Ask La Plaza" : "Cerrar Pregúntale a La Plaza"}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </header>

          <div ref={logRef} role="log" aria-live="polite" aria-label="Conversation" className="flex-1 space-y-3 overflow-y-auto bg-cream px-4 py-4">
            {messages.map(({ id, from, text, action, links, lang: messageLang }) =>
              from === "bot" ? (
                <div key={id} lang={messageLang} className="max-w-[88%]">
                  <p className="rounded-2xl rounded-bl-md bg-white px-4 py-2.5 leading-snug ring-1 ring-ink/10">{text}</p>
                  {links && (
                    <ul className="mt-2 space-y-1.5">
                      {links.map((link) => (
                        <li key={link.href}>
                          <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-red-deep underline underline-offset-4 hover:text-red-dark">
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  {action && (
                    <button type="button" onClick={() => runAction(action)} className={actionClass}>
                      {actionLabels[messageLang][action]}
                    </button>
                  )}
                </div>
              ) : (
                <p key={id} className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-red-deep px-4 py-2.5 leading-snug break-words text-white">
                  {text}
                </p>
              ),
            )}
            {typing && (
              <p className="w-fit rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-stone ring-1 ring-ink/10">
                <span className="sr-only">{t.typing}</span>
                <span aria-hidden="true" className="tracking-[0.3em] motion-safe:animate-pulse">
                  •••
                </span>
              </p>
            )}
          </div>

          <div className="border-t border-ink/10 bg-white px-3 pt-3 pb-3">
            <ul aria-label={t.suggested} className="flex flex-wrap gap-1.5">
              {suggestions[lang].map((suggestion) => (
                <li key={suggestion.label}>
                  <button
                    type="button"
                    onClick={() => ask(suggestion.question)}
                    disabled={typing}
                    className="rounded-full bg-cream-deep px-3 py-1.5 text-sm font-bold transition-colors hover:bg-marigold-light disabled:opacity-60"
                  >
                    {suggestion.label}
                  </button>
                </li>
              ))}
            </ul>
            <form
              className="mt-2.5 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                ask(draft);
              }}
            >
              <label htmlFor={`${panelId}-input`} className="sr-only">
                {t.placeholder}
              </label>
              <input
                ref={inputRef}
                id={`${panelId}-input`}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={200}
                autoComplete="off"
                placeholder={t.placeholder}
                className="min-w-0 flex-1 rounded-full border-2 border-ink/15 px-4 py-2.5 text-base focus:border-red-deep focus:outline-none"
              />
              <button
                type="submit"
                disabled={typing || !draft.trim()}
                className="rounded-full bg-red-deep px-4 font-bold text-white transition-colors hover:bg-red-dark disabled:opacity-50"
              >
                {t.ask}
              </button>
            </form>
          </div>
        </section>
      )}

      <button
        ref={launcherRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => (open ? close() : setOpen(true))}
        className={`fixed right-3 bottom-[5.25rem] z-40 items-center gap-2 rounded-full bg-ink py-2.5 pr-4 pl-3 font-display text-base font-bold text-white uppercase lift ring-2 ring-red transition-colors hover:bg-coal md:right-6 md:bottom-6 md:py-3 md:text-lg ${
          open ? "hidden" : "inline-flex"
        }`}
      >
        <ChatBubble className="size-6" />
        <span>
          Ask La Plaza
          {/* Shorter on phones, so the launcher covers less of the page. */}
          <span lang="es" className="hidden text-marigold sm:inline">
            {" "}
            · Pregúntale
          </span>
        </span>
      </button>
    </>
  );
}
