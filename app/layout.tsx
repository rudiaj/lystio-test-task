import "./globals.css";
import { plusJakarta, aBeeZee, abel } from "@/fonts/fonts";
import { Navigation } from "@/components/Navigation";
import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "lystio",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${aBeeZee.variable} ${abel.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
