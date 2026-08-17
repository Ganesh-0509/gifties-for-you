// Extends the wrangler-generated CloudflareEnv with Worker secrets that
// aren't declared in wrangler.jsonc (set via `wrangler secret put`, or
// `.dev.vars` locally). See DETAILS.md for the full secrets list.
declare interface CloudflareEnv {
  RAZORPAY_KEY_ID?: string;
  RAZORPAY_KEY_SECRET?: string;
  RAZORPAY_WEBHOOK_SECRET?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
}
