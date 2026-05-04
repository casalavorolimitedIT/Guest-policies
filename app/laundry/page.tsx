"use client";

import { laundryRows } from "@/utils/laundry-data";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type Audience = "Gents" | "Ladies";
export type Service = "Laundry" | "Dry Cleaning";

const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});
// ── SwipeHint: auto-dismisses after user first scrolls the table ─────────────
function SwipeHint() {
  const [visible, setVisible] = useState(true);
  const [animating, setAnimating] = useState(true);

  // pulse the arrow every ~2 s
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      setAnimating(false);
      setTimeout(() => setAnimating(true), 80);
    }, 2200);
    return () => clearInterval(id);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="swipe-hint mt-6 flex items-center gap-3 rounded-2xl border border-amber-200/20 bg-gradient-to-r from-amber-200/8 to-transparent px-4 py-3 sm:hidden">
      {/* animated arrow */}
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-200/25 bg-amber-100/12 text-sm transition-transform duration-300 ${
          animating ? "translate-x-1.5" : "translate-x-0"
        }`}
      >
        ←
      </span>

      <div className="flex-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-amber-200/60">
          Tip
        </p>
        <p className="mt-0.5 text-xs leading-5 text-stone-300/80">
          Swipe the table{" "}
          <span className="font-semibold text-amber-100">left or right </span> to
          reveal price, pieces &amp; total columns.
        </p>
      </div>

      {/* dismiss */}
      <button
        type="button"
        aria-label="Dismiss tip"
        onClick={() => setVisible(false)}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-400 transition-colors hover:bg-white/10 hover:text-white"
      >
        ×
      </button>
    </div>
  );
}

// ── FeeNotice ─────────────────────────────────────────────────────────────────
function FeeNotice() {
  return (
    <div className="mt-3 flex flex-col gap-2.5 rounded-2xl border border-white/8 bg-white/3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
      {/* 5 % fee */}
      <p className="flex items-center gap-2.5 text-xs text-stone-300/80">
        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-amber-200/30 bg-amber-200/15 text-[10px] font-bold text-amber-200">
          %
        </span>
        A <span className="font-semibold text-amber-100">5% service fee</span>{" "}
        is applied to all orders at checkout.
      </p>

      {/* divider — horizontal on mobile, vertical on sm+ */}
      <span className="hidden h-4 w-px bg-white/10 sm:block" />
      <span className="block h-px w-full bg-white/8 sm:hidden" />

      {/* price change */}
      <p className="flex items-center gap-2.5 text-xs text-stone-400/75">
        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8 text-[10px] text-stone-300">
          ℹ
        </span>
        Prices are subject to change without notice.
      </p>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function LaundryPage() {
  const [search, setSearch]               = useState("");
  const [audienceFilter, setAudienceFilter] = useState<Audience | "All">("All");
  const [serviceFilter, setServiceFilter]   = useState<Service  | "All">("All");
  const [piecesByRow, setPiecesByRow]       = useState<Record<string, number>>({});
 
  // track whether the table has been scrolled (to know swipe hint did its job)
  const tableRef = useRef<HTMLDivElement>(null);
 
  const filteredRows = laundryRows.filter((row) => {
    const q = search.toLowerCase().trim();
    const matchesSearch =
      q.length === 0 ||
      row.item.toLowerCase().includes(q) ||
      row.audience.toLowerCase().includes(q) ||
      row.service.toLowerCase().includes(q);
 
    return (
      matchesSearch &&
      (audienceFilter === "All" || row.audience === audienceFilter) &&
      (serviceFilter  === "All" || row.service  === serviceFilter)
    );
  });
 
  const visibleTotal = filteredRows.reduce(
    (sum, row) => sum + row.price * (piecesByRow[row.id] ?? 0),
    0
  );
 
  function clearFilters() {
    setSearch("");
    setPiecesByRow({});
    setAudienceFilter("All");
    setServiceFilter("All");
  }
 
  function updatePieces(rowId: string, value: string) {
    const n = Number(value);
    setPiecesByRow((cur) => ({
      ...cur,
      [rowId]: Number.isFinite(n) && n >= 0 ? n : 0,
    }));
  }
 
  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(226,180,95,0.22),transparent_28%),linear-gradient(180deg,#15110d_0%,#090909_100%)] text-white">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="rounded-4xl border border-white/10 bg-black/25 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur md:p-8">
 
          {/* ── Header ───────────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-amber-200/70 transition-colors duration-200 hover:text-amber-100"
              >
                <svg
                  className="h-3 w-3"
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
                Back to directory
              </Link>
 
              <p className="mt-6 text-[11px] uppercase tracking-[0.34em] text-amber-200/55">
                Laundry service guide
              </p>
              <h1 className="mt-4 text-4xl font-light tracking-[-0.04em] text-white sm:text-5xl">
                Filterable laundry and dry-cleaning price table
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-300/80 sm:text-base">
                Search by item name, narrow the list by audience or service
                type, and enter the number of pieces to calculate totals
                instantly.
              </p>
            </div>
 
            {/* ── Stats cards ─────────────────────────────────────────────── */}
            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-100">
              <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.28em] text-stone-400">
                  Rows shown
                </p>
                <p className="mt-3 text-3xl font-light text-white">
                  {filteredRows.length}
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.28em] text-stone-400">
                  Price list items
                </p>
                <p className="mt-3 text-3xl font-light text-white">
                  {laundryRows.length}
                </p>
              </div>
              <div className="rounded-2xl border border-amber-200/20 bg-amber-200/8 p-4">
                <p className="text-[10px] uppercase tracking-[0.28em] text-amber-100/70">
                  Visible total
                </p>
                <p className="mt-3 text-2xl font-light text-white">
                  {currency.format(visibleTotal)}
                </p>
              </div>
            </div>
          </div>
 
          {/* ── Filters ──────────────────────────────────────────────────────── */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_0.8fr]">
            <label className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="block text-[10px] uppercase tracking-[0.28em] text-stone-400">
                Search
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search item, audience, or service"
                className="mt-3 w-full bg-transparent text-sm text-white outline-none placeholder:text-stone-500"
              />
            </label>
 
            <label className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="block text-[10px] uppercase tracking-[0.28em] text-stone-400">
                Audience
              </span>
              <select
                value={audienceFilter}
                onChange={(e) =>
                  setAudienceFilter(e.target.value as Audience | "All")
                }
                className="mt-3 w-full bg-transparent text-sm text-white outline-none"
              >
                <option className="bg-[#111]" value="All">All audiences</option>
                <option className="bg-[#111]" value="Gents">Gents</option>
                <option className="bg-[#111]" value="Ladies">Ladies</option>
              </select>
            </label>
 
            <label className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="block text-[10px] uppercase tracking-[0.28em] text-stone-400">
                Service
              </span>
              <select
                value={serviceFilter}
                onChange={(e) =>
                  setServiceFilter(e.target.value as Service | "All")
                }
                className="mt-3 w-full bg-transparent text-sm text-white outline-none"
              >
                <option className="bg-[#111]" value="All">All services</option>
                <option className="bg-[#111]" value="Laundry">Laundry</option>
                <option className="bg-[#111]" value="Dry Cleaning">Dry Cleaning</option>
              </select>
            </label>
 
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-2xl border border-amber-200/25 bg-amber-100/10 px-4 py-3 text-left text-sm text-amber-100 transition-colors duration-200 hover:bg-amber-100/15"
            >
              <span className="block text-[10px] uppercase tracking-[0.28em] text-amber-100/65">
                Reset controls
              </span>
              <span className="mt-3 block">Clear filters</span>
            </button>
          </div>
 
          {/* ── Mobile swipe hint (auto-hidden on sm+) ───────────────────────── */}
          <SwipeHint />
 
          {/* ── Fee + disclaimer notice ──────────────────────────────────────── */}
          <FeeNotice />
 
          {/* ── Table ────────────────────────────────────────────────────────── */}
          <div className="mt-6 overflow-hidden rounded-sm border border-white/10 bg-[#0d0b09]/90">
            {/* scroll shadow indicators — purely decorative on mobile */}
            <div
              ref={tableRef}
              className="overflow-x-auto"
              style={{ touchAction: "pan-x pan-y", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
            >
              <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                <thead className="bg-white/4 text-[10px] uppercase tracking-[0.28em] text-stone-400">
                  <tr>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">Audience</th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">Service</th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">Item</th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">Price</th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">No. of Pieces</th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-10 text-center text-sm text-stone-400"
                      >
                        No rows match the current filters.
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((row, index) => {
                      const pieces = piecesByRow[row.id] ?? 0;
                      const total  = row.price * pieces;
 
                      return (
                        <tr
                          key={row.id}
                          className={`transition-colors duration-150 hover:bg-amber-200/4 ${
                            index % 2 === 0 ? "bg-white/2" : "bg-transparent"
                          }`}
                        >
                          <td className="border-t border-white/6 px-4 py-4">
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-stone-200 whitespace-nowrap">
                              {row.audience}
                            </span>
                          </td>
                          <td className="border-t border-white/6 px-4 py-4 text-stone-200 whitespace-nowrap">
                            {row.service}
                          </td>
                          <td className="border-t border-white/6 px-4 py-4 text-white whitespace-nowrap">
                            {row.item}
                          </td>
                          <td className="border-t border-white/6 px-4 py-4 text-stone-200 whitespace-nowrap tabular-nums">
                            {currency.format(row.price)}
                          </td>
                          <td className="border-t border-white/6 px-4 py-4">
                            <input
                              type="number"
                              inputMode="numeric"
                              min="0"
                              title={`Number of pieces for ${row.item}`}
                              value={pieces === 0 ? "" : pieces}
                              placeholder="0"
                              onChange={(e) => updatePieces(row.id, e.target.value)}
                              className="w-20 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-amber-200/40 focus:bg-amber-200/5 transition-colors"
                            />
                          </td>
                          <td className="border-t border-white/6 px-4 py-4 text-amber-100 whitespace-nowrap tabular-nums font-medium">
                            {currency.format(total)}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
 
          {/* ── Footer note (repeats the disclaimer for clarity) ─────────────── */}
          <p className="mt-4 text-center text-[11px] text-stone-500/70 sm:text-left">
            All prices shown are base rates. A{" "}
            <span className="text-amber-200/60">5% service fee</span> will be
            added at checkout. Prices are subject to change without notice.
          </p>
 
        </div>
      </section>
    </main>
  );
}

