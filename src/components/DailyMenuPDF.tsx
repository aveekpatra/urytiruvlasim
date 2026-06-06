"use client";

import { useCallback, useEffect, useState } from "react";

interface MenuItem {
  name: string;
  description: string;
  allergens?: string;
  price: number;
  isVegetarian?: boolean;
}

export interface DailyMenuData {
  date: string;
  soup: string;
  soupDescription?: string;
  soupAllergens?: string;
  soupPrice: number;
  items: MenuItem[];
  dessert?: string;
  dessertDescription?: string;
  dessertAllergens?: string;
  dessertPrice?: number;
  drinks?: MenuItem[];
}

export function DailyMenuPreview({
  menu,
  onClose,
}: {
  menu: DailyMenuData;
  onClose: () => void;
}) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Generate the real PDF whenever the menu changes. The blob is used for both
  // the iframe preview and the download — so what you see is exactly what you
  // get.
  useEffect(() => {
    let cancelled = false;
    let createdUrl: string | null = null;

    (async () => {
      setLoading(true);
      setError("");
      try {
        const { pdf } = await import("@react-pdf/renderer");
        const { DailyMenuPDFDocument } = await import("./DailyMenuPDFDocument");
        const blob = await pdf(<DailyMenuPDFDocument menu={menu} />).toBlob();
        if (cancelled) return;

        const url = URL.createObjectURL(blob);
        createdUrl = url;
        setPdfBlob(blob);
        setPdfUrl(url);

        // Parse the page count from the PDF binary. PDF files reliably
        // include a "/Type /Page" object per page (note: NOT "/Type /Pages"
        // which is the catalog). A regex over the raw bytes is more reliable
        // here than pulling in pdfjs-dist just for one number.
        try {
          const text = await blob.text();
          const matches = text.match(/\/Type\s*\/Page(?!s)/g);
          if (!cancelled) setPageCount(matches ? matches.length : null);
        } catch {
          if (!cancelled) setPageCount(null);
        }
      } catch (e) {
        console.error("PDF preview failed:", e);
        if (!cancelled) setError("Nepodařilo se vygenerovat náhled PDF.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      if (createdUrl) URL.revokeObjectURL(createdUrl);
    };
  }, [menu]);

  const handleDownload = useCallback(() => {
    if (!pdfBlob) return;
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `denni-menu-${menu.date}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [pdfBlob, menu.date]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-[var(--color-charcoal)] w-full max-w-3xl flex flex-col h-[98vh] shadow-2xl">
        {/* Toolbar */}
        <div className="shrink-0 bg-[var(--color-charcoal)] text-white px-5 sm:px-6 py-3 flex items-center justify-between gap-4 border-b border-white/10">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-[11px] tracking-[0.25em] uppercase text-white/90 truncate">
              Náhled denního menu
            </span>
            {pageCount !== null && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-white/50 border-l border-white/15 pl-3">
                <span>A4</span>
                <span className="text-white/30">·</span>
                <span className="tabular-nums">
                  {pageCount} {pageCount === 1 ? "strana" : pageCount < 5 ? "strany" : "stran"}
                </span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={handleDownload}
              disabled={!pdfBlob || loading}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase text-[var(--color-charcoal)] bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Stáhnout PDF
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 inline-flex items-center justify-center text-white/60 hover:text-white text-xl leading-none transition-colors"
              aria-label="Zavřít"
            >
              &times;
            </button>
          </div>
        </div>

        {error && (
          <div className="shrink-0 bg-red-600 text-white text-xs text-center py-2">
            {error}
          </div>
        )}

        {/* Content — actual PDF rendered by the browser */}
        <div className="flex-1 min-h-0 bg-neutral-800 relative">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 bg-neutral-800/95">
              <div className="w-7 h-7 border-2 border-white/20 border-t-[var(--color-gold)] rounded-full animate-spin" />
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/60">
                Generování náhledu
              </p>
            </div>
          )}
          {pdfUrl && (
            <iframe
              key={pdfUrl}
              src={`${pdfUrl}#view=FitV&toolbar=1&navpanes=0`}
              title="Náhled denního menu"
              className="w-full h-full border-0 block"
            />
          )}
        </div>
      </div>
    </div>
  );
}
