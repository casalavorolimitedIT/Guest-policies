import Link from "next/link";
import EventsInfoDialog from "./events-info-dialog";
import EventImageStage from "./event-image-stage";

const connectedPages = [
  {
    href: "/",
    title: "Home",
    description: "Return to the main directory for all policy pages.",
  },
  {
    href: "/wuse-residence",
    title: "Wuse Residence",
    description: "Useful when the event involves Wuse stays, room use, or on-site dining rules.",
    detail: "Includes higher caution deposit and food-service guidance.",
  },
  {
    href: "/maitama-residence",
    title: "Maitama Residence",
    description: "Use this when guest accommodation or gathering logistics are tied to Maitama.",
    detail: "Includes the Maitama-specific deposit level and smoking-area guidance.",
  },
];

export default function EventPage() {
  return (
    <main className="bg-[#0b0b0a] text-white overflow-x-hidden">
      {/* ── Full-viewport image hero ── */}
      <section className="relative h-screen min-h-150">
        {/* Image fills the entire hero */}
        <EventImageStage />

        {/* Floating nav — sits over the image */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-6 md:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/60 backdrop-blur-sm transition-colors duration-200 hover:text-amber-300"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            All policy pages
          </Link>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 md:flex">
              {connectedPages.slice(1).map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="rounded-full border border-white/20 bg-black/30 px-3 py-2 text-[10px] uppercase tracking-[0.24em] text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-amber-300/40 hover:text-amber-200"
                >
                  {page.title}
                </Link>
              ))}
            </div>
            <EventsInfoDialog />
          </div>
        </div>
      </section>

      {/* ── Below-the-fold: policy links ── */}
      <section className="border-t border-white/8 bg-[#0b0b0a]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-amber-300/60">
                Related pages
              </p>
              <h2 className="mt-4 text-3xl font-light tracking-[-0.03em] text-white">
                Move to the exact policy page you need.
              </h2>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-zinc-500 transition-colors duration-200 hover:text-amber-300"
            >
              Explore all pages
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {connectedPages.map((page, index) => (
              <Link
                key={page.href}
                href={page.href}
                className="group rounded-3xl border border-white/8 bg-white/3 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-amber-300/20 hover:bg-white/5"
              >
                <p className="text-[10px] uppercase tracking-[0.34em] text-amber-300/55">
                  {index === 0 ? "Directory" : `Linked page 0${index}`}
                </p>
                <h3 className="mt-4 text-2xl font-light text-white">{page.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{page.description}</p>
                {page.detail ? (
                  <p className="mt-4 text-xs uppercase tracking-[0.24em] text-zinc-500">{page.detail}</p>
                ) : null}
                <div className="mt-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-zinc-500 transition-colors duration-200 group-hover:text-amber-200">
                  Open page
                  <svg
                    className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
