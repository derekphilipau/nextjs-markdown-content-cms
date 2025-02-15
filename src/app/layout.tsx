import Footer from "@/components/layout/footer";
import { siteConfig } from "@/siteConfig";
import type { Metadata } from "next";
import { EB_Garamond as SiteFont } from "next/font/google";
import cn from "classnames";
import { Header } from "@/components/layout/header";
import { getDictionary } from "../lib/dictionaries/dictionaries";

import "./globals.css";

const siteFont = SiteFont({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dict = getDictionary();

export const metadata: Metadata = {
  title: `${dict.site.title}`,
  description: `${dict.site.description}`,
  openGraph: {
    ...(siteConfig.ogImageUrl ? { images: [siteConfig.ogImageUrl] } : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className={cn(siteFont.className, "bg-background text-foreground")}>
        <Header />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
