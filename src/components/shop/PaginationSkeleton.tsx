import type { JSX } from "react";

import { Skeleton } from "@/components/ui/Skeleton";

export function PaginationSkeleton(): JSX.Element {
  return (
    <section className="mt-8 flex flex-col items-center gap-4">
      {/* Mobile Skeleton */}
      <div className="flex w-full items-center justify-between gap-2 sm:hidden">
        <Skeleton className="h-11 flex-1 rounded-xl" />
        <Skeleton className="h-11 w-20 rounded-xl" />
        <Skeleton className="h-11 flex-1 rounded-xl" />
      </div>

      {/* Desktop Skeleton */}
      <div className="hidden sm:flex sm:flex-col sm:items-center sm:gap-4">
        {/* Page Numbers Skeleton */}
        <div className="flex items-center gap-2">
          {/* First Page */}
          <Skeleton className="h-10 w-10 rounded-xl" />
          
          {/* Previous Page */}
          <Skeleton className="h-10 w-10 rounded-xl" />
          
          {/* Page Numbers */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-10 w-10 rounded-xl" />
          </div>
          
          {/* Next Page */}
          <Skeleton className="h-10 w-10 rounded-xl" />
          
          {/* Last Page */}
          <Skeleton className="h-10 w-10 rounded-xl" />
        </div>

        {/* Page Info Skeleton */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-8" />
        </div>
      </div>
    </section>
  );
}