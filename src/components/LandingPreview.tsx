import ProfileCanvas from "@/components/ProfileCanvas";
import type { KograflyLink, Profile } from "@/lib/types";

const previewProfile: Profile = {
  id: "landing-preview",
  owner_id: "landing-preview",
  username: "fizzxverss",
  display_name: "FizzxVerss",
  bio: "Explore my portfolio & web store for editing services.",
  avatar_url: null,
  is_published: true,
  theme: { template: "blue-guide" },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const previewLinks: KograflyLink[] = [
  { id: "1", profile_id: "landing-preview", owner_id: "landing-preview", title: "Instagram", url: "#", icon_name: "Instagram", animation: "rise", style_variant: "soft", sort_order: 0, is_active: true, created_at: "", updated_at: "" },
  { id: "2", profile_id: "landing-preview", owner_id: "landing-preview", title: "Portofolio", url: "#", icon_name: "Camera", animation: "rise", style_variant: "soft", sort_order: 1, is_active: true, created_at: "", updated_at: "" },
  { id: "3", profile_id: "landing-preview", owner_id: "landing-preview", title: "Contact me on WhatsApp", url: "#", icon_name: "WhatsApp", animation: "rise", style_variant: "soft", sort_order: 2, is_active: true, created_at: "", updated_at: "" }
];

export default function LandingPreview() {
  return (
    <div className="mx-auto max-w-[380px] rounded-[2.25rem] border border-slate-200 bg-slate-950 p-3 shadow-thread">
      <div className="h-[680px] overflow-hidden rounded-[1.9rem] bg-white">
        <div className="kografly-scrollbar h-full overflow-y-auto">
          <ProfileCanvas profile={previewProfile} links={previewLinks} preview compact />
        </div>
      </div>
    </div>
  );
}
