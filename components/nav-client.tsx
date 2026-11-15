"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * The two parts of the top bar that need the browser: which link is the page you are on, and the
 * menu a phone opens. Everything else on the site is drawn on the server.
 */
export type NavLink = { href: string; label: string };

const isHere = (path: string, href: string) => href !== "/" && path === href.split("#")[0];

export function NavLinks({ links }: { links: NavLink[] }) {
  const path = usePathname();
  return (
    <nav className="nav-links" aria-label="Main">
      {links.map((l) => (
        <Link key={l.href} href={l.href} aria-current={isHere(path, l.href) ? "page" : undefined}>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

export function MobileMenu({ links }: { links: NavLink[] }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  // A new page closes it, and so does a tap anywhere else or the Escape key.
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); };
  }, [open]);

  return (
    <div className="menu" ref={box}>
      <button type="button" className="menu-btn" aria-label={open ? "Close the menu" : "Open the menu"} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((v) => !v)}>
        <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          {open ? <path d="M4 4l10 10M14 4L4 14" /> : <path d="M2.5 6h13M2.5 12h13" />}
        </svg>
      </button>
      {open ? (
        <nav id="site-menu" className="menu-sheet" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isHere(path, l.href) ? "page" : undefined} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
