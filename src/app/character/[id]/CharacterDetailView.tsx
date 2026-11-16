"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Swords,
  Layers,
  BarChart3,
  Users2,
  Calendar,
  Compass,
  CheckCircle2,
  Shield,
  Zap,
} from "lucide-react";
import { Character, BuildVariant, WeaponRanking } from "@/types";
import { getElementStyle } from "@/lib/elementTheme";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AscensionCalculator } from "@/components/AscensionCalculator";

interface CharacterDetailViewProps {
  character: Character;
}

export function CharacterDetailView({ character }: CharacterDetailViewProps) {
  const style = getElementStyle(character.element);

  // Active Build Variant Tab
  const [selectedBuildId, setSelectedBuildId] = useState<string>(
    character.builds[0]?.id || ""
  );

  const activeBuild: BuildVariant =
    character.builds.find((b) => b.id === selectedBuildId) || character.builds[0];

  const getRankingBadge = (ranking: WeaponRanking) => {
    switch (ranking) {
      case "BiS":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "5-Star Best":
        return "bg-amber-400/15 text-amber-200 border-amber-400/30";
      case "4-Star Best":
        return "bg-purple-500/20 text-purple-300 border-purple-500/40";
      case "F2P":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      default:
        return "bg-white/10 text-slate-300 border-white/20";
    }
  };

  const getWeaponSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0f17] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/#characters"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors p-1"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Database Karakter
          </Link>
        </div>

        {/* Character Header Profile Card */}
        <div
          className={`relative rounded-3xl border ${style.borderColor} bg-slate-900/80 p-5 sm:p-8 overflow-hidden shadow-2xl`}
        >
          {/* Ambient Glowing background */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: style.color }}
          />

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
            {/* Character Avatar */}
            <div
              className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 ${
                character.rarity === 5 ? "border-amber-400" : "border-purple-400"
              } bg-slate-950 flex-shrink-0 shadow-xl`}
            >
              <Image
                src={character.icon}
                alt={character.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute top-1.5 left-1.5 w-7 h-7 rounded-lg bg-black/80 p-1 border border-white/20">
                <Image
                  src={`/assets/elements/${character.element}.svg`}
                  alt={character.element}
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Character Metadata */}
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                    character.rarity === 5
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                  }`}
                >
                  {character.rarity === 5 ? "★★★★★ Bintang 5" : "★★★★ Bintang 4"}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${style.badgeBg} capitalize flex items-center gap-1`}
                >
                  <span className="w-3 h-3 inline-block">
                    <Image
                      src={`/assets/elements/${character.element}.svg`}
                      alt={character.element}
                      width={12}
                      height={12}
                      className="w-full h-full object-contain"
                    />
                  </span>
                  {character.element}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10">
                  {character.region}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white mt-2 tracking-tight">
                {character.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 italic mt-0.5">{character.title}</p>

              {/* Badges Info */}
              <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/30 border border-white/5">
                  <Swords className="w-3.5 h-3.5 text-slate-400" />
                  <span className="capitalize">{character.weaponType}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/30 border border-white/5">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>{character.primaryRole}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/30 border border-white/5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Jadwal Domain: {character.materials.days.join(" / ")}</span>
                </div>
              </div>
            </div>

            {/* Quick action: Cek UID direct link */}
            <div className="flex flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
              <Link
                href={`/enka?char=${character.id}`}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <Compass className="w-4 h-4" /> Bandingkan Stat UID Saya
              </Link>
            </div>
          </div>

          {/* Quick Farming Materials Bar */}
          <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-black/20 border border-white/5">
              <span className="text-[10px] text-slate-400 block font-medium">Buku Talenta</span>
              <span className="font-semibold text-slate-200 line-clamp-1">
                {character.materials.bookName}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/20 border border-white/5">
              <span className="text-[10px] text-slate-400 block font-medium">World Boss</span>
              <span className="font-semibold text-slate-200 line-clamp-1">
                {character.materials.worldBoss}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/20 border border-white/5">
              <span className="text-[10px] text-slate-400 block font-medium">Local Specialty</span>
              <span className="font-semibold text-emerald-300 line-clamp-1">
                {character.materials.localSpecialty}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/20 border border-white/5">
              <span className="text-[10px] text-slate-400 block font-medium">Weekly Boss</span>
              <span className="font-semibold text-purple-300 line-clamp-1">
                {character.materials.weeklyBoss}
              </span>
            </div>
          </div>
        </div>

        {/* Build Variants Section */}
        <div className="space-y-6">
          {/* Variant Tabs Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" /> Varian Rekomendasi Build
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Pilih varian gaya bermain untuk melihat kombinasi senjata, artefak, dan rotasi tim.
              </p>
            </div>

            {/* Build Tabs Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {character.builds.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBuildId(b.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    selectedBuildId === b.id
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-100"
                      : "bg-slate-900 text-slate-400 hover:text-white border border-white/10"
                  }`}
                >
                  <span>{b.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Build Description Card */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-400 block mb-1">
              Fokus Gaya Bermain
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeBuild.description}
            </p>
          </div>

          {/* Grid Layout: Weapon & Artifact Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Rekomendasi Senjata */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <Swords className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-bold text-white">Rekomendasi Senjata (Ranking)</h3>
              </div>

              <div className="space-y-3">
                {activeBuild.weapons.map((w) => {
                  const slug = getWeaponSlug(w.name);
                  return (
                    <div
                      key={w.name}
                      className="p-3.5 rounded-xl bg-black/30 border border-white/5 hover:border-white/15 transition-all flex items-start gap-3"
                    >
                      {/* Weapon Icon Thumbnail */}
                      <div className="w-12 h-12 rounded-lg bg-slate-950 border border-white/10 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <Image
                          src={`/assets/weapons/${character.weaponType}.svg`}
                          alt={w.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded border ${getRankingBadge(
                                w.ranking
                              )}`}
                            >
                              {w.ranking}
                            </span>
                            <h4 className="text-sm font-bold text-white">{w.name}</h4>
                          </div>
                          <span className="text-[11px] font-bold text-amber-400">
                            {Array(w.rarity).fill("★").join("")}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{w.notes}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Rekomendasi Artefak & Prioritas Stat */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <Layers className="w-4 h-4 text-sky-400" />
                <h3 className="text-base font-bold text-white">Rekomendasi Artefak</h3>
              </div>

              {/* Artifact Sets */}
              <div className="space-y-3">
                {activeBuild.artifacts.map((art, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        {art.sets.map((s) => (
                          <span
                            key={s.name}
                            className="px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/30 text-sky-300 font-bold text-xs"
                          >
                            {s.pieces}pc {s.name}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">
                        {art.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{art.notes}</p>
                  </div>
                ))}
              </div>

              {/* Main Stats Priority */}
              <div className="pt-3 border-t border-white/5 space-y-2.5">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Prioritas Main Stat Artefak
                </h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400 block font-semibold mb-1">
                      Sands (Jam)
                    </span>
                    <span className="font-bold text-amber-300">
                      {activeBuild.mainStats.sands.join(" / ")}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400 block font-semibold mb-1">
                      Goblet (Piala)
                    </span>
                    <span className="font-bold text-sky-300">
                      {activeBuild.mainStats.goblet.join(" / ")}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400 block font-semibold mb-1">
                      Circlet (Mahkota)
                    </span>
                    <span className="font-bold text-purple-300">
                      {activeBuild.mainStats.circlet.join(" / ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sub-Stat Priority */}
              <div className="pt-3 border-t border-white/5">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Urutan Prioritas Sub-Stat
                </h4>
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeBuild.subStatsPriority.map((sub, i) => (
                    <span
                      key={sub}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-200"
                    >
                      <span className="text-amber-400 font-bold">{i + 1}.</span> {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Talent Priority & Target Endgame Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Talent Priority */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <Zap className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Prioritas Urutan Talent</h3>
              </div>
              <div className="space-y-2.5">
                {activeBuild.talentPriority.map((t, i) => (
                  <div
                    key={t}
                    className="flex items-center gap-3 p-3 rounded-xl bg-black/30 border border-white/5"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center border border-emerald-500/30 flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Endgame Stats */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-amber-400" />
                  <h3 className="text-base font-bold text-white">Target Endgame Stats</h3>
                </div>
                <span className="text-[10px] text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  Untuk Evaluasi UID
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* CRIT Rate */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-slate-400 text-[10px] block">CRIT Rate</span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-slate-300 font-medium">
                      Min: {activeBuild.targetEndgameStats.critRate.min}%
                    </span>
                    <span className="font-black text-amber-300 text-sm">
                      {activeBuild.targetEndgameStats.critRate.recommended}%
                    </span>
                  </div>
                </div>

                {/* CRIT DMG */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-slate-400 text-[10px] block">CRIT DMG</span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-slate-300 font-medium">
                      Min: {activeBuild.targetEndgameStats.critDmg.min}%
                    </span>
                    <span className="font-black text-amber-300 text-sm">
                      {activeBuild.targetEndgameStats.critDmg.recommended}%
                    </span>
                  </div>
                </div>

                {/* Energy Recharge */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-slate-400 text-[10px] block">Energy Recharge</span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-slate-300 font-medium">
                      Min: {activeBuild.targetEndgameStats.energyRecharge.min}%
                    </span>
                    <span className="font-black text-sky-300 text-sm">
                      {activeBuild.targetEndgameStats.energyRecharge.recommended}%
                    </span>
                  </div>
                </div>

                {/* Elemental Mastery */}
                {activeBuild.targetEndgameStats.elementalMastery && (
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-400 text-[10px] block">Elemental Mastery</span>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-slate-300 font-medium">
                        Min: {activeBuild.targetEndgameStats.elementalMastery.min}
                      </span>
                      <span className="font-black text-emerald-300 text-sm">
                        {activeBuild.targetEndgameStats.elementalMastery.recommended}
                      </span>
                    </div>
                  </div>
                )}

                {/* ATK */}
                {activeBuild.targetEndgameStats.atk && (
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-400 text-[10px] block">Total ATK</span>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-slate-300 font-medium">
                        Min: {activeBuild.targetEndgameStats.atk.min}
                      </span>
                      <span className="font-black text-red-300 text-sm">
                        {activeBuild.targetEndgameStats.atk.recommended}
                      </span>
                    </div>
                  </div>
                )}

                {/* HP */}
                {activeBuild.targetEndgameStats.hp && (
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-400 text-[10px] block">Total HP</span>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-slate-300 font-medium">
                        Min: {activeBuild.targetEndgameStats.hp.min}
                      </span>
                      <span className="font-black text-emerald-300 text-sm">
                        {activeBuild.targetEndgameStats.hp.recommended}
                      </span>
                    </div>
                  </div>
                )}

                {/* DEF */}
                {activeBuild.targetEndgameStats.def && (
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-400 text-[10px] block">Total DEF</span>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-slate-300 font-medium">
                        Min: {activeBuild.targetEndgameStats.def.min}
                      </span>
                      <span className="font-black text-amber-300 text-sm">
                        {activeBuild.targetEndgameStats.def.recommended}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 4. Rekomendasi Team Comps & Urutan Rotasi */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <Users2 className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-bold text-white">Rekomendasi Team Comps & Rotasi Skill</h3>
            </div>

            <div className="space-y-6">
              {activeBuild.teamComps.map((comp) => (
                <div
                  key={comp.name}
                  className="p-4 sm:p-5 rounded-xl bg-black/30 border border-white/5 space-y-4"
                >
                  <div>
                    <h4 className="text-base font-black text-amber-300">{comp.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">{comp.description}</p>
                  </div>

                  {/* 4 Members Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {comp.members.map((m) => {
                      const mStyle = getElementStyle(m.element);
                      return (
                        <div
                          key={m.name}
                          className={`p-3 rounded-xl bg-slate-900/80 border ${mStyle.borderColor} flex items-center gap-2.5`}
                        >
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 flex-shrink-0">
                            <Image
                              src={m.icon}
                              alt={m.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <h5 className="text-xs font-bold text-white truncate">{m.name}</h5>
                            <span className="text-[10px] text-slate-400 truncate block">
                              {m.role}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Rotation Order */}
                  <div className="pt-3 border-t border-white/5">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                      Urutan Rotasi Skill:
                    </span>
                    <div className="space-y-1.5">
                      {comp.rotationOrder.map((step) => (
                        <div
                          key={step}
                          className="text-xs text-slate-300 p-2 rounded-lg bg-black/40 border border-white/5 flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fitur 3: Kalkulator Material Ascension & Resin */}
        <AscensionCalculator character={character} />
      </main>

      <Footer />
    </div>
  );
}
