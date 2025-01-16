import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Cormorant } from 'next/font/google'
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({ subsets: ['latin'] })
const cormorant = Cormorant({ subsets: ['latin'], weight: ['300', '400', '600'] })

export const metadata: Metadata = {
  title: "PMW Weddings",
  description: "PMW Weddings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="py-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <span className={`${playfair.className} text-xl hover:opacity-80 transition-opacity`}>PMW</span>
              </Link>
              
            </nav>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="py-6 border-t">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-2">
              <p className={`${playfair.className} text-2xl `}>PMW</p>
              <div className={`${cormorant.className} text-sm text-muted-foreground space-y-1`}>
                <p>Precious Memories Within</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t">
              <p className={`${cormorant.className} text-xs text-center text-muted-foreground`}>
                © All rights reserved CHKSDBT SA DE CV
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
