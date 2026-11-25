"use client";

import React, { useState } from "react";
import { useSceneUI } from "./PersistentScene";

interface CopyButtonProps {
  value: string;
  label?: string;
  toastText?: string;
  className?: string;
}

export default function CopyButton({
  value,
  label = "Copy",
  toastText,
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useSceneUI();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      showToast(toastText ?? `Copied: ${value}`);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      showToast("Clipboard unavailable");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-gray-300 transition-all hover:border-blue-500/50 hover:bg-white/[0.08] hover:text-white ${className}`}
    >
      <span>{copied ? "Copied ✓" : label}</span>
    </button>
  );
}
