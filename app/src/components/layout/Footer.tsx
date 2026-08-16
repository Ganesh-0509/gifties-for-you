import { Link } from "react-router-dom";
import { AtSign, MapPin, Clock, Phone } from "lucide-react";
import { business } from "../../config/business";
import { CATEGORIES } from "../../data/products";

export function Footer() {
  return (
    <footer className="border-t border-border bg-canvas-deep">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/logo.png" alt="Gifties For You" className="h-11 w-auto" />
          <p className="mt-3 max-w-xs text-sm text-ink-muted">{business.shortDescription}</p>
          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-primary"
          >
            <AtSign aria-hidden="true" className="h-4 w-4" />
            @gifties_for_you
          </a>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Shop by category</p>
          <ul className="mt-3 space-y-2">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/shop?category=${c.id}`}
                  className="text-sm text-ink-muted hover:text-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Explore</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/shop" className="text-sm text-ink-muted hover:text-primary">
                Full catalogue
              </Link>
            </li>
            <li>
              <Link to="/bulk-orders" className="text-sm text-ink-muted hover:text-primary">
                Bulk &amp; event orders
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-sm text-ink-muted hover:text-primary">
                About Gifties For You
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm text-ink-muted hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-sm text-ink-muted hover:text-primary">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Get in touch</p>
          <ul className="mt-3 space-y-2.5 text-sm text-ink-muted">
            <li className="flex items-start gap-2">
              <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              {business.phoneDisplay}
            </li>
            <li className="flex items-start gap-2">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              {business.location}
            </li>
            <li className="flex items-start gap-2">
              <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              {business.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <p>Site by Fresh Frame</p>
        </div>
      </div>
    </footer>
  );
}
