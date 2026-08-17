import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
      <p className="font-display text-5xl text-primary">404</p>
      <h1 className="text-2xl text-ink">We couldn't find that page</h1>
      <p className="max-w-sm text-ink-muted">
        The page you're looking for may have moved. Try heading back to the catalogue.
      </p>
      <Link
        to="/shop"
        className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-ink-on-primary hover:bg-primary-dark"
      >
        Go to catalogue
      </Link>
    </div>
  );
}
