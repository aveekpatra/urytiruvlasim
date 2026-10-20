"use client";

import { m, useReducedMotion } from "framer-motion";

/* Scroll reveal from the Bioscha site: fade + 26px rise + 10px blur,
   1100ms easeOutCubic, once per element. Siblings stagger by 110ms,
   capped at 3 so nothing feels queued. */
const EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];

interface RevealProps {
  children: React.ReactNode;
  /** Position among sibling reveals, used for the stagger. */
  index?: number;
  delay?: number;
  className?: string;
}

export function Reveal({
  children,
  index = 0,
  delay = 0,
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.08 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 1.1, delay: delay + Math.min(index, 3) * 0.11, ease: EASE }
      }
      className={className}
    >
      {children}
    </m.div>
  );
}
