import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import CommunityPanel from "./_components/CommunityPanel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="max-w-[1500px] w-full mx-auto flex-grow flex flex-row items-start">
            <CommunityPanel />
            <div className="flex-1 border-x h-[calc(100vh-60px)]">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
