"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Loader2, LogOut, Plus, Save, UserRound } from "lucide-react";
import AvatarUploader from "@/components/AvatarUploader";
import LinkCardEditor from "@/components/LinkCardEditor";
import PhonePreview from "@/components/PhonePreview";
import RealtimeBadge from "@/components/RealtimeBadge";
import { buildTemplateTheme, getResolvedTheme, KOGRAFLY_TEMPLATES } from "@/constants/templates";
import { supabase } from "@/lib/supabase/client";
import type { KograflyLink, Profile, ProfileTheme } from "@/lib/types";
import { cn, ensureUrl, getSiteUrl, isValidUsername, normalizeUsername } from "@/lib/utils";

type UserState = { id: string; email?: string };
type ColorKey = Exclude<keyof ProfileTheme, "template" | "mascot" | "buttonStyle">;

const colorFields: { key: ColorKey; label: string }[] = [
  { key: "background", label: "Background" },
  { key: "surface", label: "Card" },
  { key: "text", label: "Text" },
  { key: "muted", label: "Muted" },
  { key: "accent", label: "Accent" },
  { key: "secondary", label: "Secondary" },
  { key: "button", label: "Button" },
  { key: "buttonText", label: "Button text" },
  { key: "decorative", label: "Decorative" },
  { key: "soft", label: "Soft bg" }
];

export default function BuilderClient() {
  const router = useRouter();
  const [user, setUser] = useState<UserState | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<KograflyLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const publicUrl = useMemo(() => profile ? `${getSiteUrl()}/${profile.username}` : "", [profile]);
  const resolved = getResolvedTheme(profile?.theme);

  useEffect(() => {
    let mounted = true;

    async function boot() {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        router.push("/login");
        return;
      }
      const sessionUser = { id: data.session.user.id, email: data.session.user.email || undefined };
      if (!mounted) return;
      setUser(sessionUser);
      await loadProfile(sessionUser.id);
    }

    void boot();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (!profile?.id) return;
    const channel = supabase
      .channel(`builder:${profile.id}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "profiles", filter: `id=eq.${profile.id}` }, (payload) => {
        setProfile(payload.new as Profile);
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "links", filter: `profile_id=eq.${profile.id}` }, () => {
        void loadLinks(profile.id);
      })
      .subscribe((status) => setConnected(status === "SUBSCRIBED"));

    return () => {
      setConnected(false);
      void supabase.removeChannel(channel);
    };
  }, [profile?.id]);

  async function loadProfile(userId: string) {
    setLoading(true);
    const { data: profileData, error } = await supabase.from("profiles").select("*").eq("owner_id", userId).maybeSingle();
    if (error) setMessage(error.message);
    if (profileData) {
      const nextProfile = profileData as Profile;
      setProfile(nextProfile);
      await loadLinks(nextProfile.id);
    }
    setLoading(false);
  }

  async function loadLinks(profileId: string) {
    const { data, error } = await supabase.from("links").select("*").eq("profile_id", profileId).order("sort_order", { ascending: true });
    if (error) {
      setMessage(error.message);
      return;
    }
    setLinks((data || []) as KograflyLink[]);
  }

  async function createProfile(usernameInput: string) {
    if (!user) return;
    const username = normalizeUsername(usernameInput);
    if (!isValidUsername(username)) {
      setMessage("Username minimal 3 karakter dan hanya boleh huruf kecil, angka, titik, strip, atau underscore.");
      return;
    }
    setSaving(true);
    const defaultTheme = buildTemplateTheme(KOGRAFLY_TEMPLATES[0]);
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        owner_id: user.id,
        username,
        display_name: username.replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        bio: "Halo! Ini semua link penting saya di Kografly.",
        is_published: true,
        theme: defaultTheme
      })
      .select("*")
      .single();
    setSaving(false);
    if (error) {
      setMessage(error.message.includes("duplicate") ? "Username sudah dipakai." : error.message);
      return;
    }
    setProfile(data as Profile);
    setLinks([]);
  }

  async function saveProfile() {
    if (!profile) return;
    const username = normalizeUsername(profile.username);
    if (!isValidUsername(username)) {
      setMessage("Username tidak valid. Gunakan 3-30 karakter: huruf kecil, angka, titik, strip, atau underscore.");
      return;
    }
    setSaving(true);
    const { data, error } = await supabase
      .from("profiles")
      .update({
        username,
        display_name: profile.display_name,
        bio: profile.bio,
        avatar_url: profile.avatar_url,
        is_published: profile.is_published,
        theme: profile.theme || buildTemplateTheme(KOGRAFLY_TEMPLATES[0])
      })
      .eq("id", profile.id)
      .select("*")
      .single();
    setSaving(false);
    if (error) {
      setMessage(error.message.includes("duplicate") ? "Username sudah dipakai." : error.message);
      return;
    }
    setMessage("Profile, warna, dan template tersimpan. Public page akan update realtime.");
    setProfile(data as Profile);
  }

  function selectTemplate(templateId: string) {
    if (!profile) return;
    const template = KOGRAFLY_TEMPLATES.find((item) => item.id === templateId) || KOGRAFLY_TEMPLATES[0];
    setProfile({ ...profile, theme: buildTemplateTheme(template) });
  }

  function updateThemeColor(key: ColorKey, value: string) {
    if (!profile) return;
    const theme = profile.theme || buildTemplateTheme(KOGRAFLY_TEMPLATES[0]);
    setProfile({ ...profile, theme: { ...theme, [key]: value } });
  }

  async function addLink() {
    if (!profile || !user) return;
    const nextOrder = links.length;
    const { data, error } = await supabase
      .from("links")
      .insert({
        profile_id: profile.id,
        owner_id: user.id,
        title: `Link baru ${links.length + 1}`,
        url: "https://example.com",
        icon_name: links.length === 0 ? "Instagram" : "Globe2",
        animation: "rise",
        style_variant: "solid",
        sort_order: nextOrder,
        is_active: true
      })
      .select("*")
      .single();
    if (error) {
      setMessage(error.message);
      return;
    }
    setLinks((current) => [...current, data as KograflyLink].sort((a, b) => a.sort_order - b.sort_order));
  }

  function updateLocalLink(next: KograflyLink) {
    setLinks((current) => current.map((item) => (item.id === next.id ? next : item)).sort((a, b) => a.sort_order - b.sort_order));
  }

  async function saveLink(link: KograflyLink) {
    const { error } = await supabase
      .from("links")
      .update({
        title: link.title,
        url: ensureUrl(link.url),
        icon_name: link.icon_name,
        animation: link.animation,
        style_variant: link.style_variant,
        is_active: link.is_active,
        sort_order: link.sort_order
      })
      .eq("id", link.id);
    if (error) setMessage(error.message);
    else setMessage(`Link “${link.title}” tersimpan.`);
  }

  async function deleteLink(link: KograflyLink) {
    const { error } = await supabase.from("links").delete().eq("id", link.id);
    if (error) setMessage(error.message);
    else setLinks((current) => current.filter((item) => item.id !== link.id));
  }

  async function reorder(link: KograflyLink, direction: -1 | 1) {
    const sorted = [...links].sort((a, b) => a.sort_order - b.sort_order);
    const index = sorted.findIndex((item) => item.id === link.id);
    const targetIndex = index + direction;
    if (index < 0 || targetIndex < 0 || targetIndex >= sorted.length) return;
    const target = sorted[targetIndex];
    const linkOrder = link.sort_order;
    const targetOrder = target.sort_order;
    updateLocalLink({ ...link, sort_order: targetOrder });
    updateLocalLink({ ...target, sort_order: linkOrder });
    await Promise.all([
      supabase.from("links").update({ sort_order: targetOrder }).eq("id", link.id),
      supabase.from("links").update({ sort_order: linkOrder }).eq("id", target.id)
    ]);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 kografly-page-grid">
        <Loader2 className="h-8 w-8 animate-spin text-blue-700" />
      </main>
    );
  }

  if (!profile) {
    return <CreateProfile saving={saving} onCreate={createProfile} message={message} />;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 kografly-page-grid lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col justify-between gap-4 rounded-[2rem] border border-slate-200 bg-white/95 p-5 shadow-soft backdrop-blur md:flex-row md:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[.25em] text-blue-700">Kografly Builder</p>
            <h1 className="text-4xl font-black tracking-[-.04em] text-slate-950">Editor bio-link</h1>
            <p className="mt-1 text-sm text-slate-500">Public URL: <a className="font-bold text-blue-700" href={publicUrl} target="_blank" rel="noreferrer">{publicUrl}</a></p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <RealtimeBadge connected={connected} />
            <Link href="/dashboard" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:text-blue-700">Dashboard</Link>
            <a href={publicUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white"><ExternalLink className="h-4 w-4" /> Public</a>
            <button onClick={logout} className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:text-red-600"><LogOut className="h-4 w-4" /></button>
          </div>
        </header>

        {message && <p className="mb-5 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">{message}</p>}

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_430px]">
          <section className="space-y-6">
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[.2em] text-emerald-700">Profile</p>
                  <h2 className="text-3xl font-black tracking-[-.035em] text-slate-950">Identitas public</h2>
                </div>
                <label className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-bold text-slate-600">
                  <input type="checkbox" checked={profile.is_published} onChange={(e) => setProfile({ ...profile, is_published: e.target.checked })} className="accent-blue-700" /> Published
                </label>
              </div>

              <AvatarUploader
                userId={user?.id || profile.owner_id}
                avatarUrl={profile.avatar_url}
                displayName={profile.display_name}
                onUploaded={(url) => setProfile({ ...profile, avatar_url: url })}
              />

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">Display name</span>
                  <input value={profile.display_name} onChange={(e) => setProfile({ ...profile, display_name: e.target.value })} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-700" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">Username</span>
                  <div className="flex rounded-2xl border border-slate-200 px-4 py-3 font-bold focus-within:border-blue-700">
                    <span className="text-blue-700">/</span>
                    <input value={profile.username} onChange={(e) => setProfile({ ...profile, username: normalizeUsername(e.target.value) })} className="w-full bg-transparent px-1 outline-none" />
                  </div>
                </label>
              </div>
              <label className="mt-4 block">
                <span className="mb-2 block text-sm font-bold text-slate-700">Bio</span>
                <textarea value={profile.bio || ""} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} rows={4} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-700" />
              </label>
            </article>

            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <div className="mb-5">
                <p className="text-sm font-extrabold uppercase tracking-[.2em] text-blue-700">Template</p>
                <h2 className="text-3xl font-black tracking-[-.035em] text-slate-950">Kografly Standard UI</h2>
                <p className="mt-1 text-sm text-slate-500">Pilih dulu untuk preview. Simpan kalau sudah cocok.</p>
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {KOGRAFLY_TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => selectTemplate(template.id)}
                    className={cn(
                      "group rounded-[1.6rem] border bg-white p-3 text-left transition hover:-translate-y-1 hover:shadow-soft",
                      resolved.template.id === template.id ? "border-blue-600 ring-4 ring-blue-100" : "border-slate-200"
                    )}
                  >
                    <div className="h-24 overflow-hidden rounded-[1.2rem]" style={{ background: `linear-gradient(135deg, ${template.palette.accent}, ${template.palette.secondary})` }}>
                      <div className="h-full w-full bg-[radial-gradient(circle_at_80%_30%,rgba(255,255,255,.45),transparent_30%),linear-gradient(to_top,rgba(255,255,255,.92),transparent_55%)]" />
                    </div>
                    <p className="mt-3 font-black text-slate-950">{template.name}</p>
                    <p className="text-xs font-semibold text-slate-500">{template.role}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{template.description}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-[1.6rem] border border-slate-200 bg-slate-50 p-4">
                <p className="mb-3 text-sm font-extrabold text-slate-800">Custom warna</p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {colorFields.map((field) => (
                    <label key={field.key} className="rounded-2xl border border-slate-200 bg-white p-3">
                      <span className="mb-2 block text-xs font-bold text-slate-500">{field.label}</span>
                      <div className="flex items-center gap-2">
                        <input type="color" value={(resolved.values[field.key] as string) || "#ffffff"} onChange={(e) => updateThemeColor(field.key, e.target.value)} className="h-9 w-11 rounded border border-slate-200 bg-white" />
                        <input value={(resolved.values[field.key] as string) || ""} onChange={(e) => updateThemeColor(field.key, e.target.value)} className="min-w-0 flex-1 bg-transparent text-xs font-bold outline-none" />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button onClick={saveProfile} disabled={saving} className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-70">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Simpan profile & template
              </button>
            </article>

            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[.2em] text-blue-700">Bio links</p>
                <h2 className="text-3xl font-black tracking-[-.035em] text-slate-950">Link tanpa batas</h2>
              </div>
              <button onClick={addLink} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5">
                <Plus className="h-4 w-4" /> Tambah link
              </button>
            </div>

            {links.length ? (
              links.sort((a, b) => a.sort_order - b.sort_order).map((link) => (
                <LinkCardEditor
                  key={link.id}
                  link={link}
                  onChange={updateLocalLink}
                  onSave={saveLink}
                  onDelete={deleteLink}
                  onMoveUp={(item) => reorder(item, -1)}
                  onMoveDown={(item) => reorder(item, 1)}
                />
              ))
            ) : (
              <button onClick={addLink} className="grid w-full place-items-center rounded-[2rem] border border-dashed border-slate-300 bg-white/80 p-10 text-center text-slate-500 hover:border-blue-700 hover:text-blue-700">
                <Plus className="mb-2 h-6 w-6" /> Tambahkan link pertama kamu.
              </button>
            )}
          </section>

          <PhonePreview profile={profile} links={links} />
        </div>
      </div>
    </main>
  );
}

function CreateProfile({ saving, message, onCreate }: { saving: boolean; message: string | null; onCreate: (username: string) => void }) {
  const [username, setUsername] = useState("");
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-6 kografly-page-grid">
      <section className="w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white p-6 shadow-thread">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-700"><UserRound className="h-6 w-6" /></div>
        <h1 className="mt-5 text-4xl font-black tracking-[-.04em] text-slate-950">Buat profile Kografly</h1>
        <p className="mt-2 text-slate-600">Akunmu belum punya username public. Pilih satu untuk mulai.</p>
        <div className="mt-5 flex rounded-2xl border border-slate-200 px-4 py-3 text-lg font-bold focus-within:border-blue-700">
          <span className="text-blue-700">/</span>
          <input value={username} onChange={(e) => setUsername(normalizeUsername(e.target.value))} className="w-full bg-transparent px-1 outline-none" placeholder="username" />
        </div>
        {message && <p className="mt-3 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">{message}</p>}
        <button onClick={() => onCreate(username)} disabled={saving} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-4 font-bold text-white disabled:opacity-70">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />} Buat profile
        </button>
      </section>
    </main>
  );
}
