"use client";

import { useSyncExternalStore } from "react";

/* Flips once, when the loading screen starts to leave. Reveals wait for it
   so nothing plays out behind the cover. */
let ready = false;
const listeners = new Set<() => void>();

export function markSiteReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useSiteReady() {
  return useSyncExternalStore(
    subscribe,
    () => ready,
    () => false
  );
}
