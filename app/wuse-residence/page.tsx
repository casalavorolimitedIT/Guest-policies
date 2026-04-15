import Link from "next/link";

const sections = [
  {
    number: "01",
    title: "Check-In & Check-Out Policy",
    items: [
      "Standard Check-in Time: From 2:00 PM",
      "Standard Check-out Time: By 12:00 Noon",
      "Early check-in is subject to availability and may attract additional charges (₦50,000).",
      "Late check-out is subject to availability and will attract a charge of ₦20,000 per hour.",
      "Guests must present a valid government-issued ID or international passport at check-in.",
      "A caution deposit of ₦200,000 is required before check-in. This deposit will cover incidental charges and any damages during the stay.",
    ],
  },
  {
    number: "02",
    title: "Payment Policy",
    items: [
      "The hotel operates a strict cashless policy. Cash payments are not accepted.",
      "Full or part payment must be completed before check-in to confirm and guarantee the reservation.",
      "Guests without confirmed full payment will not be allowed to check in.",
      "Guests are responsible for all incidental and additional charges incurred during their stay.",
      "All outstanding bills must be fully settled before check-out.",
      "Guests are highly encouraged to make full payment before check-out.",
    ],
  },
  {
    number: "03",
    title: "Cancellation & Refund Policy",
    items: [
      "Guests must inform us at least 24 hours prior to check-in for any cancellation.",
      "Non-refundable bookings are strictly non-refundable.",
      "Refunds (where applicable) will be processed within 5–7 working days.",
      "No-shows will be charged the full booking amount.",
    ],
  },
  {
    number: "04",
    title: "Visitor Policy",
    items: [
      "All visitors must register at the Front Desk.",
      "Management reserves the right to deny entry to any visitor for security reasons.",
    ],
  },
  {
    number: "05",
    title: "Quiet Hours Policy",
    items: [
      "No loud music or noise is allowed at any time.",
      "Guests must maintain reasonable noise levels to avoid disturbing others.",
    ],
  },
  {
    number: "06",
    title: "Smoking Policy",
    items: [
      "The Residence is a non-smoking property except in designated areas.",
      "Smoking inside guest rooms will attract a penalty of ₦100,000 and eviction.",
      "Tampering with smoke detectors is strictly prohibited and may result in eviction without refund.",
    ],
  },
  {
    number: "07",
    title: "Damage & Loss Policy",
    items: [
      "Guests are liable for any damage caused to Residence property.",
      "Any damages in the room will be charged based on the replacement cost of the items.",
      "The caution deposit of ₦200,000 collected before check-in may be applied toward damages or other incidental charges.",
      "The Residence reserves the right to charge the guest's registered payment method for damages discovered after check-out.",
    ],
  },
  {
    number: "08",
    title: "Safety & Security",
    items: [
      "Guests are advised to secure valuables in the in-room safe.",
      "The Residence is not responsible for loss of valuables not properly secured.",
      "Weapons, illegal substances, and hazardous materials are strictly prohibited on Residence premises.",
    ],
  },
  {
    number: "09",
    title: "Food & Beverage Policy",
    items: [
      "Buffet items and complimentary breakfast must be consumed within the restaurant premises only. If served in the room, a service charge of ₦10,000 applies.",
    ],
  },
  {
    number: "10",
    title: "Pet Policy",
    items: [
      "Pets are not allowed unless prior written approval is granted by management.",
    ],
  },
  {
    number: "11",
    title: "Right of Admission",
    items: [
      "The Residence reserves the right to refuse service or evict any guest engaging in: disorderly conduct, illegal activities, harassment of guests or staff, or violation of Residence policies.",
    ],
  },
];

export default function WusePage() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      {/* Hero */}
      <div className="border-b border-white/6 px-6 py-16 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-zinc-600 hover:text-amber-400/70 transition-colors duration-200 mb-10"
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
          All Properties
        </Link>

        <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/50 mb-3">
          Property 01
        </p>
        <h1 className="text-5xl md:text-6xl font-extralight tracking-tight">
          Wuse
        </h1>
        <p className="text-zinc-600 text-sm mt-2 tracking-widest uppercase font-light">
          Residence
        </p>
        <div className="mt-6 mx-auto w-10 h-px bg-amber-400/25" />
        <p className="text-zinc-500 text-base mt-5 max-w-sm mx-auto leading-relaxed">
          Please read these rules and policies carefully. By staying at&nbsp;
          <span className="text-zinc-300">The Wuse Residence</span>, you agree
          to abide by all of the following terms.
        </p>
      </div>

      {/* Sections */}
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-12">
        {sections.map((section) => (
          <div key={section.number} className="group">
            <div className="flex items-baseline gap-4 mb-5">
              <span className="lg:text-[50px] text-[20px] tabular-nums font-extrabold text-amber-400/30 tracking-[0.2em] shrink-0">
                {section.number}
              </span>
              <h2 className="text-lg font-bold text-white/90 tracking-wide">
                {section.title}
              </h2>
            </div>
            <ul className="ml-7 space-y-3">
              {section.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-base text-gray-200 leading-relaxed">
                  <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-amber-400/30" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 h-px bg-white/4" />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-white/5 py-10 text-center">
        <p className="text-[11px] text-zinc-700 tracking-widest uppercase">
          The Wuse Residence &mdash; Guest Policies
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-zinc-700 transition-colors duration-200 hover:text-amber-400/60"
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
            Back to home
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-zinc-700 transition-colors duration-200 hover:text-amber-400/60"
          >
            Event guide
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
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
