"use client";

import type { CSSProperties } from "react";
import IconRenderer from "@/components/IconRenderer";
import { hexToRgba, normalizeTheme, type ResolvedProfileTheme } from "@/constants/templates";
import type { KograflyLink, ProfileTheme } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  link: KograflyLink;
  preview?: boolean;
  theme?: ProfileTheme | ResolvedProfileTheme | null;
  onTrackClick?: (link: KograflyLink) => void;
};

const fallbackVariantClass: Record<string, string> = {
  solid: "border-stone-950 bg-stone-950 text-white shadow-soft hover:bg-kografly-indigo hover:border-kografly-indigo",
  outline: "border-stone-300 bg-white text-stone-950 hover:border-kografly-indigo hover:text-kografly-indigo",
  soft: "border-indigo-100 bg-indigo-50 text-kografly-indigo hover:bg-indigo-100",
  glass: "border-white/50 bg-white/60 text-stone-950 backdrop-blur hover:bg-white/90"
};

function getButtonStyle(link: KograflyLink, theme: ResolvedProfileTheme): CSSProperties {
  if (theme.template === "neoBrutal") {
    return {
      background: link.style_variant === "outline" ? theme.surface : theme.button,
      color: link.style_variant === "outline" ? theme.text : theme.buttonText,
      borderColor: theme.decorative,
      boxShadow: `8px 8px 0 ${theme.decorative}`
    };
  }

  if (theme.template === "studioJahit") {
    const solid = link.style_variant === "solid";
    return {
      background: solid ? theme.accent : theme.button,
      color: solid ? "#FFFFFF" : theme.buttonText,
      borderColor: solid ? theme.accent : hexToRgba(theme.decorative, 0.22),
      boxShadow: `0 16px 36px ${hexToRgba(theme.decorative, 0.14)}`
    };
  }

  if (theme.template === "popCreator") {
    return {
      background: link.style_variant === "outline" ? "transparent" : theme.button,
      color: link.style_variant === "outline" ? theme.button : theme.buttonText,
      borderColor: theme.button,
      boxShadow: `0 18px 38px ${hexToRgba(theme.button, 0.28)}`
    };
  }

  if (link.style_variant === "outline") {
    return {
      background: theme.surface,
      color: theme.button,
      borderColor: hexToRgba(theme.button, 0.22)
    };
  }

  if (link.style_variant === "soft") {
    return {
      background: hexToRgba(theme.accent, 0.12),
      color: theme.accent,
      borderColor: hexToRgba(theme.accent, 0.18)
    };
  }

  if (link.style_variant === "glass") {
    return {
      background: hexToRgba(theme.surface, 0.7),
      color: theme.text,
      borderColor: hexToRgba(theme.surface, 0.65),
      backdropFilter: "blur(14px)"
    };
  }

  return {
    background: theme.button,
    color: theme.buttonText,
    borderColor: theme.button,
    boxShadow: `0 18px 40px ${hexToRgba(theme.button, 0.16)}`
  };
}

function getTemplateClass(theme: ResolvedProfileTheme) {
  if (theme.template === "neoBrutal") {
    return "rounded-xl border-[3px] px-4 py-4 text-base font-black uppercase tracking-wide transition duration-200 hover:-translate-y-1";
  }

  if (theme.template === "popCreator") {
    return "rounded-[1.6rem] border-2 px-5 py-5 text-lg font-black tracking-wide transition duration-200 hover:-translate-y-1";
  }

  if (theme.template === "studioJahit") {
    return "rounded-full border px-5 py-4 text-sm font-black transition duration-200 hover:-translate-y-0.5";
  }

  return "rounded-[1.35rem] border px-4 py-3 text-sm transition duration-200 hover:-translate-y-0.5";
}

export default function LinkButton({ link, preview = false, theme, onTrackClick }: Props) {
  const resolvedTheme = theme ? normalizeTheme(theme) : null;
  const isPoster = resolvedTheme?.template === "popCreator";
  const isStudio = resolvedTheme?.template === "studioJahit";
  const isNeo = resolvedTheme?.template === "neoBrutal";

  const content = (
    <>
      <span
        className={cn(
          "flex shrink-0 items-center justify-center ring-1 ring-current/10",
          isPoster ? "h-11 w-11 rounded-full bg-white/20" : isStudio ? "h-9 w-9 rounded-full bg-white/20" : isNeo ? "h-10 w-10 rounded-lg border-2 border-current bg-white/20" : "h-10 w-10 rounded-2xl bg-white/20"
        )}
      >
        <IconRenderer name={link.icon_name} className="h-5 w-5" />
      </span>
      <span className={cn("min-w-0 flex-1 truncate font-bold", isPoster || isStudio ? "text-center" : "text-left")}>{link.title}</span>
      <span className="text-xs opacity-70">â†—</span>
    </>
  );

  const classes = cn(
    "group flex w-full items-center gap-3",
    resolvedTheme ? getTemplateClass(resolvedTheme) : "rounded-[1.35rem] border px-4 py-3 text-sm transition duration-200",
    !resolvedTheme && (fallbackVariantClass[link.style_variant] || fallbackVariantClass.solid),
    `link-animation-${link.animation}`
  );

  const style = resolvedTheme ? getButtonStyle(link, resolvedTheme) : undefined;

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

