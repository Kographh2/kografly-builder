import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kografly Builder",
  description: "Realtime bio link builder with polished mascot-based templates."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
