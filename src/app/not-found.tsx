import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-kografly-stone px-6 text-center thread-grid">
      <div className="max-w-md rounded-[2rem] border border-stone-200 bg-white p-8 shadow-thread">
        <p className="text-sm font-semibold uppercase tracking-[.3em] text-kografly-amber">404</p>
        <h1 className="mt-3 text-4xl font-bold text-stone-950">Simpul ini belum ada.</h1>
        <p className="mt-4 text-stone-600">Username belum dibuat, belum dipublish, atau link sudah dipindahkan.</p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-kografly-indigo px-5 py-3 text-sm font-bold text-white">
          Buat Kografly kamu
        </Link>
      </div>
    </main>
  );
}
