import type { Metadata } from "next";
import type { JSX, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Save your favorite flower collections.",
  keywords: ["wishlist", "favorite flowers", "saved items"],
  openGraph: {
    title: "Wishlist | Bloom",
    description: "Save your favorite flower collections.",
    type: "website"
  }
};

type WishlistLayoutProps = {
  children: ReactNode;
};

export default function WishlistLayout({ children }: WishlistLayoutProps): JSX.Element {
  return <>{children}</>;
}
