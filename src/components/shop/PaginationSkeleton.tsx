import type { JSX } from "react";

import { Skeleton } from "@/components/ui/Skeleton";

export function PaginationSkeleton(): JSX.Element {
  return (
    <section className="mt-8 flex items-center justify-center gap-3">
      <Skeleton className="h-9 w-20" />
      <Skeleton className="h-5 w-28" />
      <Skeleton className="h-9 w-20" />
      <Skeleton className="h-9 w-16" />
    </section>
  );
}
