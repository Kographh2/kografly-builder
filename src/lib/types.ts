export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type ProfileTheme = {
  accent?: "indigo" | "amber" | "teal";
  buttonStyle?: "thread" | "minimal";
  background?: "stone" | "ink" | "gradient";
};

export type Profile = {
  id: string;
  owner_id: string;
  username: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
  is_published: boolean;
  theme: ProfileTheme | null;
  created_at: string;
  updated_at: string;
};

export type KograflyLink = {
  id: string;
  profile_id: string;
  owner_id: string;
  title: string;
  url: string;
  icon_name: string;
  animation: LinkAnimation;
  style_variant: LinkStyleVariant;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type LinkAnimation = "none" | "rise" | "pulse" | "wiggle" | "bounce" | "glow";
export type LinkStyleVariant = "solid" | "outline" | "soft" | "glass";
export type AnalyticsType = "view" | "click";

export type AnalyticsEvent = {
  id: string;
  profile_id: string;
  link_id: string | null;
  type: AnalyticsType;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Omit<Profile, "id" | "created_at" | "updated_at">> & {
          owner_id: string;
          username: string;
        };
        Update: Partial<Omit<Profile, "id" | "owner_id" | "created_at" | "updated_at">>;
      };
      links: {
        Row: KograflyLink;
        Insert: Partial<Omit<KograflyLink, "id" | "created_at" | "updated_at">> & {
          profile_id: string;
          owner_id: string;
        };
        Update: Partial<Omit<KograflyLink, "id" | "profile_id" | "owner_id" | "created_at" | "updated_at">>;
      };
      analytics_events: {
        Row: AnalyticsEvent;
        Insert: Partial<Omit<AnalyticsEvent, "id" | "created_at">> & {
          profile_id: string;
          type: AnalyticsType;
        };
        Update: never;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
