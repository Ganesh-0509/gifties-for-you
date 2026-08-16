import { useState } from "react";

// Purely decorative, ambient motion for the Home hero — the one Persuade-mode
// marketing surface on the site. Evokes the real rose/leaf photography behind
// the client's "Blush Rose Garden" reference palette, achieved in CSS/SVG
// (no licensed stock photo needed for the effect itself). Gated the same way
// as every other animation on this site: transform/opacity only, disabled
// entirely under prefers-reduced-motion (see .petal rule in index.css) since
// this carries zero information — losing the motion loses nothing.
const PETAL_COUNT = 7;

function seededPetals() {
  return Array.from({ length: PETAL_COUNT }, () => ({
    left: `${4 + Math.random() * 90}%`,
    size: 12 + Math.random() * 10,
    duration: 16 + Math.random() * 12,
    delay: -(Math.random() * 26),
    drift: Math.round((Math.random() - 0.5) * 70),
    rotateStart: Math.round(Math.random() * 360),
    tone: Math.random() > 0.5 ? "var(--color-primary-soft)" : "var(--color-secondary-soft)",
  }));
}

export function FloatingPetals() {
  const [petals] = useState(seededPetals);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal absolute top-[-8%]"
          style={
            {
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size * 1.3}px`,
              backgroundColor: p.tone,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--petal-drift": `${p.drift}px`,
              "--petal-rotate-start": `${p.rotateStart}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
