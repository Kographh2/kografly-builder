import { notFound } from "next/navigation";
import PublicProfile from "@/components/PublicProfile";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { KograflyLink, Profile } from "@/lib/types";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

type MetadataProfile = Pick<Profile, "display_name" | "bio" | "avatar_url" | "username">;

export async function generateMetadata({ params }: Props) {
  const { username: rawUsername } = await params;
  const username = rawUsername.toLowerCase();

  const { data } = await supabaseAdmin
    .from("profiles")
    .select("display_name,bio,avatar_url,username")
    .eq("username", username)
    .eq("is_published", true)
    .maybeSingle();

  const profile = data as MetadataProfile | null;

  if (!profile) {
    return { title: "Kografly" };
  }

  return {
    title: `${profile.display_name} / Kografly`,
    description: profile.bio || `Lihat semua link ${profile.display_name} di Kografly`,
    openGraph: {
      title: `${profile.display_name} / Kografly`,
      description: profile.bio || undefined,
      images: profile.avatar_url ? [profile.avatar_url] : []
    }
  };
}

export default async function UsernamePage({ params }: Props) {
  const { username: rawUsername } = await params;
  const username = rawUsername.toLowerCase();

  const { data: profileData } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("username", username)
    .eq("is_published", true)
    .maybeSingle();

  const profile = profileData as Profile | null;

  if (!profile) {
    notFound();
  }

  const { data: linksData } = await supabaseAdmin
    .from("links")
    .select("*")
    .eq("profile_id", profile.id)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const links = (linksData || []) as KograflyLink[];

  return <PublicProfile initialProfile={profile} initialLinks={links} />;
}
