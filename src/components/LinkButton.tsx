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
  const visualStyle = buttonStyle || link.style_variant || "soft";

  const content = (
    <>
      <span className="k-link-icon" aria-hidden="true">
        <IconRenderer name={link.icon_name} className={compact ? "h-[18px] w-[18px]" : "h-5 w-5"} />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate font-extrabold tracking-tight">{link.title}</span>
      </span>
      <span className="k-link-arrow" aria-hidden="true">
        <ChevronRight className="h-5 w-5" />
      </span>
    </>
  );

  const classes = cn(
    "kografly-link group flex w-full items-center gap-3 text-sm transition duration-200 sm:text-[15px]",
    compact ? "min-h-[58px] rounded-[1.25rem] px-3 py-2.5" : "min-h-[66px] rounded-[1.45rem] px-4 py-3",
    variantClass[visualStyle] || variantClass.soft,
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
