$ErrorActionPreference = 'Stop'

Write-Host 'Applying Kografly Standard minimal update...'

New-Item -ItemType Directory -Force -Path 'src\lib' | Out-Null

@'
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ProfileTheme = {
  template?: "standard";
  background?: string;
  surface?: string;
  text?: string;
  muted?: string;
  accent?: string;
  secondary?: string;
  button?: string;
  buttonText?: string;
  decorative?: string;
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

New-Item -ItemType Directory -Force -Path 'src\constants' | Out-Null

@'
import type { ProfileTheme } from "@/lib/types";

export type ResolvedProfileTheme = Required<ProfileTheme>;

const legacyColors: Record<string, string> = {
  indigo: "#4338CA",
  amber: "#D97706",
  teal: "#0F766E",
  stone: "#FAFAF9",
  ink: "#0C0A09",
  gradient: "#F7F3EC"
};

export const defaultTheme: ResolvedProfileTheme = {
  template: "standard",
  background: "#F7F3EC",
  surface: "#FFFFFF",
  text: "#18181B",
  muted: "#6B7280",
  accent: "#4F46E5",
  secondary: "#0F766E",
  button: "#111827",
  buttonText: "#FFFFFF",
  decorative: "#E7DED2",
  buttonStyle: "solid"
};

export const themeColorFields: Array<{
  key: keyof Pick<
    ResolvedProfileTheme,
    "background" | "surface" | "text" | "muted" | "accent" | "secondary" | "button" | "buttonText" | "decorative"
  >;
  label: string;
  helper: string;
}> = [
  { key: "background", label: "Background", helper: "Warna halaman public" },
  { key: "surface", label: "Card", helper: "Warna kartu utama" },
  { key: "text", label: "Text", helper: "Nama dan judul" },
  { key: "muted", label: "Muted", helper: "Bio dan teks kecil" },
  { key: "accent", label: "Accent", helper: "Username dan glow" },
  { key: "secondary", label: "Secondary", helper: "Gradient halus" },
  { key: "button", label: "Button", helper: "Tombol link" },
  { key: "buttonText", label: "Text button", helper: "Teks tombol link" },
  { key: "decorative", label: "Decorative", helper: "Ornamen lembut" }
];

function color(value: string | undefined, fallback: string) {
  if (!value) return fallback;
  if (value.startsWith("#")) return value;
  return legacyColors[value] || fallback;
}

function buttonStyle(value: ProfileTheme["buttonStyle"] | undefined): ResolvedProfileTheme["buttonStyle"] {
  if (value === "outline" || value === "soft" || value === "glass") return value;
  return "solid";
}

export function normalizeTheme(theme?: ProfileTheme | null): ResolvedProfileTheme {
  return {
    template: "standard",
    background: color(theme?.background, defaultTheme.background),
    surface: color(theme?.surface, defaultTheme.surface),
    text: color(theme?.text, defaultTheme.text),
    muted: color(theme?.muted, defaultTheme.muted),
    accent: color(theme?.accent, defaultTheme.accent),
    secondary: color(theme?.secondary, defaultTheme.secondary),
    button: color(theme?.button, defaultTheme.button),
    buttonText: color(theme?.buttonText, defaultTheme.buttonText),
    decorative: color(theme?.decorative, defaultTheme.decorative),
    buttonStyle: buttonStyle(theme?.buttonStyle)
  };
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
  Portfolio: "BriefcaseBusiness",
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

New-Item -ItemType Directory -Force -Path 'src\components' | Out-Null

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
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs opacity-70 transition group-hover:opacity-100">↗</span>
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

'@ | Set-Content -Encoding UTF8 -Path 'src\components\LinkButton.tsx'

New-Item -ItemType Directory -Force -Path 'src\components' | Out-Null

@'
"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { ExternalLink, Sparkles } from "lucide-react";
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
    background:
      `radial-gradient(circle at 18% 8%, ${hexToRgba(theme.accent, 0.18)} 0, transparent 30%), ` +
      `radial-gradient(circle at 86% 12%, ${hexToRgba(theme.secondary, 0.16)} 0, transparent 28%), ` +
      `linear-gradient(180deg, ${theme.background}, ${hexToRgba(theme.decorative, 0.55)})`
  };

  return (
    <main className={cn("min-h-screen w-full overflow-hidden", compact && "min-h-0", className)} style={pageStyle}>
      <section className={cn("mx-auto w-full", compact ? "max-w-none px-0 py-0" : "max-w-xl px-4 py-8 sm:py-12")}>
        <article
          className={cn(
            "relative overflow-hidden border backdrop-blur-xl",
            compact ? "rounded-none border-0 shadow-none" : "rounded-[2.2rem] shadow-[0_28px_80px_rgba(15,23,42,0.13)]"
          )}
          style={{ background: hexToRgba(theme.surface, 0.88), borderColor: hexToRgba(theme.text, 0.08) }}
        >
          <div
            className="absolute left-1/2 top-0 h-36 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: `linear-gradient(90deg, ${hexToRgba(theme.accent, 0.35)}, ${hexToRgba(theme.secondary, 0.28)})` }}
          />

          <div className={cn("relative", compact ? "px-5 pb-8 pt-8" : "px-6 pb-9 pt-9 sm:px-10 sm:pt-10")}>
            <div className="mb-6 flex justify-center">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ background: hexToRgba(theme.surface, 0.68), borderColor: hexToRgba(theme.text, 0.08), color: theme.muted }}
              >
                <Sparkles className="h-3.5 w-3.5" style={{ color: theme.accent }} />
                Kografly Standard
              </span>
            </div>

            <div className="text-center">
              <div
                className={cn(
                  "mx-auto grid place-items-center overflow-hidden rounded-full bg-white shadow-[0_18px_50px_rgba(15,23,42,0.14)]",
                  compact ? "h-24 w-24 border-[5px]" : "h-28 w-28 border-[6px]"
                )}
                style={{ borderColor: hexToRgba(theme.surface, 0.95) }}
              >
                {profile.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.display_name}
                    width={compact ? 96 : 112}
                    height={compact ? 96 : 112}
                    className="h-full w-full object-cover"
                    priority={!preview}
                  />
                ) : (
                  <span className={cn("font-bold", compact ? "text-4xl" : "text-5xl")} style={{ color: theme.accent }}>
                    {profile.display_name.charAt(0)}
                  </span>
                )}
              </div>

              <h1
                className={cn("mt-5 break-words font-bold tracking-[-0.04em]", compact ? "text-3xl" : "text-4xl sm:text-5xl")}
                style={{ color: theme.text }}
              >
                {profile.display_name}
              </h1>

              <p className="mt-1 break-words text-sm font-semibold" style={{ color: theme.accent }}>
                /{profile.username}
              </p>

              {profile.bio ? (
                <p className="mx-auto mt-4 max-w-md break-words text-sm leading-7" style={{ color: theme.muted }}>
                  {profile.bio}
                </p>
              ) : null}
            </div>

            <div className={cn("space-y-3", compact ? "mt-7" : "mt-8")}>
              {sortedLinks.length ? (
                sortedLinks.map((link) => (
                  <LinkButton key={link.id} link={link} theme={theme} preview={preview} onTrackClick={onTrackClick} />
                ))
              ) : (
                <p
                  className="rounded-[1.45rem] border border-dashed p-6 text-center text-sm font-medium"
                  style={{ borderColor: hexToRgba(theme.text, 0.16), background: hexToRgba(theme.surface, 0.56), color: theme.muted }}
                >
                  Belum ada link yang dipublish.
                </p>
              )}
            </div>
          </div>
        </article>

        {showBrand ? (
          <a
            href="/"
            className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold shadow-[0_12px_34px_rgba(15,23,42,0.08)] backdrop-blur transition hover:-translate-y-0.5"
            style={{ background: hexToRgba(theme.surface, 0.86), borderColor: hexToRgba(theme.text, 0.08), color: theme.text }}
          >
            Built with Kografly <ExternalLink className="h-4 w-4" />
          </a>
        ) : null}
      </section>
    </main>
  );
}

'@ | Set-Content -Encoding UTF8 -Path 'src\components\ProfileCanvas.tsx'

New-Item -ItemType Directory -Force -Path 'src\components' | Out-Null

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
      <div className="relative h-[680px] max-h-[calc(100vh-96px)] min-h-[560px] overflow-hidden rounded-[1.75rem] bg-[#F7F3EC]">
        <div className="pointer-events-none absolute left-1/2 top-4 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-stone-950/90" />
        <div className="kografly-scrollbar h-full overflow-y-auto pt-12">
          <ProfileCanvas profile={fallbackProfile} links={links} preview compact showBrand={false} />
        </div>
      </div>
    </aside>
  );
}

'@ | Set-Content -Encoding UTF8 -Path 'src\components\PhonePreview.tsx'

New-Item -ItemType Directory -Force -Path 'src\components' | Out-Null

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

New-Item -ItemType Directory -Force -Path 'src\components' | Out-Null

@'
import IconRenderer from "@/components/IconRenderer";

const previewLinks = [
  { title: "Instagram", icon: "Instagram" },
  { title: "Portfolio", icon: "Portfolio" },
  { title: "Katalog produk", icon: "Shop" }
];

export default function LandingPreview() {
  return (
    <div className="mx-auto max-w-[390px] rounded-[2rem] border border-stone-200 bg-white p-4 shadow-thread">
      <div className="overflow-hidden rounded-[1.6rem] bg-[#F7F3EC]">
        <div className="h-24 bg-gradient-to-br from-kografly-indigo via-kografly-teal to-[#E7DED2]" />
        <div className="px-6 pb-7 text-center">
          <div className="mx-auto -mt-12 grid h-24 w-24 place-items-center rounded-full border-[6px] border-white bg-white text-4xl font-bold text-kografly-indigo shadow-soft">
            K
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-stone-950">Kografly Studio</h2>
          <p className="mt-1 text-sm font-semibold text-kografly-indigo">/studio</p>
          <p className="mx-auto mt-3 max-w-[260px] text-sm leading-6 text-stone-600">
            Bio link minimalis, elegan, realtime, dan gampang dikustom warna.
          </p>
        </div>

        <div className="space-y-3 px-5 pb-6">
          {previewLinks.map((link) => (
            <div
              key={link.title}
              className="flex items-center gap-3 rounded-[1.45rem] border border-stone-200 bg-stone-950 px-4 py-3.5 text-white shadow-soft"
            >
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15">
                <IconRenderer name={link.icon} className="h-5 w-5" />
              </span>
              <span className="font-semibold">{link.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'@ | Set-Content -Encoding UTF8 -Path 'src\components\LandingPreview.tsx'

New-Item -ItemType Directory -Force -Path 'src\app' | Out-Null

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
          indigo: "#4338CA",
          amber: "#D97706",
          teal: "#0F766E",
          stone: "#F7F3EC",
          ink: "#18181B",
          muted: "#6B7280",
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
          "0%, 100%": { boxShadow: "0 0 0 rgba(79, 70, 229, 0)" },
          "50%": { boxShadow: "0 0 28px rgba(79, 70, 229, .28)" }
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

New-Item -ItemType Directory -Force -Path 'src\app' | Out-Null

@'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --kografly-indigo: #4338ca;
  --kografly-teal: #0f766e;
  --kografly-bg: #f7f3ec;
  --kografly-ink: #18181b;
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
    linear-gradient(rgba(67, 56, 202, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(67, 56, 202, 0.035) 1px, transparent 1px);
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
  background: rgba(79, 70, 229, .2);
  border-radius: 999px;
}

.link-animation-none { animation: none; }
.link-animation-rise { animation: k-rise .42s ease both; }
.link-animation-pulse { animation: k-pulse 2s ease-in-out infinite; }
.link-animation-wiggle { animation: k-wiggle 1.5s ease-in-out infinite; }
.link-animation-bounce { animation: k-bounce-soft 1.8s ease-in-out infinite; }
.link-animation-glow { animation: k-glow 2.3s ease-in-out infinite; }

'@ | Set-Content -Encoding UTF8 -Path 'src\app\globals.css'

New-Item -ItemType Directory -Force -Path 'src\app\[username]' | Out-Null

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
import { defaultTheme, normalizeTheme, themeColorFields } from "@/constants/templates";
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

    setMessage("Profile dan tampilan Kografly Standard tersimpan.");
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
            <p className="text-sm font-bold uppercase tracking-[.25em] text-kografly-teal">Kografly Builder</p>
            <h1 className="text-4xl font-bold tracking-[-0.04em] text-stone-950">Editor bio-link</h1>
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
                  <p className="text-sm font-bold uppercase tracking-[.2em] text-kografly-teal">Profile</p>
                  <h2 className="text-3xl font-bold tracking-[-0.04em] text-stone-950">Identitas public</h2>
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
                  <p className="text-sm font-bold uppercase tracking-[.2em] text-kografly-amber">Tampilan</p>
                  <h2 className="text-3xl font-bold tracking-[-0.04em] text-stone-950">Kografly Standard</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                    Satu template minimalis dan elegan. Warnanya bisa kamu atur, lalu cek dulu di preview HP sebelum disimpan.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => updateTheme(defaultTheme)}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm font-bold text-stone-600 hover:text-kografly-indigo"
                >
                  <RotateCcw className="h-4 w-4" /> Reset warna
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {themeColorFields.map((field) => (
                  <label key={field.key} className="rounded-[1.3rem] border border-stone-200 p-3">
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

              <label className="mt-4 block max-w-sm">
                <span className="mb-2 block text-sm font-bold text-stone-700">Style tombol default</span>
                <select
                  value={currentTheme.buttonStyle}
                  onChange={(e) => updateTheme({ ...currentTheme, buttonStyle: e.target.value as ProfileTheme["buttonStyle"] })}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-kografly-indigo"
                >
                  <option value="solid">Solid elegant</option>
                  <option value="outline">Outline</option>
                  <option value="soft">Soft accent</option>
                  <option value="glass">Glass</option>
                </select>
              </label>

              <button onClick={saveProfile} disabled={saving} className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-kografly-indigo px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-70">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Simpan profile & tampilan
              </button>
            </article>

            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[.2em] text-kografly-amber">Bio links</p>
                <h2 className="text-3xl font-bold tracking-[-0.04em] text-stone-950">Link tanpa batas</h2>
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
        <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-stone-950">Buat profile Kografly</h1>
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

Write-Host 'Done. Run: npm run build'