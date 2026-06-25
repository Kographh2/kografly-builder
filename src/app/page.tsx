import { ArrowRight, BarChart3, Bolt, Eye, Sparkles } from "lucide-react";
import UsernameClaim from "@/components/UsernameClaim";
import LandingPreview from "@/components/LandingPreview";

const features = [
  {
    icon: Bolt,
    title: "Realtime builder",
    text: "Edit link, ikon, avatar, dan bio; preview serta public page ikut sinkron lewat Supabase Realtime."
  },
  {
    icon: Sparkles,
    title: "Animasi per link",
    text: "Pilih rise, pulse, wiggle, bounce, glow, atau statis untuk setiap tombol bio-link."
  },
  {
    icon: BarChart3,
    title: "Analytics ringkas",
    text: "Lihat views, clicks, CTR, dan top links dari dashboard owner."
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-kografly-stone text-kografly-ink thread-grid">
      <section className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-6 py-10 lg:grid-cols-[1fr_430px] lg:px-8">
        <div className="space-y-9">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-sm font-medium text-kografly-indigo shadow-soft backdrop-blur">
            <Eye className="h-4 w-4" />
            kografly.web.id/username — public bio link realtime
          </div>

          <div className="space-y-5">
            <h1 className="max-w-4xl font-serif text-5xl font-bold leading-[.95] tracking-tight text-stone-950 sm:text-7xl">
              Satu simpul untuk semua link kreatormu.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-600">
              Kografly adalah bio-link builder untuk creator, komunitas, dan brand kecil. Mulai dari <span className="font-semibold text-kografly-indigo">/username</span>, susun link tanpa batas, pilih ikon sosial, beri animasi, lalu pantau performanya.
            </p>
          </div>

          <UsernameClaim />

          <div className="grid max-w-4xl gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="thread-indent rounded-thread border border-stone-200 bg-white/90 p-5 shadow-soft backdrop-blur">
                <feature.icon className="mb-4 h-5 w-5 text-kografly-teal" />
                <h3 className="font-serif text-xl font-semibold text-stone-950">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-10 hidden rounded-3xl bg-kografly-amber px-5 py-3 text-sm font-bold text-white shadow-thread lg:block">
            unlimited links
          </div>
          <LandingPreview />
          <a href="/builder" className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5">
            Lihat builder <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
