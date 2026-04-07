import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/40 mb-4">
        404
      </p>
      <h1 className="text-5xl md:text-6xl font-extralight tracking-tight text-white">
        Not Found
      </h1>

      <div className="mt-6 w-10 h-px bg-amber-400/20 mx-auto" />

      <p className="mt-6 text-zinc-500 text-sm max-w-xs leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-zinc-600 hover:text-amber-400/70 transition-colors duration-200"
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
        Return Home
      </Link>
    </div>
  );
}
