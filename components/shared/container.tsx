import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = ComponentPropsWithoutRef<"div">;

export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-4 md:px-6", className)} {...props} />;
}
