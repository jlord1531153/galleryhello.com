import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://galleryhello.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gallery Hello — Beautiful Portraits & Exclusive Collections",
    template: "%s · Gallery Hello",
  },
  description:
    "Gallery Hello is a curated gallery of AI portraits — sweet & sultry, office, qipao and JK fashion — with hand-picked collections and public previews.",
  keywords: [
    "AI portraits",
    "AI photography",
    "sweet and sultry",
    "office lady",
    "qipao",
    "JK fashion",
    "creative visuals",
    "curated collections",
  ],
  authors: [{ name: "Gallery Hello" }],
  creator: "Gallery Hello",
  openGraph: {
    type: "website",
    siteName: "Gallery Hello",
    title: "Gallery Hello — Beautiful Portraits & Exclusive Collections",
    description:
      "Discover a world of captivating portraits and beautiful visual collections. Explore Sweet & Sultry, Office Lady, Qipao Beauty, JK Fashion, and more — with a free preview of every collection.",
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery Hello — Beautiful Portraits & Exclusive Collections",
    description:
      "Discover a world of captivating portraits and beautiful visual collections. Explore Sweet & Sultry, Office Lady, Qipao Beauty, JK Fashion, and more — with a free preview of every collection.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
