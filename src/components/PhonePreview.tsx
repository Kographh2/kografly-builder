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

