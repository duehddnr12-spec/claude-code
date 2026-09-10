"use client";

import { useState } from "react";

const links = [
  { href: "#viewer", label: "THE TEE" },
  { href: "#fabric", label: "FABRIC" },
  { href: "#story", label: "STORY" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#top" className="font-display text-lg tracking-[0.18em]">
          ATELIER&nbsp;BLANC
        </a>

        <nav aria-label="주요 메뉴" className="hidden gap-8 text-sm tracking-wide sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="cursor-pointer text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#purchase"
            className="hidden cursor-pointer rounded-full border border-ink px-5 py-2 text-sm tracking-wide transition-colors hover:bg-ink hover:text-paper sm:inline-block"
          >
            구매하기
          </a>
          <button
            type="button"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="cursor-pointer rounded-full border border-ink p-2.5 sm:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="모바일 메뉴"
          className="flex flex-col border-t border-border/70 bg-paper px-6 py-4 text-sm tracking-wide sm:hidden"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="cursor-pointer border-b border-border/60 py-3 text-ink-soft last:border-none"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#purchase"
            onClick={() => setOpen(false)}
            className="mt-3 cursor-pointer rounded-full bg-ink px-5 py-3 text-center text-paper"
          >
            구매하기
          </a>
        </nav>
      )}
    </header>
  );
}
