import type { Metadata } from "next";
import type { JSX, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse curated flower collections with search, filter, and pagination.",
  keywords: ["flower shop", "buy flowers", "bouquet catalog", "IDR pricing"],
  openGraph: {
    title: "Shop | Bloom",
    description: "Browse curated flower collections with search, filter, and pagination.",
    type: "website"
  }
};

type ShopLayoutProps = {
  children: ReactNode;
};

export default function ShopLayout({ children }: ShopLayoutProps): JSX.Element {
  return <>{children}</>;
}
