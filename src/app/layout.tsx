import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LocaleWrapper } from "@/components/providers/LocaleWrapper";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solobank — A Bank Account for AI Agents",
  description:
    "Five accounts. Earn, borrow, invest, swap, pay — autonomously. Built on Solana.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased min-h-screen font-sans">
        <ThemeProvider>
          <LocaleWrapper>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </LocaleWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
