import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { authOptions } from "@/libs/authOptions";
import ReduxProvider from "@/redux/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3Job.",
  description: "Created By FEMorRuam",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <ReduxProvider>
        <NextAuthProvider session={session}>
        <TopMenu/>
        {children}
        </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
