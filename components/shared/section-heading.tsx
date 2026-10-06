import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, action, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl space-y-3">
        {eyebrow ? (
          <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">{eyebrow}</p>
        ) : null}
        <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-4xl">{title}</h2>
        {description ? <p className="text-muted-foreground text-base md:text-lg">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
