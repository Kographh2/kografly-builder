"use client";

import { Radio } from "lucide-react";

export default function RealtimeBadge({ connected }: { connected: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${connected ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-stone-200 bg-white text-stone-500"}`}>
      <Radio className={`h-3.5 w-3.5 ${connected ? "animate-pulse" : ""}`} />
      {connected ? "Realtime on" : "Realtime idle"}
    </span>
  );
}
