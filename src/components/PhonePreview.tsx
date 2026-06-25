"use client";

import Image from "next/image";
import LinkButton from "@/components/LinkButton";
import type { KograflyLink, Profile } from "@/lib/types";

export default function PhonePreview({ profile, links }: { profile: Profile | null; links: KograflyLink[] }) {
  const activeLinks = links.filter((link) => link.is_active).sort((a, b) => a.sort_order - b.sort_order);

  return (
    <aside className="sticky top-6 mx-auto w-full max-w-[390px] rounded-[2.25rem] border border-stone-200 bg-stone-950 p-3 shadow-thread">
      <div className="min-h-[720px] overflow-hidden rounded-[1.75rem] bg-[#FAFAF9] thread-grid">
        <div className="mx-auto mt-4 h-6 w-24 rounded-full bg-stone-950/90" />
        <div className="px-6 py-8 text-center">
          <div className="mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full border-4 border-white bg-indigo-100 shadow-soft">
            {profile?.avatar_url ? (
              <Image src={profile.avatar_url} alt={profile.display_name} width={96} height={96} className="h-full w-full object-cover" />
            ) : (
              <span className="font-serif text-4xl font-bold text-kografly-indigo">{profile?.display_name?.charAt(0) || "K"}</span>
            )}
          </div>
          <h2 className="mt-4 font-serif text-3xl font-bold text-stone-950">{profile?.display_name || "Kografly Creator"}</h2>
          <p className="mt-1 text-sm font-semibold text-kografly-indigo">/{profile?.username || "username"}</p>
          <p className="mx-auto mt-3 max-w-[280px] text-sm leading-6 text-stone-600">{profile?.bio || "Tulis bio singkat kamu dan susun link favoritmu."}</p>
        </div>
        <div className="space-y-3 px-5 pb-8">
          {activeLinks.length ? (
            activeLinks.map((link) => <LinkButton key={link.id} link={link} preview />)
          ) : (
            <div className="rounded-[1.35rem] border border-dashed border-stone-300 bg-white/80 p-5 text-center text-sm text-stone-500">
              Link kamu akan muncul di sini.
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
