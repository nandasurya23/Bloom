import type { JSX } from "react";

import { Skeleton } from "@/components/ui/Skeleton";

type ProductGridSkeletonProps = {
  count?: number;
  variant?: "default" | "compact" | "detailed";
};

export function ProductGridSkeleton({ 
  count = 6,
  variant = "default" 
}: ProductGridSkeletonProps): JSX.Element {
  const getSkeletonContent = () => {
    switch (variant) {
      case "compact":
        return (
          <>
            {/* Image */}
            <Skeleton className="aspect-square w-full rounded-xl" />
            
            {/* Content */}
            <div className="p-3">
              <Skeleton className="h-5 w-3/4" />
              <div className="mt-2 flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </>
        );

      case "detailed":
        return (
          <>
            {/* Image with Badge */}
            <div className="relative">
              <Skeleton className="aspect-[4/3] w-full rounded-t-2xl" />
              <Skeleton className="absolute left-3 top-3 h-6 w-16 rounded-full" />
            </div>
            
            {/* Content */}
            <div className="p-5">
              {/* Title and Rating */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Skeleton className="h-6 w-4/5" />
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-4" />
                      ))}
                    </div>
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>

              {/* Description */}
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-1.5 h-4 w-2/3" />

              {/* Price and Stock */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="mt-1 h-3 w-16" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              {/* Actions */}
              <div className="mt-5 flex gap-2">
                <Skeleton className="h-10 flex-1 rounded-xl" />
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-10 w-10 rounded-xl" />
              </div>
            </div>
          </>
        );

      default: // default variant
        return (
          <>
            {/* Image with Hover Effect Placeholder */}
            <div className="relative overflow-hidden rounded-t-2xl">
              <Skeleton className="aspect-square w-full" />
              {/* Quick action overlay skeleton */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform group-hover:translate-y-0">
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Category and Favorite */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>

              {/* Title */}
              <Skeleton className="mt-2 h-5 w-4/5" />

              {/* Rating */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-3.5 w-3.5" />
                  ))}
                </div>
                <Skeleton className="h-4 w-10" />
              </div>

              {/* Price and Stock Status */}
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="mt-1 h-3 w-16" />
                </div>
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <Skeleton className="h-9 flex-1 rounded-xl" />
                <Skeleton className="h-9 w-9 rounded-xl" />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <section className="mt-6">
      {/* Header with filters info skeleton */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-24 rounded-xl" />
          <Skeleton className="h-8 w-24 rounded-xl" />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: count }).map((_, index) => (
          <article
            key={`skeleton-${variant}-${index}`}
            className="group relative overflow-hidden rounded-2xl border border-bloom-rose/20 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            {getSkeletonContent()}
          </article>
        ))}
      </div>

      {/* Load more indicator for infinite scroll */}
      {count > 8 && (
        <div className="mt-8 flex justify-center">
          <Skeleton className="h-10 w-40 rounded-xl" />
        </div>
      )}
    </section>
  );
}