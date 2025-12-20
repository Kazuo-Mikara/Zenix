import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "./LenisProvider";
import QueryProvider from "@/app/QueryProvider";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zenix - Learning Platform",
  description: "Multi-role learning management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ThemeProvider defaultTheme="system" storageKey="zenix-theme">
            <QueryProvider>
              <LenisProvider>
                {children}
              </LenisProvider>
            </QueryProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
