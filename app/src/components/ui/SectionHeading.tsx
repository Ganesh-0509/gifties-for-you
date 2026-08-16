export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-secondary uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl text-ink sm:text-3xl">{title}</h2>
      {description && (
        <p
          className={`mt-2 max-w-2xl text-ink-muted ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
