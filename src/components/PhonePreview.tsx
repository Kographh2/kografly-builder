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

