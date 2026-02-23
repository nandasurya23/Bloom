import type { Metadata } from "next";
import type { JSX, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Enter shipping details and confirm your order summary.",
  keywords: ["checkout", "flower order", "shipping details"],
  openGraph: {
    title: "Checkout | Bloom",
    description: "Enter shipping details and confirm your order summary.",
    type: "website"
  }
};

type CheckoutLayoutProps = {
  children: ReactNode;
};

export default function CheckoutLayout({ children }: CheckoutLayoutProps): JSX.Element {
  return <>{children}</>;
}
