"use client";

import Image from "next/image";
import { Search, X, RotateCcw, Filter, MapPin } from "lucide-react";
import { ElementType, WeaponType, Rarity, Region } from "@/types";

interface CharacterFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedElement: ElementType | "all";
  onElementChange: (el: ElementType | "all") => void;
  selectedWeapon: WeaponType | "all";
  onWeaponChange: (w: WeaponType | "all") => void;
  selectedRarity: Rarity | "all";
  onRarityChange: (r: Rarity | "all") => void;
  selectedRegion: Region | "all";
  onRegionChange: (reg: Region | "all") => void;
  onReset: () => void;
  totalFiltered: number;
  totalAll: number;
}

const ELEMENTS: { id: ElementType; name: string }[] = [
  { id: "pyro", name: "Pyro" },
  { id: "hydro", name: "Hydro" },
  { id: "anemo", name: "Anemo" },
  { id: "electro", name: "Electro" },
  { id: "dendro", name: "Dendro" },
  { id: "cryo", name: "Cryo" },
  { id: "geo", name: "Geo" },
];

const WEAPONS: { id: WeaponType; name: string }[] = [
  { id: "sword", name: "Sword" },
  { id: "claymore", name: "Claymore" },
  { id: "polearm", name: "Polearm" },
  { id: "catalyst", name: "Catalyst" },
  { id: "bow", name: "Bow" },
];

const REGIONS: Region[] = [
  "Mondstadt",
  "Liyue",
  "Inazuma",
  "Sumeru",
  "Fontaine",
  "Natlan",
  "Snezhnaya",
];

export function CharacterFilter({
  searchQuery,
  onSearchChange,
  selectedElement,
  onElementChange,
  selectedWeapon,
  onWeaponChange,
  selectedRarity,
  onRarityChange,
  selectedRegion,
  onRegionChange,
  onReset,
  totalFiltered,
  totalAll,
}: CharacterFilterProps) {
  const isFiltered =
    searchQuery !== "" ||
    selectedElement !== "all" ||
    selectedWeapon !== "all" ||
    selectedRarity !== "all" ||
    selectedRegion !== "all";

  return (
    <div className="w-full space-y-4">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari karakter (misal: Arlecchino, Mitya, Raiden, Furina, Hu Tao)..."
          className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Box */}
      <div className="rounded-2xl bg-slate-900/50 border border-white/10 p-3 sm:p-4 space-y-3">
        {/* Row 1: Element Selector with Official Sigils */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-slate-400 font-semibold flex-shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-amber-400" /> Elemen:
          </span>
          <button
            onClick={() => onElementChange("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
              selectedElement === "all"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-black/30 text-slate-400 hover:text-white border border-white/5"
            }`}
          >
            Semua
          </button>
          {ELEMENTS.map((el) => (
            <button
              key={el.id}
              onClick={() => onElementChange(el.id)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 flex-shrink-0 transition-all capitalize ${
                selectedElement === el.id
                  ? "bg-slate-100 text-slate-950 font-bold shadow-md scale-105"
                  : "bg-black/30 text-slate-400 hover:text-white border border-white/5"
              }`}
            >
              <div className="w-4 h-4 overflow-hidden flex items-center justify-center">
                <Image
                  src={`/assets/elements/${el.id}.svg`}
                  alt={el.name}
                  width={16}
                  height={16}
                  className="w-full h-full object-contain"
                />
              </div>
              <span>{el.name}</span>
            </button>
          ))}
        </div>

        {/* Row 2: Region Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-white/5">
          <span className="text-xs text-slate-400 font-semibold flex-shrink-0 mr-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-sky-400" /> Region:
          </span>
          <button
            onClick={() => onRegionChange("all")}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex-shrink-0 ${
              selectedRegion === "all"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                : "bg-black/20 text-slate-400 hover:text-white border border-white/5"
            }`}
          >
            Semua
          </button>
          {REGIONS.map((reg) => (
            <button
              key={reg}
              onClick={() => onRegionChange(reg)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex-shrink-0 transition-all ${
                selectedRegion === reg
                  ? "bg-sky-500/30 text-sky-200 border border-sky-500/50 font-bold"
                  : "bg-black/20 text-slate-400 hover:text-white border border-white/5"
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Row 3: Weapon & Rarity Selectors */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
          {/* Weapons */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-xs text-slate-400 font-semibold mr-1">Senjata:</span>
            <button
              onClick={() => onWeaponChange("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                selectedWeapon === "all"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-black/20 text-slate-400 hover:text-white border border-white/5"
              }`}
            >
              Semua
            </button>
            {WEAPONS.map((w) => (
              <button
                key={w.id}
                onClick={() => onWeaponChange(w.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize flex items-center gap-1 ${
                  selectedWeapon === w.id
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "bg-black/20 text-slate-400 hover:text-white border border-white/5"
                }`}
              >
                <div className="w-3.5 h-3.5">
                  <Image
                    src={`/assets/weapons/${w.id}.svg`}
                    alt={w.name}
                    width={14}
                    height={14}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span>{w.name}</span>
              </button>
            ))}
          </div>

          {/* Rarity & Reset */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Rarity:</span>
            <button
              onClick={() => onRarityChange("all")}
              className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                selectedRarity === "all"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-black/20 text-slate-400 hover:text-white border border-white/5"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => onRarityChange(5)}
              className={`px-2 py-1 rounded-lg text-xs font-bold ${
                selectedRarity === 5
                  ? "bg-amber-500/30 text-amber-300 border border-amber-500/50"
                  : "bg-black/20 text-amber-400/70 hover:text-amber-300 border border-white/5"
              }`}
            >
              ★ 5
            </button>
            <button
              onClick={() => onRarityChange(4)}
              className={`px-2 py-1 rounded-lg text-xs font-bold ${
                selectedRarity === 4
                  ? "bg-purple-500/30 text-purple-300 border border-purple-500/50"
                  : "bg-black/20 text-purple-400/70 hover:text-purple-300 border border-white/5"
              }`}
            >
              ★ 4
            </button>

            {isFiltered && (
              <button
                onClick={onReset}
                className="ml-2 flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Counter Results */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span>
            Menampilkan <strong className="text-white">{totalFiltered}</strong> dari {totalAll}{" "}
            karakter
          </span>
          {isFiltered && <span className="text-amber-400 text-[11px]">Filter aktif</span>}
        </div>
      </div>
    </div>
  );
}
