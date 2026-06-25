"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { defaultTheme } from "@/constants/templates";
import { supabase } from "@/lib/supabase/client";
import { isValidUsername, normalizeUsername } from "@/lib/utils";

type Mode = "signin" | "signup";

type Props = {
  initialUsername?: string;
};

export default function AuthPanel({ initialUsername }: Props) {
  const router = useRouter();
  const cleanInitialUsername = useMemo(() => normalizeUsername(initialUsername || ""), [initialUsername]);
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(cleanInitialUsername);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        void ensureProfileAndGo(data.session.user.id, data.session.user.email || "");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function ensureProfileAndGo(userId: string, userEmail: string) {
    const { data: existing } = await supabase.from("profiles").select("id,username").eq("owner_id", userId).maybeSingle();
    if (existing) {
      router.push("/builder");
      return;
    }

    const fallback = normalizeUsername(userEmail.split("@")[0] || `creator-${Date.now().toString().slice(-5)}`);
    const finalUsername = isValidUsername(username) ? username : `${fallback}-${Date.now().toString().slice(-4)}`;

    const { error } = await supabase.from("profiles").insert({
      owner_id: userId,
      username: finalUsername,
      display_name: finalUsername.replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      bio: "Halo! Ini semua link penting saya di Kografly.",
      is_published: true,
      theme: defaultTheme
    });

    if (error) {
      setMessage(error.message.includes("duplicate") ? "Username sudah dipakai. Pilih username lain lalu coba lagi." : error.message);
      setLoading(false);
      return;
    }

    router.push("/builder");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setLoading(true);

    const clean = normalizeUsername(username);
    setUsername(clean);
    if (!isValidUsername(clean)) {
      setMessage("Username minimal 3 karakter dan hanya boleh huruf kecil, angka, titik, strip, atau underscore.");
      setLoading(false);
      return;
    }

    const authAction = mode === "signup"
      ? supabase.auth.signUp({ email, password })
      : supabase.auth.signInWithPassword({ email, password });

    const { data, error } = await authAction;

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (!data.user) {
      setMessage("Auth berhasil, tetapi user belum tersedia. Coba login ulang.");
      setLoading(false);
      return;
    }

    if (!data.session && mode === "signup") {
      setMessage("Akun dibuat. Jika email confirmation aktif di Supabase, konfirmasi email dulu lalu login untuk membuat profil.");
      setLoading(false);
      return;
    }

    await ensureProfileAndGo(data.user.id, data.user.email || email);
  }

  return (
    <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-thread">
      <div className="mb-6 flex rounded-full bg-stone-100 p-1 text-sm font-bold">
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-full px-4 py-2 transition ${mode === "signup" ? "bg-kografly-indigo text-white shadow-soft" : "text-stone-500"}`}
        >
          Daftar
        </button>
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`flex-1 rounded-full px-4 py-2 transition ${mode === "signin" ? "bg-kografly-indigo text-white shadow-soft" : "text-stone-500"}`}
        >
          Masuk
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-stone-700">Username public</span>
          <div className="flex items-center rounded-2xl border border-stone-200 bg-kografly-stone px-4 py-3 font-bold focus-within:border-kografly-indigo">
            <span className="text-kografly-amber">/</span>
            <input value={username} onChange={(e) => setUsername(normalizeUsername(e.target.value))} className="w-full bg-transparent px-1 outline-none" placeholder="username" />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-stone-700">Email</span>
          <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 focus-within:border-kografly-indigo">
            <Mail className="h-4 w-4 text-stone-400" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full outline-none" placeholder="you@email.com" required />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-stone-700">Password</span>
          <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 focus-within:border-kografly-indigo">
            <LockKeyhole className="h-4 w-4 text-stone-400" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full outline-none" minLength={6} placeholder="Minimal 6 karakter" required />
          </div>
        </label>

        {message && <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-kografly-amber">{message}</p>}

        <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-950 px-5 py-4 font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-70">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "signup" ? "Buat akun & profil" : "Masuk ke builder"}
        </button>
      </form>
    </section>
  );
}
