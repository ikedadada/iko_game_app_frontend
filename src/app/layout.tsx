import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iko Online",
  description: "オンラインであそべる「いこ」",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          font-sans bg-background text-foreground
          min-h-screen antialiased transition-colors
          flex flex-col
        `}
      >
        <header className="sticky dark top-0 z-50 w-full border-b bg-background shadow-sm">
          <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-lg text-white">
              Iko Online
            </Link>
            <a
              href="https://github.com/ikedadada" // 任意：GitHubや使い方ページなど
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:underline"
            >
              <Image
                src="/icons8-github-64.png"
                alt="GitHub"
                width={32}
                height={32}
                className="inline mr-1"
              />
            </a>
          </div>
        </header>

        <main className="w-full mx-auto pt-5 px-5">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
