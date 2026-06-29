import type { KograflyMascotId, KograflyTemplateId, ProfileTheme } from "@/lib/types";

export type TemplateTone = "blue" | "green";
export type TemplateLayout = "guide" | "connector" | "supporter";

export type KograflyTemplate = {
  id: KograflyTemplateId;
  name: string;
  role: string;
  tone: TemplateTone;
  layout: TemplateLayout;
  mascot: KograflyMascotId;
  description: string;
  heroTitle: string;
  heroEyebrow: string;
  helperTitle: string;
  helperBody: string;
  palette: Required<Omit<ProfileTheme, "template" | "mascot" | "buttonStyle">> & {
    buttonStyle: NonNullable<ProfileTheme["buttonStyle"]>;
  };
};

const blue = {
  background: "#F3F8FF",
  surface: "#FFFFFF",
  text: "#0B2F6B",
  muted: "#49678F",
  accent: "#0057D9",
  secondary: "#58A8FF",
  button: "#0057D9",
  buttonText: "#FFFFFF",
  decorative: "#D9ECFF",
  soft: "#EAF4FF",
  buttonStyle: "solid" as const
};

const green = {
  background: "#F3FAF4",
  surface: "#FFFFFF",
  text: "#073D25",
  muted: "#42634F",
  accent: "#075A37",
  secondary: "#83C96D",
  button: "#075A37",
  buttonText: "#FFFFFF",
  decorative: "#DDF0D8",
  soft: "#EAF7E6",
  buttonStyle: "solid" as const
};

export const KOGRAFLY_TEMPLATES: KograflyTemplate[] = [
  {
    id: "blue-guide",
    name: "Blue Guide",
    role: "Linko · The Guide",
    tone: "blue",
    layout: "guide",
    mascot: "blue-guide-owl",
    description: "Halaman sambutan yang bersih, hangat, dan profesional.",
    heroTitle: "Selamat Datang",
    heroEyebrow: "Halo!",
    helperTitle: "Semua informasi penting ada di sini",
    helperBody: "Klik, temukan, dan terhubung dengan mudah.",
    palette: { ...blue, accent: "#0B3C8A", button: "#0E63E8", secondary: "#64B5FF" }
  },
  {
    id: "blue-connector",
    name: "Blue Connector",
    role: "Linku · The Connector",
    tone: "blue",
    layout: "connector",
    mascot: "blue-connector-fox",
    description: "Hero biru kuat untuk creator, layanan, dan campaign.",
    heroTitle: "Temukan Semua yang Anda Butuhkan",
    heroEyebrow: "Terhubung Cepat",
    helperTitle: "Akses cepat ke informasi terbaik",
    helperBody: "Layanan, promo, portfolio, dan kontak dalam satu link.",
    palette: { ...blue, background: "#EAF4FF", accent: "#075FE4", button: "#075FE4", secondary: "#8CC9FF" }
  },
  {
    id: "blue-supporter",
    name: "Blue Supporter",
    role: "Linka · The Supporter",
    tone: "blue",
    layout: "supporter",
    mascot: "blue-supporter-turtle",
    description: "Help-center soft untuk customer support dan informasi layanan.",
    heroTitle: "Kami di Sini untuk Anda",
    heroEyebrow: "Kami Siap Membantu",
    helperTitle: "Dukungan Terpercaya",
    helperBody: "Privasi dan kepuasan Anda adalah prioritas kami.",
    palette: { ...blue, background: "#EEF7FF", accent: "#064AA6", button: "#FFFFFF", buttonText: "#064AA6", secondary: "#CBE6FF", soft: "#E5F2FF", buttonStyle: "soft" }
  },
  {
    id: "green-guide",
    name: "Green Guide",
    role: "Linko · The Guide",
    tone: "green",
    layout: "guide",
    mascot: "green-guide-owl",
    description: "Versi hijau yang ramah, clean, dan dekat dengan pengguna.",
    heroTitle: "Selamat Datang",
    heroEyebrow: "Halo!",
    helperTitle: "Semua informasi penting kami rangkum",
    helperBody: "Mudah diakses, rapi, dan siap digunakan kapan saja.",
    palette: { ...green, accent: "#075A37", button: "#075A37", secondary: "#9CD787" }
  },
  {
    id: "green-connector",
    name: "Green Connector",
    role: "Linku · The Connector",
    tone: "green",
    layout: "connector",
    mascot: "green-connector-fox",
    description: "Template konversi yang tegas, rapi, dan mudah dipindai.",
    heroTitle: "Temukan Semua yang Anda Butuhkan",
    heroEyebrow: "Klik & Terhubung",
    helperTitle: "Akses semua link penting dalam satu tempat",
    helperBody: "Produk, artikel, promo, dan kontak dibuat lebih cepat ditemukan.",
    palette: { ...green, background: "#F4FAEF", accent: "#065033", button: "#075A37", secondary: "#86C96E" }
  },
  {
    id: "green-supporter",
    name: "Green Supporter",
    role: "Linka · The Supporter",
    tone: "green",
    layout: "supporter",
    mascot: "green-supporter-bear",
    description: "Tampilan support hijau yang stabil, sabar, dan terpercaya.",
    heroTitle: "Kami di Sini untuk Anda",
    heroEyebrow: "Bantuan Siap",
    helperTitle: "Kami selalu mendukung Anda",
    helperBody: "Respons cepat, solusi tepat, dan pengalaman yang nyaman.",
    palette: { ...green, background: "#F5FAF1", accent: "#07482D", button: "#FFFFFF", buttonText: "#07482D", secondary: "#CFE8C2", soft: "#EEF7E8", buttonStyle: "soft" }
  }
];

export const DEFAULT_TEMPLATE_ID: KograflyTemplateId = "blue-guide";

export function getTemplate(id?: string | null) {
  return KOGRAFLY_TEMPLATES.find((template) => template.id === id) || KOGRAFLY_TEMPLATES[0];
}

export function buildTemplateTheme(template: KograflyTemplate): ProfileTheme {
  return {
    template: template.id,
    mascot: template.mascot,
    ...template.palette
  };
}

export function getResolvedTheme(theme?: ProfileTheme | null) {
  const template = getTemplate(theme?.template);
  return {
    template,
    values: {
      ...template.palette,
      ...(theme || {}),
      template: template.id,
      mascot: theme?.mascot || template.mascot
    }
  };
}
