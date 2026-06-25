"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { isValidUsername, normalizeUsername } from "@/lib/utils";

export default function UsernameClaim() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "available" | "taken" | "invalid">("idle");

  const normalized = useMemo(() => normalizeUsername(username), [username]);

  async function checkAndContinue() {
    const clean = normalizeUsername(username);
    setUsername(clean);
    if (!isValidUsername(clean)) {
      setStatus("invalid");
      return;
    }

    setStatus("checking");
    const { data, error } = await supabase.from("profiles").select("username").eq("username", clean).maybeSingle();
    if (error) {
      setStatus("idle");
      return;
    }
    if (data) {
      setStatus("taken");
      return;
    }
    setStatus("available");
    router.push(`/login?username=${encodeURIComponent(clean)}`);
  }

  return (
    <div className="max-w-2xl rounded-[2rem] border border-stone-200 bg-white p-3 shadow-thread">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex min-h-14 flex-1 items-center rounded-[1.4rem] border border-stone-200 bg-kografly-stone px-4 text-lg font-bold focus-within:border-kografly-indigo">
          <span className="select-none text-kografly-amber">/</span>
          <input
            value={username}
            onChange={(event) => {
              setUsername(normalizeUsername(event.target.value));
              setStatus("idle");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") void checkAndContinue();
            }}
            placeholder="username"
            className="w-full bg-transparent px-1 text-stone-950 outline-none placeholder:text-stone-400"
          />
        </label>
        <button
          type="button"
          onClick={checkAndContinue}
          disabled={status === "checking"}
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[1.4rem] bg-kografly-indigo px-6 font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "checking" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
          Buat halaman
        </button>
      </div>
      <div className="px-3 pb-2 pt-3 text-sm">
        {status === "idle" && <p className="text-stone-500">Preview URL: kographh.web.id/{normalized || "username"}</p>}
        {status === "invalid" && <p className="text-kografly-error">Username minimal 3 karakter, gunakan huruf kecil, angka, titik, strip, atau underscore.</p>}
        {status === "taken" && <p className="text-kografly-error">Username ini sudah dipakai. Coba variasi lain.</p>}
        {status === "available" && <p className="text-kografly-success">Username tersedia. Mengarahkan ke akun...</p>}
      </div>
    </div>
  );
}
