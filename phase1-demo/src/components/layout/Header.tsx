import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { business } from "../../config/business";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { buildWhatsAppLink } from "../../lib/whatsapp";
import { asset } from "../../lib/asset";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop" },
  { to: "/bulk-orders", label: "Bulk Orders" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const enquiryLink = buildWhatsAppLink(`Hi ${business.name}! I have a question about your gifts.`);

  // Scroll observer with Hysteresis (60px down / 20px up) for smooth threshold detection
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > 60) {
        setScrolled(true);
      } else if (y < 20) {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full pointer-events-none flex justify-center py-0 sm:py-2">
      <motion.div
        animate={{
          maxWidth: scrolled ? "1024px" : "100%",
          borderRadius: scrolled ? "9999px" : "0px",
          y: scrolled ? 6 : 0,
          paddingTop: scrolled ? 8 : 12,
          paddingBottom: scrolled ? 8 : 12,
          paddingLeft: scrolled ? 24 : 40,
          paddingRight: scrolled ? 24 : 40,
          backgroundColor: scrolled ? "rgba(255, 248, 240, 0.85)" : "rgba(251, 234, 214, 0.75)",
          borderColor: scrolled ? "rgba(138, 70, 80, 0.30)" : "rgba(138, 70, 80, 0.12)",
          borderWidth: "1px",
          borderStyle: "solid",
          boxShadow: scrolled
            ? "0 20px 25px -5px rgba(61, 35, 42, 0.1), 0 8px 10px -6px rgba(61, 35, 42, 0.1)"
            : "none",
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 24,
          mass: 0.8,
        }}
        className="pointer-events-auto mx-auto backdrop-blur-xl flex flex-col justify-center overflow-hidden w-full"
      >
        <div className="w-full flex items-center justify-between">
          {/* Logo with Spring Motion Scale */}
          <NavLink to="/" aria-label="Gifties For You — home" className="flex items-center shrink-0">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              src={asset("/logo.png")}
              alt="Gifties For You"
              className={`w-auto transition-all duration-300 ${scrolled ? "h-8 sm:h-9" : "h-10 sm:h-12"}`}
            />
          </NavLink>

          {/* Desktop Navigation Container with Spring Active/Hover Pill */}
          <nav
            className="hidden items-center gap-1 sm:gap-2 lg:flex relative"
            aria-label="Primary"
            onMouseLeave={() => setHoveredTab(null)}
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onMouseEnter={() => setHoveredTab(link.to)}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-primary font-bold" : "text-ink-muted hover:text-ink"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active Page Floating Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.8 }}
                        className="absolute inset-0 rounded-full bg-secondary-soft/90 border border-secondary-soft z-0 shadow-sm"
                      />
                    )}

                    {/* Hover Spotlight Pill */}
                    {hoveredTab === link.to && !isActive && (
                      <motion.div
                        layoutId="hoverNavPill"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute inset-0 rounded-full bg-canvas-deep/40 z-0"
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-1.5">
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-1.5 w-1.5 rounded-full bg-primary"
                        />
                      )}
                      {link.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Action CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <WhatsAppButton href={enquiryLink} size={scrolled ? "md" : "lg"} />
          </div>

          {/* Mobile Menu Trigger Button */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden hover:bg-canvas-deep/50 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-nav"
              aria-label="Primary"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-border mt-3 pt-3 lg:hidden"
            >
              <div className="flex flex-col gap-1.5 pb-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.end}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-lg px-3.5 py-2.5 text-base font-medium transition-colors ${
                          isActive
                            ? "bg-primary-soft text-primary font-bold shadow-sm"
                            : "text-ink-muted hover:bg-canvas-deep/40 hover:text-ink"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span>{link.label}</span>
                          {isActive && <Sparkles className="h-4 w-4 text-primary" />}
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
                <div className="pt-2">
                  <WhatsAppButton href={enquiryLink} className="w-full" />
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
