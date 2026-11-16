"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ActiveBannerWidget } from "@/components/ActiveBannerWidget";
import { DailyDomainWidget } from "@/components/DailyDomainWidget";
import { CharacterCard } from "@/components/CharacterCard";
import { CharacterFilter } from "@/components/CharacterFilter";
import { getAllCharacters } from "@/lib/dataService";
import { matchesCharacterSearch } from "@/lib/searchHelper";
import { ElementType, WeaponType, Rarity, Region } from "@/types";
import { Sparkles, Users, SearchX } from "lucide-react";

export default function HomePage() {
  const allCharacters = useMemo(() => getAllCharacters(), []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedElement, setSelectedElement] = useState<ElementType | "all">("all");
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponType | "all">("all");
  const [selectedRarity, setSelectedRarity] = useState<Rarity | "all">("all");
  const [selectedRegion, setSelectedRegion] = useState<Region | "all">("all");

  const filteredCharacters = useMemo(() => {
    return allCharacters.filter((char) => {
      // Smart Search Query (with typo tolerance & aliases)
      if (searchQuery.trim() !== "") {
        if (!matchesCharacterSearch(char, searchQuery)) {
          return false;
        }
      }

      // Element Filter
      if (selectedElement !== "all" && char.element !== selectedElement) {
        return false;
      }

      // Weapon Filter
      if (selectedWeapon !== "all" && char.weaponType !== selectedWeapon) {
        return false;
      }

      // Rarity Filter
      if (selectedRarity !== "all" && char.rarity !== selectedRarity) {
        return false;
      }

      // Region Filter
      if (selectedRegion !== "all" && char.region !== selectedRegion) {
        return false;
      }

      return true;
    });
  }, [allCharacters, searchQuery, selectedElement, selectedWeapon, selectedRarity, selectedRegion]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedElement("all");
    setSelectedWeapon("all");
    setSelectedRarity("all");
    setSelectedRegion("all");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0f17] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-14">
        {/* Hero Section */}
        <section className="relative rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900/60 to-purple-500/10 border border-white/10 p-6 sm:p-10 overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Database Panduan Build Genshin Impact Modern</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Rekomendasi Build Karakter &{" "}
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                Kalkulator Resin
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Panduan build modern, varian senjata BiS & F2P, komposisi tim terbaik, jadwal domain
              harian otomatis, serta fitur cek komparasi stat langsung via UID profil in-game.
            </p>
          </div>
        </section>

        {/* Fitur 1: Widget Banner Aktif (Mitya & Furina) */}
        <ActiveBannerWidget />

        {/* Fitur 2: Widget Jadwal Domain Harian */}
        <DailyDomainWidget />

        {/* Character Database Section */}
        <section id="characters" className="w-full scroll-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-amber-500/20 text-amber-400">
                  <Users className="w-4 h-4" />
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Daftar Karakter & Panduan Build
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Pilih karakter untuk melihat varian build (DPS / Support / Hyperbloom), prioritas
                stat, dan kalkulator material.
              </p>
            </div>
          </div>

          {/* Search & Filters */}
          <CharacterFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedElement={selectedElement}
            onElementChange={setSelectedElement}
            selectedWeapon={selectedWeapon}
            onWeaponChange={setSelectedWeapon}
            selectedRarity={selectedRarity}
            onRarityChange={setSelectedRarity}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
            onReset={handleResetFilters}
            totalFiltered={filteredCharacters.length}
            totalAll={allCharacters.length}
          />

          {/* Characters Grid */}
          {filteredCharacters.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCharacters.map((char) => (
                <CharacterCard key={char.id} character={char} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="p-12 text-center rounded-2xl border border-white/10 bg-slate-900/40">
              <SearchX className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">Tidak Ada Karakter Ditemukan</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Tidak ada karakter yang cocok dengan kriteria pencarian dan filter yang Anda pilih.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all shadow-md"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
