"use client";

import { useState } from "react";

export default function CollapsibleGroup({
  label,
  items,
  initialVisible = 9,
}: {
  label: string;
  items: string[];
  initialVisible?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, initialVisible);
  const hiddenCount = items.length - initialVisible;

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-wider text-ink-400">
        {label} <span className="text-ink-500">({items.length})</span>
      </p>
      <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((name) => (
          <li key={name} className="text-sm text-ink-200">
            {name}
          </li>
        ))}
      </ul>
      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 text-sm font-semibold text-signal-300 hover:text-signal-200"
        >
          {expanded ? "Show fewer" : `Show ${hiddenCount} more`}
        </button>
      )}
    </div>
  );
}
