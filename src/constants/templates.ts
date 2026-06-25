import type { ProfileTheme } from "@/lib/types";

export type ResolvedProfileTheme = Required<ProfileTheme>;

const legacyColors: Record<string, string> = {
  indigo: "#4338CA",
  amber: "#D97706",
  teal: "#0F766E",
  stone: "#FAFAF9",
  ink: "#0C0A09",
  gradient: "#F7F3EC"
};

export const defaultTheme: ResolvedProfileTheme = {
  template: "standard",
  background: "#F7F3EC",
  surface: "#FFFFFF",
  text: "#18181B",
  muted: "#6B7280",
  accent: "#4F46E5",
  secondary: "#0F766E",
  button: "#111827",
  buttonText: "#FFFFFF",
  decorative: "#E7DED2",
  buttonStyle: "solid"
};

export const themeColorFields: Array<{
  key: keyof Pick<
    ResolvedProfileTheme,
    "background" | "surface" | "text" | "muted" | "accent" | "secondary" | "button" | "buttonText" | "decorative"
  >;
  label: string;
  helper: string;
}> = [
  { key: "background", label: "Background", helper: "Warna halaman public" },
  { key: "surface", label: "Card", helper: "Warna kartu utama" },
  { key: "text", label: "Text", helper: "Nama dan judul" },
  { key: "muted", label: "Muted", helper: "Bio dan teks kecil" },
  { key: "accent", label: "Accent", helper: "Username dan glow" },
  { key: "secondary", label: "Secondary", helper: "Gradient halus" },
  { key: "button", label: "Button", helper: "Tombol link" },
  { key: "buttonText", label: "Text button", helper: "Teks tombol link" },
  { key: "decorative", label: "Decorative", helper: "Ornamen lembut" }
];

function color(value: string | undefined, fallback: string) {
  if (!value) return fallback;
  if (value.startsWith("#")) return value;
  return legacyColors[value] || fallback;
}

function buttonStyle(value: ProfileTheme["buttonStyle"] | undefined): ResolvedProfileTheme["buttonStyle"] {
  if (value === "outline" || value === "soft" || value === "glass") return value;
  return "solid";
}

export function normalizeTheme(theme?: ProfileTheme | null): ResolvedProfileTheme {
  return {
    template: "standard",
    background: color(theme?.background, defaultTheme.background),
    surface: color(theme?.surface, defaultTheme.surface),
    text: color(theme?.text, defaultTheme.text),
    muted: color(theme?.muted, defaultTheme.muted),
    accent: color(theme?.accent, defaultTheme.accent),
    secondary: color(theme?.secondary, defaultTheme.secondary),
    button: color(theme?.button, defaultTheme.button),
    buttonText: color(theme?.buttonText, defaultTheme.buttonText),
    decorative: color(theme?.decorative, defaultTheme.decorative),
    buttonStyle: buttonStyle(theme?.buttonStyle)
  };
}

export function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const bigint = Number.parseInt(full, 16);

  if (Number.isNaN(bigint)) return `rgba(0, 0, 0, ${alpha})`;

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

