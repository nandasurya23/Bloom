import type { JSX } from "react";

import { Skeleton } from "@/components/ui/Skeleton";

type ProductGridSkeletonProps = {
  count?: number;
};

export function ProductGridSkeleton({ count = 6 }: ProductGridSkeletonProps): JSX.Element {
  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <article key={`skeleton-${index}`} className="rounded-2xl border border-bloom-rose/40 bg-white p-4">
          <Skeleton className="aspect-[4/3] w-full" />
          <Skeleton className="mt-4 h-5 w-2/3" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-4 h-4 w-1/3" />
          <div className="mt-4 flex gap-2">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-10" />
          </div>
        </article>
      ))}
    </section>
  );
}
