"use client";

import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Props = {
  name?: string | null;
  className?: string;
  strokeWidth?: number;
};

const ICON_ALIASES: Record<string, string> = {
  Website: "Globe2",
  Instagram: "Camera",
  Facebook: "UsersRound",
  Youtube: "Play",
  YouTube: "Play",
  Linkedin: "UserRound",
  LinkedIn: "UserRound",
  Github: "GitBranch",
  GitHub: "GitBranch",
  Twitter: "AtSign",
  X: "AtSign",
  Tiktok: "Music2",
  TikTok: "Music2",
  Twitch: "Radio",
  Telegram: "Send",
  WhatsApp: "MessageCircle",
  Discord: "MessagesSquare",
  Portfolio: "Camera",
  Email: "Mail",
  Shop: "ShoppingBag",
  Social: "AtSign",
  Gaming: "Gamepad2",
  Code: "Code2",
  Community: "MessageCircle"
};

export default function IconRenderer({ name = "Globe2", className = "h-5 w-5", strokeWidth = 2 }: Props) {
  const iconMap = LucideIcons as unknown as Record<string, LucideIcon>;
  const aliasedName = ICON_ALIASES[name || "Globe2"] || name || "Globe2";
  const Icon = iconMap[aliasedName] || iconMap.Globe2 || iconMap.Link;
  return <Icon className={className} strokeWidth={strokeWidth} />;
}

