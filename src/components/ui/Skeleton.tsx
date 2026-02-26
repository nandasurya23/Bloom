import type { JSX } from "react";

type SkeletonProps = {
  className?: string;
  variant?: "default" | "circle" | "text" | "rect";
};

export function Skeleton({ 
  className = "", 
  variant = "default" 
}: SkeletonProps): JSX.Element {
  
  const getVariantClasses = (): string => {
    switch (variant) {
      case "circle":
        return "rounded-full";
      case "text":
        return "rounded-md h-4";
      case "rect":
        return "rounded-xl";
      default:
        return "rounded-lg";
    }
  };

  return (
    <div
      className={`
        animate-pulse
        bg-gradient-to-r
        from-bloom-rose/10
        via-bloom-rose/20
        to-bloom-rose/10
        ${getVariantClasses()}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    />
  );
}