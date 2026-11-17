import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Clever-Biz PropertyPro", description: "Clever Biz Synergy Links Nig. Ltd" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
