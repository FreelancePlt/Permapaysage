"use client";

import dynamic from "next/dynamic";

export const InterventionMapLazy = dynamic(
  () =>
    import("./intervention-map").then((mod) => ({
      default: mod.InterventionMap,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="bg-muted h-72 w-full animate-pulse rounded-md" />
    ),
  },
);
