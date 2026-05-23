import type { Metadata } from "next";
import { fraunces, plusJakarta } from "@/lib/fonts";
import { siteConfig } from "@/constants/navigation";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plusJakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen font-body antialiased">{children}</body>
    </html>
  );
}
