# Kografly Builder

Kografly Builder adalah starter bio-link builder realtime berbasis Next.js App Router dan Supabase. Versi ini sudah memakai Kografly Standard UI dengan mascot dan template yang benar-benar dirender sebagai komponen React/CSS, bukan screenshot tempelan.

## Highlight versi ini

- 6 template Kografly Standard UI:
  - Blue Guide
  - Blue Connector
  - Blue Supporter
  - Green Guide
  - Green Connector
  - Green Supporter
- Mascot asset sudah dipotong menjadi PNG transparent dan dipakai sebagai elemen hero.
- Layout template dibuat dari component asli: header, hero, wave, cards, button list, trust strip, dan social dots.
- Font utama Poppins.
- Preview HP live sebelum disimpan.
- Custom warna template: background, surface, text, muted, accent, secondary, button, button text, decorative, dan soft background.
- Public page realtime tanpa badge “Realtime on”. Realtime tetap aktif di belakang layar.
- Unlimited bio links.
- Icon picker social/creator dari lucide-react dengan alias aman untuk icon brand seperti Github/Instagram/YouTube.
- Analytics views/clicks dengan dashboard.
- Upload avatar ke Supabase Storage.

## Cara menjalankan

```bash
npm install
cp .env.example .env.local
npm run dev
```

Isi `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Lalu jalankan SQL di `supabase/schema.sql` lewat Supabase SQL Editor.

## Build check

Project ini sudah dicek dengan:

```bash
npm run build
```

Build berhasil menggunakan Next.js 16.2.9 di environment sandbox dengan env dummy.

## Catatan font

Poppins dipanggil lewat CSS import Google Fonts di `src/app/globals.css` agar build tidak gagal saat environment offline. Browser akan memuat Poppins saat runtime.
