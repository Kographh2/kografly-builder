"use client";

import type { KograflyMascotId } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function KograflyMascot({
  mascot,
  primary,
  secondary,
  soft,
  className,
  compact = false
}: {
  mascot: KograflyMascotId;
  primary: string;
  secondary: string;
  soft: string;
  className?: string;
  compact?: boolean;
}) {
  const common = "drop-shadow-[0_18px_34px_rgba(15,23,42,0.16)]";

  if (mascot === "fox") {
    return (
      <svg viewBox="0 0 220 220" role="img" aria-label="Linku mascot" className={cn(common, compact ? "h-24 w-24" : "h-36 w-36", className)}>
        <circle cx="110" cy="118" r="82" fill={soft} opacity="0.82" />
        <path d="M58 64 78 20l38 38 36-38 20 44-22 43H80L58 64Z" fill={primary} stroke="#0B1220" strokeWidth="5" />
        <path d="m78 35 22 28H66l12-28Zm64 0-22 28h34l-12-28Z" fill="#FFEAD8" opacity="0.95" />
        <circle cx="110" cy="100" r="58" fill={primary} stroke="#0B1220" strokeWidth="5" />
        <path d="M68 113c12 26 31 39 42 39s30-13 42-39c-16 10-31 15-42 15s-26-5-42-15Z" fill="#FFFFFF" opacity="0.95" />
        <circle cx="90" cy="92" r="8" fill="#071225" />
        <path d="M130 89c12 2 17-3 20-9" fill="none" stroke="#071225" strokeWidth="6" strokeLinecap="round" />
        <path d="m110 103 10 9-10 9-10-9 10-9Z" fill={secondary} stroke="#071225" strokeWidth="4" />
        <path d="M71 166c20 18 58 20 79 0l-9 30H80l-9-30Z" fill={primary} stroke="#0B1220" strokeWidth="5" />
        <path d="M104 174c9-12 24-12 33 0" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" opacity="0.95" />
        <path d="M105 174c-9 12-24 12-33 0" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" opacity="0.95" />
        <path d="M161 154c22 13 38-4 33-28 16 24 6 57-24 58" fill={secondary} stroke="#0B1220" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }

  if (mascot === "turtle") {
    return (
      <svg viewBox="0 0 220 220" role="img" aria-label="Linka mascot" className={cn(common, compact ? "h-24 w-24" : "h-36 w-36", className)}>
        <circle cx="110" cy="118" r="84" fill={soft} opacity="0.82" />
        <path d="M76 94c7-35 62-42 88-6 28 39 7 91-45 97-51 6-84-40-43-91Z" fill={secondary} stroke="#0B1220" strokeWidth="5" />
        <path d="M88 105c22-16 47-17 68 1M81 136h86M106 88c-11 32-11 58 0 91M137 89c8 31 5 58-8 91" fill="none" stroke={primary} strokeWidth="5" strokeLinecap="round" opacity="0.7" />
        <circle cx="104" cy="64" r="35" fill={soft} stroke="#0B1220" strokeWidth="5" />
        <circle cx="93" cy="58" r="7" fill="#071225" />
        <circle cx="116" cy="58" r="7" fill="#071225" />
        <path d="M94 77c10 8 22 8 31 0" fill="none" stroke="#071225" strokeWidth="5" strokeLinecap="round" />
        <path d="M62 139c-20-9-34 2-30 19 3 14 20 20 36 9" fill={soft} stroke="#0B1220" strokeWidth="5" strokeLinecap="round" />
        <path d="M166 139c18-9 33 1 31 17-2 15-20 22-36 11" fill={soft} stroke="#0B1220" strokeWidth="5" strokeLinecap="round" />
        <path d="M77 179c-12 16-6 28 12 29M151 179c13 16 7 28-11 29" fill="none" stroke="#0B1220" strokeWidth="7" strokeLinecap="round" />
        <rect x="82" y="123" width="70" height="38" rx="19" fill={primary} opacity="0.95" />
        <path d="M108 135c8-8 18-8 26 0M108 149c8 8 18 8 26 0" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 220 220" role="img" aria-label="Linko mascot" className={cn(common, compact ? "h-24 w-24" : "h-36 w-36", className)}>
      <circle cx="110" cy="118" r="84" fill={soft} opacity="0.82" />
      <path d="M56 72c7-32 34-48 54-28 20-20 47-4 54 28 19 85-40 128-54 128S37 157 56 72Z" fill={primary} stroke="#0B1220" strokeWidth="5" />
      <path d="M75 47c-4-19-19-29-38-31 2 29 15 48 36 57" fill={primary} stroke="#0B1220" strokeWidth="5" />
      <path d="M145 47c4-19 19-29 38-31-2 29-15 48-36 57" fill={primary} stroke="#0B1220" strokeWidth="5" />
      <circle cx="88" cy="102" r="33" fill="#FFFFFF" />
      <circle cx="132" cy="102" r="33" fill="#FFFFFF" />
      <circle cx="88" cy="102" r="18" fill={secondary} />
      <circle cx="132" cy="102" r="18" fill={secondary} />
      <circle cx="88" cy="102" r="10" fill="#071225" />
      <circle cx="132" cy="102" r="10" fill="#071225" />
      <circle cx="82" cy="94" r="5" fill="#FFFFFF" />
      <circle cx="126" cy="94" r="5" fill="#FFFFFF" />
      <path d="m110 121 14 12-14 13-14-13 14-12Z" fill="#F4B43A" stroke="#0B1220" strokeWidth="4" />
      <path d="M83 159c15 11 39 11 54 0" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" opacity="0.9" />
      <path d="M64 142c-24 3-40-8-47-25 20-1 36 5 48 18M156 142c24 3 40-8 47-25-20-1-36 5-48 18" fill={primary} stroke="#0B1220" strokeWidth="5" strokeLinecap="round" />
      <rect x="80" y="148" width="60" height="32" rx="16" fill={primary} />
      <path d="M102 158c8-8 18-8 26 0M102 169c8 8 18 8 26 0" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}
