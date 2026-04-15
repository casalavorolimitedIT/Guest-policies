"use client";

import Link from "next/link";
import { useState } from "react";

export default function EventsInfoDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="About this page"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/4 text-sm text-zinc-300 transition-all duration-200 hover:border-amber-300/30 hover:bg-amber-300/10 hover:text-amber-100"
      >
        i
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-4xl border border-white/10 bg-[#11100f] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.34em] text-amber-300/60">
                  About this page
                </p>
                <h2 className="mt-3 text-2xl font-light text-white">
                  Events are connected to the stay policy pages.
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/4 text-zinc-400 transition-colors duration-200 hover:text-white"
              >
                x
              </button>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-300">
              Use this page for the event overview and visual context. For enforceable
              guest rules, move into the relevant residence page and confirm the exact
              property conditions there.
            </p>

            <div className="mt-6 grid gap-3">
              <Link
                href="/wuse-residence"
                onClick={() => setIsOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/3 px-4 py-4 text-sm text-zinc-200 transition-colors duration-200 hover:border-amber-300/25 hover:text-white"
              >
                Wuse Residence
              </Link>
              <Link
                href="/maitama-residence"
                onClick={() => setIsOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/3 px-4 py-4 text-sm text-zinc-200 transition-colors duration-200 hover:border-amber-300/25 hover:text-white"
              >
                Maitama Residence
              </Link>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/3 px-4 py-4 text-sm text-zinc-200 transition-colors duration-200 hover:border-amber-300/25 hover:text-white"
              >
                Home directory
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}