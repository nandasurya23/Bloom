import type { Metadata } from "next";
import type { JSX, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Order Success",
  description: "Your flower order has been placed successfully.",
  keywords: ["order success", "receipt", "flower order confirmation"],
  openGraph: {
    title: "Order Success | Bloom",
    description: "Your flower order has been placed successfully.",
    type: "website"
  }
};

type SuccessLayoutProps = {
  children: ReactNode;
};

export default function SuccessLayout({ children }: SuccessLayoutProps): JSX.Element {
  return <>{children}</>;
}
