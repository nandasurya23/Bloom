import type { Metadata } from "next";
import type { JSX, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your selected flower items before checkout.",
  keywords: ["cart", "flower basket", "checkout"],
  openGraph: {
    title: "Cart | Bloom",
    description: "Review your selected flower items before checkout.",
    type: "website"
  }
};

type CartLayoutProps = {
  children: ReactNode;
};

export default function CartLayout({ children }: CartLayoutProps): JSX.Element {
  return <>{children}</>;
}
