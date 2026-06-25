import type { KograflyMascotId, KograflyTemplateId, ProfileTheme } from "@/lib/types";

export type KograflyLayout = "guide" | "connector" | "supporter";

export type ResolvedProfileTheme = Required<Omit<ProfileTheme, "template" | "mascot">> & {
  template: Exclude<KograflyTemplateId, "standard">;
  mascot: KograflyMascotId;
  layout: KograflyLayout;
  colorMode: "blue" | "green";
  label: string;
};

type TemplatePreset = {
  id: Exclude<KograflyTemplateId, "standard">;
  name: string;
  colorMode: "blue" | "green";
  layout: KograflyLayout;
  mascot: KograflyMascotId;
  headline: string;
  description: string;
  tags: string[];
  theme: ResolvedProfileTheme;
};

const legacyColors: Record<string, string> = {
  indigo: "#1E5CC8",
  amber: "#D97706",
  teal: "#0F766E",
  stone: "#F6FAFF",
  ink: "#0B1D3A",
  gradient: "#E8F4FF"
};

function makeTheme(theme: ResolvedProfileTheme): ResolvedProfileTheme {
  return theme;
}

export const templatePresets: TemplatePreset[] = [
  {
    id: "blue-guide",
    name: "Blue Guide",
    colorMode: "blue",
    layout: "guide",
    mascot: "owl",
    headline: "Modern & clean",
    description: "Hero card rapi dengan mascot Linko sebagai guide.",
    tags: ["Linko", "Clean", "Brand"],
    theme: makeTheme({
      template: "blue-guide",
      layout: "guide",
      colorMode: "blue",
      label: "Blue Guide",
      mascot: "owl",
      background: "#F6FAFF",
      surface: "#FFFFFF",
      text: "#0B1D3A",
      muted: "#5E6B82",
      accent: "#1E5CC8",
      secondary: "#58A8FF",
      button: "#0B1D3A",
      buttonText: "#FFFFFF",
      decorative: "#D6E9FF",
      soft: "#EEF6FF",
      buttonStyle: "solid"
    })
  },
  {
    id: "blue-connector",
    name: "Blue Connector",
    colorMode: "blue",
    layout: "connector",
    mascot: "fox",
    headline: "CTA focused",
    description: "Tombol utama lebih kuat untuk kreator, jasa, dan bisnis.",
    tags: ["Linku", "CTA", "Bold"],
    theme: makeTheme({
      template: "blue-connector",
      layout: "connector",
      colorMode: "blue",
      label: "Blue Connector",
      mascot: "fox",
      background: "#EEF6FF",
      surface: "#FFFFFF",
      text: "#0B1D3A",
      muted: "#52627A",
      accent: "#1E5CC8",
      secondary: "#7BBFFF",
      button: "#1E5CC8",
      buttonText: "#FFFFFF",
      decorative: "#D6E9FF",
      soft: "#EAF4FF",
      buttonStyle: "solid"
    })
  },
  {
    id: "blue-supporter",
    name: "Blue Supporter",
    colorMode: "blue",
    layout: "supporter",
    mascot: "turtle",
    headline: "Calm support",
    description: "Soft, profesional, cocok untuk service dan customer care.",
    tags: ["Linka", "Soft", "Service"],
    theme: makeTheme({
      template: "blue-supporter",
      layout: "supporter",
      colorMode: "blue",
      label: "Blue Supporter",
      mascot: "turtle",
      background: "#F8FBFF",
      surface: "#FFFFFF",
      text: "#0B1D3A",
      muted: "#64748B",
      accent: "#1E5CC8",
      secondary: "#A9D6FF",
      button: "#EAF4FF",
      buttonText: "#0B1D3A",
      decorative: "#D6E9FF",
      soft: "#F4FAFF",
      buttonStyle: "soft"
    })
  },
  {
    id: "green-guide",
    name: "Green Guide",
    colorMode: "green",
    layout: "guide",
    mascot: "owl",
    headline: "Trust & natural",
    description: "Versi hijau yang lebih hangat dan terpercaya.",
    tags: ["Linko", "Trust", "Fresh"],
    theme: makeTheme({
      template: "green-guide",
      layout: "guide",
      colorMode: "green",
      label: "Green Guide",
      mascot: "owl",
      background: "#F7FBF5",
      surface: "#FFFFFF",
      text: "#0F3D2E",
      muted: "#5F6F65",
      accent: "#1E6B4B",
      secondary: "#7DBE7A",
      button: "#0F3D2E",
      buttonText: "#FFFFFF",
      decorative: "#D7EBCF",
      soft: "#EFF8EA",
      buttonStyle: "solid"
    })
  },
  {
    id: "green-connector",
    name: "Green Connector",
    colorMode: "green",
    layout: "connector",
    mascot: "fox",
    headline: "Growth CTA",
    description: "Tombol lebih standout dengan rasa natural dan premium.",
    tags: ["Linku", "Growth", "CTA"],
    theme: makeTheme({
      template: "green-connector",
      layout: "connector",
      colorMode: "green",
      label: "Green Connector",
      mascot: "fox",
      background: "#F2FAEF",
      surface: "#FFFFFF",
      text: "#0F3D2E",
      muted: "#536B5C",
      accent: "#1E6B4B",
      secondary: "#94CA88",
      button: "#1E6B4B",
      buttonText: "#FFFFFF",
      decorative: "#D7EBCF",
      soft: "#EDF8E8",
      buttonStyle: "solid"
    })
  },
  {
    id: "green-supporter",
    name: "Green Supporter",
    colorMode: "green",
    layout: "supporter",
    mascot: "turtle",
    headline: "Friendly service",
    description: "Layout lembut untuk brand yang ramah dan suportif.",
    tags: ["Linka", "Friendly", "Care"],
    theme: makeTheme({
      template: "green-supporter",
      layout: "supporter",
      colorMode: "green",
      label: "Green Supporter",
      mascot: "turtle",
      background: "#FBFAF3",
      surface: "#FFFFFF",
      text: "#0F3D2E",
      muted: "#697065",
      accent: "#1E6B4B",
      secondary: "#7DBE7A",
      button: "#EAF3DC",
      buttonText: "#0F3D2E",
      decorative: "#F5E9D6",
      soft: "#F2F6E9",
      buttonStyle: "soft"
    })
  }
];

export const defaultTheme = templatePresets[0].theme;

export const themeColorFields: Array<{
  key: keyof Pick<
    ResolvedProfileTheme,
    "background" | "surface" | "text" | "muted" | "accent" | "secondary" | "button" | "buttonText" | "decorative" | "soft"
  >;
  label: string;
  helper: string;
}> = [
  { key: "background", label: "Background", helper: "Warna halaman public" },
  { key: "surface", label: "Card", helper: "Warna kartu utama" },
  { key: "text", label: "Text", helper: "Nama dan judul" },
  { key: "muted", label: "Muted", helper: "Bio dan teks kecil" },
  { key: "accent", label: "Accent", helper: "Brand utama" },
  { key: "secondary", label: "Secondary", helper: "Gradient dan mascot" },
  { key: "button", label: "Button", helper: "Tombol link" },
  { key: "buttonText", label: "Text button", helper: "Teks tombol" },
  { key: "decorative", label: "Decorative", helper: "Ornamen lembut" },
  { key: "soft", label: "Soft fill", helper: "Background icon/panel" }
];

function color(value: string | undefined, fallback: string) {
  if (!value) return fallback;
  if (value.startsWith("#")) return value;
  return legacyColors[value] || fallback;
}

function getPreset(id?: string | null) {
  if (id === "standard") return defaultTheme;
  return templatePresets.find((item) => item.id === id)?.theme || defaultTheme;
}

function buttonStyle(value: unknown): ResolvedProfileTheme["buttonStyle"] {
  if (value === "outline" || value === "soft" || value === "glass" || value === "solid") return value;
  return "solid";
}

function mascot(value: unknown, fallback: KograflyMascotId): KograflyMascotId {
  if (value === "owl" || value === "fox" || value === "turtle") return value;
  return fallback;
}

export function normalizeTheme(theme?: ProfileTheme | null): ResolvedProfileTheme {
  const raw = theme as Record<string, unknown> | null | undefined;
  const preset = getPreset(typeof raw?.template === "string" ? raw.template : undefined);

  return {
    template: preset.template,
    layout: preset.layout,
    colorMode: preset.colorMode,
    label: preset.label,
    mascot: mascot(raw?.mascot, preset.mascot),
    background: color(typeof raw?.background === "string" ? raw.background : undefined, preset.background),
    surface: color(typeof raw?.surface === "string" ? raw.surface : undefined, preset.surface),
    text: color(typeof raw?.text === "string" ? raw.text : undefined, preset.text),
    muted: color(typeof raw?.muted === "string" ? raw.muted : undefined, preset.muted),
    accent: color(typeof raw?.accent === "string" ? raw.accent : undefined, preset.accent),
    secondary: color(typeof raw?.secondary === "string" ? raw.secondary : undefined, preset.secondary),
    button: color(typeof raw?.button === "string" ? raw.button : undefined, preset.button),
    buttonText: color(typeof raw?.buttonText === "string" ? raw.buttonText : undefined, preset.buttonText),
    decorative: color(typeof raw?.decorative === "string" ? raw.decorative : undefined, preset.decorative),
    soft: color(typeof raw?.soft === "string" ? raw.soft : undefined, preset.soft),
    buttonStyle: buttonStyle(raw?.buttonStyle || preset.buttonStyle)
  };
}

export function applyTemplate(id: Exclude<KograflyTemplateId, "standard">) {
  const preset = templatePresets.find((item) => item.id === id);
  return preset ? { ...preset.theme } : { ...defaultTheme };
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
