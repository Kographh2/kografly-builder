$ErrorActionPreference = 'Stop'
Write-Host 'Applying Kografly template update by overwriting target files...'

# src/lib/types.ts
New-Item -ItemType Directory -Force -Path 'src\lib' | Out-Null
@'
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ProfileTemplateId = "kografly" | "popCreator" | "studioJahit" | "neoBrutal";

export type ProfileTheme = {
  template?: ProfileTemplateId;
  background?: string;
  surface?: string;
  text?: string;
  muted?: string;
  accent?: string;
  secondary?: string;
  button?: string;
  buttonText?: string;
  decorative?: string;
  buttonStyle?: "thread" | "minimal" | "poster" | "pill" | "brutal";
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

# src/constants/templates.ts
New-Item -ItemType Directory -Force -Path 'src\constants' | Out-Null
@'
import type { ProfileTemplateId, ProfileTheme } from "@/lib/types";

export type ResolvedProfileTheme = Required<ProfileTheme>;

export type TemplateOption = {
  id: ProfileTemplateId;
  name: string;
  description: string;
  previewClass: string;
  theme: ResolvedProfileTheme;
};

const legacyColors: Record<string, string> = {
  indigo: "#4338CA",
  amber: "#D97706",
  teal: "#0F766E",
  stone: "#FAFAF9",
  ink: "#0C0A09",
  gradient: "#FAFAF9"
};

function color(value: string | undefined, fallback: string) {
  if (!value) return fallback;
  if (value.startsWith("#")) return value;
  return legacyColors[value] || fallback;
}

export const profileTemplates: TemplateOption[] = [
  {
    id: "kografly",
    name: "Kografly Clean",
    description: "Card rapi, gradient lembut, cocok untuk personal link yang formal.",
    previewClass: "bg-gradient-to-br from-indigo-600 via-teal-600 to-amber-500",
    theme: {
      template: "kografly",
      background: "#FAFAF9",
      surface: "#FFFFFF",
      text: "#1C1917",
      muted: "#57534E",
      accent: "#4338CA",
      secondary: "#D97706",
      button: "#0C0A09",
      buttonText: "#FFFFFF",
      decorative: "#0F766E",
      buttonStyle: "thread"
    }
  },
  {
    id: "popCreator",
    name: "Pop Creator",
    description: "Poster orange-magenta untuk kreator, campaign, e-book, dan kursus.",
    previewClass: "bg-[#ff6700]",
    theme: {
      template: "popCreator",
      background: "#FF6A00",
      surface: "#FFF4E8",
      text: "#2A0B1E",
      muted: "#FFFFFF",
      accent: "#C0045C",
      secondary: "#FFC21C",
      button: "#C0045C",
      buttonText: "#FFFFFF",
      decorative: "#111111",
      buttonStyle: "poster"
    }
  },
  {
    id: "studioJahit",
    name: "Studio Jahit",
    description: "Editorial pink boutique untuk katalog, fashion, handmade, dan koleksi.",
    previewClass: "bg-[#F58AC0]",
    theme: {
      template: "studioJahit",
      background: "#F58AC0",
      surface: "#FFF9E9",
      text: "#5B002B",
      muted: "#7A1744",
      accent: "#71002E",
      secondary: "#FFF8E6",
      button: "#FFF8E6",
      buttonText: "#5B002B",
      decorative: "#71002E",
      buttonStyle: "pill"
    }
  },
  {
    id: "neoBrutal",
    name: "Neo Brutal",
    description: "Bold, kontras, border tebal, shadow keras, cocok untuk brand yang nyentrik.",
    previewClass: "bg-[#FDE047]",
    theme: {
      template: "neoBrutal",
      background: "#FDE047",
      surface: "#FFFFFF",
      text: "#111111",
      muted: "#27272A",
      accent: "#2563EB",
      secondary: "#FB7185",
      button: "#7C3AED",
      buttonText: "#FFFFFF",
      decorative: "#111111",
      buttonStyle: "brutal"
    }
  }
];

export const defaultTheme = profileTemplates[0].theme;

export const themeColorFields: Array<{
  key: keyof Pick<ResolvedProfileTheme, "background" | "surface" | "text" | "muted" | "accent" | "secondary" | "button" | "buttonText" | "decorative">;
  label: string;
}> = [
  { key: "background", label: "Background" },
  { key: "surface", label: "Surface/card" },
  { key: "text", label: "Text utama" },
  { key: "muted", label: "Text kecil" },
  { key: "accent", label: "Accent" },
  { key: "secondary", label: "Secondary" },
  { key: "button", label: "Button" },
  { key: "buttonText", label: "Text button" },
  { key: "decorative", label: "Dekorasi" }
];

export function getTemplate(id?: ProfileTemplateId) {
  return profileTemplates.find((template) => template.id === id) || profileTemplates[0];
}

export function normalizeTheme(theme?: ProfileTheme | null): ResolvedProfileTheme {
  const preset = getTemplate(theme?.template).theme;

  return {
    template: theme?.template || preset.template,
    background: color(theme?.background, preset.background),
    surface: color(theme?.surface, preset.surface),
    text: color(theme?.text, preset.text),
    muted: color(theme?.muted, preset.muted),
    accent: color(theme?.accent, preset.accent),
    secondary: color(theme?.secondary, preset.secondary),
    button: color(theme?.button, preset.button),
    buttonText: color(theme?.buttonText, preset.buttonText),
    decorative: color(theme?.decorative, preset.decorative),
    buttonStyle: theme?.buttonStyle || preset.buttonStyle
  };
}

export function applyTemplate(current: ProfileTheme | null | undefined, templateId: ProfileTemplateId): ResolvedProfileTheme {
  const preset = getTemplate(templateId).theme;
  const currentTheme = normalizeTheme(current);

  // Template ganti layout + default palette template. Username, link, dan profile tidak berubah.
  return {
    ...currentTheme,
    ...preset,
    template: templateId
  };
}

export function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const bigint = Number.parseInt(full, 16);
  if (Number.isNaN(bigint)) return `rgba(0,0,0,${alpha})`;
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

'@ | Set-Content -Encoding UTF8 -Path 'src\constants\templates.ts'

# src/components/ProfileCanvas.tsx
New-Item -ItemType Directory -Force -Path 'src\components' | Out-Null
@'
"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import LinkButton from "@/components/LinkButton";
import { normalizeTheme, hexToRgba } from "@/constants/templates";
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

  if (theme.template === "popCreator") {
    return (
      <PopCreatorCanvas
        profile={profile}
        links={sortedLinks}
        theme={theme}
        preview={preview}
        compact={compact}
        showBrand={showBrand}
        className={className}
        onTrackClick={onTrackClick}
      />
    );
  }

  if (theme.template === "studioJahit") {
    return (
      <StudioJahitCanvas
        profile={profile}
        links={sortedLinks}
        theme={theme}
        preview={preview}
        compact={compact}
        showBrand={showBrand}
        className={className}
        onTrackClick={onTrackClick}
      />
    );
  }

  if (theme.template === "neoBrutal") {
    return (
      <NeoBrutalCanvas
        profile={profile}
        links={sortedLinks}
        theme={theme}
        preview={preview}
        compact={compact}
        showBrand={showBrand}
        className={className}
        onTrackClick={onTrackClick}
      />
    );
  }

  return (
    <KograflyCanvas
      profile={profile}
      links={sortedLinks}
      theme={theme}
      preview={preview}
      compact={compact}
      showBrand={showBrand}
      className={className}
      onTrackClick={onTrackClick}
    />
  );
}

type CanvasProps = Required<Pick<Props, "preview" | "compact" | "showBrand">> &
  Pick<Props, "profile" | "links" | "className" | "onTrackClick"> & {
    theme: ReturnType<typeof normalizeTheme>;
  };

function Avatar({ profile, size = 112, className }: { profile: Profile; size?: number; className?: string }) {
  return (
    <div
      className={cn("mx-auto grid place-items-center overflow-hidden rounded-full border-[6px] border-white bg-white shadow-soft", className)}
      style={{ height: size, width: size }}
    >
      {profile.avatar_url ? (
        <Image
          src={profile.avatar_url}
          alt={profile.display_name}
          width={size}
          height={size}
          className="h-full w-full object-cover"
          priority
        />
      ) : (
        <span className="font-serif text-5xl font-bold">{profile.display_name.charAt(0)}</span>
      )}
    </div>
  );
}

function EmptyLinks({ theme }: { theme: ReturnType<typeof normalizeTheme> }) {
  return (
    <p
      className="rounded-[1.35rem] border border-dashed p-6 text-center text-sm font-semibold"
      style={{ borderColor: hexToRgba(theme.text, 0.18), background: hexToRgba(theme.surface, 0.78), color: theme.muted }}
    >
      Belum ada link yang dipublish.
    </p>
  );
}

function BrandPill({ theme }: { theme: ReturnType<typeof normalizeTheme> }) {
  return (
    <a
      href="/"
      className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold shadow-soft backdrop-blur transition hover:-translate-y-0.5"
      style={{ background: hexToRgba(theme.surface, 0.92), borderColor: hexToRgba(theme.text, 0.12), color: theme.text }}
    >
      Built with Kografly <ExternalLink className="h-4 w-4" />
    </a>
  );
}

function KograflyCanvas({ profile, links, theme, preview, compact, showBrand, className, onTrackClick }: CanvasProps) {
  return (
    <div className={cn("w-full", className)} style={{ background: theme.background, color: theme.text }}>
      <section className={cn("mx-auto w-full", compact ? "max-w-none" : "max-w-xl px-4 py-8")}> 
        <article
          className={cn("overflow-hidden rounded-[2.4rem] border shadow-thread backdrop-blur", compact && "rounded-none border-0 shadow-none")}
          style={{ background: hexToRgba(theme.surface, 0.92), borderColor: hexToRgba(theme.text, 0.1) }}
        >
          <div
            className={compact ? "h-24" : "h-28"}
            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.decorative}, ${theme.secondary})` }}
          />
          <div className={cn("text-center", compact ? "px-5 pb-7" : "px-6 pb-8 sm:px-10")}> 
            <div className={compact ? "-mt-12" : "-mt-14"}>
              <Avatar profile={profile} size={compact ? 96 : 112} />
            </div>

            <h1 className={cn("mt-5 break-words font-serif font-bold", compact ? "text-3xl" : "text-4xl")} style={{ color: theme.text }}>
              {profile.display_name}
            </h1>
            <p className="mt-1 break-words text-sm font-bold" style={{ color: theme.accent }}>/{profile.username}</p>
            <p className="mx-auto mt-4 max-w-md break-words text-sm leading-7" style={{ color: theme.muted }}>{profile.bio}</p>

            <div className="mt-8 space-y-3 text-left">
              {links.length ? links.map((link) => (
                <LinkButton key={link.id} link={link} preview={preview} theme={theme} onTrackClick={onTrackClick} />
              )) : <EmptyLinks theme={theme} />}
            </div>
          </div>
        </article>
        {showBrand && <BrandPill theme={theme} />}
      </section>
    </div>
  );
}

function PopCreatorCanvas({ profile, links, theme, preview, compact, showBrand, className, onTrackClick }: CanvasProps) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)} style={{ background: theme.background, color: theme.text }}>
      <div className="pointer-events-none absolute -left-12 top-6 h-32 w-32 rounded-full border-[18px] border-l-transparent border-b-transparent" style={{ borderColor: theme.accent, borderLeftColor: "transparent", borderBottomColor: "transparent", transform: "rotate(-18deg)" }} />
      <div className="pointer-events-none absolute right-6 top-8 h-20 w-28 rotate-[-4deg] border-[5px]" style={{ background: theme.accent, borderColor: theme.decorative, clipPath: "polygon(18% 16%, 100% 0, 82% 100%, 0 88%)" }} />
      <div className="pointer-events-none absolute -right-10 bottom-12 h-28 w-28 rotate-12 border-[6px]" style={{ borderColor: theme.decorative, background: theme.secondary, clipPath: "polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 82% 96%, 50% 72%, 18% 96%, 32% 57%, 2% 35%, 39% 35%)" }} />

      <section className={cn("relative z-10 mx-auto flex min-h-full w-full max-w-xl flex-col items-center px-6 text-center", compact ? "py-8" : "py-12")}> 
        <Avatar profile={profile} size={compact ? 108 : 140} className="border-[7px]" />
        <h1
          className={cn("mt-7 break-words font-sans font-black uppercase leading-none tracking-tight", compact ? "text-4xl" : "text-6xl")}
          style={{ color: theme.buttonText }}
        >
          {profile.display_name}
        </h1>
        <p className="mt-3 break-words text-lg font-bold" style={{ color: theme.text }}>/{profile.username}</p>
        <p className={cn("mx-auto mt-4 max-w-lg break-words leading-snug", compact ? "text-base" : "text-2xl")} style={{ color: theme.buttonText }}>
          {profile.bio}
        </p>

        <div className="mt-9 w-full space-y-4 text-left">
          {links.length ? links.map((link) => (
            <LinkButton key={link.id} link={link} preview={preview} theme={theme} onTrackClick={onTrackClick} />
          )) : <EmptyLinks theme={theme} />}
        </div>
        {showBrand && <BrandPill theme={theme} />}
      </section>
    </div>
  );
}

function StudioJahitCanvas({ profile, links, theme, preview, compact, showBrand, className, onTrackClick }: CanvasProps) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)} style={{ background: theme.background, color: theme.text }}>
      <section className={cn("relative mx-auto min-h-full w-full max-w-md px-6", compact ? "py-7" : "py-10")}> 
        <div className="mb-5 flex items-start justify-between gap-4">
          <h1 className={cn("max-w-[12rem] font-sans font-black uppercase leading-[0.86] tracking-tight", compact ? "text-3xl" : "text-5xl")}>
            {profile.display_name || "Studio"}
          </h1>
          <div className="relative h-20 w-24 shrink-0 overflow-hidden">
            <div className="absolute right-0 top-0 h-20 w-20 rounded-l-full" style={{ background: theme.surface }} />
            <div className="absolute right-0 top-0 h-20 w-10 rounded-r-full" style={{ background: theme.decorative }} />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-sm border-[5px]" style={{ borderColor: theme.surface, background: theme.surface }}>
          <div className="aspect-[1.35] overflow-hidden" style={{ background: hexToRgba(theme.decorative, 0.1) }}>
            {profile.avatar_url ? (
              <Image src={profile.avatar_url} alt={profile.display_name} width={520} height={390} className="h-full w-full object-cover" priority />
            ) : (
              <div className="grid h-full place-items-center text-7xl font-black" style={{ color: theme.decorative }}>
                {profile.display_name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-xs break-words text-center text-sm font-bold leading-snug" style={{ color: theme.muted }}>
          {profile.bio || "Jelajahi koleksi dan semua link penting saya."}
        </p>
        <p className="mt-2 text-center text-sm font-black" style={{ color: theme.accent }}>/{profile.username}</p>

        <div className="mt-6 w-full space-y-4">
          {links.length ? links.map((link) => (
            <LinkButton key={link.id} link={link} preview={preview} theme={theme} onTrackClick={onTrackClick} />
          )) : <EmptyLinks theme={theme} />}
        </div>
        {showBrand && <BrandPill theme={theme} />}
      </section>
    </div>
  );
}

function NeoBrutalCanvas({ profile, links, theme, preview, compact, showBrand, className, onTrackClick }: CanvasProps) {
  return (
    <div className={cn("relative w-full overflow-hidden p-4", className)} style={{ background: theme.background, color: theme.text }}>
      <section
        className={cn("relative mx-auto min-h-full w-full max-w-xl border-[4px] px-5 text-center", compact ? "py-7" : "py-10")}
        style={{ background: theme.surface, borderColor: theme.decorative, boxShadow: `12px 12px 0 ${theme.decorative}` }}
      >
        <div className="absolute -right-4 -top-4 h-20 w-20 border-[4px]" style={{ background: theme.secondary, borderColor: theme.decorative }} />
        <div className="absolute -bottom-5 -left-4 h-16 w-28 rotate-[-8deg] border-[4px]" style={{ background: theme.accent, borderColor: theme.decorative }} />

        <Avatar profile={profile} size={compact ? 96 : 128} className="relative z-10 border-[4px]" />
        <h1 className={cn("relative z-10 mt-6 break-words font-sans font-black uppercase leading-none", compact ? "text-4xl" : "text-6xl")}>
          {profile.display_name}
        </h1>
        <p className="relative z-10 mx-auto mt-3 inline-block rotate-[-2deg] border-[3px] px-3 py-1 font-black" style={{ background: theme.secondary, borderColor: theme.decorative }}>
          /{profile.username}
        </p>
        <p className={cn("relative z-10 mx-auto mt-5 max-w-md break-words font-bold leading-7", compact ? "text-sm" : "text-lg")} style={{ color: theme.muted }}>
          {profile.bio}
        </p>

        <div className="relative z-10 mt-8 space-y-4 text-left">
          {links.length ? links.map((link) => (
            <LinkButton key={link.id} link={link} preview={preview} theme={theme} onTrackClick={onTrackClick} />
          )) : <EmptyLinks theme={theme} />}
        </div>
        {showBrand && <BrandPill theme={theme} />}
      </section>
    </div>
  );
}

'@ | Set-Content -Encoding UTF8 -Path 'src\components\ProfileCanvas.tsx'

# src/components/LinkButton.tsx
New-Item -ItemType Directory -Force -Path 'src\components' | Out-Null
@'
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
      <span className="text-xs opacity-70">↗</span>
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

'@ | Set-Content -Encoding UTF8 -Path 'src\components\LinkButton.tsx'

# src/components/PhonePreview.tsx
New-Item -ItemType Directory -Force -Path 'src\components' | Out-Null
@'
"use client";

import ProfileCanvas from "@/components/ProfileCanvas";
import { normalizeTheme } from "@/constants/templates";
import type { KograflyLink, Profile } from "@/lib/types";

export default function PhonePreview({ profile, links }: { profile: Profile | null; links: KograflyLink[] }) {
  const safeProfile: Profile = profile || {
    id: "preview",
    owner_id: "preview",
    username: "username",
    display_name: "Kografly Creator",
    bio: "Tulis bio singkat kamu dan susun link favoritmu.",
    avatar_url: null,
    is_published: true,
    theme: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const theme = normalizeTheme(safeProfile.theme);

  return (
    <aside className="mx-auto h-fit w-full max-w-[390px] self-start rounded-[2.25rem] border border-stone-200 bg-stone-950 p-3 shadow-thread lg:sticky lg:top-6">
      <div className="relative flex h-[680px] max-h-[calc(100vh-96px)] min-h-[560px] overflow-hidden rounded-[1.75rem]" style={{ background: theme.background }}>
        <div className="flex min-h-0 w-full flex-col">
          <div className="pointer-events-none absolute left-1/2 z-20 mt-4 h-6 w-24 -translate-x-1/2 rounded-full bg-stone-950/90" />
          <div className="min-h-0 flex-1 overflow-y-auto">
            <ProfileCanvas profile={safeProfile} links={links} preview compact showBrand={false} className="min-h-full pt-10" />
          </div>
        </div>
      </div>
    </aside>
  );
}

'@ | Set-Content -Encoding UTF8 -Path 'src\components\PhonePreview.tsx'

# src/components/PublicProfile.tsx
New-Item -ItemType Directory -Force -Path 'src\components' | Out-Null
@'
"use client";

import { useEffect, useRef, useState } from "react";
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
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "profiles", filter: `id=eq.${initialProfile.id}` },
        (payload) => setProfile(payload.new as Profile)
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "links", filter: `profile_id=eq.${initialProfile.id}` },
        async () => {
          const { data } = await supabase
            .from("links")
            .select("*")
            .eq("profile_id", initialProfile.id)
            .eq("is_active", true)
            .order("sort_order", { ascending: true });
          setLinks((data || []) as KograflyLink[]);
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [initialProfile.id]);

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

  return (
    <main className="min-h-screen">
      <ProfileCanvas profile={profile} links={links} onTrackClick={trackClick} />
    </main>
  );
}

'@ | Set-Content -Encoding UTF8 -Path 'src\components\PublicProfile.tsx'

# src/components/BuilderClient.tsx
New-Item -ItemType Directory -Force -Path 'src\components' | Out-Null
@'
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Loader2, LogOut, Plus, RotateCcw, Save, UserRound } from "lucide-react";
import AvatarUploader from "@/components/AvatarUploader";
import LinkCardEditor from "@/components/LinkCardEditor";
import PhonePreview from "@/components/PhonePreview";
import RealtimeBadge from "@/components/RealtimeBadge";
import { applyTemplate, normalizeTheme, profileTemplates, themeColorFields } from "@/constants/templates";
import { supabase } from "@/lib/supabase/client";
import type { KograflyLink, Profile, ProfileTemplateId, ProfileTheme } from "@/lib/types";
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
  const resolvedTheme = useMemo(() => normalizeTheme(profile?.theme), [profile?.theme]);

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
    if (error) setMessage(error.message);
    const loadedProfile = profileData as Profile | null;
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
    setLinks(((data || []) as KograflyLink[]).sort((a, b) => a.sort_order - b.sort_order));
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
        theme: applyTemplate(null, "kografly")
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
    setMessage("Profile dan template tersimpan. Public page tetap update realtime tanpa badge realtime di tampilan visitor.");
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
        style_variant: links.length % 2 === 0 ? "solid" : "soft",
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

  function updateTheme(next: Partial<ProfileTheme>) {
    if (!profile) return;
    setProfile({ ...profile, theme: { ...normalizeTheme(profile.theme), ...next } });
  }

  function selectTemplate(templateId: ProfileTemplateId) {
    if (!profile) return;
    setProfile({ ...profile, theme: applyTemplate(profile.theme, templateId) });
    setMessage("Template diganti di preview. Klik Simpan profile kalau sudah cocok.");
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
            <p className="text-sm font-bold uppercase tracking-[.25em] text-kografly-amber">Kografly Builder</p>
            <h1 className="font-serif text-4xl font-bold text-stone-950">Editor bio-link</h1>
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

        {message && <p className="mb-5 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-semibold text-kografly-amber">{message}</p>}

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_410px]">
          <section className="space-y-6">
            <article className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[.2em] text-kografly-teal">Profile</p>
                  <h2 className="font-serif text-3xl font-bold text-stone-950">Identitas public</h2>
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

            <ThemeEditor
              theme={resolvedTheme}
              onTemplateChange={selectTemplate}
              onThemeChange={updateTheme}
              onResetTemplate={() => selectTemplate(resolvedTheme.template)}
            />

            <button onClick={saveProfile} disabled={saving} className="inline-flex items-center gap-2 rounded-2xl bg-kografly-indigo px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-70">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Simpan profile & template
            </button>

            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[.2em] text-kografly-amber">Bio links</p>
                <h2 className="font-serif text-3xl font-bold text-stone-950">Link tanpa batas</h2>
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

          <div>
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-[.2em] text-stone-400">Preview sebelum disimpan</p>
            <PhonePreview profile={profile} links={links} />
          </div>
        </div>
      </div>
    </main>
  );
}

function ThemeEditor({
  theme,
  onTemplateChange,
  onThemeChange,
  onResetTemplate
}: {
  theme: ReturnType<typeof normalizeTheme>;
  onTemplateChange: (templateId: ProfileTemplateId) => void;
  onThemeChange: (next: Partial<ProfileTheme>) => void;
  onResetTemplate: () => void;
}) {
  return (
    <article className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.2em] text-kografly-teal">Template</p>
          <h2 className="font-serif text-3xl font-bold text-stone-950">Pilih style public page</h2>
          <p className="mt-1 text-sm text-stone-500">Klik template untuk melihat preview dulu. Perubahan baru permanen setelah klik simpan.</p>
        </div>
        <button onClick={onResetTemplate} className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm font-bold text-stone-600 hover:border-kografly-indigo hover:text-kografly-indigo">
          <RotateCcw className="h-4 w-4" /> Reset warna template
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {profileTemplates.map((template) => {
          const active = theme.template === template.id;
          return (
            <button
              key={template.id}
              onClick={() => onTemplateChange(template.id)}
              className={`overflow-hidden rounded-[1.5rem] border p-3 text-left transition hover:-translate-y-0.5 ${active ? "border-kografly-indigo ring-2 ring-indigo-100" : "border-stone-200"}`}
            >
              <div className={`h-24 rounded-[1rem] ${template.previewClass}`}>
                <div className="flex h-full flex-col justify-end gap-1 p-3">
                  <div className="h-3 w-16 rounded-full bg-white/90" />
                  <div className="h-3 w-24 rounded-full bg-white/70" />
                </div>
              </div>
              <p className="mt-3 font-bold text-stone-950">{template.name}</p>
              <p className="mt-1 text-xs leading-5 text-stone-500">{template.description}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {themeColorFields.map((field) => (
          <label key={field.key} className="rounded-2xl border border-stone-200 p-3">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[.16em] text-stone-500">{field.label}</span>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme[field.key].startsWith("#") ? theme[field.key] : "#000000"}
                onChange={(e) => onThemeChange({ [field.key]: e.target.value } as Partial<ProfileTheme>)}
                className="h-10 w-12 rounded-lg border border-stone-200 bg-white p-1"
              />
              <input
                value={theme[field.key]}
                onChange={(e) => onThemeChange({ [field.key]: e.target.value } as Partial<ProfileTheme>)}
                className="min-w-0 flex-1 rounded-xl border border-stone-200 px-3 py-2 text-sm font-semibold outline-none focus:border-kografly-indigo"
              />
            </div>
          </label>
        ))}
      </div>
    </article>
  );
}

function CreateProfile({ saving, message, onCreate }: { saving: boolean; message: string | null; onCreate: (username: string) => void }) {
  const [username, setUsername] = useState("");
  return (
    <main className="grid min-h-screen place-items-center bg-kografly-stone px-6 thread-grid">
      <section className="w-full max-w-lg rounded-[2rem] border border-stone-200 bg-white p-6 shadow-thread">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-indigo-50 text-kografly-indigo"><UserRound className="h-6 w-6" /></div>
        <h1 className="mt-5 font-serif text-4xl font-bold text-stone-950">Buat profile Kografly</h1>
        <p className="mt-2 text-stone-600">Akunmu belum punya username public. Pilih satu untuk mulai.</p>
        <div className="mt-5 flex rounded-2xl border border-stone-200 px-4 py-3 text-lg font-bold focus-within:border-kografly-indigo">
          <span className="text-kografly-amber">/</span>
          <input value={username} onChange={(e) => setUsername(normalizeUsername(e.target.value))} className="w-full bg-transparent px-1 outline-none" placeholder="username" />
        </div>
        {message && <p className="mt-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-kografly-amber">{message}</p>}
        <button onClick={() => onCreate(username)} disabled={saving} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-kografly-indigo px-5 py-4 font-bold text-white disabled:opacity-70">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />} Buat profile
        </button>
      </section>
    </main>
  );
}

'@ | Set-Content -Encoding UTF8 -Path 'src\components\BuilderClient.tsx'

# src/components/IconRenderer.tsx
New-Item -ItemType Directory -Force -Path 'src\components' | Out-Null
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
  Portfolio: "Camera",
  Email: "Mail",
  Shop: "ShoppingBag",
  Social: "AtSign",
  Gaming: "Gamepad2",
  Code: "Code2",
  Community: "MessageCircle"
};

export default function IconRenderer({ name = "Globe2", className = "h-5 w-5", strokeWidth = 2 }: Props) {
  const iconMap = LucideIcons as unknown as Record<string, LucideIcon>;
  const aliasedName = ICON_ALIASES[name || "Globe2"] || name || "Globe2";
  const Icon = iconMap[aliasedName] || iconMap.Globe2 || iconMap.Link;
  return <Icon className={className} strokeWidth={strokeWidth} />;
}

'@ | Set-Content -Encoding UTF8 -Path 'src\components\IconRenderer.tsx'

# src/components/LandingPreview.tsx
New-Item -ItemType Directory -Force -Path 'src\components' | Out-Null
@'
import IconRenderer from "@/components/IconRenderer";

const previewLinks = [
  { title: "Latest Drop", icon: "Instagram", className: "bg-stone-950 text-white" },
  { title: "Community Thread", icon: "MessageCircle", className: "bg-indigo-50 text-kografly-indigo" },
  { title: "Video Channel", icon: "Youtube", className: "bg-white text-stone-950" },
  { title: "Open Source", icon: "Github", className: "bg-white/70 text-stone-950" }
];

export default function LandingPreview() {
  return (
    <div className="mx-auto max-w-[390px] rounded-[2rem] border border-stone-200 bg-white p-4 shadow-thread">
      <div className="rounded-[1.6rem] bg-kografly-stone p-6 thread-grid">
        <div className="text-center">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-kografly-indigo via-kografly-teal to-kografly-amber text-4xl font-bold text-white shadow-soft">
            K
          </div>
          <h2 className="mt-4 font-serif text-3xl font-bold">Kografly Studio</h2>
          <p className="mt-1 text-sm font-semibold text-kografly-indigo">/studio</p>
          <p className="mx-auto mt-3 max-w-[260px] text-sm leading-6 text-stone-600">Bio link yang terasa personal, rapi, dan bisa dipantau realtime.</p>
        </div>
        <div className="mt-7 space-y-3">
          {previewLinks.map((link, index) => (
            <div key={link.title} className={`thread-indent flex items-center gap-3 rounded-[1.35rem] border border-stone-200 px-4 py-3 shadow-soft ${link.className}`} style={{ marginLeft: index > 1 ? 24 : 0 }}>
              <IconRenderer name={link.icon} className="h-5 w-5" />
              <span className="font-bold">{link.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'@ | Set-Content -Encoding UTF8 -Path 'src\components\LandingPreview.tsx'

Write-Host 'Done. Now run: npm run build'
