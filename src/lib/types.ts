export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type KograflyTemplateId =
  | "blue-guide"
  | "blue-connector"
  | "blue-supporter"
  | "green-guide"
  | "green-connector"
  | "green-supporter";

export type KograflyMascotId =
  | "blue-guide-owl"
  | "blue-connector-fox"
  | "blue-supporter-turtle"
  | "green-guide-owl"
  | "green-connector-fox"
  | "green-supporter-bear";

export type ProfileTheme = {
  template?: KograflyTemplateId;
  mascot?: KograflyMascotId;
  background?: string;
  surface?: string;
  text?: string;
  muted?: string;
  accent?: string;
  secondary?: string;
  button?: string;
  buttonText?: string;
  decorative?: string;
  soft?: string;
  buttonStyle?: "solid" | "outline" | "soft" | "glass";
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

export type LinkAnimation =
  | "none"
  | "rise"
  | "pulse"
  | "wiggle"
  | "bounce"
  | "glow";

export type LinkStyleVariant = "solid" | "outline" | "soft" | "glass";

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
        Insert: {
          id?: string;
          owner_id: string;
          username: string;
          display_name?: string;
          bio?: string | null;
          avatar_url?: string | null;
          is_published?: boolean;
          theme?: ProfileTheme | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          username?: string;
          display_name?: string;
          bio?: string | null;
          avatar_url?: string | null;
          is_published?: boolean;
          theme?: ProfileTheme | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      links: {
        Row: KograflyLink;
        Insert: {
          id?: string;
          profile_id: string;
          owner_id: string;
          title?: string;
          url?: string;
          icon_name?: string;
          animation?: LinkAnimation;
          style_variant?: LinkStyleVariant;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          owner_id?: string;
          title?: string;
          url?: string;
          icon_name?: string;
          animation?: LinkAnimation;
          style_variant?: LinkStyleVariant;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      analytics_events: {
        Row: AnalyticsEvent;
        Insert: {
          id?: string;
          profile_id: string;
          link_id?: string | null;
          type: AnalyticsType;
          referrer?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          link_id?: string | null;
          type?: AnalyticsType;
          referrer?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
