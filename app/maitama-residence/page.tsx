import Link from "next/link";

export default function MaitamaPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] flex flex-col items-center justify-center px-6 text-center">
      <Link
        href="/"
        className="absolute top-8 left-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-zinc-600 hover:text-amber-400/70 transition-colors duration-200"
      >
        <svg
          className="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back
      </Link>

      <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/40 mb-4">
        Property 02
      </p>
      <h1 className="text-5xl md:text-6xl font-extralight tracking-tight text-white">
        Maitama
      </h1>
      <p className="text-zinc-600 text-sm mt-2 tracking-widest uppercase font-light">
        Residence
      </p>

      <div className="mt-8 w-10 h-px bg-amber-400/20 mx-auto" />

      <div className="mt-8 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-amber-400/15 bg-amber-400/4">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/50 animate-pulse" />
        <span className="text-[11px] uppercase tracking-[0.25em] text-amber-400/60">
          Coming Soon
        </span>
      </div>

      <p className="mt-6 text-zinc-600 text-sm max-w-xs leading-relaxed">
        The Maitama Residence policy page is currently being prepared. Check back shortly.
      </p>
    </div>
  );
}
