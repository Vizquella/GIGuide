"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Calendar, ArrowRight, Swords, Clock } from "lucide-react";
import { getActiveBanners } from "@/lib/dataService";
import { getElementStyle } from "@/lib/elementTheme";

export function ActiveBannerWidget() {
  const bannerData = getActiveBanners();
  const [selectedPhase, setSelectedPhase] = useState<1 | 2>(bannerData.activePhase);

  const currentPhase =
    bannerData.allPhases.find((p) => p.phase === selectedPhase) || bannerData.currentPhaseData;

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isEnded: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: false });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const end = new Date(currentPhase.endDate).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isEnded: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [currentPhase.endDate]);

  const endDate = new Date(currentPhase.endDate);
  const formattedEndDate = endDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section id="banners" className="w-full scroll-mt-20">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#131926] to-[#0d121c] p-4 sm:p-6 shadow-xl relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header with Phase Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-amber-500/20 text-amber-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Banner Rate-Up Aktif
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
                Patch {bannerData.currentPatch}
              </span>
            </div>

            {/* Live Countdown Timer */}
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-amber-500/30 text-amber-300 font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                {timeLeft.isEnded ? (
                  <span>Banner Telah Berakhir</span>
                ) : (
                  <span>
                    Sisa: <strong className="text-white">{timeLeft.days}h {timeLeft.hours}j {timeLeft.minutes}m {timeLeft.seconds}d</strong>
                  </span>
                )}
              </div>
              <span className="text-slate-400 text-[11px] flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" /> Sampai {formattedEndDate}
              </span>
            </div>
          </div>

          {/* Phase Switcher Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-black/40 border border-white/10 self-start sm:self-auto">
            {bannerData.allPhases.map((phase) => (
              <button
                key={phase.phase}
                onClick={() => setSelectedPhase(phase.phase as 1 | 2)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedPhase === phase.phase
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 scale-100"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Fase {phase.phase} {phase.phase === bannerData.activePhase && "• Aktif"}
              </button>
            ))}
          </div>
        </div>

        {/* 5-Star Rate-Up Characters Grid */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {currentPhase.characters5Star.map((char) => {
            const style = getElementStyle(char.element);
            return (
              <div
                key={char.id}
                className={`group relative rounded-xl border ${style.borderColor} bg-slate-900/60 p-4 hover:border-amber-400/50 transition-all overflow-hidden flex flex-col justify-between`}
              >
                <div
                  className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: style.color }}
                />

                <div className="flex items-start gap-4">
                  {/* Character Avatar */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-white/10 bg-slate-950/80 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    <Image
                      src={char.icon}
                      alt={char.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                    {/* Official Element badge */}
                    <div className="absolute top-1 left-1 w-6 h-6 rounded-md bg-black/75 p-1 border border-white/20">
                      <Image
                        src={`/assets/elements/${char.element}.svg`}
                        alt={char.element}
                        width={20}
                        height={20}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Character Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        ★★★★★ 5-Star
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${style.badgeBg} capitalize flex items-center gap-1`}
                      >
                        <span className="w-2.5 h-2.5 inline-block">
                          <Image
                            src={`/assets/elements/${char.element}.svg`}
                            alt={char.element}
                            width={10}
                            height={10}
                            className="w-full h-full object-contain"
                          />
                        </span>
                        {char.element}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-white mt-1 group-hover:text-amber-300 transition-colors truncate">
                      {char.name}
                    </h3>
                    <p className="text-xs text-slate-400 italic line-clamp-1">
                      {char.bannerTitle}
                    </p>

                    <p className="text-[11px] text-slate-400 mt-2 capitalize flex items-center gap-1">
                      <Swords className="w-3 h-3 text-slate-400" /> Senjata: {char.weaponType}
                    </p>
                  </div>
                </div>

                {/* Quick Link Button */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Rekomendasi build & weapon</span>
                  <Link
                    href={`/character/${char.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950 transition-all active:scale-95"
                  >
                    Lihat Build <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-Star Characters & Weapons Section */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 pt-4 border-t border-white/5">
          {/* 4-Star Rate Up Characters */}
          <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span className="text-purple-400">★★★★</span> Karakter Bintang 4 Rate-Up
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentPhase.characters4Star.map((char) => {
                const style = getElementStyle(char.element);
                return (
                  <Link
                    key={char.id}
                    href={`/character/${char.id}`}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-purple-500/30 hover:border-purple-400 transition-all group"
                  >
                    <div className="w-6 h-6 rounded-md overflow-hidden bg-slate-950">
                      <Image
                        src={char.icon}
                        alt={char.name}
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-200 group-hover:text-amber-300">
                      {char.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 5-Star & 4-Star Weapons */}
          <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Swords className="w-3.5 h-3.5 text-amber-400" /> Senjata Rate-Up
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex flex-wrap gap-2">
                {currentPhase.weapons5Star.map((w) => (
                  <span
                    key={w.name}
                    className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-200 font-medium text-[11px] flex items-center gap-1"
                  >
                    <span className="text-amber-400">★5</span> {w.name}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentPhase.weapons4Star.map((w) => (
                  <span
                    key={w.name}
                    className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px]"
                  >
                    ★4 {w.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
