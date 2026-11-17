"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Compass,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  Award,
  Zap,
  Info,
  BookmarkCheck,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ParsedEnkaCharacter,
  evaluateCharacterStats,
  BuildEvaluationResult,
  DEFAULT_GENERAL_BENCHMARK,
} from "@/lib/enkaService";
import { getCharacterById, getAllCharacters } from "@/lib/dataService";
import { getElementStyle } from "@/lib/elementTheme";
import { Character, ElementType, TargetEndgameStats } from "@/types";

function EnkaContent() {
  const searchParams = useSearchParams();
  const defaultCharParam = searchParams.get("char");

  const [uidInput, setUidInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [playerInfo, setPlayerInfo] = useState<{
    nickname: string;
    level: number;
    signature: string;
    worldLevel: number;
    avatarCount: number;
  } | null>(null);

  const [characters, setCharacters] = useState<ParsedEnkaCharacter[]>([]);
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");

  // Load saved UID from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("giguide_saved_uid");
      if (saved && !uidInput) {
        setUidInput(saved);
      }
    }
  }, []);

  const handleFetchUid = async (uidToFetch?: string) => {
    const targetUid = uidToFetch || uidInput.trim();
    if (!targetUid) {
      setErrorMessage("Silakan masukkan nomor UID Genshin Impact terlebih dahulu.");
      return;
    }

    // Save UID to localStorage
    if (typeof window !== "undefined" && targetUid !== "demo") {
      localStorage.setItem("giguide_saved_uid", targetUid);
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/enka/${targetUid}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Gagal mengambil data dari profil in-game.");
        setPlayerInfo(null);
        setCharacters([]);
      } else {
        setPlayerInfo(data.playerInfo);
        setCharacters(data.characters);

        if (defaultCharParam) {
          const idx = data.characters.findIndex(
            (c: ParsedEnkaCharacter) => c.characterId === defaultCharParam
          );
          if (idx !== -1) {
            setSelectedCharIndex(idx);
          } else {
            setSelectedCharIndex(0);
          }
        } else {
          setSelectedCharIndex(0);
        }
      }
    } catch (err: any) {
      setErrorMessage("Terjadi gangguan koneksi saat menghubungi server proxy.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryDemo = () => {
    setUidInput("800000001");
    handleFetchUid("demo");
  };

  const activeEnkaChar: ParsedEnkaCharacter | undefined = characters[selectedCharIndex];

  // Lookup matching GIGuide character
  const matchedGIGuideChar: Character | undefined = activeEnkaChar
    ? getCharacterById(activeEnkaChar.characterId) ||
      getAllCharacters().find((c) => c.name.toLowerCase() === activeEnkaChar.name.toLowerCase())
    : undefined;

  // Selected build variant for comparison
  const activeBuildVariant = matchedGIGuideChar
    ? matchedGIGuideChar.builds.find((b) => b.id === selectedVariantId) ||
      matchedGIGuideChar.builds[0]
    : undefined;

  const targetStatsToUse: TargetEndgameStats =
    activeBuildVariant?.targetEndgameStats || DEFAULT_GENERAL_BENCHMARK;

  const evaluation: BuildEvaluationResult | null = activeEnkaChar
    ? evaluateCharacterStats(activeEnkaChar.stats, targetStatsToUse)
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0f17] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Header Hero */}
        <section className="relative rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900/60 to-sky-500/10 border border-white/10 p-6 sm:p-8 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Enka.Network Live API Integration</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Cek & Evaluasi Build Karakter via{" "}
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                UID Akun
              </span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Masukkan UID in-game Anda untuk menarik data karakter yang dipajang di profil, lalu
              sistem akan secara otomatis membandingkan stat aktual Anda dengan Target Endgame Stats
              rekomendasi build.
            </p>
          </div>
        </section>

        {/* UID Input Form */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={uidInput}
                onChange={(e) => setUidInput(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && handleFetchUid()}
                placeholder="Masukkan 9 Digit UID (Contoh: 801234567)..."
                maxLength={10}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-mono tracking-wider"
              />
            </div>

            <button
              onClick={() => handleFetchUid()}
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Mengambil Data...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Tarik Profil In-Game</span>
                </>
              )}
            </button>

            <button
              onClick={handleTryDemo}
              disabled={isLoading}
              className="w-full sm:w-auto px-4 py-3.5 rounded-xl text-xs font-bold bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 transition-all active:scale-95 whitespace-nowrap"
            >
              Coba Akun Demo
            </button>
          </div>

          {/* Enka Guide Note */}
          <div className="flex items-start gap-2 text-[11px] text-slate-400 pt-1">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Syarat agar data terbaca:</strong> Di dalam game Genshin Impact, buka{" "}
              <em>Paimon Menu → Edit Profil</em>, pasang karakter yang ingin dicek pada Showcase
              Karakter, dan pastikan opsi <strong>&quot;Tampilkan Detail Karakter&quot;</strong> dicentang
              aktif. (UID Anda otomatis tersimpan di browser ini).
            </span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-300 text-xs">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Gagal Menarik Data Profil</strong>
              <p className="mt-0.5 text-red-200/90 leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Player Profile & Showcase Results */}
        {playerInfo && characters.length > 0 && (
          <div className="space-y-6">
            {/* Player Info Card */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-black text-xl flex items-center justify-center shadow-md">
                  {playerInfo.nickname.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-white">{playerInfo.nickname}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      AR {playerInfo.level}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">
                      WL {playerInfo.worldLevel}
                    </span>
                  </div>
                  {playerInfo.signature && (
                    <p className="text-xs text-slate-400 mt-0.5 italic">
                      &quot;{playerInfo.signature}&quot;
                    </p>
                  )}
                </div>
              </div>

              <div className="text-xs text-slate-400">
                <span>
                  Karakter Showcase Terdeteksi:{" "}
                  <strong className="text-white">{characters.length}</strong>
                </span>
              </div>
            </div>

            {/* Showcase Characters Horizontal Switcher */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Pilih Karakter untuk Dievaluasi:
              </span>
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {characters.map((char, index) => {
                  const isSelected = selectedCharIndex === index;

                  return (
                    <button
                      key={`${char.characterId}-${index}`}
                      onClick={() => {
                        setSelectedCharIndex(index);
                        setSelectedVariantId("");
                      }}
                      className={`flex-shrink-0 flex items-center gap-2.5 p-2 rounded-xl border transition-all ${
                        isSelected
                          ? "bg-slate-800 border-amber-400 shadow-lg scale-105"
                          : "bg-slate-900/60 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 border border-white/10 flex-shrink-0 relative">
                        <Image
                          src={char.icon}
                          alt={char.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                        {char.element && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-black/90 border border-white/20 p-0.5 flex items-center justify-center shadow-sm">
                            <Image
                              src={`/assets/elements/${char.element}.svg`}
                              alt={char.element}
                              width={12}
                              height={12}
                              className="w-full h-full object-contain filter drop-shadow"
                            />
                          </div>
                        )}
                      </div>
                      <div className="text-left pr-2">
                        <h4 className="text-xs font-bold text-white truncate max-w-[110px]">
                          {char.name}
                        </h4>
                        <span className="text-[10px] text-amber-400 font-semibold block">
                          Lv {char.level} • C{char.constellation}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Evaluation & Stat Comparison Dashboard */}
            {activeEnkaChar && evaluation && (
              <div className="space-y-6">
                {/* Variant Switcher for this Character */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/40 border border-white/10">
                  <div>
                    <span className="text-xs font-semibold text-slate-400">
                      Bandingkan dengan Target Build:
                    </span>
                    <h3 className="text-base font-black text-amber-300">
                      {activeBuildVariant
                        ? activeBuildVariant.name
                        : "Standar Umum Endgame (General Benchmark)"}
                    </h3>
                  </div>

                  {matchedGIGuideChar && matchedGIGuideChar.builds.length > 1 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {matchedGIGuideChar.builds.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => setSelectedVariantId(b.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            (activeBuildVariant?.id || "") === b.id
                              ? "bg-amber-500 text-slate-950 shadow"
                              : "bg-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          {b.name}
                        </button>
                      ))}
                    </div>
                  )}

                  {!matchedGIGuideChar && (
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
                      <Info className="w-3.5 h-3.5" />
                      <span>Panduan khusus sedang disiapkan, dievaluasi dengan tolok ukur standar</span>
                    </div>
                  )}
                </div>

                {/* Score & Verdict Banner */}
                <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex flex-col items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
                      <span className="text-xl sm:text-2xl font-black text-amber-300">
                        {evaluation.overallScore}
                      </span>
                      <span className="text-[9px] uppercase font-bold text-slate-400">/ 100</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-400" />
                        <h3 className="text-lg sm:text-xl font-black text-white">
                          {evaluation.ratingTitle}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-xl">
                        {evaluation.verdict}
                      </p>
                    </div>
                  </div>

                  {/* Weapon Equipped by User */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs md:w-64">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                      Senjata Terpasang
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white truncate max-w-[170px]">
                        {activeEnkaChar.weapon.name}
                      </span>
                      <span className="text-amber-400 font-bold">
                        R{activeEnkaChar.weapon.refinement}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Level {activeEnkaChar.weapon.level} / 90
                    </span>
                  </div>
                </div>

                {/* Side-by-Side Comparison Table */}
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-amber-400" /> Komparasi Stat Aktual vs
                      Target Endgame
                    </h4>
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      Data real-time Enka.Network
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {evaluation.comparisons.map((item) => (
                      <div
                        key={item.name}
                        className="p-3.5 rounded-xl bg-black/30 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="w-40 flex-shrink-0">
                          <span className="text-xs font-bold text-white">{item.name}</span>
                        </div>

                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-28">
                            <span className="text-[10px] text-slate-400 block font-medium">
                              Stat Anda
                            </span>
                            <span className="text-sm font-extrabold text-white">
                              {item.userValue}
                              {item.unit}
                            </span>
                          </div>

                          <div className="w-36">
                            <span className="text-[10px] text-slate-400 block font-medium">
                              Target Rekomendasi
                            </span>
                            <span className="text-xs font-bold text-slate-300">
                              Min: {item.targetMin}
                              {item.unit} | Rec: {item.targetRec}
                              {item.unit}
                            </span>
                          </div>

                          <div className="w-24">
                            <span className="text-[10px] text-slate-400 block font-medium">
                              Selisih
                            </span>
                            <span
                              className={`text-xs font-bold ${
                                item.diff >= 0 ? "text-emerald-400" : "text-red-400"
                              }`}
                            >
                              {item.diff >= 0 ? `+${item.diff}` : item.diff}
                              {item.unit}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 self-start sm:self-center">
                          {item.status === "optimal" && (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Optimal
                            </span>
                          )}
                          {item.status === "warning" && (
                            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5" /> Cukup
                            </span>
                          )}
                          {item.status === "danger" && (
                            <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-bold flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" /> Kurang
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations & Tips */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Saran Peningkatan Build
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {evaluation.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Direct link to Full Build Guide (if exists) */}
                  {matchedGIGuideChar && (
                    <div className="pt-3 border-t border-white/5 flex justify-end">
                      <Link
                        href={`/character/${matchedGIGuideChar.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 transition-all"
                      >
                        Buka Panduan Lengkap {matchedGIGuideChar.name}{" "}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function EnkaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0c0f17] text-amber-400">
          Memuat Evaluator UID...
        </div>
      }
    >
      <EnkaContent />
    </Suspense>
  );
}
