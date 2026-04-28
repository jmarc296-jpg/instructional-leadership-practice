import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LeadSharper",
  description: "District leadership intelligence for risk, intervention, and succession."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
