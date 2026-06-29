"use client";

import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

type Props = {
  userId: string;
  avatarUrl: string | null;
  displayName: string;
  onUploaded: (publicUrl: string) => void;
};

export default function AvatarUploader({ userId, avatarUrl, displayName, onUploaded }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setError(null);
    setUploading(true);
    const ext = file.name.split(".").pop() || "png";
    const filePath = `${userId}/avatar-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, { upsert: true });
    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    onUploaded(data.publicUrl);
    setUploading(false);
  }

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-full border-4 border-white bg-indigo-100 shadow-soft ring-1 ring-stone-200"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={displayName} className="h-full w-full object-cover" />
        ) : (
          <span className="text-4xl font-bold text-kografly-indigo">{displayName.charAt(0) || "K"}</span>
        )}
        <span className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-stone-950/70 py-1 text-white">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
        </span>
      </button>
      <div>
        <p className="font-bold text-stone-950">Foto profile public</p>
        <p className="text-sm text-stone-500">PNG/JPG/WebP/GIF maksimal 5MB.</p>
        {error && <p className="mt-1 text-sm text-kografly-error">{error}</p>}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void upload(file);
        }}
      />
    </div>
  );
}
