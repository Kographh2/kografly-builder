import AuthPanel from "@/components/AuthPanel";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ username?: string }> }) {
  const params = await searchParams;
  return (
    <main className="min-h-screen bg-kografly-stone px-6 py-10 thread-grid">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1fr_440px]">
        <section className="space-y-5">
          <p className="inline-flex rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-kografly-indigo shadow-soft">
            Kografly account
          </p>
          <h1 className="font-serif text-5xl font-bold leading-none text-stone-950 sm:text-6xl">
            Amankan username kamu, lalu mulai menenun link.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-stone-600">
            Setelah masuk, Kografly otomatis membuat profil public untuk username yang kamu pilih. Kamu masih bisa mengganti detail profile dan link dari builder.
          </p>
        </section>
        <AuthPanel initialUsername={params.username} />
      </div>
    </main>
  );
}
