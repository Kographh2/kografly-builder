import IconRenderer from "@/components/IconRenderer";
import KograflyMascot from "@/components/KograflyMascot";

const previewLinks = [
  { title: "Website", icon: "Website" },
  { title: "Produk / Layanan", icon: "Shop" },
  { title: "Hubungi Kami", icon: "WhatsApp" }
];

export default function LandingPreview() {
  return (
    <div className="mx-auto max-w-[390px] rounded-[2rem] border border-[#D6E9FF] bg-white p-4 shadow-thread">
      <div className="overflow-hidden rounded-[1.6rem] bg-[#F6FAFF]">
        <div className="relative h-36 bg-gradient-to-br from-[#0B1D3A] via-[#1E5CC8] to-[#58A8FF]">
          <div className="absolute left-5 top-5 h-12 w-12 rounded-full bg-white/15" />
          <KograflyMascot mascot="owl" primary="#1E5CC8" secondary="#58A8FF" soft="#D6E9FF" className="absolute -bottom-12 right-4 h-32 w-32" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-xs font-bold uppercase tracking-[.18em] opacity-80">Brand Link</p>
            <h2 className="text-2xl font-extrabold tracking-[-0.04em]">Selamat Datang</h2>
          </div>
        </div>

        <div className="px-6 pb-7 pt-14 text-center">
          <h3 className="text-3xl font-extrabold tracking-[-0.05em] text-[#0B1D3A]">Kografly Studio</h3>
          <p className="mt-1 text-sm font-bold text-[#1E5CC8]">/studio</p>
          <p className="mx-auto mt-3 max-w-[260px] text-sm leading-6 text-[#5E6B82]">
            Bio link rapi dengan mascot, warna brand, realtime, dan template siap pakai.
          </p>
        </div>

        <div className="space-y-3 px-5 pb-6">
          {previewLinks.map((link) => (
            <div
              key={link.title}
              className="flex items-center gap-3 rounded-[1.35rem] border border-[#D6E9FF] bg-white px-4 py-3.5 text-[#0B1D3A] shadow-soft"
            >
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#EAF4FF] text-[#1E5CC8]">
                <IconRenderer name={link.icon} className="h-5 w-5" />
              </span>
              <span className="font-bold">{link.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
