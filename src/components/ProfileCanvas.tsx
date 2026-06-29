"use client";

import { ExternalLink, Link2 } from "lucide-react";
import KograflyMascot from "@/components/KograflyMascot";
import LinkButton from "@/components/LinkButton";
import { getResolvedTheme } from "@/constants/templates";
import type { KograflyLink, Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

export default function ProfileCanvas({
  profile,
  links,
  preview = false,
  compact = false,
  onTrackClick
}: {
  profile: Profile;
  links: KograflyLink[];
  preview?: boolean;
  compact?: boolean;
  onTrackClick?: (link: KograflyLink) => void;
}) {
  const { template, values } = getResolvedTheme(profile.theme);
  const activeLinks = links
    .filter((link) => link.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);

  const cssVars = {
    "--k-bg": values.background,
    "--k-surface": values.surface,
    "--k-text": values.text,
    "--k-muted": values.muted,
    "--k-accent": values.accent,
    "--k-secondary": values.secondary,
    "--k-button": values.button,
    "--k-button-text": values.buttonText,
    "--k-decorative": values.decorative,
    "--k-soft": values.soft
  } as CSSProperties;

  const hasAvatar = Boolean(profile.avatar_url);

  return (
    <article
      className={cn(
        "kografly-canvas relative mx-auto flex w-full flex-col overflow-hidden bg-[var(--k-bg)] text-[var(--k-text)]",
        compact
          ? "min-h-full rounded-[1.65rem]"
          : "min-h-[100dvh] max-w-[480px] rounded-none shadow-[0_30px_90px_rgba(15,23,42,0.10)] sm:my-8 sm:min-h-[780px] sm:rounded-[2.25rem]"
      )}
      style={cssVars}
    >
      <SoftBackground />

      <header className={cn("relative z-10 text-center", compact ? "px-5 pb-5 pt-9" : "px-6 pb-6 pt-12 sm:px-8")}>
        <div className={cn("pointer-events-none absolute opacity-20", compact ? "right-1 top-3 h-24 w-24" : "right-4 top-5 h-32 w-32")}>
          <KograflyMascot templateId={template.id} mascotId={values.mascot} className="h-full w-full object-contain" priority={!preview} />
        </div>

        <div className="relative mx-auto w-fit">
          <div className={cn("grid overflow-hidden rounded-full border-[5px] border-white bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)]", compact ? "h-24 w-24" : "h-28 w-28")}>
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.display_name} className="h-full w-full object-cover" />
            ) : (
              <KograflyMascot templateId={template.id} mascotId={values.mascot} className="h-full w-full scale-125 object-contain" priority={!preview} />
            )}
          </div>

          {hasAvatar ? (
            <span className={cn("absolute -bottom-1 -right-2 grid rounded-full border-4 border-white bg-[var(--k-soft)] shadow-sm", compact ? "h-11 w-11" : "h-12 w-12")}>
              <KograflyMascot templateId={template.id} mascotId={values.mascot} className="m-auto h-full w-full scale-125 object-contain" />
            </span>
          ) : null}
        </div>

        <h1 className={cn("mx-auto mt-5 max-w-[360px] break-words font-black leading-tight tracking-[-0.04em]", compact ? "text-2xl" : "text-[2rem]")}>
          {profile.display_name || "Kografly"}
        </h1>

        <p className="mt-1 text-sm font-bold text-[var(--k-accent)]">/{profile.username || "username"}</p>

        {profile.bio ? (
          <p className={cn("mx-auto mt-4 max-w-[330px] break-words leading-7 text-[var(--k-muted)]", compact ? "text-sm" : "text-[15px]")}>{profile.bio}</p>
        ) : null}
      </header>

      <section className={cn("relative z-10 flex-1", compact ? "px-4 pb-4" : "px-5 pb-5 sm:px-6")}>
        <div className={cn("space-y-3", compact ? "" : "")}>
          {activeLinks.length ? (
            activeLinks.map((link) => (
              <LinkButton
                key={link.id}
                link={link}
                preview={preview}
                compact={compact}
                onTrackClick={onTrackClick}
                buttonStyle={values.buttonStyle || link.style_variant || "soft"}
              />
            ))
          ) : (
            <div className="rounded-[1.35rem] border border-dashed border-[var(--k-secondary)]/65 bg-white/70 p-5 text-center text-sm font-semibold text-[var(--k-muted)]">
              Link aktif akan muncul di sini.
            </div>
          )}
        </div>
      </section>

      <footer className={cn("relative z-10 mt-auto px-5", compact ? "pb-5 pt-2" : "pb-8 pt-4")}>
        <a
          href="/"
          className="k-built-with mx-auto inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-[var(--k-secondary)]/35 bg-white/72 px-4 py-2.5 text-xs font-extrabold text-[var(--k-text)] shadow-[0_12px_28px_rgba(15,23,42,0.06)] backdrop-blur transition hover:-translate-y-0.5 hover:text-[var(--k-accent)]"
        >
          <Link2 className="h-4 w-4 text-[var(--k-accent)]" />
          <span>Built with Kografly</span>
          <ExternalLink className="h-3.5 w-3.5 opacity-70" />
        </a>
      </footer>
    </article>
  );
}

function SoftBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-[linear-gradient(180deg,var(--k-soft),transparent)]" />
      <div className="pointer-events-none absolute -left-20 top-28 h-60 w-60 rounded-full bg-[var(--k-decorative)]/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-[var(--k-soft)]/85 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(0deg,var(--k-soft),transparent)]" />
    </>
  );
}
