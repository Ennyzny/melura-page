"use client";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return <motion.div initial={false} whileInView={reduced ? {} : { y: [32, 0], opacity: [0.7, 1] }}
    viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
