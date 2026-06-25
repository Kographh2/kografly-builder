"use client";

import { SOCIAL_ICON_OPTIONS } from "@/constants/icons";
import IconRenderer from "@/components/IconRenderer";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function IconPicker({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {SOCIAL_ICON_OPTIONS.map((icon) => (
        <button
          key={icon.name}
          type="button"
          onClick={() => onChange(icon.name)}
          className={cn(
            "flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl border bg-white px-2 py-2 text-[11px] font-semibold text-stone-600 transition hover:-translate-y-0.5 hover:border-kografly-indigo hover:text-kografly-indigo",
            value === icon.name ? "border-kografly-indigo bg-indigo-50 text-kografly-indigo shadow-soft" : "border-stone-200"
          )}
          title={icon.label}
        >
          <IconRenderer name={icon.name} className="h-5 w-5" />
          <span className="truncate">{icon.label}</span>
        </button>
      ))}
    </div>
  );
}
