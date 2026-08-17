/**
 * Real customer testimonials only — never fabricated (hard rule through
 * every stage of this project). Empty until the client supplies real ones
 * (a WhatsApp screenshot, a Google review, anything genuine works).
 *
 * `Testimonials.tsx` renders nothing while this is empty. Add entries here
 * once real ones exist and the section appears automatically — no other
 * code changes needed.
 */
export interface Testimonial {
  quote: string;
  name: string;
  /** e.g. "Wedding return gifts, Chennai" — context, not required */
  context?: string;
}

export const TESTIMONIALS: Testimonial[] = [];
