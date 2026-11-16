import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#080b10] text-slate-400 py-10 mt-16 mb-16 md:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-100 text-lg">GIGuide</span>
              <p className="text-xs text-slate-400">
                Panduan Build Karakter & Farming Genshin Impact Indonesia
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Database Karakter
            </Link>
            <Link href="/#banners" className="hover:text-amber-400 transition-colors">
              Banner Aktif
            </Link>
            <Link href="/#domains" className="hover:text-amber-400 transition-colors">
              Jadwal Domain
            </Link>
            <Link href="/enka" className="hover:text-amber-400 transition-colors">
              Cek Profil UID
            </Link>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright Notice */}
        <div className="pt-6 space-y-2 text-[11px] text-slate-400 leading-relaxed">
          <p>
            <strong className="text-slate-300">Disclaimer Legalitas & Hak Cipta:</strong> GIGuide
            adalah proyek penggemar independen (fan-made community tool) dan tidak berafiliasi,
            disponsori, atau didukung secara resmi oleh miHoYo / HoYoverse / Cognosphere Pte. Ltd.
          </p>
          <p>
            Genshin Impact™ beserta seluruh materi visual, ikon karakter, nama senjata, artefak, dan
            elemen suara adalah hak cipta dan merek dagang terdaftar milik COGNOSPHERE PTE. LTD. Data
            profil akun diambil secara publik melalui API Enka.Network atas persetujuan fitur showcase
            dalam game pengguna.
          </p>
          <p className="flex items-center gap-1 text-slate-400 pt-2">
            Dibangun dengan <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" /> untuk
            komunitas Traveler Indonesia. Patch 5.4 Ready.
          </p>
        </div>
      </div>
    </footer>
  );
}
