import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionTransitionProps {
  className?: string;
  glow?: boolean;
}

export default function SectionTransition({ className = "", glow = false }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <div ref={ref} className={`relative h-px overflow-visible ${className}`} aria-hidden="true">
      {/* Base divider line — expands from center.
          Uses inset-x-0 so no translate needed; transformOrigin centers the scaleX. */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, transparent, rgba(160,98,42,0.4), transparent)",
          transformOrigin: "center",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      />

      {/* Shimmer sweep — slides across the line once on enter */}
      <motion.div
        className="absolute w-[30%] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(201,169,122,0.75) 50%, transparent 100%)",
          top: "-1px",
          height: "3px",
        }}
        initial={{ left: "-30%" }}
        animate={inView ? { left: "130%" } : {}}
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.55 }}
      />

      {/* Optional radial glow — wrapper handles centering so Framer only drives opacity/scaleX */}
      {glow && (
        <div
          className="absolute pointer-events-none"
          style={{ top: "-20px", left: "50%", transform: "translateX(-50%)", width: "256px", height: "40px" }}
        >
          <motion.div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(ellipse at center, rgba(160,98,42,0.12) 0%, transparent 70%)",
              transformOrigin: "center",
            }}
            initial={{ opacity: 0, scaleX: 0.4 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.3 }}
          />
        </div>
      )}
    </div>
  );
}
