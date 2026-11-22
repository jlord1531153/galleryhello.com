"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu when the viewport grows past the mobile range.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");

    function handleChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setMenuOpen(false);
      }
    }

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-divider bg-background/95 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          GALLERY{" "}
          <span className="text-accent">HELLO.</span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu control */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-foreground sm:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {menuOpen ? (
              <>
                <path d="M5 5l10 10" />
                <path d="M15 5L5 15" />
              </>
            ) : (
              <>
                <path d="M3 6h14" />
                <path d="M3 10h14" />
                <path d="M3 14h14" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile navigation panel */}
      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-divider bg-background sm:hidden"
        >
          <div className="container-page flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-divider py-3 text-sm text-muted transition-colors last:border-b-0 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
