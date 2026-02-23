import type { JSX } from "react";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = "" }: SkeletonProps): JSX.Element {
  return <div className={`animate-pulse rounded-lg bg-bloom-rose/30 ${className}`.trim()} />;
}
