"use client";

import React from "react";
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
  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        isHome
          ? "bg-transparent"
          : "bg-black/50 backdrop-blur-md border-b border-white/[0.06]"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 md:px-12 md:py-7"
      >
        <Link
          href="/"
          className="text-lg md:text-xl font-black tracking-tighter leading-none text-white transition-colors hover:text-blue-400"
        >
          DEFAULT<span className="text-blue-500">_</span>PLUS
        </Link>

        <div className="flex items-center gap-6 md:gap-9">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative py-1 text-[10px] md:text-[11px] font-bold tracking-[0.22em] uppercase"
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
            className="hidden sm:inline-flex items-center gap-1.5 border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-mono tracking-wider text-gray-400 transition-all hover:border-blue-500/40 hover:bg-white/[0.07] hover:text-white"
          >
            <span>Ctrl K</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
