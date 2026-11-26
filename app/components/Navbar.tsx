"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSceneUI } from "./PersistentScene";

const NAV_ITEMS = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { openPalette } = useSceneUI();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showBackdrop = !isHome || scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        showBackdrop
          ? "border-b border-white/[0.06] bg-black/75 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-6 sm:py-5 md:px-12 md:py-7"
      >
        <Link
          href="/"
          className="text-base font-black leading-none tracking-tighter text-white transition-colors hover:text-blue-400 sm:text-lg md:text-xl"
        >
          DEFAULT<span className="text-blue-500">_</span>PLUS
        </Link>

        <div className="flex items-center gap-5 sm:gap-6 md:gap-9">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] md:text-[11px] md:tracking-[0.22em]"
              >
                <span
                  className={`transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`absolute bottom-0 left-0 h-[1px] w-full origin-left bg-blue-500 transition-transform duration-300 ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}

          <button
            type="button"
            onClick={openPalette}
            aria-label="Open quick search palette"
            className="inline-flex h-8 items-center justify-center gap-1 border border-white/10 bg-white/[0.04] px-2.5 text-[10px] font-mono tracking-wider text-gray-300 transition-all hover:border-blue-500/40 hover:bg-white/[0.08] hover:text-white active:scale-95"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <span>K</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
