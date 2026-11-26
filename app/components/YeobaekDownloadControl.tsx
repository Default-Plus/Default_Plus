"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

type ClientOS = "win" | "android" | "other";

function subscribeNoop() {
  return () => {};
}

function getClientOSSnapshot(): ClientOS {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("android")) return "android";
  if (ua.includes("windows") || ua.includes("win64") || ua.includes("win32")) {
    return "win";
  }
  return "other";
}

function getServerOSSnapshot(): ClientOS {
  return "other";
}

interface DownloadControlProps {
  apiPath: string;
  releasesUrl: string;
  variant: "card" | "hero";
}

export default function YeobaekDownloadControl({
  apiPath,
  releasesUrl,
  variant,
}: DownloadControlProps) {
  const os = useSyncExternalStore(
    subscribeNoop,
    getClientOSSnapshot,
    getServerOSSnapshot
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  const winUrl = `${apiPath}?platform=win`;
  const androidUrl = `${apiPath}?platform=android`;

  const primaryHref =
    os === "win" ? winUrl : os === "android" ? androidUrl : releasesUrl;

  if (variant === "card") {
    const cardLabel =
      os === "win"
        ? "Download .exe ↓"
        : os === "android"
          ? "Download .apk ↓"
          : "Releases ↗";
    const isExternal = os === "other";

    return (
      <a
        href={primaryHref}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 transition-colors hover:text-emerald-300"
      >
        {cardLabel}
      </a>
    );
  }

  const heroLabel =
    os === "win"
      ? "Download for Windows (.exe) ↓"
      : os === "android"
        ? "Download for Android (.apk) ↓"
        : "Download App (.exe / .apk)";

  return (
    <div ref={containerRef} className="relative flex w-full sm:w-auto">
      {os === "other" ? (
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          className="flex w-full items-center justify-center gap-2 border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 transition-colors hover:bg-emerald-500/20 sm:w-auto sm:py-2.5"
        >
          <span>{heroLabel}</span>
          <span className="text-[10px]">{menuOpen ? "▲" : "▼"}</span>
        </button>
      ) : (
        <div className="flex w-full sm:w-auto">
          <a
            href={primaryHref}
            className="flex flex-1 items-center justify-center border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 transition-colors hover:bg-emerald-500/20 sm:flex-initial sm:py-2.5"
          >
            {heroLabel}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Choose download platform"
            aria-expanded={menuOpen}
            className="flex items-center justify-center border border-l-0 border-emerald-500/40 bg-emerald-500/10 px-3 py-3 text-[10px] font-mono text-emerald-300 transition-colors hover:bg-emerald-500/20 sm:py-2.5"
          >
            {menuOpen ? "▲" : "▼"}
          </button>
        </div>
      )}

      {menuOpen && (
        <div
          role="menu"
          className="absolute top-full left-0 z-30 mt-2 w-full min-w-[240px] border border-white/15 bg-zinc-950/95 p-1.5 shadow-2xl backdrop-blur-md sm:w-auto"
        >
          <a
            href={winUrl}
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 text-xs font-mono text-gray-200 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <span>Windows Installer</span>
            <span className="text-[10px] text-emerald-400">.exe ↓</span>
          </a>
          <a
            href={androidUrl}
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 text-xs font-mono text-gray-200 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <span>Android Package</span>
            <span className="text-[10px] text-emerald-400">.apk ↓</span>
          </a>
          <div className="my-1 border-t border-white/10" />
          <a
            href={releasesUrl}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-[11px] font-mono text-gray-400 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <span>All GitHub Releases</span>
            <span>↗</span>
          </a>
        </div>
      )}
    </div>
  );
}
