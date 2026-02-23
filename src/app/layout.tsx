import type { Metadata } from "next";
import type { JSX, ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { defaultMetadata } from "@/lib/metadata";

import "@/app/globals.css";

export const metadata: Metadata = defaultMetadata;

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bloom-cream antialiased">
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
