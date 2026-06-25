import { notFound } from "next/navigation";
import PublicProfile from "@/components/PublicProfile";
import { supabaseAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ username: string }> };

export async function generateMetadata({ params }: Props) {
  const { username: rawUsername } = await params;
  const username = rawUsername.toLowerCase();
  const { data } = await supabaseAdmin
    .from("profiles")
    .select("display_name,bio,avatar_url,username")
    .eq("username", username)
    .eq("is_published", true)
    .maybeSingle();

  if (!data) return { title: "Kografly" };
  return {
    title: `${data.display_name} / Kografly`,
    description: data.bio || `Lihat semua link ${data.display_name} di Kografly`,
    openGraph: {
      title: `${data.display_name} / Kografly`,
      description: data.bio || undefined,
      images: data.avatar_url ? [data.avatar_url] : []
    }
  };
}

export default async function UsernamePage({ params }: Props) {
  const { username: rawUsername } = await params;
  const username = rawUsername.toLowerCase();
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("username", username)
    .eq("is_published", true)
    .maybeSingle();

  if (!profile) notFound();

  const { data: links } = await supabaseAdmin
    .from("links")
    .select("*")
    .eq("profile_id", profile.id)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  return <PublicProfile initialProfile={profile} initialLinks={links || []} />;
}
