import IconRenderer from "@/components/IconRenderer";

const previewLinks = [
  { title: "Latest Drop", icon: "Instagram", className: "bg-stone-950 text-white" },
  { title: "Community Thread", icon: "MessageCircle", className: "bg-indigo-50 text-kografly-indigo" },
  { title: "Video Channel", icon: "Youtube", className: "bg-white text-stone-950" },
  { title: "Open Source", icon: "Github", className: "bg-white/70 text-stone-950" }
];

export default function LandingPreview() {
  return (
    <div className="mx-auto max-w-[390px] rounded-[2rem] border border-stone-200 bg-white p-4 shadow-thread">
      <div className="rounded-[1.6rem] bg-kografly-stone p-6 thread-grid">
        <div className="text-center">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-kografly-indigo via-kografly-teal to-kografly-amber text-4xl font-bold text-white shadow-soft">
            K
          </div>
          <h2 className="mt-4 font-serif text-3xl font-bold">Kografly Studio</h2>
          <p className="mt-1 text-sm font-semibold text-kografly-indigo">/studio</p>
          <p className="mx-auto mt-3 max-w-[260px] text-sm leading-6 text-stone-600">
            Bio link yang terasa personal, rapi, dan bisa dipantau realtime.
          </p>
        </div>

        <div className="mt-7 space-y-3">
          {previewLinks.map((link, index) => (
            <div
              key={link.title}
              className={`thread-indent flex items-center gap-3 rounded-[1.35rem] border border-stone-200 px-4 py-3 shadow-soft ${link.className}`}
              style={{ marginLeft: index > 1 ? 24 : 0 }}
            >
              <IconRenderer name={link.icon} className="h-5 w-5" />
              <span className="font-bold">{link.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}