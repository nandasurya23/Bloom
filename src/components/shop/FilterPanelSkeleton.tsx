import type { JSX } from "react";

import { Skeleton } from "@/components/ui/Skeleton";

export function FilterPanelSkeleton(): JSX.Element {
  return (
    <section className="grid gap-3 rounded-xl border border-bloom-rose/50 bg-white/90 p-4 md:grid-cols-3">
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    </section>
  );
}
