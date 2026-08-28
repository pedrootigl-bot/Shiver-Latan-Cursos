export function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function renderHighlightedText(
  text: string,
  highlights: readonly string[],
) {
  if (highlights.length === 0) {
    return text;
  }

  const pattern = new RegExp(
    `(${[...highlights]
      .sort((a, b) => b.length - a.length)
      .map(escapeRegExp)
      .join("|")})`,
    "g",
  );
  const highlightSet = new Set(highlights);

  return text.split(pattern).map((part, index) =>
    highlightSet.has(part) ? (
      <span key={`${part}-${index}`} className="font-semibold text-white">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
