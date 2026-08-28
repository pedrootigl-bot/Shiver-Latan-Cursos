import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ClientSmoothScroll } from "@/components/ClientSmoothScroll";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${plusJakarta.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        <ClientSmoothScroll />
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
