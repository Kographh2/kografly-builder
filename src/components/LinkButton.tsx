"use client";

import IconRenderer from "@/components/IconRenderer";
import type { KograflyLink } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  link: KograflyLink;
  preview?: boolean;
  onTrackClick?: (link: KograflyLink) => void;
};

const variantClass: Record<string, string> = {
  solid: "border-stone-950 bg-stone-950 text-white shadow-soft hover:bg-kografly-indigo hover:border-kografly-indigo",
  outline: "border-stone-300 bg-white text-stone-950 hover:border-kografly-indigo hover:text-kografly-indigo",
  soft: "border-indigo-100 bg-indigo-50 text-kografly-indigo hover:bg-indigo-100",
  glass: "border-white/50 bg-white/60 text-stone-950 backdrop-blur hover:bg-white/90"
};

export default function LinkButton({ link, preview = false, onTrackClick }: Props) {
  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-current/10">
        <IconRenderer name={link.icon_name} className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1 truncate text-left font-bold">{link.title}</span>
      <span className="text-xs opacity-60">↗</span>
    </>
  );

  const classes = cn(
    "group flex w-full items-center gap-3 rounded-[1.35rem] border px-4 py-3 text-sm transition duration-200",
    variantClass[link.style_variant] || variantClass.solid,
    `link-animation-${link.animation}`
  );

  if (preview) {
    return <div className={classes}>{content}</div>;
  }

  return (
    <a
      className={classes}
      href={link.url}
      target="_blank"
      rel="noreferrer"
      onClick={() => onTrackClick?.(link)}
    >
      {content}
    </a>
  );
}
