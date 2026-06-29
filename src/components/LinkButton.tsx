"use client";

import type { CSSProperties } from "react";
import { ChevronRight } from "lucide-react";
import IconRenderer from "@/components/IconRenderer";
import type { KograflyLink } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  link: KograflyLink;
  preview?: boolean;
  onTrackClick?: (link: KograflyLink) => void;
  buttonStyle?: "solid" | "outline" | "soft" | "glass";
  compact?: boolean;
  className?: string;
  style?: CSSProperties;
};

const variantClass: Record<string, string> = {
  solid: "k-link-solid",
  outline: "k-link-outline",
  soft: "k-link-soft",
  glass: "k-link-glass"
};

export default function LinkButton({
  link,
  preview = false,
  onTrackClick,
  buttonStyle,
  compact = false,
  className,
  style
}: Props) {
  const visualStyle = buttonStyle || link.style_variant || "solid";

  const content = (
    <>
      <span className="k-link-icon">
        <IconRenderer name={link.icon_name} className={compact ? "h-4 w-4" : "h-5 w-5"} />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate font-extrabold tracking-tight">{link.title}</span>
        {!compact && <span className="block truncate text-xs font-semibold opacity-60">Buka link</span>}
      </span>
      <span className="k-link-arrow">
        <ChevronRight className="h-5 w-5" />
      </span>
    </>
  );

  const classes = cn(
    "kografly-link group flex w-full items-center gap-3 rounded-[1.55rem] px-4 text-sm transition duration-200",
    compact ? "min-h-[58px] py-2.5" : "min-h-[76px] py-3.5",
    variantClass[visualStyle] || variantClass.solid,
    `link-animation-${link.animation}`,
    className
  );

  if (preview) {
    return <div className={classes} style={style}>{content}</div>;
  }

  return (
    <a
      className={classes}
      href={link.url}
      target="_blank"
      rel="noreferrer"
      onClick={() => onTrackClick?.(link)}
      style={style}
    >
      {content}
    </a>
  );
}
