import Link from "next/link";

const properties = [
  {
    number: "01",
    name: "Wuse",
    href: "/wuse-residence",
    eyebrow: "Property 01",
    suffix: "Residence",
    description: "Full stay rules, deposit guidance, and guest conduct policy.",
  },
  {
    number: "02",
    name: "Maitama",
    href: "/maitama-residence",
    eyebrow: "Property 02",
    suffix: "Residence",
    description: "Residence-specific rules for check-in, visitors, smoking, and damages.",
  },
  {
    number: "03",
    name: "Events",
    href: "/events",
    eyebrow: "Shared guide",
    suffix: "Planning",
    description: "Use the event overview page, then jump into the correct residence policy.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] flex flex-col items-center justify-center px-6 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/60 mb-4">
          Guest Policies
        </p>
        <h1 className="text-4xl md:text-5xl font-extralight text-white tracking-tight font-(family-name:--font-cormorant)">
          The Residence
        </h1>
        <div className="mt-4 mx-auto w-10 h-px bg-amber-400/30" />
        <p className="text-zinc-500 text-sm mt-4 tracking-wide">
          Select a residence or the event guide to move through the full guest journey
        </p>
      </div>

      {/* Cards */}
      <div className="grid w-full max-w-4xl gap-4 md:grid-cols-3">
        {properties.map((property) => (
          <Link
            key={property.name}
            href={property.href}
            className="group relative flex-1 overflow-hidden rounded-2xl border border-white/[0.07] bg-linear-to-b from-zinc-900 to-[#0f0f0f] p-8 transition-all duration-300 hover:border-amber-400/25 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(251,191,36,0.1)]"
          >
            {/* Top shimmer line */}
            <span className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-400/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Corner accent */}
            <span className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full bg-amber-400/20 group-hover:bg-amber-400/60 transition-colors duration-300" />

            {/* Content */}
            <div className="mb-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400/40 mb-5 group-hover:text-amber-400/70 transition-colors duration-300">
                {property.eyebrow}
              </p>
              <h2 className="text-3xl font-extralight text-white leading-none">
                {property.name}
              </h2>
              <p className="text-zinc-600 text-sm mt-1.5 font-light tracking-wide">
                {property.suffix}
              </p>
              <p className="text-zinc-500 text-sm mt-5 leading-6">
                {property.description}
              </p>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-zinc-600 group-hover:text-amber-400/70 transition-colors duration-300">
              <span>{property.name === "Events" ? "Open guide" : "View policies"}</span>
              <svg
                className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
