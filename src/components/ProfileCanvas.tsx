"use client";

import { AtSign, BadgeCheck, Heart, Link2, Menu, MessageCircle, ShieldCheck, Sparkles, Zap } from "lucide-react";
import IconRenderer from "@/components/IconRenderer";
import KograflyMascot from "@/components/KograflyMascot";
import LinkButton from "@/components/LinkButton";
import { getResolvedTheme } from "@/constants/templates";
import type { KograflyLink, Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

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

  const canvasClass = cn(
    "kografly-canvas relative mx-auto w-full overflow-hidden bg-[var(--k-bg)] text-[var(--k-text)] shadow-[0_30px_90px_rgba(15,23,42,0.12)]",
    compact ? "min-h-full rounded-[1.65rem]" : "min-h-screen max-w-[680px] rounded-none sm:my-8 sm:min-h-[860px] sm:rounded-[3rem]"
  );

  if (template.layout === "connector") {
    return (
      <article className={canvasClass} style={cssVars}>
        <Decorations />
        <section className={cn("relative overflow-hidden bg-gradient-to-br from-[var(--k-accent)] via-[var(--k-accent)] to-[var(--k-secondary)] text-white", compact ? "rounded-b-[2rem] px-5 pb-12 pt-7" : "rounded-b-[3rem] px-8 pb-16 pt-9 sm:px-10")}> 
          <TopNav profile={profile} compact={compact} inverse />
          <div className={cn("relative mt-9 grid items-end gap-4", compact ? "grid-cols-[1fr_145px]" : "grid-cols-[1fr_230px]")}> 
            <div className="relative z-10">
              <Pill icon={<Sparkles className="h-4 w-4" />} inverse>{template.heroEyebrow}</Pill>
              <h1 className={cn("mt-4 font-black leading-[0.98] tracking-[-.05em] drop-shadow-sm", compact ? "text-[2.45rem]" : "text-6xl")}>{template.heroTitle}</h1>
              <p className={cn("mt-5 max-w-[270px] font-semibold leading-7 text-white/85", compact ? "text-sm" : "text-lg")}>{profile.bio || template.helperBody}</p>
            </div>
            <div className="relative z-10">
              <div className="absolute inset-x-0 bottom-0 h-32 rounded-full bg-white/15 blur-2xl" />
              <KograflyMascot templateId={template.id} mascotId={values.mascot} className={compact ? "relative z-10 h-[210px] w-full object-contain" : "relative z-10 h-[330px] w-full object-contain"} priority={!preview} />
            </div>
          </div>
          <WaveDivider />
        </section>

        <section className={cn("relative z-10 space-y-4", compact ? "-mt-8 px-5 pb-7" : "-mt-10 px-8 pb-10 sm:px-10")}> 
          <LinkList links={activeLinks} preview={preview} compact={compact} onTrackClick={onTrackClick} buttonStyle="solid" />
          <TrustStrip compact={compact} />
          <SocialDots links={activeLinks} preview={preview} onTrackClick={onTrackClick} />
        </section>
      </article>
    );
  }

  if (template.layout === "supporter") {
    return (
      <article className={canvasClass} style={cssVars}>
        <Decorations />
        <section className={cn("relative z-10", compact ? "px-5 py-7" : "px-8 py-10 sm:px-10")}> 
          <TopNav profile={profile} compact={compact} />
          <div className={cn("mt-9 grid items-center gap-4", compact ? "grid-cols-[1fr_135px]" : "grid-cols-[1fr_230px]")}> 
            <div>
              <Pill icon={<Heart className="h-4 w-4" />}>{template.heroEyebrow}</Pill>
              <h1 className={cn("mt-4 font-black leading-[1.03] tracking-[-.05em]", compact ? "text-[2.2rem]" : "text-6xl")}>{template.heroTitle}</h1>
              <p className={cn("mt-4 max-w-[320px] leading-7 text-[var(--k-muted)]", compact ? "text-sm" : "text-lg")}>{profile.bio || template.helperBody}</p>
            </div>
            <div className="relative">
              <div className="absolute inset-x-4 bottom-4 h-28 rounded-full bg-[var(--k-soft)] blur-xl" />
              <KograflyMascot templateId={template.id} mascotId={values.mascot} className={compact ? "relative h-[190px] w-full" : "relative h-[300px] w-full"} priority={!preview} />
            </div>
          </div>
          <div className="relative mt-6 overflow-hidden rounded-[1.7rem] border border-black/5 bg-white/78 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[var(--k-soft)] text-[var(--k-accent)]"><ShieldCheck className="h-7 w-7" /></span>
              <div>
                <h2 className="font-extrabold tracking-tight">{template.helperTitle}</h2>
                <p className="mt-1 text-sm leading-6 text-[var(--k-muted)]">{template.helperBody}</p>
              </div>
            </div>
          </div>
        </section>
        <section className={cn("relative z-10 space-y-4", compact ? "px-5 pb-7" : "px-8 pb-10 sm:px-10")}> 
          <LinkList links={activeLinks} preview={preview} compact={compact} onTrackClick={onTrackClick} buttonStyle="soft" />
          <div className="rounded-[1.7rem] border border-[var(--k-secondary)]/40 bg-[var(--k-soft)]/80 p-5">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[var(--k-accent)]"><BadgeCheck className="h-6 w-6" /></span>
              <div>
                <p className="font-extrabold">Dukungan Terpercaya</p>
                <p className="text-sm text-[var(--k-muted)]">Kami hadir untuk Anda, setiap langkah.</p>
              </div>
            </div>
          </div>
          <SocialDots links={activeLinks} preview={preview} onTrackClick={onTrackClick} />
        </section>
      </article>
    );
  }

  return (
    <article className={canvasClass} style={cssVars}>
      <Decorations />
      <section className={cn("relative z-10", compact ? "px-5 py-7" : "px-8 py-10 sm:px-10")}> 
        <TopNav profile={profile} compact={compact} />
        <div className={cn("mt-10 grid items-center", compact ? "grid-cols-[1fr_145px] gap-2" : "grid-cols-[1fr_240px] gap-6")}> 
          <div>
            <Pill icon={<AtSign className="h-4 w-4" />}>{template.heroEyebrow}</Pill>
            <h1 className={cn("mt-4 font-black leading-[0.98] tracking-[-.055em]", compact ? "text-[2.35rem]" : "text-6xl")}>{template.heroTitle}</h1>
            <p className={cn("mt-4 max-w-[320px] leading-7 text-[var(--k-muted)]", compact ? "text-sm" : "text-lg")}>{profile.bio || template.helperBody}</p>
            <p className="mt-4 text-sm font-extrabold text-[var(--k-accent)]">/{profile.username}</p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 scale-95 rounded-full bg-[var(--k-decorative)]" />
            <KograflyMascot templateId={template.id} mascotId={values.mascot} className={compact ? "relative h-[210px] w-full" : "relative h-[330px] w-full"} priority={!preview} />
          </div>
        </div>
      </section>
      <div className="relative -mt-2 h-16 bg-[var(--k-decorative)]/65">
        <WaveDivider light />
      </div>
      <section className={cn("relative z-10 -mt-10 space-y-4", compact ? "px-5 pb-7" : "px-8 pb-10 sm:px-10")}> 
        <LinkList links={activeLinks} preview={preview} compact={compact} onTrackClick={onTrackClick} buttonStyle="soft" />
        <SocialDots links={activeLinks} preview={preview} onTrackClick={onTrackClick} />
      </section>
    </article>
  );
}

function TopNav({ profile, compact, inverse = false }: { profile: Profile; compact?: boolean; inverse?: boolean }) {
  return (
    <div className="relative z-20 flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className={cn("grid shrink-0 place-items-center rounded-2xl shadow-sm", compact ? "h-11 w-11" : "h-14 w-14", inverse ? "bg-white text-[var(--k-accent)]" : "bg-[var(--k-accent)] text-white")}> <Link2 className={compact ? "h-5 w-5" : "h-7 w-7"} /></span>
        <div className="min-w-0">
          <p className={cn("truncate font-black uppercase tracking-tight", compact ? "text-base" : "text-2xl", inverse ? "text-white" : "text-[var(--k-text)]")}>{profile.display_name || "Brand Name"}</p>
          <p className={cn("truncate text-xs font-semibold", inverse ? "text-white/75" : "text-[var(--k-muted)]")}>Connecting Everything</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {profile.avatar_url ? (
          <div className={cn("overflow-hidden rounded-full ring-4", inverse ? "ring-white/20" : "ring-[var(--k-soft)]", compact ? "h-10 w-10" : "h-12 w-12")}>
            <img src={profile.avatar_url} alt={profile.display_name} className="h-full w-full object-cover" />
          </div>
        ) : null}
        <span className={cn("grid rounded-full", compact ? "h-10 w-10" : "h-12 w-12", inverse ? "bg-white/18 text-white" : "bg-[var(--k-soft)] text-[var(--k-accent)]")}><Menu className="m-auto h-5 w-5" /></span>
      </div>
    </div>
  );
}

function Pill({ icon, children, inverse = false }: { icon: ReactNode; children: ReactNode; inverse?: boolean }) {
  return <span className={cn("inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold", inverse ? "bg-white/18 text-white" : "bg-[var(--k-soft)] text-[var(--k-accent)]")}>{icon}{children}</span>;
}

function LinkList({
  links,
  preview,
  compact,
  onTrackClick,
  buttonStyle
}: {
  links: KograflyLink[];
  preview: boolean;
  compact: boolean;
  onTrackClick?: (link: KograflyLink) => void;
  buttonStyle: "solid" | "outline" | "soft" | "glass";
}) {
  if (!links.length) {
    return (
      <div className="rounded-[1.65rem] border border-dashed border-[var(--k-secondary)]/60 bg-white/70 p-5 text-center text-sm font-semibold text-[var(--k-muted)]">
        Link yang aktif akan muncul di sini.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {links.map((link) => (
        <LinkButton key={link.id} link={link} preview={preview} compact={compact} onTrackClick={onTrackClick} buttonStyle={buttonStyle} />
      ))}
    </div>
  );
}

function TrustStrip({ compact }: { compact: boolean }) {
  const items = [
    { icon: <ShieldCheck className="h-6 w-6" />, title: "Terpercaya", body: "Aman & profesional" },
    { icon: <Zap className="h-6 w-6" />, title: "Akses Cepat", body: "Semua 1 klik" },
    { icon: <MessageCircle className="h-6 w-6" />, title: "Selalu Siap", body: "Responsif" }
  ];
  return (
    <div className={cn("grid grid-cols-3 divide-x divide-[var(--k-secondary)]/30 rounded-[1.6rem] border border-[var(--k-secondary)]/35 bg-white/75 p-3 shadow-[0_12px_35px_rgba(15,23,42,0.07)]", compact ? "gap-1" : "gap-2 p-4")}> 
      {items.map((item) => <div key={item.title} className="px-2 text-center"><div className="mx-auto grid h-8 w-8 place-items-center text-[var(--k-accent)]">{item.icon}</div><p className="mt-1 text-xs font-extrabold">{item.title}</p><p className="text-[10px] text-[var(--k-muted)]">{item.body}</p></div>)}
    </div>
  );
}

function SocialDots({ links, preview, onTrackClick }: { links: KograflyLink[]; preview: boolean; onTrackClick?: (link: KograflyLink) => void }) {
  const socials = links.slice(0, 5);
  if (!socials.length) return null;

  return (
    <div className="flex items-center justify-center gap-3 pt-2">
      {socials.map((link) => {
        const content = <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--k-accent)] text-white shadow-[0_10px_22px_rgba(15,23,42,0.18)] transition hover:-translate-y-1"><span className="sr-only">{link.title}</span><IconSmall name={link.icon_name} /></span>;
        if (preview) return <div key={link.id}>{content}</div>;
        return <a key={link.id} href={link.url} target="_blank" rel="noreferrer" onClick={() => onTrackClick?.(link)}>{content}</a>;
      })}
    </div>
  );
}

function IconSmall({ name }: { name: string }) {
  return <IconRenderer name={name} className="h-5 w-5" />;
}

function Decorations() {
  return (
    <>
      <div className="pointer-events-none absolute -left-16 top-24 h-48 w-48 rounded-full bg-[var(--k-decorative)]/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-40 h-56 w-56 rounded-full bg-[var(--k-soft)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-32 rounded-tr-[100%] bg-[var(--k-decorative)]/60" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-32 rounded-tl-[100%] bg-[var(--k-decorative)]/60" />
      <div className="pointer-events-none absolute right-10 top-28 text-[var(--k-secondary)]/60"><Sparkles className="h-7 w-7" /></div>
      <div className="pointer-events-none absolute left-10 top-64 text-[var(--k-secondary)]/50"><Sparkles className="h-5 w-5" /></div>
    </>
  );
}

function WaveDivider({ light = false }: { light?: boolean }) {
  return (
    <svg className={cn("absolute inset-x-0 bottom-[-1px] h-16 w-full", light ? "text-[var(--k-bg)]" : "text-[var(--k-bg)]")} viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 48 C 120 88 190 6 315 38 C 430 68 480 42 600 18 L600 80 L0 80 Z" fill="currentColor" />
    </svg>
  );
}
