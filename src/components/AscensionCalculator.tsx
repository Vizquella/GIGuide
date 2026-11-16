"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Calculator, Sparkles, Coins, BookOpen, Clock, Droplets, Zap, RotateCcw } from "lucide-react";
import { Character } from "@/types";
import { calculateAscensionMaterials, CalculationInput } from "@/data/ascensionCosts";
import { getElementStyle } from "@/lib/elementTheme";

interface AscensionCalculatorProps {
  character: Character;
}

export function AscensionCalculator({ character }: AscensionCalculatorProps) {
  const style = getElementStyle(character.element);

  const [currentLevel, setCurrentLevel] = useState(1);
  const [targetLevel, setTargetLevel] = useState(90);

  const [currentNA, setCurrentNA] = useState(1);
  const [targetNA, setTargetNA] = useState(9);

  const [currentSkill, setCurrentSkill] = useState(1);
  const [targetSkill, setTargetSkill] = useState(9);

  const [currentBurst, setCurrentBurst] = useState(1);
  const [targetBurst, setTargetBurst] = useState(10);

  // Preset Handlers
  const handlePresetMax = () => {
    setCurrentLevel(1);
    setTargetLevel(90);
    setCurrentNA(1);
    setTargetNA(10);
    setCurrentSkill(1);
    setTargetSkill(10);
    setCurrentBurst(1);
    setTargetBurst(10);
  };

  const handlePresetComfort = () => {
    setCurrentLevel(1);
    setTargetLevel(80);
    setCurrentNA(1);
    setTargetNA(6);
    setCurrentSkill(1);
    setTargetSkill(8);
    setCurrentBurst(1);
    setTargetBurst(8);
  };

  const handleReset = () => {
    setCurrentLevel(1);
    setTargetLevel(90);
    setCurrentNA(1);
    setTargetNA(1);
    setCurrentSkill(1);
    setTargetSkill(1);
    setCurrentBurst(1);
    setTargetBurst(1);
  };

  const calcInput: CalculationInput = useMemo(
    () => ({
      currentLevel,
      targetLevel,
      currentNormalAttack: currentNA,
      targetNormalAttack: targetNA,
      currentSkill,
      targetSkill,
      currentBurst,
      targetBurst,
    }),
    [currentLevel, targetLevel, currentNA, targetNA, currentSkill, targetSkill, currentBurst, targetBurst]
  );

  const result = useMemo(() => calculateAscensionMaterials(calcInput), [calcInput]);

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#131926] to-[#0d121c] p-4 sm:p-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400">
              <Calculator className="w-4 h-4" />
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
              Kalkulator Material Ascension & Resin
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Sesuaikan slider level untuk menghitung total material, Mora, buku EXP, dan estimasi
            hari farming Resin.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={handlePresetMax}
            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 transition-all"
          >
            Max (90 & 10/10/10)
          </button>
          <button
            onClick={handlePresetComfort}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 transition-all"
          >
            Comfort (80 & 6/8/8)
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-black/30 border border-white/5"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Character Level Slider */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> Level Karakter
            </span>
            <span className="text-xs font-extrabold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Lv {currentLevel} → Lv {targetLevel}
            </span>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Level Saat Ini: {currentLevel}</span>
              <input
                type="range"
                min={1}
                max={targetLevel}
                value={currentLevel}
                onChange={(e) => setCurrentLevel(Number(e.target.value))}
                className="w-1/2 accent-amber-400 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Level Target: {targetLevel}</span>
              <input
                type="range"
                min={currentLevel}
                max={90}
                value={targetLevel}
                onChange={(e) => setTargetLevel(Number(e.target.value))}
                className="w-1/2 accent-amber-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Talent Sliders */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-400" /> Level Talenta (1 - 10)
            </span>
            <span className="text-xs font-extrabold text-slate-400">
              {targetNA}/{targetSkill}/{targetBurst}
            </span>
          </div>

          <div className="space-y-2.5 pt-1 text-[11px]">
            {/* Normal Attack */}
            <div className="flex items-center justify-between text-slate-400">
              <span className="w-28 truncate">Normal Attack:</span>
              <span className="text-slate-200 font-bold px-1.5">
                {currentNA} → {targetNA}
              </span>
              <input
                type="range"
                min={1}
                max={10}
                value={targetNA}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setTargetNA(val);
                  if (currentNA > val) setCurrentNA(val);
                }}
                className="w-1/3 accent-emerald-400 cursor-pointer"
              />
            </div>

            {/* Skill */}
            <div className="flex items-center justify-between text-slate-400">
              <span className="w-28 truncate">Elemental Skill:</span>
              <span className="text-slate-200 font-bold px-1.5">
                {currentSkill} → {targetSkill}
              </span>
              <input
                type="range"
                min={1}
                max={10}
                value={targetSkill}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setTargetSkill(val);
                  if (currentSkill > val) setCurrentSkill(val);
                }}
                className="w-1/3 accent-emerald-400 cursor-pointer"
              />
            </div>

            {/* Burst */}
            <div className="flex items-center justify-between text-slate-400">
              <span className="w-28 truncate">Elemental Burst:</span>
              <span className="text-slate-200 font-bold px-1.5">
                {currentBurst} → {targetBurst}
              </span>
              <input
                type="range"
                min={1}
                max={10}
                value={targetBurst}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setTargetBurst(val);
                  if (currentBurst > val) setCurrentBurst(val);
                }}
                className="w-1/3 accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Estimasi Resin & Farming Time Banner */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-sky-950/40 via-indigo-950/40 to-slate-900 border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 flex-shrink-0 shadow-lg shadow-sky-500/20">
            <Droplets className="w-6 h-6 fill-current" />
          </div>
          <div>
            <span className="text-xs text-sky-300 font-bold uppercase tracking-wider">
              Estimasi Kebutuhan Resin
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">
                ~{result.estimatedResin.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400">Original Resin</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Estimasi Waktu Farming</span>
            <p className="text-base font-extrabold text-emerald-300">
              Sekitar {result.estimatedDays} Hari{" "}
              <span className="text-xs text-slate-400 font-normal">(180 Resin/hari)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Materials Results Grid */}
      <div className="mt-6">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
          Rincian Material yang Dibutuhkan
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
          {/* Mora */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Total Mora</span>
              <span className="font-extrabold text-amber-300 text-sm">
                {result.totalMora.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Hero's Wit */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 flex-shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Hero&apos;s Wit (EXP)</span>
              <span className="font-extrabold text-purple-300 text-sm">
                {result.herosWit} Buku
              </span>
            </div>
          </div>

          {/* World Boss Drops */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 flex-shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium truncate max-w-[130px]">
                {character.materials.worldBoss}
              </span>
              <span className="font-extrabold text-red-300 text-sm">
                {result.bossMaterials} item
              </span>
            </div>
          </div>

          {/* Local Specialty */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium truncate max-w-[130px]">
                {character.materials.localSpecialty}
              </span>
              <span className="font-extrabold text-emerald-300 text-sm">
                {result.localSpecialties} item
              </span>
            </div>
          </div>

          {/* Talent Books (Teachings, Guides, Philosophies) */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Buku Talenta</span>
              <span className="font-extrabold text-slate-200 text-[11px]">
                {result.talentTeachings} Br / {result.talentGuides} Sil / {result.talentPhilosophies}{" "}
                Gold
              </span>
            </div>
          </div>

          {/* Weekly Boss Materials */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium truncate max-w-[130px]">
                Weekly Boss Drop
              </span>
              <span className="font-extrabold text-purple-300 text-sm">
                {result.weeklyBossMaterials} item
              </span>
            </div>
          </div>

          {/* Crown of Insight */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Crown of Insight</span>
              <span className="font-extrabold text-amber-300 text-sm">
                {result.crownsOfInsight} Crown
              </span>
            </div>
          </div>

          {/* Common Mob Drops */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-700/40 border border-white/10 flex items-center justify-center text-slate-300 flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium truncate max-w-[130px]">
                Common Drops
              </span>
              <span className="font-extrabold text-slate-200 text-[11px]">
                {result.commonGrey} G / {result.commonGreen} Gr / {result.commonBlue} B
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
