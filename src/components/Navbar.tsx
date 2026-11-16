"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Users, Sparkles, Calendar } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/#characters", label: "Semua Karakter", icon: Users },
    { href: "/#banners", label: "Banner Aktif", icon: Sparkles },
    { href: "/#domains", label: "Jadwal Domain", icon: Calendar },
    { href: "/enka", label: "Cek Build UID", icon: Compass },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0c0f17]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-slate-950 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-300 via-amber-100 to-slate-200 bg-clip-text text-transparent">
                GIGuide
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                v5.4
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Database Build & Calculator Genshin Impact
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/enka"
                ? pathname === "/enka"
                : pathname === "/" && !item.href.includes("#");

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button: Cek UID Button */}
        <div className="flex items-center gap-2">
          <Link
            href="/enka"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-md shadow-amber-500/20 active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span className="hidden xs:inline">Cek Stat</span> UID
          </Link>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (App-like experience) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0c0f17]/95 backdrop-blur-lg border-t border-white/10 px-2 py-1.5 flex justify-around items-center">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/enka"
              ? pathname === "/enka"
              : pathname === "/" && !item.href.includes("#");

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors ${
                isActive ? "text-amber-300" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
