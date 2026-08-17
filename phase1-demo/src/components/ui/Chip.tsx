export function Chip({
  active = false,
  onClick,
  children,
  className = "",
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
        active
          ? "border-primary bg-primary text-ink-on-primary"
          : "border-border-strong bg-surface text-ink-muted hover:border-primary hover:text-ink"
      } ${className}`}
    >
      {children}
    </button>
  );
}
