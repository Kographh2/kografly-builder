# Kografly Builder

Kografly adalah starter project bio-link builder ala Linktree, tetapi dengan identitas visual sendiri: editorial, nested cards, serif title, dan warna Indigo/Amber/Teal yang terinspirasi dari `threadweave-DESIGN.md`.

## Fitur utama

- Landing page dengan input `/username`.
- Auth email/password Supabase.
- Builder realtime untuk profile, avatar, bio, dan link.
- Public link di `https://kografly.web.id/username` atau lokal `http://localhost:3000/username`.
- Icon picker khusus icon sosial/creator dari `lucide-react`.
- Animasi per bio link: none, rise, pulse, wiggle, bounce, glow.
- Preview live di halaman builder.
- Dashboard analytics realtime: total views, total clicks, CTR, dan top link.
- Link unlimited, tidak dibatasi 10.
- Upload avatar via Supabase Storage.
- Database schema + RLS policy disediakan.

## Cara menjalankan

1. Install dependency:

```bash
npm install
```

2. Buat project Supabase, lalu jalankan SQL di `supabase/schema.sql` lewat Supabase SQL Editor.

3. Aktifkan Realtime untuk tabel `profiles`, `links`, dan `analytics_events`. SQL sudah mencoba menambahkan tabel-tabel ini ke publication Supabase Realtime, tetapi cek lagi di dashboard Supabase jika event realtime belum masuk.

4. Buat file `.env.local` dari `.env.example`:

```bash
cp .env.example .env.local
```

Isi:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Jalankan:

```bash
npm run dev
```

Buka `http://localhost:3000`.

## Catatan deployment

Untuk domain seperti `https://kographh.web.id/username`, deploy ke Vercel/hosting Next.js dan arahkan domain `kographh.web.id` ke deployment. Pastikan `NEXT_PUBLIC_SITE_URL=https://kographh.web.id`.

## Struktur halaman

- `/` landing page + form klaim username.
- `/login?username=nama` login/signup lalu otomatis membuat profile.
- `/builder` editor profile dan link.
- `/dashboard` analytics realtime.
- `/[username]` public profile.

## Catatan keamanan

- RLS sudah aktif untuk tabel utama.
- Public hanya bisa membaca profile/link yang published/active.
- Analytics hanya menyimpan event view/click, referrer, dan user agent pendek; tidak menyimpan IP.
- Jangan expose `SUPABASE_SERVICE_ROLE_KEY` ke client.
