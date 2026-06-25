import type { ProfileTemplateId, ProfileTheme } from "@/lib/types";

export type ResolvedProfileTheme = Required<ProfileTheme>;

export type TemplateOption = {
  id: ProfileTemplateId;
  name: string;
  description: string;
  previewClass: string;
  theme: ResolvedProfileTheme;
};

const legacyColors: Record<string, string> = {
  indigo: "#4338CA",
  amber: "#D97706",
  teal: "#0F766E",
  stone: "#FAFAF9",
  ink: "#0C0A09",
  gradient: "#FAFAF9"
};

function color(value: string | undefined, fallback: string) {
  if (!value) return fallback;
  if (value.startsWith("#")) return value;
  return legacyColors[value] || fallback;
}

export const profileTemplates: TemplateOption[] = [
  {
    id: "kografly",
    name: "Kografly Clean",
    description: "Card rapi, gradient lembut, cocok untuk personal link yang formal.",
    previewClass: "bg-gradient-to-br from-indigo-600 via-teal-600 to-amber-500",
    theme: {
      template: "kografly",
      background: "#FAFAF9",
      surface: "#FFFFFF",
      text: "#1C1917",
      muted: "#57534E",
      accent: "#4338CA",
      secondary: "#D97706",
      button: "#0C0A09",
      buttonText: "#FFFFFF",
      decorative: "#0F766E",
      buttonStyle: "thread"
    }
  },
  {
    id: "popCreator",
    name: "Pop Creator",
    description: "Poster orange-magenta untuk kreator, campaign, e-book, dan kursus.",
    previewClass: "bg-[#ff6700]",
    theme: {
      template: "popCreator",
      background: "#FF6A00",
      surface: "#FFF4E8",
      text: "#2A0B1E",
      muted: "#FFFFFF",
      accent: "#C0045C",
      secondary: "#FFC21C",
      button: "#C0045C",
      buttonText: "#FFFFFF",
      decorative: "#111111",
      buttonStyle: "poster"
    }
  },
  {
    id: "studioJahit",
    name: "Studio Jahit",
    description: "Editorial pink boutique untuk katalog, fashion, handmade, dan koleksi.",
    previewClass: "bg-[#F58AC0]",
    theme: {
      template: "studioJahit",
      background: "#F58AC0",
      surface: "#FFF9E9",
      text: "#5B002B",
      muted: "#7A1744",
      accent: "#71002E",
      secondary: "#FFF8E6",
      button: "#FFF8E6",
      buttonText: "#5B002B",
      decorative: "#71002E",
      buttonStyle: "pill"
    }
  },
  {
    id: "neoBrutal",
    name: "Neo Brutal",
    description: "Bold, kontras, border tebal, shadow keras, cocok untuk brand yang nyentrik.",
    previewClass: "bg-[#FDE047]",
    theme: {
      template: "neoBrutal",
      background: "#FDE047",
      surface: "#FFFFFF",
      text: "#111111",
      muted: "#27272A",
      accent: "#2563EB",
      secondary: "#FB7185",
      button: "#7C3AED",
      buttonText: "#FFFFFF",
      decorative: "#111111",
      buttonStyle: "brutal"
    }
  }
];

export const defaultTheme = profileTemplates[0].theme;

export const themeColorFields: Array<{
  key: keyof Pick<ResolvedProfileTheme, "background" | "surface" | "text" | "muted" | "accent" | "secondary" | "button" | "buttonText" | "decorative">;
  label: string;
}> = [
  { key: "background", label: "Background" },
  { key: "surface", label: "Surface/card" },
  { key: "text", label: "Text utama" },
  { key: "muted", label: "Text kecil" },
  { key: "accent", label: "Accent" },
  { key: "secondary", label: "Secondary" },
  { key: "button", label: "Button" },
  { key: "buttonText", label: "Text button" },
  { key: "decorative", label: "Dekorasi" }
];

export function getTemplate(id?: ProfileTemplateId) {
  return profileTemplates.find((template) => template.id === id) || profileTemplates[0];
}

export function normalizeTheme(theme?: ProfileTheme | null): ResolvedProfileTheme {
  const preset = getTemplate(theme?.template).theme;

  return {
    template: theme?.template || preset.template,
    background: color(theme?.background, preset.background),
    surface: color(theme?.surface, preset.surface),
    text: color(theme?.text, preset.text),
    muted: color(theme?.muted, preset.muted),
    accent: color(theme?.accent, preset.accent),
    secondary: color(theme?.secondary, preset.secondary),
    button: color(theme?.button, preset.button),
    buttonText: color(theme?.buttonText, preset.buttonText),
    decorative: color(theme?.decorative, preset.decorative),
    buttonStyle: theme?.buttonStyle || preset.buttonStyle
  };
}

export function applyTemplate(current: ProfileTheme | null | undefined, templateId: ProfileTemplateId): ResolvedProfileTheme {
  const preset = getTemplate(templateId).theme;
  const currentTheme = normalizeTheme(current);

  // Template ganti layout + default palette template. Username, link, dan profile tidak berubah.
  return {
    ...currentTheme,
    ...preset,
    template: templateId
  };
}

export function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const bigint = Number.parseInt(full, 16);
  if (Number.isNaN(bigint)) return `rgba(0,0,0,${alpha})`;
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

