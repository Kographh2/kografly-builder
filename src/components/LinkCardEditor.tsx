"use client";

import { ArrowDown, ArrowUp, Save, Trash2 } from "lucide-react";
import IconPicker from "@/components/IconPicker";
import { LINK_ANIMATIONS, LINK_STYLE_VARIANTS } from "@/constants/icons";
import type { KograflyLink } from "@/lib/types";
import { ensureUrl } from "@/lib/utils";

type Props = {
  link: KograflyLink;
  onChange: (link: KograflyLink) => void;
  onSave: (link: KograflyLink) => void;
  onDelete: (link: KograflyLink) => void;
  onMoveUp: (link: KograflyLink) => void;
  onMoveDown: (link: KograflyLink) => void;
};

export default function LinkCardEditor({ link, onChange, onSave, onDelete, onMoveUp, onMoveDown }: Props) {
  return (
    <article className="rounded-[1.7rem] border border-stone-200 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="font-serif text-2xl font-semibold text-stone-950">{link.title || "Link baru"}</p>
          <p className="text-sm text-stone-500">Sort #{link.sort_order + 1}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => onMoveUp(link)} className="rounded-full border border-stone-200 p-2 text-stone-500 hover:text-kografly-indigo"><ArrowUp className="h-4 w-4" /></button>
          <button type="button" onClick={() => onMoveDown(link)} className="rounded-full border border-stone-200 p-2 text-stone-500 hover:text-kografly-indigo"><ArrowDown className="h-4 w-4" /></button>
          <button type="button" onClick={() => onDelete(link)} className="rounded-full border border-red-100 p-2 text-kografly-error hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-stone-700">Judul link</span>
          <input value={link.title} onChange={(e) => onChange({ ...link, title: e.target.value })} className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-kografly-indigo" placeholder="Contoh: Portfolio" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-stone-700">URL</span>
          <input value={link.url} onChange={(e) => onChange({ ...link, url: e.target.value })} onBlur={(e) => onChange({ ...link, url: ensureUrl(e.target.value) })} className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-kografly-indigo" placeholder="https://..." />
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-stone-700">Animasi</span>
          <select value={link.animation} onChange={(e) => onChange({ ...link, animation: e.target.value as KograflyLink["animation"] })} className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-kografly-indigo">
            {LINK_ANIMATIONS.map((animation) => <option key={animation.value} value={animation.value}>{animation.label}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-stone-700">Style tombol</span>
          <select value={link.style_variant} onChange={(e) => onChange({ ...link, style_variant: e.target.value as KograflyLink["style_variant"] })} className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-kografly-indigo">
            {LINK_STYLE_VARIANTS.map((style) => <option key={style.value} value={style.value}>{style.label}</option>)}
          </select>
        </label>
        <label className="flex items-end gap-3 rounded-2xl border border-stone-200 px-4 py-3">
          <input type="checkbox" checked={link.is_active} onChange={(e) => onChange({ ...link, is_active: e.target.checked })} className="h-5 w-5 accent-kografly-indigo" />
          <span>
            <span className="block text-sm font-bold text-stone-700">Tampilkan</span>
            <span className="text-xs text-stone-500">Muncul di public page</span>
          </span>
        </label>
      </div>

      <div className="mt-4">
        <span className="mb-2 block text-sm font-bold text-stone-700">Pilih icon sosial/creator</span>
        <IconPicker value={link.icon_name} onChange={(iconName) => onChange({ ...link, icon_name: iconName })} />
      </div>

      <button type="button" onClick={() => onSave({ ...link, url: ensureUrl(link.url) })} className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-kografly-indigo px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5">
        <Save className="h-4 w-4" /> Simpan link
      </button>
    </article>
  );
}
