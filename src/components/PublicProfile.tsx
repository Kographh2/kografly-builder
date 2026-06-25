"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ProfileCanvas from "@/components/ProfileCanvas";
import { supabase } from "@/lib/supabase/client";
import type { KograflyLink, Profile } from "@/lib/types";

type Props = {
  initialProfile: Profile;
  initialLinks: KograflyLink[];
};

export default function PublicProfile({ initialProfile, initialLinks }: Props) {
  const [profile, setProfile] = useState(initialProfile);
  const [links, setLinks] = useState(initialLinks);
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

        setLinks((data || []) as KograflyLink[]);
      })
      .subscribe();

    return () => {
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

  return <ProfileCanvas profile={profile} links={sortedLinks} onTrackClick={trackClick} />;
}

