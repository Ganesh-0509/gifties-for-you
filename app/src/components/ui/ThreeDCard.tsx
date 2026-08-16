import { useState, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";

interface ThreeDCardProps {
  children: ReactNode;
  className?: string;
  accentColor?: string;
  maxTilt?: number;
}

export function ThreeDCard({
  children,
  className = "",
  accentColor = "rgba(138, 70, 80, 0.15)",
  maxTilt = 8, // Refined 8-degree tilt per client preference ("lighter is enough")
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const dx = x - centerX;
    const dy = y - centerY;

    const rotateX = (-dy / centerY) * maxTilt;
    const rotateY = (dx / centerX) * maxTilt;

    setRotX(rotateX);
    setRotY(rotateY);
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setHovered(true);

  const handleMouseLeave = () => {
    setHovered(false);
    setRotX(0);
    setRotY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotX,
        rotateY: rotY,
        scale: hovered ? 1.015 : 1,
      }}
      transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.8 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`relative overflow-hidden rounded-lg transition-shadow duration-300 ${
        hovered ? "shadow-raised border-border-strong" : "shadow-card"
      } ${className}`}
    >
      {/* Subtle Cursor Spotlight Radial Layer */}
      {hovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, ${accentColor}, transparent 80%)`,
          }}
        />
      )}

      {/* Tactile Z-Axis Spatial Elevation */}
      <div
        style={{ transform: hovered ? "translateZ(12px)" : "translateZ(0px)" }}
        className="transition-transform duration-300 relative z-20 h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
