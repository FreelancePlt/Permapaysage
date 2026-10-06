import { cn } from "@/lib/utils";

type SectionEdgeProps = {
  position?: "top" | "bottom";
  className?: string;
};

export function SectionEdge({ position = "bottom", className }: SectionEdgeProps) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      fill="currentColor"
      className={cn(
        "pointer-events-none absolute inset-x-0 block h-6 w-full md:h-12",
        position === "bottom" ? "-bottom-px" : "-top-px rotate-180",
        className,
      )}
    >
      <path d="M0 64V40c120-14 250-26 410-20s300 30 470 26 300-30 420-34c60-2 110 2 140 6V64Z" />
    </svg>
  );
}
