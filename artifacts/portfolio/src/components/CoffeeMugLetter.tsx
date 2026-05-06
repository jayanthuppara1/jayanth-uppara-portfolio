import { useState } from "react";

interface Props {
  className?: string;
}

export default function CoffeeMugLetter({ className = "" }: Props) {
  const [hovering, setHovering] = useState(false);

  /* Hover transitions: latte → espresso fill, latte → foam stroke */
  const bodyFill   = hovering ? "rgba(59, 31, 18, 0.55)" : "rgba(160, 98, 42, 0.12)";
  const strokeColor = hovering ? "#fdf6ee" : "#c9a97a";
  const dropShadow  = hovering
    ? "drop-shadow(0 0 8px rgba(201,169,122,0.5))"
    : "none";

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
        {/* ── Steam wisps (fade in on hover, run CSS animation) ── */}
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

        {/* ── Mug body — fill deepens to espresso, stroke lightens to foam on hover ── */}
        <path
          d="M 6 26 L 42 26 L 42 68 Q 42 84 24 84 Q 6 84 6 68 Z"
          fill={bodyFill}
          stroke={strokeColor}
          strokeWidth="2.8"
          strokeLinejoin="round"
          style={{
            filter: dropShadow,
            transition: "fill 0.35s ease, stroke 0.35s ease, filter 0.35s ease",
          }}
        />

        {/* ── Handle — stroke matches body stroke ── */}
        <path
          d="M 42 36 C 58 36 58 62 42 62"
          stroke={strokeColor}
          strokeWidth="2.8"
          strokeLinecap="round"
          style={{
            filter: dropShadow,
            transition: "stroke 0.35s ease, filter 0.35s ease",
          }}
        />

        {/* ── Inner rim line ── */}
        <line
          x1="9"
          y1="33"
          x2="39"
          y2="33"
          stroke={hovering ? "#c9a97a" : "#a0622a"}
          strokeWidth="1"
          strokeLinecap="round"
          style={{ transition: "stroke 0.35s ease", opacity: 0.6 }}
        />

        {/* ── Coffee liquid surface ── */}
        <ellipse
          cx="24"
          cy="33"
          rx="15"
          ry="3"
          fill={hovering ? "rgba(59, 31, 18, 0.85)" : "rgba(59, 31, 18, 0.55)"}
          style={{ transition: "fill 0.35s ease" }}
        />
      </svg>
    </span>
  );
}
