import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GIGuide - Rekomendasi Build Karakter Genshin Impact & Kalkulator",
  description:
    "Database panduan build karakter Genshin Impact modern, mobile-first, kalkulator ascension resin, dan cek stat profil UID.",
  keywords: ["Genshin Impact", "Build Guide", "Artifacts", "Weapons", "Calculator", "Enka Network"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0c0f17] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
