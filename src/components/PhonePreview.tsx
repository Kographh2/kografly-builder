"use client";

import ProfileCanvas from "@/components/ProfileCanvas";
import type { KograflyLink, Profile } from "@/lib/types";

export default function PhonePreview({
  profile,
  links
}: {
  profile: Profile | null;
  links: KograflyLink[];
}) {
  const fallbackProfile: Profile = profile || {
    id: "preview",
    owner_id: "preview",
    username: "username",
    display_name: "Kografly Creator",
    bio: "Tulis bio singkat kamu dan susun link favoritmu.",
    avatar_url: null,
    is_published: true,
    theme: { template: "blue-guide" },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  return (
    <aside className="mx-auto h-fit w-full max-w-[410px] self-start rounded-[2.35rem] border border-slate-200 bg-slate-950 p-3 shadow-[0_28px_90px_rgba(2,6,23,0.25)] lg:sticky lg:top-6">
      <div className="flex h-[720px] max-h-[calc(100vh-82px)] min-h-[560px] overflow-hidden rounded-[1.85rem] bg-white">
        <div className="kografly-scrollbar min-h-0 w-full overflow-y-auto">
          <ProfileCanvas profile={fallbackProfile} links={links} preview compact />
        </div>
      </div>
    </aside>
  );
}
