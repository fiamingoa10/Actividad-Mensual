import { cn } from "@/lib/utils";
import { formatPercent, progressTone } from "@/lib/year";

export function ProgressMeter({
  percent,
  className,
  size = "md",
}: {
  percent: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const clamped = Math.max(0, percent);
  const width = Math.min(100, clamped);
  const tone = progressTone(clamped);

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-full bg-secondary",
          size === "sm" && "h-1.5",
          size === "md" && "h-2.5",
          size === "lg" && "h-3.5",
        )}
        role="progressbar"
        aria-valuenow={Math.round(width)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            "h-full rounded-full transition-[width,background-color] duration-300 ease-out",
            tone === "low" && "bg-progress-low",
            tone === "mid" && "bg-progress-mid",
            tone === "high" && "bg-progress-high",
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export function ToneBadge({ percent }: { percent: number }) {
  const tone = progressTone(percent);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tabular-nums",
        tone === "low" && "bg-progress-low/12 text-progress-low",
        tone === "mid" && "bg-progress-mid/12 text-progress-mid",
        tone === "high" && "bg-progress-high/12 text-progress-high",
      )}
    >
      {formatPercent(percent)}
    </span>
  );
}
