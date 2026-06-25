"use client";

import IconRenderer from "@/components/IconRenderer";
import type { CSSProperties } from "react";
import { hexToRgba, normalizeTheme, type ResolvedProfileTheme } from "@/constants/templates";
import type { KograflyLink, ProfileTheme } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  link: KograflyLink;
  preview?: boolean;
  theme?: ProfileTheme | ResolvedProfileTheme | null;
  onTrackClick?: (link: KograflyLink) => void;
};

function getButtonStyle(link: KograflyLink, theme: ResolvedProfileTheme): CSSProperties {
  const variant = link.style_variant || theme.buttonStyle;

  if (variant === "outline") {
    return {
      background: hexToRgba(theme.surface, 0.55),
      borderColor: hexToRgba(theme.button, 0.35),
      color: theme.button
    };
  }

  if (variant === "soft") {
    return {
      background: hexToRgba(theme.accent, 0.1),
      borderColor: hexToRgba(theme.accent, 0.16),
      color: theme.accent
    };
  }

  if (variant === "glass") {
    return {
      background: hexToRgba(theme.surface, 0.72),
      borderColor: hexToRgba(theme.text, 0.1),
      color: theme.text,
      backdropFilter: "blur(18px)"
    };
  }

  return {
    background: theme.button,
    borderColor: hexToRgba(theme.button, 0.95),
    color: theme.buttonText
  };
}

export default function LinkButton({ link, preview = false, theme: themeInput, onTrackClick }: Props) {
  const theme = normalizeTheme(themeInput);
  const style = getButtonStyle(link, theme);

  const content = (
    <>
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
        style={{ background: hexToRgba(theme.surface, 0.18), boxShadow: `inset 0 0 0 1px ${hexToRgba(theme.buttonText, 0.12)}` }}
      >
        <IconRenderer name={link.icon_name} className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1 truncate text-left text-[15px] font-semibold tracking-[-0.01em]">{link.title}</span>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs opacity-70 transition group-hover:opacity-100">â†—</span>
    </>
  );

  const classes = cn(
    "group flex w-full items-center gap-3 rounded-[1.45rem] border px-4 py-3.5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(15,23,42,0.13)]",
    `link-animation-${link.animation}`
  );

  if (preview) {
    return <div className={classes} style={style}>{content}</div>;
  }

  return (
    <a
      className={classes}
      style={style}
      href={link.url}
      target="_blank"
      rel="noreferrer"
      onClick={() => onTrackClick?.(link)}
    >
      {content}
    </a>
  );
}

