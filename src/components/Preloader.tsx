"use client";

import { useEffect, useState } from "react";
import { cdn } from "@/lib/images";
import { cn } from "@/lib/utils";
import { markSiteReady } from "@/components/motion";

/* First-visit loading screen, after abu-tailwind.vercel.app: a ring spins
   around the castle while the page and every image and video on screen
   load. Then the logo fades out and the cover slides down. Capped so a slow
   connection never holds the page; globals.css hides it if scripts fail. */
const MAX_WAIT = 6000;
const FADE_MS = 250;

function inView(el: Element) {
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.bottom > 0 && r.top < window.innerHeight;
}

function settle(target: EventTarget, events: string[]) {
  return new Promise<void>((resolve) =>
    events.forEach((name) =>
      target.addEventListener(name, () => resolve(), { once: true })
    )
  );
}

function mediaOnScreen() {
  const images = Array.from(document.images).filter(
    (img) => !img.complete && inView(img)
  );
  const videos = Array.from(document.querySelectorAll("video")).filter(
    (video) => video.readyState < 2 && inView(video)
  );
  return Promise.all([
    ...images.map((img) => settle(img, ["load", "error"])),
    ...videos.map((video) => settle(video, ["loadeddata", "error"])),
  ]);
}

export function Preloader() {
  const [stage, setStage] = useState<"loading" | "leaving" | "gone">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;
    const pageLoaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : settle(window, ["load"]);
    const timeout = new Promise<void>((resolve) =>
      setTimeout(resolve, MAX_WAIT)
    );

    Promise.race([pageLoaded.then(mediaOnScreen), timeout]).then(() => {
      if (cancelled) return;
      setStage("leaving");
      setTimeout(markSiteReady, FADE_MS);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (stage === "gone") return null;

  return (
    <div
      aria-hidden
      className={cn(
        "site-preloader fixed inset-0 z-[100] grid place-content-center justify-items-center bg-[var(--color-charcoal)] transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]",
        stage === "leaving" && "translate-y-full delay-[250ms]"
      )}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && stage === "leaving") {
          setStage("gone");
        }
      }}
    >
      <div
        className={cn(
          "flex flex-col items-center transition-opacity duration-[250ms]",
          stage === "leaving" && "opacity-0"
        )}
      >
        <div className="relative grid place-items-center w-28 h-28 mb-11">
          <div className="absolute inset-0 rounded-full border-[3px] border-white/90 border-t-[var(--color-gold)] animate-spin" />
          <img src={cdn("/Logo.svg")} alt="" className="h-14 w-auto" />
        </div>
        <p className="preloader-text font-serif uppercase text-center text-[calc(1.25rem+2vw)] leading-none tracking-[0.2em] pl-[0.2em]">
          U Blanických rytířů
        </p>
      </div>
    </div>
  );
}
