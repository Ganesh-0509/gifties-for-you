import Link from "next/link";
import { telLinkTo, waLinkTo, type PublicSite } from "@/lib/site";

export function Footer({ site }: { site: PublicSite }) {
  return (
    <footer className="border-t border-border bg-canvas-deep">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {site.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={site.logo} alt={site.name} className="h-11 w-auto" />
          ) : (
            <p className="font-display text-lg font-semibold text-ink">{site.name}</p>
          )}
          <p className="mt-3 max-w-xs text-sm text-ink-muted">{site.shortDescription}</p>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
          >
            @gifties_for_you
          </a>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ink-faint">Shop</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li><Link href="/shop" className="hover:text-primary">All products</Link></li>
            <li><Link href="/bulk-orders" className="hover:text-primary">Bulk & event orders</Link></li>
            <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ink-faint">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>
              <a href={waLinkTo(site.whatsapp, `Hi ${site.name}!`)} className="hover:text-primary">
                WhatsApp: {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={telLinkTo(site.whatsapp)} className="hover:text-primary">Call us</a>
            </li>
            <li>{site.addressLine}</li>
            <li>{site.hours}</li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ink-faint">Policies</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li><Link href="/legal/terms" className="hover:text-primary">Terms & Conditions</Link></li>
            <li><Link href="/legal/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link href="/legal/refund-policy" className="hover:text-primary">Refund & Cancellation</Link></li>
            <li><Link href="/legal/shipping-policy" className="hover:text-primary">Shipping Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 py-4 text-center text-xs text-ink-faint">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
