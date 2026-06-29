import ProfileCanvas from "@/components/ProfileCanvas";
import type { KograflyLink, Profile } from "@/lib/types";

const previewProfile: Profile = {
  id: "landing-preview",
  owner_id: "landing-preview",
  username: "linku",
  display_name: "Kografly Studio",
  bio: "Akses cepat ke portfolio, produk, promo, dan kontak terbaik Anda.",
  avatar_url: null,
  is_published: true,
  theme: { template: "blue-connector" },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const previewLinks: KograflyLink[] = [
  { id: "1", profile_id: "landing-preview", owner_id: "landing-preview", title: "Website", url: "#", icon_name: "Globe2", animation: "rise", style_variant: "solid", sort_order: 0, is_active: true, created_at: "", updated_at: "" },
  { id: "2", profile_id: "landing-preview", owner_id: "landing-preview", title: "Produk / Layanan", url: "#", icon_name: "ShoppingBag", animation: "rise", style_variant: "solid", sort_order: 1, is_active: true, created_at: "", updated_at: "" },
  { id: "3", profile_id: "landing-preview", owner_id: "landing-preview", title: "Portfolio", url: "#", icon_name: "Camera", animation: "rise", style_variant: "solid", sort_order: 2, is_active: true, created_at: "", updated_at: "" },
  { id: "4", profile_id: "landing-preview", owner_id: "landing-preview", title: "Hubungi Kami", url: "#", icon_name: "Phone", animation: "rise", style_variant: "solid", sort_order: 3, is_active: true, created_at: "", updated_at: "" }
];

export default function LandingPreview() {
  return (
    <div className="mx-auto max-w-[380px] rounded-[2.25rem] border border-slate-200 bg-slate-950 p-3 shadow-thread">
      <div className="h-[680px] overflow-hidden rounded-[1.9rem] bg-white">
        <div className="h-full overflow-hidden">
          <ProfileCanvas profile={previewProfile} links={previewLinks} preview compact />
        </div>
      </div>
    </div>
  );
}
