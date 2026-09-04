import type { Metadata } from "next";
import "./globals.css";
import "./post-production.css";
import "./studio-theme.css";
import "./overall-tracker.css";
import "./lead-form.css";

export const metadata: Metadata = {
  title: "Focuz Studios Workflow CRM",
  description: "Manage photography leads, shoots, post-production and deliveries.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
