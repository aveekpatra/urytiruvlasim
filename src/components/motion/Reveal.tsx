"use client";

import { useRef } from "react";
import { m, useReducedMotion } from "framer-motion";

/* Scroll reveal from the Bioscha site: fade + 26px rise + 10px blur,
   1100ms easeOutCubic, once per element. Like Bioscha's script.js, each
   element waits 110ms per earlier sibling reveal, capped at 3 so nothing
   feels queued. */
const EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];

function siblingIndex(el: Element | null) {
  let i = 0;
  let sib = el?.previousElementSibling;
  while (sib && i < 3) {
    if (sib.hasAttribute("data-reveal")) i++;
    sib = sib.previousElementSibling;
  }
  return i;
}

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      ref={ref}
      data-reveal=""
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.08 }}
      variants={{
        hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
        // Resolved when the element enters view, so the siblings are in the DOM.
        visible: () => ({
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: reduceMotion
            ? { duration: 0 }
            : {
                duration: 1.1,
                ease: EASE,
                delay: delay + siblingIndex(ref.current) * 0.11,
              },
        }),
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}
