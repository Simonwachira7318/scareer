import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S-SCRAP - Scalable Scraping & Contact Retrieval Platform",
  description: "Discover targeted company data with S-SCRAP - Advanced web scraping platform for business intelligence and lead generation.",
  keywords: ["S-SCRAP", "web scraping", "business intelligence", "lead generation", "company data", "contact retrieval"],
  authors: [{ name: "S-SCRAP Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "S-SCRAP - Scalable Scraping Platform",
    description: "Advanced web scraping platform for business intelligence and lead generation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "S-SCRAP - Scalable Scraping Platform",
    description: "Advanced web scraping platform for business intelligence and lead generation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
