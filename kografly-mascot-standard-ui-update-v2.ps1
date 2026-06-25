$ErrorActionPreference = 'Stop'

Write-Host 'Applying Kografly mascot template update...'

New-Item -ItemType Directory -Force -Path 'src\lib' | Out-Null
New-Item -ItemType Directory -Force -Path 'src\constants' | Out-Null
New-Item -ItemType Directory -Force -Path 'src\components' | Out-Null
New-Item -ItemType Directory -Force -Path 'src\app' | Out-Null
[System.IO.Directory]::CreateDirectory((Join-Path (Get-Location) 'src\app\[username]')) | Out-Null

@'
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type KograflyTemplateId =
  | "blue-guide"
  | "blue-connector"
  | "blue-supporter"
  | "green-guide"
  | "green-connector"
  | "green-supporter"
  | "standard";

export type KograflyMascotId = "owl" | "fox" | "turtle";

export type ProfileTheme = {
  template?: KograflyTemplateId;
  mascot?: KograflyMascotId;
  background?: string;
  surface?: string;
  text?: string;
  muted?: string;
  accent?: string;
  secondary?: string;
  button?: string;
  buttonText?: string;
  decorative?: string;
  soft?: string;
  buttonStyle?: "solid" | "outline" | "soft" | "glass";
};

export type Profile = {
  id: string;
  owner_id: string;
  username: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
  is_published: boolean;
  theme: ProfileTheme | null;
  created_at: string;
  updated_at: string;
};

export type LinkAnimation =
  | "none"
  | "rise"
  | "pulse"
  | "wiggle"
  | "bounce"
  | "glow";

export type LinkStyleVariant = "solid" | "outline" | "soft" | "glass";

export type KograflyLink = {
  id: string;
  profile_id: string;
  owner_id: string;
  title: string;
  url: string;
  icon_name: string;
  animation: LinkAnimation;
  style_variant: LinkStyleVariant;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type AnalyticsType = "view" | "click";

export type AnalyticsEvent = {
  id: string;
  profile_id: string;
  link_id: string | null;
  type: AnalyticsType;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id?: string;
          owner_id: string;
          username: string;
          display_name?: string;
          bio?: string | null;
          avatar_url?: string | null;
          is_published?: boolean;
          theme?: ProfileTheme | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          username?: string;
          display_name?: string;
          bio?: string | null;
          avatar_url?: string | null;
          is_published?: boolean;
          theme?: ProfileTheme | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      links: {
        Row: KograflyLink;
        Insert: {
          id?: string;
          profile_id: string;
          owner_id: string;
          title?: string;
          url?: string;
          icon_name?: string;
          animation?: LinkAnimation;
          style_variant?: LinkStyleVariant;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          owner_id?: string;
          title?: string;
          url?: string;
          icon_name?: string;
          animation?: LinkAnimation;
          style_variant?: LinkStyleVariant;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      analytics_events: {
        Row: AnalyticsEvent;
        Insert: {
          id?: string;
          profile_id: string;
          link_id?: string | null;
          type: AnalyticsType;
          referrer?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          link_id?: string | null;
          type?: AnalyticsType;
          referrer?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
'@ | Set-Content -Encoding UTF8 -Path 'src\lib\types.ts'

@'
import type { KograflyMascotId, KograflyTemplateId, ProfileTheme } from "@/lib/types";

export type KograflyLayout = "guide" | "connector" | "supporter";

export type ResolvedProfileTheme = Required<Omit<ProfileTheme, "template" | "mascot">> & {
  template: Exclude<KograflyTemplateId, "standard">;
  mascot: KograflyMascotId;
  layout: KograflyLayout;
  colorMode: "blue" | "green";
  label: string;
};

type TemplatePreset = {
  id: Exclude<KograflyTemplateId, "standard">;
  name: string;
  colorMode: "blue" | "green";
  layout: KograflyLayout;
  mascot: KograflyMascotId;
  headline: string;
  description: string;
  tags: string[];
  theme: ResolvedProfileTheme;
};

const legacyColors: Record<string, string> = {
  indigo: "#1E5CC8",
  amber: "#D97706",
  teal: "#0F766E",
  stone: "#F6FAFF",
  ink: "#0B1D3A",
  gradient: "#E8F4FF"
};

function makeTheme(theme: ResolvedProfileTheme): ResolvedProfileTheme {
  return theme;
}

export const templatePresets: TemplatePreset[] = [
  {
    id: "blue-guide",
    name: "Blue Guide",
    colorMode: "blue",
    layout: "guide",
    mascot: "owl",
    headline: "Modern & clean",
    description: "Hero card rapi dengan mascot Linko sebagai guide.",
    tags: ["Linko", "Clean", "Brand"],
    theme: makeTheme({
      template: "blue-guide",
      layout: "guide",
      colorMode: "blue",
      label: "Blue Guide",
      mascot: "owl",
      background: "#F6FAFF",
      surface: "#FFFFFF",
      text: "#0B1D3A",
      muted: "#5E6B82",
      accent: "#1E5CC8",
      secondary: "#58A8FF",
      button: "#0B1D3A",
      buttonText: "#FFFFFF",
      decorative: "#D6E9FF",
      soft: "#EEF6FF",
      buttonStyle: "solid"
    })
  },
  {
    id: "blue-connector",
    name: "Blue Connector",
    colorMode: "blue",
    layout: "connector",
    mascot: "fox",
    headline: "CTA focused",
    description: "Tombol utama lebih kuat untuk kreator, jasa, dan bisnis.",
    tags: ["Linku", "CTA", "Bold"],
    theme: makeTheme({
      template: "blue-connector",
      layout: "connector",
      colorMode: "blue",
      label: "Blue Connector",
      mascot: "fox",
      background: "#EEF6FF",
      surface: "#FFFFFF",
      text: "#0B1D3A",
      muted: "#52627A",
      accent: "#1E5CC8",
      secondary: "#7BBFFF",
      button: "#1E5CC8",
      buttonText: "#FFFFFF",
      decorative: "#D6E9FF",
      soft: "#EAF4FF",
      buttonStyle: "solid"
    })
  },
  {
    id: "blue-supporter",
    name: "Blue Supporter",
    colorMode: "blue",
    layout: "supporter",
    mascot: "turtle",
    headline: "Calm support",
    description: "Soft, profesional, cocok untuk service dan customer care.",
    tags: ["Linka", "Soft", "Service"],
    theme: makeTheme({
      template: "blue-supporter",
      layout: "supporter",
      colorMode: "blue",
      label: "Blue Supporter",
      mascot: "turtle",
      background: "#F8FBFF",
      surface: "#FFFFFF",
      text: "#0B1D3A",
      muted: "#64748B",
      accent: "#1E5CC8",
      secondary: "#A9D6FF",
      button: "#EAF4FF",
      buttonText: "#0B1D3A",
      decorative: "#D6E9FF",
      soft: "#F4FAFF",
      buttonStyle: "soft"
    })
  },
  {
    id: "green-guide",
    name: "Green Guide",
    colorMode: "green",
    layout: "guide",
    mascot: "owl",
    headline: "Trust & natural",
    description: "Versi hijau yang lebih hangat dan terpercaya.",
    tags: ["Linko", "Trust", "Fresh"],
    theme: makeTheme({
      template: "green-guide",
      layout: "guide",
      colorMode: "green",
      label: "Green Guide",
      mascot: "owl",
      background: "#F7FBF5",
      surface: "#FFFFFF",
      text: "#0F3D2E",
      muted: "#5F6F65",
      accent: "#1E6B4B",
      secondary: "#7DBE7A",
      button: "#0F3D2E",
      buttonText: "#FFFFFF",
      decorative: "#D7EBCF",
      soft: "#EFF8EA",
      buttonStyle: "solid"
    })
  },
  {
    id: "green-connector",
    name: "Green Connector",
    colorMode: "green",
    layout: "connector",
    mascot: "fox",
    headline: "Growth CTA",
    description: "Tombol lebih standout dengan rasa natural dan premium.",
    tags: ["Linku", "Growth", "CTA"],
    theme: makeTheme({
      template: "green-connector",
      layout: "connector",
      colorMode: "green",
      label: "Green Connector",
      mascot: "fox",
      background: "#F2FAEF",
      surface: "#FFFFFF",
      text: "#0F3D2E",
      muted: "#536B5C",
      accent: "#1E6B4B",
      secondary: "#94CA88",
      button: "#1E6B4B",
      buttonText: "#FFFFFF",
      decorative: "#D7EBCF",
      soft: "#EDF8E8",
      buttonStyle: "solid"
    })
  },
  {
    id: "green-supporter",
    name: "Green Supporter",
    colorMode: "green",
    layout: "supporter",
    mascot: "turtle",
    headline: "Friendly service",
    description: "Layout lembut untuk brand yang ramah dan suportif.",
    tags: ["Linka", "Friendly", "Care"],
    theme: makeTheme({
      template: "green-supporter",
      layout: "supporter",
      colorMode: "green",
      label: "Green Supporter",
      mascot: "turtle",
      background: "#FBFAF3",
      surface: "#FFFFFF",
      text: "#0F3D2E",
      muted: "#697065",
      accent: "#1E6B4B",
      secondary: "#7DBE7A",
      button: "#EAF3DC",
      buttonText: "#0F3D2E",
      decorative: "#F5E9D6",
      soft: "#F2F6E9",
      buttonStyle: "soft"
    })
  }
];

export const defaultTheme = templatePresets[0].theme;

export const themeColorFields: Array<{
  key: keyof Pick<
    ResolvedProfileTheme,
    "background" | "surface" | "text" | "muted" | "accent" | "secondary" | "button" | "buttonText" | "decorative" | "soft"
  >;
  label: string;
  helper: string;
}> = [
  { key: "background", label: "Background", helper: "Warna halaman public" },
  { key: "surface", label: "Card", helper: "Warna kartu utama" },
  { key: "text", label: "Text", helper: "Nama dan judul" },
  { key: "muted", label: "Muted", helper: "Bio dan teks kecil" },
  { key: "accent", label: "Accent", helper: "Brand utama" },
  { key: "secondary", label: "Secondary", helper: "Gradient dan mascot" },
  { key: "button", label: "Button", helper: "Tombol link" },
  { key: "buttonText", label: "Text button", helper: "Teks tombol" },
  { key: "decorative", label: "Decorative", helper: "Ornamen lembut" },
  { key: "soft", label: "Soft fill", helper: "Background icon/panel" }
];

function color(value: string | undefined, fallback: string) {
  if (!value) return fallback;
  if (value.startsWith("#")) return value;
  return legacyColors[value] || fallback;
}

function getPreset(id?: string | null) {
  if (id === "standard") return defaultTheme;
  return templatePresets.find((item) => item.id === id)?.theme || defaultTheme;
}

function buttonStyle(value: unknown): ResolvedProfileTheme["buttonStyle"] {
  if (value === "outline" || value === "soft" || value === "glass" || value === "solid") return value;
  return "solid";
}

function mascot(value: unknown, fallback: KograflyMascotId): KograflyMascotId {
  if (value === "owl" || value === "fox" || value === "turtle") return value;
  return fallback;
}

export function normalizeTheme(theme?: ProfileTheme | null): ResolvedProfileTheme {
  const raw = theme as Record<string, unknown> | null | undefined;
  const preset = getPreset(typeof raw?.template === "string" ? raw.template : undefined);

  return {
    template: preset.template,
    layout: preset.layout,
    colorMode: preset.colorMode,
    label: preset.label,
    mascot: mascot(raw?.mascot, preset.mascot),
    background: color(typeof raw?.background === "string" ? raw.background : undefined, preset.background),
    surface: color(typeof raw?.surface === "string" ? raw.surface : undefined, preset.surface),
    text: color(typeof raw?.text === "string" ? raw.text : undefined, preset.text),
    muted: color(typeof raw?.muted === "string" ? raw.muted : undefined, preset.muted),
    accent: color(typeof raw?.accent === "string" ? raw.accent : undefined, preset.accent),
    secondary: color(typeof raw?.secondary === "string" ? raw.secondary : undefined, preset.secondary),
    button: color(typeof raw?.button === "string" ? raw.button : undefined, preset.button),
    buttonText: color(typeof raw?.buttonText === "string" ? raw.buttonText : undefined, preset.buttonText),
    decorative: color(typeof raw?.decorative === "string" ? raw.decorative : undefined, preset.decorative),
    soft: color(typeof raw?.soft === "string" ? raw.soft : undefined, preset.soft),
    buttonStyle: buttonStyle(raw?.buttonStyle || preset.buttonStyle)
  };
}

export function applyTemplate(id: Exclude<KograflyTemplateId, "standard">) {
  const preset = templatePresets.find((item) => item.id === id);
  return preset ? { ...preset.theme } : { ...defaultTheme };
}

export function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const bigint = Number.parseInt(full, 16);

  if (Number.isNaN(bigint)) return `rgba(0, 0, 0, ${alpha})`;

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
'@ | Set-Content -Encoding UTF8 -Path 'src\constants\templates.ts'

@'
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
'@ | Set-Content -Encoding UTF8 -Path 'src\components\KograflyMascot.tsx'

@'
"use client";

import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Props = {
  name?: string | null;
  className?: string;
  strokeWidth?: number;
};

const ICON_ALIASES: Record<string, string> = {
  Website: "Globe2",
  Instagram: "Camera",
  Facebook: "UsersRound",
  Youtube: "Play",
  YouTube: "Play",
  Linkedin: "UserRound",
  LinkedIn: "UserRound",
  Github: "GitBranch",
  GitHub: "GitBranch",
  Twitter: "AtSign",
  X: "AtSign",
  Tiktok: "Music2",
  TikTok: "Music2",
  Twitch: "Radio",
  Telegram: "Send",
  WhatsApp: "MessageCircle",
  Discord: "MessagesSquare",
  Portfolio: "BriefcaseBusiness",
  Email: "Mail",
  Shop: "ShoppingBag",
  Social: "AtSign",
  Gaming: "Gamepad2",
  Code: "Code2",
  Community: "MessageCircle",
  Customer: "Headphones",
  FAQ: "CircleHelp",
  Privacy: "LockKeyhole",
  Service: "ShieldCheck"
};

export default function IconRenderer({ name = "Globe2", className = "h-5 w-5", strokeWidth = 2 }: Props) {
  const iconMap = LucideIcons as unknown as Record<string, LucideIcon>;
  const aliasedName = ICON_ALIASES[name || "Globe2"] || name || "Globe2";
  const Icon = iconMap[aliasedName] || iconMap.Globe2 || iconMap.Link;

  return <Icon className={className} strokeWidth={strokeWidth} />;
}
'@ | Set-Content -Encoding UTF8 -Path 'src\components\IconRenderer.tsx'

@'
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
      background: hexToRgba(theme.surface, 0.62),
      borderColor: hexToRgba(theme.button, 0.36),
      color: theme.button
    };
  }

  if (variant === "soft") {
    return {
      background: theme.button,
      borderColor: hexToRgba(theme.accent, 0.08),
      color: theme.buttonText,
      boxShadow: `0 12px 28px ${hexToRgba(theme.accent, 0.08)}`
    };
  }

  if (variant === "glass") {
    return {
      background: hexToRgba(theme.surface, 0.74),
      borderColor: hexToRgba(theme.text, 0.1),
      color: theme.text,
      backdropFilter: "blur(18px)"
    };
  }

  return {
    background: theme.button,
    borderColor: hexToRgba(theme.button, 0.95),
    color: theme.buttonText,
    boxShadow: `0 16px 34px ${hexToRgba(theme.accent, 0.18)}`
  };
}

export default function LinkButton({ link, preview = false, theme: themeInput, onTrackClick }: Props) {
  const theme = normalizeTheme(themeInput);
  const style = getButtonStyle(link, theme);

  const content = (
    <>
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
        style={{ background: hexToRgba(theme.surface, 0.23), boxShadow: `inset 0 0 0 1px ${hexToRgba(theme.buttonText, 0.14)}` }}
      >
        <IconRenderer name={link.icon_name} className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1 truncate text-left text-[15px] font-bold tracking-[-0.01em]">{link.title}</span>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs opacity-70 transition group-hover:opacity-100">↗</span>
    </>
  );

  const classes = cn(
    "group flex w-full items-center gap-3 rounded-[1.35rem] border px-4 py-3.5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(15,23,42,0.13)]",
    theme.layout === "connector" && "rounded-[1.2rem]",
    theme.layout === "supporter" && "rounded-[1.6rem]",
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
'@ | Set-Content -Encoding UTF8 -Path 'src\components\LinkButton.tsx'

@'
"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { ExternalLink, Sparkles } from "lucide-react";
import KograflyMascot from "@/components/KograflyMascot";
import LinkButton from "@/components/LinkButton";
import { hexToRgba, normalizeTheme } from "@/constants/templates";
import type { KograflyLink, Profile } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  profile: Profile;
  links: KograflyLink[];
  preview?: boolean;
  compact?: boolean;
  showBrand?: boolean;
  className?: string;
  onTrackClick?: (link: KograflyLink) => void;
};

function MascotProfile({ profile, compact }: { profile: Profile; compact: boolean }) {
  const theme = normalizeTheme(profile.theme);
  const sizeClass = compact ? "h-24 w-24" : "h-28 w-28";

  if (profile.avatar_url) {
    return (
      <div
        className={cn("relative mx-auto grid place-items-center overflow-hidden rounded-full bg-white shadow-[0_18px_50px_rgba(15,23,42,0.14)]", sizeClass)}
        style={{ border: `6px solid ${hexToRgba(theme.surface, 0.95)}` }}
      >
        <Image
          src={profile.avatar_url}
          alt={profile.display_name}
          width={compact ? 96 : 112}
          height={compact ? 96 : 112}
          className="h-full w-full object-cover"
          priority={!compact}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto grid place-items-center">
      <KograflyMascot mascot={theme.mascot} primary={theme.accent} secondary={theme.secondary} soft={theme.soft} compact={compact} />
    </div>
  );
}

function MiniMascot({ profile, className }: { profile: Profile; className?: string }) {
  const theme = normalizeTheme(profile.theme);
  if (!profile.avatar_url) return null;
  return (
    <KograflyMascot
      mascot={theme.mascot}
      primary={theme.accent}
      secondary={theme.secondary}
      soft={theme.soft}
      compact
      className={cn("pointer-events-none absolute opacity-95", className)}
    />
  );
}

function ProfileHeader({ profile, compact, align = "center" }: { profile: Profile; compact: boolean; align?: "center" | "left" }) {
  const theme = normalizeTheme(profile.theme);
  const isLeft = align === "left";

  return (
    <div className={cn(isLeft ? "text-left" : "text-center")}>
      <h1
        className={cn("break-words font-extrabold tracking-[-0.055em]", compact ? "text-3xl" : "text-4xl sm:text-5xl", !isLeft && "mt-4")}
        style={{ color: theme.text }}
      >
        {profile.display_name}
      </h1>
      <p className={cn("mt-1 break-words text-sm font-bold", isLeft && "text-[13px]")} style={{ color: theme.accent }}>
        /{profile.username}
      </p>
      {profile.bio ? (
        <p className={cn("mt-4 break-words text-sm leading-7", isLeft ? "max-w-[230px]" : "mx-auto max-w-md")} style={{ color: theme.muted }}>
          {profile.bio}
        </p>
      ) : null}
    </div>
  );
}

function BrandBadge({ compact }: { compact: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em]", compact && "text-[9px]")}> 
      <Sparkles className="h-3.5 w-3.5" />
      Kografly
    </span>
  );
}

export default function ProfileCanvas({
  profile,
  links,
  preview = false,
  compact = false,
  showBrand = true,
  className,
  onTrackClick
}: Props) {
  const theme = normalizeTheme(profile.theme);
  const sortedLinks = links
    .filter((link) => link.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);

  const pageStyle: CSSProperties = {
    color: theme.text,
    backgroundColor: theme.background,
    backgroundImage:
      `radial-gradient(circle at 12% 8%, ${hexToRgba(theme.secondary, 0.26)} 0, transparent 28%), ` +
      `radial-gradient(circle at 88% 10%, ${hexToRgba(theme.accent, 0.14)} 0, transparent 24%), ` +
      `linear-gradient(180deg, ${theme.background}, ${hexToRgba(theme.decorative, 0.48)})`
  };

  const frameStyle: CSSProperties = {
    background: hexToRgba(theme.surface, 0.92),
    borderColor: hexToRgba(theme.text, 0.08)
  };

  const wrapperClasses = cn("min-h-screen w-full overflow-hidden", compact && "min-h-0", className);
  const sectionClasses = cn("mx-auto w-full", compact ? "max-w-none px-0 py-0" : "max-w-xl px-4 py-8 sm:py-12");
  const cardClasses = cn(
    "relative overflow-hidden border backdrop-blur-xl",
    compact ? "min-h-full rounded-none border-0 shadow-none" : "rounded-[2.1rem] shadow-[0_28px_80px_rgba(15,23,42,0.13)]"
  );

  const linksBlock = (
    <div className={cn("relative z-10 space-y-3", compact ? "mt-6" : "mt-7")}>
      {sortedLinks.length ? (
        sortedLinks.map((link) => (
          <LinkButton key={link.id} link={link} theme={theme} preview={preview} onTrackClick={onTrackClick} />
        ))
      ) : (
        <p
          className="rounded-[1.45rem] border border-dashed p-6 text-center text-sm font-semibold"
          style={{ borderColor: hexToRgba(theme.text, 0.16), background: hexToRgba(theme.surface, 0.62), color: theme.muted }}
        >
          Belum ada link yang dipublish.
        </p>
      )}
    </div>
  );

  if (theme.layout === "connector") {
    return (
      <main className={wrapperClasses} style={pageStyle}>
        <section className={sectionClasses}>
          <article className={cardClasses} style={frameStyle}>
            <div
              className="absolute -right-20 -top-24 h-64 w-64 rounded-full blur-2xl"
              style={{ background: hexToRgba(theme.secondary, 0.42) }}
            />
            <div className={cn("relative z-10", compact ? "px-5 py-7" : "px-7 py-9 sm:px-10")}> 
              <div className="mb-6 flex items-center justify-between gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full text-white shadow-soft" style={{ background: theme.accent }}>
                  <Sparkles className="h-5 w-5" />
                </span>
                <span className="rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ borderColor: hexToRgba(theme.accent, 0.18), color: theme.accent }}>
                  {theme.label}
                </span>
              </div>

              <div className="grid grid-cols-[1fr_auto] items-end gap-2">
                <ProfileHeader profile={profile} compact={compact} align="left" />
                <div className="relative -mb-3 -mr-4">
                  {profile.avatar_url ? (
                    <div className="mb-2 ml-auto h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-soft">
                      <Image src={profile.avatar_url} alt={profile.display_name} width={80} height={80} className="h-full w-full object-cover" />
                    </div>
                  ) : null}
                  <KograflyMascot mascot={theme.mascot} primary={theme.accent} secondary={theme.secondary} soft={theme.soft} compact={compact} />
                </div>
              </div>

              <div className="mt-6 rounded-[1.6rem] p-4" style={{ background: `linear-gradient(180deg, ${hexToRgba(theme.soft, 0.88)}, ${hexToRgba(theme.decorative, 0.62)})` }}>
                {linksBlock}
              </div>
            </div>
          </article>

          {showBrand ? <BuiltWith theme={theme} /> : null}
        </section>
      </main>
    );
  }

  if (theme.layout === "supporter") {
    return (
      <main className={wrapperClasses} style={pageStyle}>
        <section className={sectionClasses}>
          <article className={cardClasses} style={frameStyle}>
            <div
              className="absolute inset-x-0 top-0 h-44"
              style={{ background: `linear-gradient(135deg, ${hexToRgba(theme.decorative, 0.85)}, ${hexToRgba(theme.soft, 0.92)})` }}
            />
            <div
              className="absolute left-0 top-32 h-16 w-full"
              style={{ background: `radial-gradient(120% 95% at 50% 0%, transparent 50%, ${hexToRgba(theme.surface, 0.94)} 51%)` }}
            />
            <MiniMascot profile={profile} className="right-2 top-12" />
            <div className={cn("relative z-10", compact ? "px-5 pb-7 pt-10" : "px-7 pb-9 pt-12 sm:px-10")}> 
              <MascotProfile profile={profile} compact={compact} />
              <ProfileHeader profile={profile} compact={compact} />
              <div className="mt-6 rounded-[1.8rem] border p-3" style={{ borderColor: hexToRgba(theme.text, 0.08), background: hexToRgba(theme.surface, 0.55) }}>
                {linksBlock}
              </div>
            </div>
          </article>

          {showBrand ? <BuiltWith theme={theme} /> : null}
        </section>
      </main>
    );
  }

  return (
    <main className={wrapperClasses} style={pageStyle}>
      <section className={sectionClasses}>
        <article className={cardClasses} style={frameStyle}>
          <div
            className={cn("relative overflow-hidden", compact ? "h-28" : "h-36")}
            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.secondary})` }}
          >
            <div className="absolute -left-12 -top-16 h-40 w-40 rounded-full bg-white/15" />
            <div className="absolute -right-12 bottom-0 h-44 w-44 rounded-full bg-white/14" />
            <MiniMascot profile={profile} className="right-2 top-3" />
            <div className="absolute left-5 top-5 text-white/95">
              <BrandBadge compact={compact} />
            </div>
          </div>

          <div className={cn("relative z-10", compact ? "px-5 pb-7" : "px-7 pb-9 sm:px-10")}> 
            <div className={compact ? "-mt-12" : "-mt-14"}>
              <MascotProfile profile={profile} compact={compact} />
            </div>
            <ProfileHeader profile={profile} compact={compact} />
            {linksBlock}
          </div>
        </article>

        {showBrand ? <BuiltWith theme={theme} /> : null}
      </section>
    </main>
  );
}

function BuiltWith({ theme }: { theme: ReturnType<typeof normalizeTheme> }) {
  return (
    <a
      href="/"
      className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold shadow-[0_12px_34px_rgba(15,23,42,0.08)] backdrop-blur transition hover:-translate-y-0.5"
      style={{ background: hexToRgba(theme.surface, 0.86), borderColor: hexToRgba(theme.text, 0.08), color: theme.text }}
    >
      Built with Kografly <ExternalLink className="h-4 w-4" />
    </a>
  );
}
'@ | Set-Content -Encoding UTF8 -Path 'src\components\ProfileCanvas.tsx'

@'
"use client";

import ProfileCanvas from "@/components/ProfileCanvas";
import { defaultTheme } from "@/constants/templates";
import type { KograflyLink, Profile } from "@/lib/types";

export default function PhonePreview({ profile, links }: { profile: Profile | null; links: KograflyLink[] }) {
  const fallbackProfile: Profile = profile || {
    id: "preview",
    owner_id: "preview",
    username: "username",
    display_name: "Kografly Creator",
    bio: "Tulis bio singkat kamu dan susun link favoritmu.",
    avatar_url: null,
    is_published: true,
    theme: defaultTheme,
    created_at: "",
    updated_at: ""
  };

  return (
    <aside className="mx-auto h-fit w-full max-w-[390px] self-start rounded-[2.25rem] border border-stone-200 bg-stone-950 p-3 shadow-thread lg:sticky lg:top-6">
      <div className="relative h-[680px] max-h-[calc(100vh-96px)] min-h-[560px] overflow-hidden rounded-[1.75rem] bg-[#F6FAFF]">
        <div className="pointer-events-none absolute left-1/2 top-4 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-stone-950/90" />
        <div className="kografly-scrollbar h-full overflow-y-auto pt-12">
          <ProfileCanvas profile={fallbackProfile} links={links} preview compact showBrand={false} />
        </div>
      </div>
    </aside>
  );
}
'@ | Set-Content -Encoding UTF8 -Path 'src\components\PhonePreview.tsx'

@'
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ProfileCanvas from "@/components/ProfileCanvas";
import { supabase } from "@/lib/supabase/client";
import type { KograflyLink, Profile } from "@/lib/types";

type Props = {
  initialProfile: Profile;
  initialLinks: KograflyLink[];
};

export default function PublicProfile({ initialProfile, initialLinks }: Props) {
  const [profile, setProfile] = useState(initialProfile);
  const [links, setLinks] = useState(initialLinks);
  const trackedView = useRef(false);

  useEffect(() => {
    if (trackedView.current) return;
    trackedView.current = true;

    void fetch("/api/track/view", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ profile_id: initialProfile.id }),
      keepalive: true
    });
  }, [initialProfile.id]);

  useEffect(() => {
    const channel = supabase
      .channel(`public-profile:${initialProfile.id}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "profiles", filter: `id=eq.${initialProfile.id}` }, (payload) => {
        setProfile(payload.new as Profile);
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "links", filter: `profile_id=eq.${initialProfile.id}` }, async () => {
        const { data } = await supabase
          .from("links")
          .select("*")
          .eq("profile_id", initialProfile.id)
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        setLinks((data || []) as KograflyLink[]);
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [initialProfile.id]);

  const sortedLinks = useMemo(() => links.filter((link) => link.is_active).sort((a, b) => a.sort_order - b.sort_order), [links]);

  function trackClick(link: KograflyLink) {
    const payload = JSON.stringify({ profile_id: profile.id, link_id: link.id });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track/click", new Blob([payload], { type: "application/json" }));
      return;
    }

    void fetch("/api/track/click", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: payload,
      keepalive: true
    });
  }

  return <ProfileCanvas profile={profile} links={sortedLinks} onTrackClick={trackClick} />;
}
'@ | Set-Content -Encoding UTF8 -Path 'src\components\PublicProfile.tsx'

@'
import IconRenderer from "@/components/IconRenderer";
import KograflyMascot from "@/components/KograflyMascot";

const previewLinks = [
  { title: "Website", icon: "Website" },
  { title: "Produk / Layanan", icon: "Shop" },
  { title: "Hubungi Kami", icon: "WhatsApp" }
];

export default function LandingPreview() {
  return (
    <div className="mx-auto max-w-[390px] rounded-[2rem] border border-[#D6E9FF] bg-white p-4 shadow-thread">
      <div className="overflow-hidden rounded-[1.6rem] bg-[#F6FAFF]">
        <div className="relative h-36 bg-gradient-to-br from-[#0B1D3A] via-[#1E5CC8] to-[#58A8FF]">
          <div className="absolute left-5 top-5 h-12 w-12 rounded-full bg-white/15" />
          <KograflyMascot mascot="owl" primary="#1E5CC8" secondary="#58A8FF" soft="#D6E9FF" className="absolute -bottom-12 right-4 h-32 w-32" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-xs font-bold uppercase tracking-[.18em] opacity-80">Brand Link</p>
            <h2 className="text-2xl font-extrabold tracking-[-0.04em]">Selamat Datang</h2>
          </div>
        </div>

        <div className="px-6 pb-7 pt-14 text-center">
          <h3 className="text-3xl font-extrabold tracking-[-0.05em] text-[#0B1D3A]">Kografly Studio</h3>
          <p className="mt-1 text-sm font-bold text-[#1E5CC8]">/studio</p>
          <p className="mx-auto mt-3 max-w-[260px] text-sm leading-6 text-[#5E6B82]">
            Bio link rapi dengan mascot, warna brand, realtime, dan template siap pakai.
          </p>
        </div>

        <div className="space-y-3 px-5 pb-6">
          {previewLinks.map((link) => (
            <div
              key={link.title}
              className="flex items-center gap-3 rounded-[1.35rem] border border-[#D6E9FF] bg-white px-4 py-3.5 text-[#0B1D3A] shadow-soft"
            >
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#EAF4FF] text-[#1E5CC8]">
                <IconRenderer name={link.icon} className="h-5 w-5" />
              </span>
              <span className="font-bold">{link.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
'@ | Set-Content -Encoding UTF8 -Path 'src\components\LandingPreview.tsx'

@'
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Check, ExternalLink, Loader2, LogOut, Plus, RotateCcw, Save, UserRound } from "lucide-react";
import AvatarUploader from "@/components/AvatarUploader";
import KograflyMascot from "@/components/KograflyMascot";
import LinkCardEditor from "@/components/LinkCardEditor";
import PhonePreview from "@/components/PhonePreview";
import RealtimeBadge from "@/components/RealtimeBadge";
import { applyTemplate, defaultTheme, normalizeTheme, templatePresets, themeColorFields } from "@/constants/templates";
import { supabase } from "@/lib/supabase/client";
import type { KograflyLink, Profile, ProfileTheme } from "@/lib/types";
import { ensureUrl, getSiteUrl, isValidUsername, normalizeUsername } from "@/lib/utils";

type UserState = { id: string; email?: string };

export default function BuilderClient() {
  const router = useRouter();
  const [user, setUser] = useState<UserState | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<KograflyLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const publicUrl = useMemo(() => (profile ? `${getSiteUrl()}/${profile.username}` : ""), [profile]);
  const currentTheme = useMemo(() => normalizeTheme(profile?.theme), [profile?.theme]);

  useEffect(() => {
    let mounted = true;

    async function boot() {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        router.push("/login");
        return;
      }

      const sessionUser = { id: data.session.user.id, email: data.session.user.email || undefined };
      if (!mounted) return;
      setUser(sessionUser);
      await loadProfile(sessionUser.id);
    }

    void boot();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (!profile?.id) return;

    const channel = supabase
      .channel(`builder:${profile.id}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "profiles", filter: `id=eq.${profile.id}` }, (payload) => {
        setProfile(payload.new as Profile);
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "links", filter: `profile_id=eq.${profile.id}` }, () => {
        void loadLinks(profile.id);
      })
      .subscribe((status) => setConnected(status === "SUBSCRIBED"));

    return () => {
      setConnected(false);
      void supabase.removeChannel(channel);
    };
  }, [profile?.id]);

  async function loadProfile(userId: string) {
    setLoading(true);
    const { data: profileData, error } = await supabase.from("profiles").select("*").eq("owner_id", userId).maybeSingle();
    const loadedProfile = profileData as Profile | null;

    if (error) setMessage(error.message);
    if (loadedProfile) {
      setProfile({ ...loadedProfile, theme: normalizeTheme(loadedProfile.theme) });
      await loadLinks(loadedProfile.id);
    }

    setLoading(false);
  }

  async function loadLinks(profileId: string) {
    const { data, error } = await supabase.from("links").select("*").eq("profile_id", profileId).order("sort_order", { ascending: true });

    if (error) {
      setMessage(error.message);
      return;
    }

    setLinks((data || []) as KograflyLink[]);
  }

  async function createProfile(usernameInput: string) {
    if (!user) return;

    const username = normalizeUsername(usernameInput);
    if (!isValidUsername(username)) {
      setMessage("Username minimal 3 karakter dan hanya boleh huruf kecil, angka, titik, strip, atau underscore.");
      return;
    }

    setSaving(true);
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        owner_id: user.id,
        username,
        display_name: username.replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        bio: "Halo! Ini semua link penting saya di Kografly.",
        is_published: true,
        theme: defaultTheme
      })
      .select("*")
      .single();
    setSaving(false);

    if (error) {
      setMessage(error.message.includes("duplicate") ? "Username sudah dipakai." : error.message);
      return;
    }

    setProfile(data as Profile);
    setLinks([]);
  }

  async function saveProfile() {
    if (!profile) return;

    const username = normalizeUsername(profile.username);
    if (!isValidUsername(username)) {
      setMessage("Username tidak valid. Gunakan 3-30 karakter: huruf kecil, angka, titik, strip, atau underscore.");
      return;
    }

    setSaving(true);
    const { data, error } = await supabase
      .from("profiles")
      .update({
        username,
        display_name: profile.display_name,
        bio: profile.bio,
        avatar_url: profile.avatar_url,
        is_published: profile.is_published,
        theme: normalizeTheme(profile.theme)
      })
      .eq("id", profile.id)
      .select("*")
      .single();
    setSaving(false);

    if (error) {
      setMessage(error.message.includes("duplicate") ? "Username sudah dipakai." : error.message);
      return;
    }

    setMessage("Template, warna, dan profile sudah tersimpan.");
    setProfile(data as Profile);
  }

  async function addLink() {
    if (!profile || !user) return;

    const nextOrder = links.length;
    const { data, error } = await supabase
      .from("links")
      .insert({
        profile_id: profile.id,
        owner_id: user.id,
        title: `Link baru ${links.length + 1}`,
        url: "https://example.com",
        icon_name: "Globe2",
        animation: "rise",
        style_variant: currentTheme.buttonStyle,
        sort_order: nextOrder,
        is_active: true
      })
      .select("*")
      .single();

    if (error) {
      setMessage(error.message);
      return;
    }

    setLinks((current) => [...current, data as KograflyLink].sort((a, b) => a.sort_order - b.sort_order));
  }

  function updateLocalLink(next: KograflyLink) {
    setLinks((current) => current.map((item) => (item.id === next.id ? next : item)).sort((a, b) => a.sort_order - b.sort_order));
  }

  function updateTheme(nextTheme: ProfileTheme) {
    if (!profile) return;
    setProfile({ ...profile, theme: normalizeTheme(nextTheme) });
  }

  async function saveLink(link: KograflyLink) {
    const { error } = await supabase
      .from("links")
      .update({
        title: link.title,
        url: ensureUrl(link.url),
        icon_name: link.icon_name,
        animation: link.animation,
        style_variant: link.style_variant,
        is_active: link.is_active,
        sort_order: link.sort_order
      })
      .eq("id", link.id);

    if (error) setMessage(error.message);
    else setMessage(`Link “${link.title}” tersimpan.`);
  }

  async function deleteLink(link: KograflyLink) {
    const { error } = await supabase.from("links").delete().eq("id", link.id);
    if (error) setMessage(error.message);
    else setLinks((current) => current.filter((item) => item.id !== link.id));
  }

  async function reorder(link: KograflyLink, direction: -1 | 1) {
    const sorted = [...links].sort((a, b) => a.sort_order - b.sort_order);
    const index = sorted.findIndex((item) => item.id === link.id);
    const targetIndex = index + direction;

    if (index < 0 || targetIndex < 0 || targetIndex >= sorted.length) return;

    const target = sorted[targetIndex];
    const linkOrder = link.sort_order;
    const targetOrder = target.sort_order;

    updateLocalLink({ ...link, sort_order: targetOrder });
    updateLocalLink({ ...target, sort_order: linkOrder });

    await Promise.all([
      supabase.from("links").update({ sort_order: targetOrder }).eq("id", link.id),
      supabase.from("links").update({ sort_order: linkOrder }).eq("id", target.id)
    ]);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-kografly-stone thread-grid">
        <Loader2 className="h-8 w-8 animate-spin text-kografly-indigo" />
      </main>
    );
  }

  if (!profile) {
    return <CreateProfile saving={saving} onCreate={createProfile} message={message} />;
  }

  return (
    <main className="min-h-screen bg-kografly-stone px-4 py-6 thread-grid lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col justify-between gap-4 rounded-[2rem] border border-stone-200 bg-white/95 p-5 shadow-soft backdrop-blur md:flex-row md:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[.25em] text-kografly-teal">Kografly Builder</p>
            <h1 className="text-4xl font-extrabold tracking-[-0.055em] text-stone-950">Editor bio-link</h1>
            <p className="mt-1 text-sm text-stone-500">
              Public URL: <a className="font-bold text-kografly-indigo" href={publicUrl} target="_blank" rel="noreferrer">{publicUrl}</a>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <RealtimeBadge connected={connected} />
            <Link href="/dashboard" className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold text-stone-700 hover:text-kografly-indigo">Dashboard</Link>
            <a href={publicUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-4 py-2 text-sm font-bold text-white"><ExternalLink className="h-4 w-4" /> Public</a>
            <button onClick={logout} className="rounded-full border border-stone-200 bg-white p-2 text-stone-500 hover:text-kografly-error"><LogOut className="h-4 w-4" /></button>
          </div>
        </header>

        {message ? <p className="mb-5 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-semibold text-kografly-amber">{message}</p> : null}

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_410px]">
          <section className="space-y-6">
            <article className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[.2em] text-kografly-teal">Profile</p>
                  <h2 className="text-3xl font-extrabold tracking-[-0.055em] text-stone-950">Identitas public</h2>
                </div>
                <label className="flex items-center gap-2 rounded-full border border-stone-200 px-3 py-2 text-sm font-bold text-stone-600">
                  <input type="checkbox" checked={profile.is_published} onChange={(e) => setProfile({ ...profile, is_published: e.target.checked })} className="accent-kografly-indigo" /> Published
                </label>
              </div>

              <AvatarUploader
                userId={user?.id || profile.owner_id}
                avatarUrl={profile.avatar_url}
                displayName={profile.display_name}
                onUploaded={(url) => setProfile({ ...profile, avatar_url: url })}
              />

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-stone-700">Display name</span>
                  <input value={profile.display_name} onChange={(e) => setProfile({ ...profile, display_name: e.target.value })} className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-kografly-indigo" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-stone-700">Username</span>
                  <div className="flex rounded-2xl border border-stone-200 px-4 py-3 font-bold focus-within:border-kografly-indigo">
                    <span className="text-kografly-amber">/</span>
                    <input value={profile.username} onChange={(e) => setProfile({ ...profile, username: normalizeUsername(e.target.value) })} className="w-full bg-transparent px-1 outline-none" />
                  </div>
                </label>
              </div>
              <label className="mt-4 block">
                <span className="mb-2 block text-sm font-bold text-stone-700">Bio</span>
                <textarea value={profile.bio || ""} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} rows={4} className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-kografly-indigo" />
              </label>
            </article>

            <article className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[.2em] text-kografly-amber">Template</p>
                  <h2 className="text-3xl font-extrabold tracking-[-0.055em] text-stone-950">Kografly Standard UI</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                    Pilih salah satu dari 3 layout biru atau 3 layout hijau. Klik template untuk preview di HP, lalu simpan kalau sudah cocok.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => updateTheme(defaultTheme)}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm font-bold text-stone-600 hover:text-kografly-indigo"
                >
                  <RotateCcw className="h-4 w-4" /> Reset
                </button>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {templatePresets.map((preset) => {
                  const active = currentTheme.template === preset.id;
                  return (
                    <button
                      type="button"
                      key={preset.id}
                      onClick={() => updateTheme(applyTemplate(preset.id))}
                      className={`group overflow-hidden rounded-[1.55rem] border p-0 text-left transition hover:-translate-y-0.5 ${active ? "border-kografly-indigo shadow-thread" : "border-stone-200 shadow-soft"}`}
                    >
                      <div className="relative h-28 overflow-hidden" style={{ background: `linear-gradient(135deg, ${preset.theme.accent}, ${preset.theme.secondary})` }}>
                        <div className="absolute -left-8 -top-10 h-24 w-24 rounded-full bg-white/15" />
                        <KograflyMascot mascot={preset.mascot} primary={preset.theme.accent} secondary={preset.theme.secondary} soft={preset.theme.soft} compact className="absolute -bottom-7 right-2" />
                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: preset.theme.text }}>
                          {preset.colorMode === "blue" ? "Biru" : "Hijau"}
                        </span>
                        {active ? <span className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white text-kografly-indigo"><Check className="h-4 w-4" /></span> : null}
                      </div>
                      <div className="p-4">
                        <h3 className="font-extrabold tracking-[-0.03em] text-stone-950">{preset.name}</h3>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-stone-400">{preset.headline}</p>
                        <p className="mt-2 text-sm leading-6 text-stone-500">{preset.description}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {preset.tags.map((tag) => <span key={tag} className="rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: preset.theme.soft, color: preset.theme.accent }}>{tag}</span>)}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-[1.55rem] border border-stone-200 bg-stone-50/70 p-4">
                <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                  <div>
                    <h3 className="text-xl font-extrabold tracking-[-0.04em] text-stone-950">Warna custom</h3>
                    <p className="text-sm text-stone-500">Warna template bisa diubah lagi tanpa menghilangkan layout dan mascot.</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-stone-500 shadow-soft">Preview dulu, baru simpan</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {themeColorFields.map((field) => (
                    <label key={field.key} className="rounded-[1.3rem] border border-stone-200 bg-white p-3">
                      <span className="flex items-center justify-between gap-3">
                        <span>
                          <span className="block text-sm font-bold text-stone-800">{field.label}</span>
                          <span className="text-xs text-stone-500">{field.helper}</span>
                        </span>
                        <input
                          type="color"
                          value={currentTheme[field.key]}
                          onChange={(e) => updateTheme({ ...currentTheme, [field.key]: e.target.value })}
                          className="h-10 w-12 cursor-pointer rounded-xl border border-stone-200 bg-transparent p-1"
                          aria-label={field.label}
                        />
                      </span>
                      <input
                        value={currentTheme[field.key]}
                        onChange={(e) => updateTheme({ ...currentTheme, [field.key]: e.target.value })}
                        className="mt-3 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm font-semibold uppercase outline-none focus:border-kografly-indigo"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <label className="mt-4 block max-w-sm">
                <span className="mb-2 block text-sm font-bold text-stone-700">Style tombol default</span>
                <select
                  value={currentTheme.buttonStyle}
                  onChange={(e) => updateTheme({ ...currentTheme, buttonStyle: e.target.value as ProfileTheme["buttonStyle"] })}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-kografly-indigo"
                >
                  <option value="solid">Solid brand</option>
                  <option value="outline">Outline</option>
                  <option value="soft">Soft card</option>
                  <option value="glass">Glass</option>
                </select>
              </label>

              <button onClick={saveProfile} disabled={saving} className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-kografly-indigo px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-70">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Simpan profile & template
              </button>
            </article>

            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[.2em] text-kografly-amber">Bio links</p>
                <h2 className="text-3xl font-extrabold tracking-[-0.055em] text-stone-950">Link tanpa batas</h2>
              </div>
              <button onClick={addLink} className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5">
                <Plus className="h-4 w-4" /> Tambah link
              </button>
            </div>

            {links.length ? (
              [...links].sort((a, b) => a.sort_order - b.sort_order).map((link) => (
                <LinkCardEditor
                  key={link.id}
                  link={link}
                  onChange={updateLocalLink}
                  onSave={saveLink}
                  onDelete={deleteLink}
                  onMoveUp={(item) => reorder(item, -1)}
                  onMoveDown={(item) => reorder(item, 1)}
                />
              ))
            ) : (
              <button onClick={addLink} className="grid w-full place-items-center rounded-[2rem] border border-dashed border-stone-300 bg-white/80 p-10 text-center text-stone-500 hover:border-kografly-indigo hover:text-kografly-indigo">
                <Plus className="mb-2 h-6 w-6" /> Tambahkan link pertama kamu.
              </button>
            )}
          </section>

          <PhonePreview profile={profile} links={links} />
        </div>
      </div>
    </main>
  );
}

function CreateProfile({ saving, message, onCreate }: { saving: boolean; message: string | null; onCreate: (username: string) => void }) {
  const [username, setUsername] = useState("");

  return (
    <main className="grid min-h-screen place-items-center bg-kografly-stone px-6 thread-grid">
      <section className="w-full max-w-lg rounded-[2rem] border border-stone-200 bg-white p-6 shadow-thread">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-indigo-50 text-kografly-indigo"><UserRound className="h-6 w-6" /></div>
        <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.055em] text-stone-950">Buat profile Kografly</h1>
        <p className="mt-2 text-stone-600">Akunmu belum punya username public. Pilih satu untuk mulai.</p>
        <div className="mt-5 flex rounded-2xl border border-stone-200 px-4 py-3 text-lg font-bold focus-within:border-kografly-indigo">
          <span className="text-kografly-amber">/</span>
          <input value={username} onChange={(e) => setUsername(normalizeUsername(e.target.value))} className="w-full bg-transparent px-1 outline-none" placeholder="username" />
        </div>
        {message ? <p className="mt-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-kografly-amber">{message}</p> : null}
        <button onClick={() => onCreate(username)} disabled={saving} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-kografly-indigo px-5 py-4 font-bold text-white disabled:opacity-70">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Buat profile
        </button>
      </section>
    </main>
  );
}
'@ | Set-Content -Encoding UTF8 -Path 'src\components\BuilderClient.tsx'

@'
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { defaultTheme } from "@/constants/templates";
import { supabase } from "@/lib/supabase/client";
import { isValidUsername, normalizeUsername } from "@/lib/utils";

type Mode = "signin" | "signup";

type Props = {
  initialUsername?: string;
};

export default function AuthPanel({ initialUsername }: Props) {
  const router = useRouter();
  const cleanInitialUsername = useMemo(() => normalizeUsername(initialUsername || ""), [initialUsername]);
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(cleanInitialUsername);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        void ensureProfileAndGo(data.session.user.id, data.session.user.email || "");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function ensureProfileAndGo(userId: string, userEmail: string) {
    const { data: existing } = await supabase.from("profiles").select("id,username").eq("owner_id", userId).maybeSingle();
    if (existing) {
      router.push("/builder");
      return;
    }

    const fallback = normalizeUsername(userEmail.split("@")[0] || `creator-${Date.now().toString().slice(-5)}`);
    const finalUsername = isValidUsername(username) ? username : `${fallback}-${Date.now().toString().slice(-4)}`;

    const { error } = await supabase.from("profiles").insert({
      owner_id: userId,
      username: finalUsername,
      display_name: finalUsername.replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      bio: "Halo! Ini semua link penting saya di Kografly.",
      is_published: true,
      theme: defaultTheme
    });

    if (error) {
      setMessage(error.message.includes("duplicate") ? "Username sudah dipakai. Pilih username lain lalu coba lagi." : error.message);
      setLoading(false);
      return;
    }

    router.push("/builder");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setLoading(true);

    const clean = normalizeUsername(username);
    setUsername(clean);
    if (!isValidUsername(clean)) {
      setMessage("Username minimal 3 karakter dan hanya boleh huruf kecil, angka, titik, strip, atau underscore.");
      setLoading(false);
      return;
    }

    const authAction = mode === "signup"
      ? supabase.auth.signUp({ email, password })
      : supabase.auth.signInWithPassword({ email, password });

    const { data, error } = await authAction;

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (!data.user) {
      setMessage("Auth berhasil, tetapi user belum tersedia. Coba login ulang.");
      setLoading(false);
      return;
    }

    if (!data.session && mode === "signup") {
      setMessage("Akun dibuat. Jika email confirmation aktif di Supabase, konfirmasi email dulu lalu login untuk membuat profil.");
      setLoading(false);
      return;
    }

    await ensureProfileAndGo(data.user.id, data.user.email || email);
  }

  return (
    <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-thread">
      <div className="mb-6 flex rounded-full bg-stone-100 p-1 text-sm font-bold">
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-full px-4 py-2 transition ${mode === "signup" ? "bg-kografly-indigo text-white shadow-soft" : "text-stone-500"}`}
        >
          Daftar
        </button>
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`flex-1 rounded-full px-4 py-2 transition ${mode === "signin" ? "bg-kografly-indigo text-white shadow-soft" : "text-stone-500"}`}
        >
          Masuk
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-stone-700">Username public</span>
          <div className="flex items-center rounded-2xl border border-stone-200 bg-kografly-stone px-4 py-3 font-bold focus-within:border-kografly-indigo">
            <span className="text-kografly-amber">/</span>
            <input value={username} onChange={(e) => setUsername(normalizeUsername(e.target.value))} className="w-full bg-transparent px-1 outline-none" placeholder="username" />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-stone-700">Email</span>
          <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 focus-within:border-kografly-indigo">
            <Mail className="h-4 w-4 text-stone-400" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full outline-none" placeholder="you@email.com" required />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-stone-700">Password</span>
          <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 focus-within:border-kografly-indigo">
            <LockKeyhole className="h-4 w-4 text-stone-400" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full outline-none" minLength={6} placeholder="Minimal 6 karakter" required />
          </div>
        </label>

        {message && <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-kografly-amber">{message}</p>}

        <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-950 px-5 py-4 font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-70">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "signup" ? "Buat akun & profil" : "Masuk ke builder"}
        </button>
      </form>
    </section>
  );
}
'@ | Set-Content -Encoding UTF8 -Path 'src\components\AuthPanel.tsx'

@'
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Kografly Builder",
  description: "Realtime bio-link builder with Supabase and Next.js",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
'@ | Set-Content -Encoding UTF8 -Path 'src\app\layout.tsx'

@'
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-poppins)", "ui-sans-serif", "system-ui"]
      },
      colors: {
        kografly: {
          indigo: "#1E5CC8",
          amber: "#D97706",
          teal: "#0F766E",
          stone: "#F6FAFF",
          ink: "#0B1D3A",
          muted: "#64748B",
          surface: "#FFFFFF",
          success: "#16A34A",
          error: "#DC2626",
          info: "#2563EB"
        }
      },
      boxShadow: {
        thread: "0 24px 70px rgba(15, 23, 42, 0.12)",
        soft: "0 14px 38px rgba(15, 23, 42, 0.08)"
      },
      borderRadius: {
        thread: "1.35rem"
      },
      keyframes: {
        "k-rise": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        "k-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.025)" }
        },
        "k-wiggle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-1.5deg)" },
          "75%": { transform: "rotate(1.5deg)" }
        },
        "k-bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" }
        },
        "k-glow": {
          "0%, 100%": { boxShadow: "0 0 0 rgba(30, 92, 200, 0)" },
          "50%": { boxShadow: "0 0 28px rgba(30, 92, 200, .28)" }
        }
      },
      animation: {
        "k-rise": "k-rise .42s ease both",
        "k-pulse": "k-pulse 2s ease-in-out infinite",
        "k-wiggle": "k-wiggle 1.5s ease-in-out infinite",
        "k-bounce-soft": "k-bounce-soft 1.8s ease-in-out infinite",
        "k-glow": "k-glow 2.3s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
'@ | Set-Content -Encoding UTF8 -Path 'tailwind.config.ts'

@'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --kografly-indigo: #1e5cc8;
  --kografly-teal: #0f766e;
  --kografly-bg: #f6faff;
  --kografly-ink: #0b1d3a;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--kografly-bg);
  color: var(--kografly-ink);
}

.thread-grid {
  background-image:
    linear-gradient(rgba(30, 92, 200, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(30, 92, 200, 0.045) 1px, transparent 1px);
  background-size: 30px 30px;
}

.thread-indent {
  position: relative;
  padding-left: 24px;
}

.thread-indent::before {
  content: "";
  position: absolute;
  left: 0;
  top: 6px;
  bottom: 6px;
  width: 2px;
  border-radius: 999px;
  background: linear-gradient(var(--kografly-indigo), var(--kografly-teal));
  opacity: .18;
}

.kografly-scrollbar::-webkit-scrollbar { width: 8px; }
.kografly-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(30, 92, 200, .22);
  border-radius: 999px;
}

.link-animation-none { animation: none; }
.link-animation-rise { animation: k-rise .42s ease both; }
.link-animation-pulse { animation: k-pulse 2s ease-in-out infinite; }
.link-animation-wiggle { animation: k-wiggle 1.5s ease-in-out infinite; }
.link-animation-bounce { animation: k-bounce-soft 1.8s ease-in-out infinite; }
.link-animation-glow { animation: k-glow 2.3s ease-in-out infinite; }
'@ | Set-Content -Encoding UTF8 -Path 'src\app\globals.css'

@'
import { notFound } from "next/navigation";
import PublicProfile from "@/components/PublicProfile";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { KograflyLink, Profile } from "@/lib/types";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

type MetadataProfile = Pick<Profile, "display_name" | "bio" | "avatar_url" | "username">;

export async function generateMetadata({ params }: Props) {
  const { username: rawUsername } = await params;
  const username = rawUsername.toLowerCase();

  const { data } = await supabaseAdmin
    .from("profiles")
    .select("display_name,bio,avatar_url,username")
    .eq("username", username)
    .eq("is_published", true)
    .maybeSingle();

  const profile = data as MetadataProfile | null;

  if (!profile) {
    return { title: "Kografly" };
  }

  return {
    title: `${profile.display_name} / Kografly`,
    description: profile.bio || `Lihat semua link ${profile.display_name} di Kografly`,
    openGraph: {
      title: `${profile.display_name} / Kografly`,
      description: profile.bio || undefined,
      images: profile.avatar_url ? [profile.avatar_url] : []
    }
  };
}

export default async function UsernamePage({ params }: Props) {
  const { username: rawUsername } = await params;
  const username = rawUsername.toLowerCase();

  const { data: profileData } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("username", username)
    .eq("is_published", true)
    .maybeSingle();

  const profile = profileData as Profile | null;

  if (!profile) {
    notFound();
  }

  const { data: linksData } = await supabaseAdmin
    .from("links")
    .select("*")
    .eq("profile_id", profile.id)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const links = (linksData || []) as KograflyLink[];

  return <PublicProfile initialProfile={profile} initialLinks={links} />;
}
'@ | Set-Content -Encoding UTF8 -LiteralPath 'src\app\[username]\page.tsx'

Write-Host 'Done. Run: npm run build'
