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

