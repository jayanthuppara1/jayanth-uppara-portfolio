import { useRef, useState } from "react";

interface Props {
  className?: string;
}

export default function CoffeeMugLetter({ className = "" }: Props) {
  const [hovering, setHovering] = useState(false);

  return (
    <span
      className={`inline-block relative ${className}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      aria-label="J"
    >
      <svg
        viewBox="0 0 54 92"
        width="0.6em"
        height="1em"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "inline", verticalAlign: "baseline", overflow: "visible" }}
      >
        {/* ── Steam wisps (visible on hover, animated) ── */}
        <g style={{ opacity: hovering ? 1 : 0, transition: "opacity 0.4s ease" }}>
          <path
            d="M 14 24 C 12 16 17 11 15 4"
            stroke="#c9a97a"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="mug-steam-1"
          />
          <path
            d="M 22 22 C 20 14 25 9 23 2"
            stroke="#c9a97a"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="mug-steam-2"
          />
          <path
            d="M 30 24 C 28 16 33 11 31 4"
            stroke="#c9a97a"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="mug-steam-3"
          />
        </g>

        {/* ── Mug body (forms the J shape: tall with rounded bottom) ── */}
        <path
          d="M 6 26 L 42 26 L 42 68 Q 42 84 24 84 Q 6 84 6 68 Z"
          fill="rgba(160, 98, 42, 0.12)"
          stroke="#c9a97a"
          strokeWidth="2.8"
          strokeLinejoin="round"
          style={{
            filter: hovering ? "drop-shadow(0 0 6px rgba(201,169,122,0.35))" : "none",
            transition: "filter 0.3s ease",
          }}
        />

        {/* ── Mug handle (right side — classic loop) ── */}
        <path
          d="M 42 36 C 58 36 58 62 42 62"
          stroke="#c9a97a"
          strokeWidth="2.8"
          strokeLinecap="round"
          style={{
            filter: hovering ? "drop-shadow(0 0 6px rgba(201,169,122,0.35))" : "none",
            transition: "filter 0.3s ease",
          }}
        />

        {/* ── Inner rim line (open top of cup) ── */}
        <line
          x1="9"
          y1="33"
          x2="39"
          y2="33"
          stroke="#a0622a"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* ── Coffee liquid surface inside the cup ── */}
        <ellipse
          cx="24"
          cy="33"
          rx="15"
          ry="3"
          fill="rgba(59, 31, 18, 0.55)"
        />
      </svg>
    </span>
  );
}
