import IconRenderer from "@/components/IconRenderer";

const previewLinks = [
  { title: "Instagram", icon: "Instagram" },
  { title: "Portfolio", icon: "Portfolio" },
  { title: "Katalog produk", icon: "Shop" }
];

export default function LandingPreview() {
  return (
    <div className="mx-auto max-w-[390px] rounded-[2rem] border border-stone-200 bg-white p-4 shadow-thread">
      <div className="overflow-hidden rounded-[1.6rem] bg-[#F7F3EC]">
        <div className="h-24 bg-gradient-to-br from-kografly-indigo via-kografly-teal to-[#E7DED2]" />
        <div className="px-6 pb-7 text-center">
          <div className="mx-auto -mt-12 grid h-24 w-24 place-items-center rounded-full border-[6px] border-white bg-white text-4xl font-bold text-kografly-indigo shadow-soft">
            K
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-stone-950">Kografly Studio</h2>
          <p className="mt-1 text-sm font-semibold text-kografly-indigo">/studio</p>
          <p className="mx-auto mt-3 max-w-[260px] text-sm leading-6 text-stone-600">
            Bio link minimalis, elegan, realtime, dan gampang dikustom warna.
          </p>
        </div>

        <div className="space-y-3 px-5 pb-6">
          {previewLinks.map((link) => (
            <div
              key={link.title}
              className="flex items-center gap-3 rounded-[1.45rem] border border-stone-200 bg-stone-950 px-4 py-3.5 text-white shadow-soft"
            >
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15">
                <IconRenderer name={link.icon} className="h-5 w-5" />
              </span>
              <span className="font-semibold">{link.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

