"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.5;

export default function EventImageStage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ mouseX: number; mouseY: number; posX: number; posY: number } | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  function close() {
    setIsFullscreen(false);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }

  // Keyboard: +/=  zoom in, - zoom out, 0 reset, Esc close
  useEffect(() => {
    if (!isFullscreen) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsFullscreen(false);
        setZoom(1);
        setPosition({ x: 0, y: 0 });
      } else if (e.key === "+" || e.key === "=") {
        setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
      } else if (e.key === "-") {
        setZoom((z) => {
          const next = Math.max(MIN_ZOOM, z - ZOOM_STEP);
          if (next === MIN_ZOOM) setPosition({ x: 0, y: 0 });
          return next;
        });
      } else if (e.key === "0") {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
      }
    }

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  // Scroll-wheel zoom (non-passive so preventDefault works)
  useEffect(() => {
    const el = viewerRef.current;
    if (!el || !isFullscreen) return;

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
      setZoom((z) => {
        const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z + delta));
        if (next === MIN_ZOOM) setPosition({ x: 0, y: 0 });
        return next;
      });
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isFullscreen]);

  function onMouseDown(e: React.MouseEvent) {
    if (zoom <= 1) return;
    if ((e.target as HTMLElement).closest("button")) return;
    setIsDragging(true);
    dragStart.current = { mouseX: e.clientX, mouseY: e.clientY, posX: position.x, posY: position.y };
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging || !dragStart.current) return;
    setPosition({
      x: dragStart.current.posX + (e.clientX - dragStart.current.mouseX),
      y: dragStart.current.posY + (e.clientY - dragStart.current.mouseY),
    });
  }

  function stopDrag() {
    setIsDragging(false);
    dragStart.current = null;
  }

  return (
    <>
      {/* Full-bleed hero — fills the 100vh parent section */}
      <button
        type="button"
        onClick={() => setIsFullscreen(true)}
        className="group absolute inset-0 block w-full"
        aria-label="Open event image full screen"
      >
        <Image
          src="/event-img-1.jpeg"
          alt="The Residence event setup"
          fill
          priority
          sizes="100vw"
          className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* Gradient: keeps nav readable at top, draws attention to bottom CTA */}
        <div className="absolute inset-0 bg-linear-to-b from-black/55 via-transparent to-black/75" />

        {/* Bottom overlay — title + expand pill */}
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 px-6 pb-8 md:px-10 md:pb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.38em] text-amber-200/80">
              Events and Gatherings
            </p>
            <h1 className="mt-3 text-4xl font-light tracking-tight text-white md:text-6xl">
              The Residence
            </h1>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-5 py-3 text-[10px] uppercase tracking-[0.26em] text-white/80 backdrop-blur-md transition-colors duration-200 group-hover:border-amber-300/50 group-hover:text-amber-100">
            View full screen
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3.75H3.75v4.5m16.5-4.5h-4.5m4.5 16.5h-4.5m4.5-4.5v4.5m-16.5 0h4.5m-4.5-4.5v4.5" />
            </svg>
          </span>
        </div>
      </button>

      {isFullscreen ? (
        <div
          ref={viewerRef}
          className={`fixed inset-0 z-50 overflow-hidden bg-black ${zoom > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"}`}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {/* Controls: top-right */}
          <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
            {/* Live zoom percentage */}
            <span className="rounded-full border border-white/10 bg-black/65 px-3 py-2 text-[11px] tabular-nums text-white/55 backdrop-blur-sm select-none">
              {Math.round(zoom * 100)}%
            </span>

            {/* Zoom out */}
            <button
              type="button"
              onClick={() =>
                setZoom((z) => {
                  const next = Math.max(MIN_ZOOM, z - ZOOM_STEP);
                  if (next === MIN_ZOOM) setPosition({ x: 0, y: 0 });
                  return next;
                })
              }
              disabled={zoom <= MIN_ZOOM}
              aria-label="Zoom out"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/65 text-white backdrop-blur-sm transition-colors hover:border-amber-300/35 hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-25"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            </button>

            {/* Zoom in */}
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP))}
              disabled={zoom >= MAX_ZOOM}
              aria-label="Zoom in"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/65 text-white backdrop-blur-sm transition-colors hover:border-amber-300/35 hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-25"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>

            {/* Reset */}
            <button
              type="button"
              onClick={() => { setZoom(1); setPosition({ x: 0, y: 0 }); }}
              aria-label="Reset zoom"
              className="h-10 rounded-full border border-white/10 bg-black/65 px-4 text-[10px] uppercase tracking-widest text-white/55 backdrop-blur-sm transition-colors hover:border-amber-300/35 hover:text-amber-100"
            >
              Reset
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close viewer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/65 text-white/70 backdrop-blur-sm transition-colors hover:border-white/25 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Hint bar — bottom centre */}
          <div className="absolute bottom-5 hidden lg:block left-1/2 z-20 -translate-x-1/2 select-none">
            <p className="rounded-full border border-white/8 bg-black/55 px-5 py-2.5 text-center text-[10px] uppercase tracking-[0.25em] text-white/30 backdrop-blur-sm">
              Scroll to zoom · Drag to pan · + / − keys · Esc to close
            </p>
          </div>

          {/* Image — transformed for zoom + pan. Runtime values require inline style here. */}
          <div className="flex h-full w-full items-center justify-center">
            <div
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transition: isDragging ? "none" : "transform 0.18s ease",
              }}
            >
              <Image
                src="/event-img-1.jpeg"
                alt="The Residence event setup"
                width={1800}
                height={2200}
                priority
                draggable={false}
                className="max-h-screen w-auto max-w-[100vw] select-none"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}