import type { Metadata } from "next";
import type { JSX, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Payment",
  description: "Complete your payment using simulation mode.",
  keywords: ["payment simulation", "order payment", "secure checkout"],
  openGraph: {
    title: "Payment | Bloom",
    description: "Complete your payment using simulation mode.",
    type: "website"
  }
};

type PaymentLayoutProps = {
  children: ReactNode;
};

export default function PaymentLayout({ children }: PaymentLayoutProps): JSX.Element {
  return <>{children}</>;
}
