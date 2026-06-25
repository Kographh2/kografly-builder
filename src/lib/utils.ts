import { type ClassValue, clsxLite } from "@/lib/clsx-lite";

export function cn(...inputs: ClassValue[]) {
  return clsxLite(inputs);
}

export function normalizeUsername(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/^\/+/, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9_.-]/g, "")
    .slice(0, 30);
}

export function isValidUsername(value: string) {
  return /^[a-z0-9_][a-z0-9_.-]{2,29}$/.test(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

export function ensureUrl(value: string) {
  if (!value) return "https://example.com";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}
