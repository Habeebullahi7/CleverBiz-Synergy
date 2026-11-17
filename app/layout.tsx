import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clever-biz PropertyPro",
  description: "Manage Properties, Rent, Sales, Tenants",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
