"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BarChart3, ExternalLink, Loader2, MousePointerClick, Radio, UsersRound } from "lucide-react";
import RealtimeBadge from "@/components/RealtimeBadge";
import { supabase } from "@/lib/supabase/client";
import type { AnalyticsEvent, KograflyLink, Profile } from "@/lib/types";
import { formatNumber, getSiteUrl } from "@/lib/utils";

export default function DashboardClient() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<KograflyLink[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function boot() {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profileData, error: profileError } = await supabase.from("profiles").select("*").eq("owner_id", user.id).maybeSingle();
      if (profileError) setError(profileError.message);
      if (!profileData) {
        router.push("/builder");
        return;
      }
      setProfile(profileData);

      const [{ data: linkData }, { data: eventData, error: eventError }] = await Promise.all([
        supabase.from("links").select("*").eq("profile_id", profileData.id).order("sort_order", { ascending: true }),
        supabase.from("analytics_events").select("*").eq("profile_id", profileData.id).order("created_at", { ascending: false }).limit(1000)
      ]);
      if (eventError) setError(eventError.message);
      setLinks(linkData || []);
      setEvents(eventData || []);
      setLoading(false);
    }
    void boot();
  }, [router]);

  useEffect(() => {
    if (!profile?.id) return;
    const channel = supabase
      .channel(`dashboard:${profile.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "analytics_events", filter: `profile_id=eq.${profile.id}` }, (payload) => {
        setEvents((current) => [payload.new as AnalyticsEvent, ...current].slice(0, 1000));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "links", filter: `profile_id=eq.${profile.id}` }, async () => {
        const { data } = await supabase.from("links").select("*").eq("profile_id", profile.id).order("sort_order", { ascending: true });
        setLinks(data || []);
      })
      .subscribe((status) => setConnected(status === "SUBSCRIBED"));

    return () => {
      setConnected(false);
      void supabase.removeChannel(channel);
    };
  }, [profile?.id]);

  const stats = useMemo(() => {
    const views = events.filter((event) => event.type === "view").length;
    const clicks = events.filter((event) => event.type === "click").length;
    const ctr = views ? Math.round((clicks / views) * 1000) / 10 : 0;
    const byLink = links.map((link) => ({
      link,
      clicks: events.filter((event) => event.type === "click" && event.link_id === link.id).length
    })).sort((a, b) => b.clicks - a.clicks);
    return { views, clicks, ctr, byLink };
  }, [events, links]);

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-kografly-stone thread-grid">
        <Loader2 className="h-8 w-8 animate-spin text-kografly-indigo" />
      </main>
    );
  }

  if (!profile) return null;

  const publicUrl = `${getSiteUrl()}/${profile.username}`;
  const maxClicks = Math.max(1, ...stats.byLink.map((item) => item.clicks));

  return (
    <main className="min-h-screen bg-kografly-stone px-4 py-6 thread-grid lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col justify-between gap-4 rounded-[2rem] border border-stone-200 bg-white/95 p-5 shadow-soft backdrop-blur md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.25em] text-kografly-amber">Kografly Dashboard</p>
            <h1 className="text-4xl font-bold text-stone-950">Analytics realtime</h1>
            <p className="mt-1 text-sm text-stone-500">Pantau performa public profile <a className="font-bold text-kografly-indigo" href={publicUrl} target="_blank" rel="noreferrer">/{profile.username}</a>.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <RealtimeBadge connected={connected} />
            <Link href="/builder" className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold text-stone-700 hover:text-kografly-indigo">Builder</Link>
            <a href={publicUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-4 py-2 text-sm font-bold text-white"><ExternalLink className="h-4 w-4" /> Public</a>
          </div>
        </header>

        {error && <p className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-kografly-error">{error}</p>}

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard title="Profile views" value={formatNumber(stats.views)} icon={<UsersRound className="h-5 w-5" />} helper="Semua kunjungan ke halaman public" />
          <StatCard title="Link clicks" value={formatNumber(stats.clicks)} icon={<MousePointerClick className="h-5 w-5" />} helper="Total klik semua tombol" />
          <StatCard title="CTR" value={`${stats.ctr}%`} icon={<BarChart3 className="h-5 w-5" />} helper="Click-through rate sederhana" />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
          <article className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[.2em] text-kografly-teal">Top Links</p>
                <h2 className="text-3xl font-bold text-stone-950">Klik per bio-link</h2>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-kografly-indigo">{links.length} links</span>
            </div>
            <div className="space-y-4">
              {stats.byLink.length ? stats.byLink.map(({ link, clicks }) => (
                <div key={link.id} className="thread-indent rounded-2xl border border-stone-200 p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-bold text-stone-950">{link.title}</p>
                      <p className="truncate text-sm text-stone-500">{link.url}</p>
                    </div>
                    <span className="text-2xl font-bold text-kografly-indigo">{formatNumber(clicks)}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-stone-100">
                    <div className="h-full rounded-full bg-kografly-indigo" style={{ width: `${Math.max(4, (clicks / maxClicks) * 100)}%` }} />
                  </div>
                </div>
              )) : (
                <p className="rounded-2xl border border-dashed border-stone-300 p-8 text-center text-stone-500">Belum ada link. Tambahkan dari builder.</p>
              )}
            </div>
          </article>

          <article className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
            <div className="mb-6 flex items-center gap-2">
              <Radio className="h-5 w-5 text-kografly-teal" />
              <h2 className="text-3xl font-bold text-stone-950">Live feed</h2>
            </div>
            <div className="max-h-[560px] space-y-3 overflow-auto pr-1 kografly-scrollbar">
              {events.slice(0, 20).map((event) => {
                const link = links.find((item) => item.id === event.link_id);
                return (
                  <div key={event.id} className="rounded-2xl border border-stone-200 bg-kografly-stone p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${event.type === "click" ? "bg-indigo-50 text-kografly-indigo" : "bg-teal-50 text-kografly-teal"}`}>{event.type}</span>
                      <span className="text-xs text-stone-500">{new Date(event.created_at).toLocaleString("id-ID")}</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-stone-700">{event.type === "click" ? link?.title || "Unknown link" : `View profile /${profile.username}`}</p>
                  </div>
                );
              })}
              {!events.length && <p className="rounded-2xl border border-dashed border-stone-300 p-8 text-center text-stone-500">Belum ada analytics. Buka public page untuk membuat event view.</p>}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

function StatCard({ title, value, helper, icon }: { title: string; value: string; helper: string; icon: React.ReactNode }) {
  return (
    <article className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-kografly-indigo">{icon}</div>
      <p className="text-sm font-bold uppercase tracking-[.2em] text-stone-500">{title}</p>
      <p className="mt-2 text-5xl font-bold text-stone-950">{value}</p>
      <p className="mt-2 text-sm text-stone-500">{helper}</p>
    </article>
  );
}
