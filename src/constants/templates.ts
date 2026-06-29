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
  background: "#F5FAFF",
  surface: "#FFFFFF",
  text: "#0A2C68",
  muted: "#5A7194",
  accent: "#0867E8",
  secondary: "#8FC8FF",
  button: "#0867E8",
  buttonText: "#FFFFFF",
  decorative: "#DDEEFF",
  soft: "#EAF4FF",
  buttonStyle: "soft" as const
};

const green = {
  background: "#F6FBF5",
  surface: "#FFFFFF",
  text: "#073E28",
  muted: "#557061",
  accent: "#0A5C3A",
  secondary: "#A6D98F",
  button: "#0A5C3A",
  buttonText: "#FFFFFF",
  decorative: "#DFF1D9",
  soft: "#EDF8E9",
  buttonStyle: "soft" as const
};

export const KOGRAFLY_TEMPLATES: KograflyTemplate[] = [
  {
    id: "blue-guide",
    name: "Blue Guide",
    role: "Linko · The Guide",
    tone: "blue",
    layout: "guide",
    mascot: "blue-guide-owl",
    description: "Minimal clean dengan aksen owl biru.",
    heroTitle: "Selamat Datang",
    heroEyebrow: "Halo!",
    helperTitle: "Clean profile",
    helperBody: "Semua link penting ada di sini.",
    palette: { ...blue, accent: "#0A58D8", button: "#FFFFFF", buttonText: "#0A2C68", secondary: "#9ED0FF", soft: "#E9F4FF" }
  },
  {
    id: "blue-connector",
    name: "Blue Connector",
    role: "Linku · The Connector",
    tone: "blue",
    layout: "connector",
    mascot: "blue-connector-fox",
    description: "Clean social landing dengan fox biru.",
    heroTitle: "Temukan Semua yang Anda Butuhkan",
    heroEyebrow: "Terhubung Cepat",
    helperTitle: "Creator profile",
    helperBody: "Akses cepat ke link terbaik.",
    palette: { ...blue, background: "#F3F9FF", accent: "#0867E8", button: "#0867E8", buttonText: "#FFFFFF", secondary: "#7BBEFF", buttonStyle: "solid" }
  },
  {
    id: "blue-supporter",
    name: "Blue Supporter",
    role: "Linka · The Supporter",
    tone: "blue",
    layout: "supporter",
    mascot: "blue-supporter-turtle",
    description: "Soft blue untuk profile layanan/support.",
    heroTitle: "Kami di Sini untuk Anda",
    heroEyebrow: "Kami Siap Membantu",
    helperTitle: "Support profile",
    helperBody: "Temukan kontak dan bantuan utama.",
    palette: { ...blue, background: "#F2F8FF", text: "#073176", accent: "#0757C7", button: "#FFFFFF", buttonText: "#073176", secondary: "#B5DAFF", soft: "#E7F2FF" }
  },
  {
    id: "green-guide",
    name: "Green Guide",
    role: "Linko · The Guide",
    tone: "green",
    layout: "guide",
    mascot: "green-guide-owl",
    description: "Minimal green dengan aksen owl ramah.",
    heroTitle: "Selamat Datang",
    heroEyebrow: "Halo!",
    helperTitle: "Clean profile",
    helperBody: "Semua link penting ada di sini.",
    palette: { ...green, accent: "#0A5C3A", button: "#FFFFFF", buttonText: "#073E28", secondary: "#B5DFA6", soft: "#EDF8E9" }
  },
  {
    id: "green-connector",
    name: "Green Connector",
    role: "Linku · The Connector",
    tone: "green",
    layout: "connector",
    mascot: "green-connector-fox",
    description: "Clean social landing dengan fox hijau.",
    heroTitle: "Temukan Semua yang Anda Butuhkan",
    heroEyebrow: "Klik & Terhubung",
    helperTitle: "Creator profile",
    helperBody: "Akses cepat ke link terbaik.",
    palette: { ...green, background: "#F4FAEF", accent: "#075A37", button: "#075A37", buttonText: "#FFFFFF", secondary: "#94D47A", buttonStyle: "solid" }
  },
  {
    id: "green-supporter",
    name: "Green Supporter",
    role: "Linka · The Supporter",
    tone: "green",
    layout: "supporter",
    mascot: "green-supporter-bear",
    description: "Soft green untuk profile layanan/support.",
    heroTitle: "Kami di Sini untuk Anda",
    heroEyebrow: "Bantuan Siap",
    helperTitle: "Support profile",
    helperBody: "Temukan kontak dan bantuan utama.",
    palette: { ...green, background: "#F7FBF3", text: "#073E28", accent: "#084B30", button: "#FFFFFF", buttonText: "#073E28", secondary: "#C5E7B4", soft: "#EEF7E8" }
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
