import type { Metadata } from "next";

import { APP_DESCRIPTION, APP_NAME, APP_URL } from "@/lib/constants";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${APP_NAME} | Flower Shop`,
    template: `%s | ${APP_NAME}`
  },
  description: APP_DESCRIPTION,
  keywords: ["flowers", "bouquet", "gift", "online flower shop"],
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: `${APP_NAME} | Flower Shop`,
    description: APP_DESCRIPTION,
    url: APP_URL
  }
};
