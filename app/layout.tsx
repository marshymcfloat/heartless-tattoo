import type { Metadata } from "next";
import { Geist } from "next/font/google";
import SmoothScroll from "./smooth-scroll";
import "lenis/dist/lenis.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Heartless Tattoo — Tattoo Studio",
  description: "Independent tattoo studio based in Toronto, Canada.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full"><SmoothScroll>{children}</SmoothScroll></body>
    </html>
  );
}
