"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Globe, Sparkles, BookOpen } from "lucide-react";
import { ServerRegion, DayOfWeek } from "@/types";
import { getDailyDomainSchedule, getServerCurrentDay } from "@/lib/dataService";
import { getElementStyle } from "@/lib/elementTheme";

const DAYS_LIST: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DAYS_ID: Record<DayOfWeek, string> = {
  Monday: "Senin",
  Tuesday: "Selasa",
  Wednesday: "Rabu",
  Thursday: "Kamis",
  Friday: "Jumat",
  Saturday: "Sabtu",
  Sunday: "Minggu (Semua Buka)",
};

export function DailyDomainWidget() {
  const [region, setRegion] = useState<ServerRegion>("Asia");
  const serverDay = getServerCurrentDay(region);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(serverDay);

  const schedule = getDailyDomainSchedule(region, selectedDay);

  return (
    <section id="domains" className="w-full scroll-mt-20">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#131926] to-[#0d121c] p-4 sm:p-6 shadow-xl">
        {/* Header with Server Region & Day Selectors */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400">
                <Calendar className="w-4 h-4" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Jadwal Domain & Farming Harian
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Karakter yang buku talent-nya dapat di-farm hari ini (Reset harian 04:00 server).
            </p>
          </div>

          {/* Region Switcher */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" /> Server:
            </span>
            <div className="flex rounded-lg bg-black/40 border border-white/10 p-1">
              {(["Asia", "America", "Europe"] as ServerRegion[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRegion(r);
                    setSelectedDay(getServerCurrentDay(r));
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                    region === r
                      ? "bg-emerald-500 text-slate-950 shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Days of Week Tab Switcher (Mobile Scrollable) */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {DAYS_LIST.map((day) => {
            const isToday = day === serverDay;
            const isSelected = day === selectedDay;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-emerald-500 text-slate-950 shadow-md font-bold scale-100"
                    : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/5"
                }`}
              >
                <span>{DAYS_ID[day]}</span>
                {isToday && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                      isSelected
                        ? "bg-black/30 text-slate-950"
                        : "bg-emerald-500/20 text-emerald-300"
                    }`}
                  >
                    Hari Ini
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sunday Notice */}
        {schedule.isSundayAllOpen && (
          <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2.5 text-xs text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              <strong>Hari Minggu Spesial:</strong> Seluruh buku talent dan material senjata dari
              semua domain dibuka bebas untuk dipilih!
            </span>
          </div>
        )}

        {/* Domain Groups Grid */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schedule.domains.map((dom) => (
            <div
              key={dom.bookName}
              className="rounded-xl border border-white/10 bg-slate-900/50 p-4 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                    {dom.region}
                  </span>
                  <span className="text-[11px] text-slate-400 line-clamp-1">{dom.domainName}</span>
                </div>

                <div className="flex items-start gap-2 mt-1">
                  <BookOpen className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <h4 className="text-sm font-bold text-white line-clamp-1">{dom.bookName}</h4>
                </div>

                {/* Character Avatars using this talent book */}
                <div className="mt-4 pt-3 border-t border-white/5">
                  <span className="text-[11px] text-slate-400 block mb-2 font-medium">
                    Karakter yang membutuhkan:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {dom.characters.map((c) => {
                      const style = getElementStyle(c.element);
                      return (
                        <Link
                          key={c.id}
                          href={`/character/${c.id}`}
                          title={`${c.name} - Klik untuk lihat build`}
                          className="group relative"
                        >
                          <div
                            className={`w-10 h-10 rounded-lg overflow-hidden border ${style.borderColor} bg-slate-950 p-0.5 hover:scale-110 transition-transform shadow-sm`}
                          >
                            <Image
                              src={c.icon}
                              alt={c.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* Mini Element badge */}
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-black/80 border border-white/20 p-0.5">
                            <Image
                              src={`/assets/elements/${c.element}.svg`}
                              alt={c.element}
                              width={12}
                              height={12}
                              className="w-full h-full"
                            />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
