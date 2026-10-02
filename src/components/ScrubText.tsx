type Part = { text: string; dim?: boolean };

// Paragraph whose words light up one by one as it scrolls through the viewport.
// Words render fully visible without JavaScript or with reduced motion.
export default function ScrubText({
  parts,
  className = "",
}: {
  parts: Part[];
  className?: string;
}) {
  const words = parts.flatMap((part) =>
    part.text.split(" ").map((word) => ({ word, dim: part.dim })),
  );
  return (
    <p data-scrub className={className}>
      {words.map((item, i) => (
        <span key={i}>
          <span className="w" {...(item.dim ? { "data-dim": "" } : {})}>
            {item.word}
          </span>{" "}
        </span>
      ))}
    </p>
  );
}
