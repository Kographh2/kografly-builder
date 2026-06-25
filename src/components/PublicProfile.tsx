"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Radio } from "lucide-react";
import LinkButton from "@/components/LinkButton";
import RealtimeBadge from "@/components/RealtimeBadge";
import { supabase } from "@/lib/supabase/client";
import type { KograflyLink, Profile } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  initialProfile: Profile;
  initialLinks: KograflyLink[];
};

export default function PublicProfile({ initialProfile, initialLinks }: Props) {
  const [profile, setProfile] = useState(initialProfile);
  const [links, setLinks] = useState(initialLinks);
  const [connected, setConnected] = useState(false);
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
        setLinks(data || []);
      })
      .subscribe((status) => setConnected(status === "SUBSCRIBED"));

    return () => {
      setConnected(false);
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

  return (
    <main className={cn("min-h-screen px-4 py-8 thread-grid", profile.theme?.background === "ink" ? "bg-stone-950" : "bg-kografly-stone")}>
      <section className="mx-auto max-w-xl">
        <div className="mb-4 flex justify-center">
          <RealtimeBadge connected={connected} />
        </div>

        <article className="overflow-hidden rounded-[2.4rem] border border-stone-200 bg-white/90 shadow-thread backdrop-blur">
          <div className="h-28 bg-gradient-to-br from-kografly-indigo via-kografly-teal to-kografly-amber" />
          <div className="px-6 pb-8 text-center sm:px-10">
            <div className="mx-auto -mt-14 grid h-28 w-28 place-items-center overflow-hidden rounded-full border-[6px] border-white bg-indigo-100 shadow-soft">
              {profile.avatar_url ? (
                <Image src={profile.avatar_url} alt={profile.display_name} width={112} height={112} className="h-full w-full object-cover" priority />
              ) : (
                <span className="font-serif text-5xl font-bold text-kografly-indigo">{profile.display_name.charAt(0)}</span>
              )}
            </div>

            <h1 className="mt-5 font-serif text-4xl font-bold text-stone-950">{profile.display_name}</h1>
            <p className="mt-1 text-sm font-bold text-kografly-indigo">/{profile.username}</p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-stone-600">{profile.bio}</p>

            <div className="mt-8 space-y-3 text-left">
              {sortedLinks.length ? sortedLinks.map((link) => (
                <LinkButton key={link.id} link={link} onTrackClick={trackClick} />
              )) : (
                <p className="rounded-[1.35rem] border border-dashed border-stone-300 bg-kografly-stone p-6 text-center text-sm text-stone-500">
                  Belum ada link yang dipublish.
                </p>
              )}
            </div>
          </div>
        </article>

        <a href="/" className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-white/90 px-5 py-3 text-sm font-bold text-stone-700 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:text-kografly-indigo">
          <Radio className="h-4 w-4 text-kografly-teal" /> Built with Kografly <ExternalLink className="h-4 w-4" />
        </a>
      </section>
    </main>
  );
}
