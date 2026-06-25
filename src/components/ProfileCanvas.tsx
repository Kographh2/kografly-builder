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
