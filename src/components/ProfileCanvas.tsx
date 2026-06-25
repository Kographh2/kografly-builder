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

