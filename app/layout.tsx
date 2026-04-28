import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "LeadSharper | District Leadership Intelligence",
  description:
    "LeadSharper helps districts predict principal failure, prescribe leadership intervention, and build succession pipelines before vacancies and student outcomes suffer.",
  metadataBase: new URL("https://www.leadsharper.org"),
  openGraph: {
    title: "LeadSharper | District Leadership Intelligence",
    description:
      "Predict principal failure before it becomes district failure.",
    url: "https://www.leadsharper.org",
    siteName: "LeadSharper",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadSharper | District Leadership Intelligence",
    description:
      "Predict principal failure before it becomes district failure."
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
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
