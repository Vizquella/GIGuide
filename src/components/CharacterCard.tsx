import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Swords, Sparkles, Layers } from "lucide-react";
import { Character } from "@/types";
import { getElementStyle } from "@/lib/elementTheme";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const style = getElementStyle(character.element);
  const primaryBuild = character.builds[0];
  const topWeapon = primaryBuild?.weapons[0];
  const topArtifact = primaryBuild?.artifacts[0]?.sets[0];

  return (
    <Link
      href={`/character/${character.id}`}
      className={`group relative rounded-2xl border ${style.borderColor} bg-slate-900/70 p-3.5 sm:p-4 hover:border-amber-400/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden`}
    >
      {/* Background Subtle Gradient Glow */}
      <div
        className="absolute -right-8 -top-8 w-28 h-28 rounded-full blur-2xl opacity-15 pointer-events-none group-hover:opacity-35 transition-opacity"
        style={{ backgroundColor: style.color }}
      />

      <div>
        {/* Top Header: Avatar, Name, Rarity & Element */}
        <div className="flex items-start gap-3">
          {/* Avatar with Rarity Border */}
          <div
            className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 ${
              character.rarity === 5 ? "border-amber-400/60" : "border-purple-400/60"
            } bg-slate-950 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform`}
          >
            <Image
              src={character.icon}
              alt={character.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
            {/* Element Icon Badge */}
            <div
              className={`absolute top-1 left-1 w-5 h-5 rounded-md bg-black/85 p-0.5 border ${style.borderColor} shadow-sm backdrop-blur-sm flex items-center justify-center`}
            >
              <Image
                src={`/assets/elements/${character.element}.svg`}
                alt={character.element}
                width={16}
                height={16}
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  character.rarity === 5
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                }`}
              >
                {character.rarity === 5 ? "★★★★★" : "★★★★"}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${style.badgeBg} capitalize flex items-center gap-1`}
              >
                <span className="w-2.5 h-2.5 inline-block">
                  <Image
                    src={`/assets/elements/${character.element}.svg`}
                    alt=""
                    width={10}
                    height={10}
                    className="w-full h-full object-contain"
                  />
                </span>
                {character.element}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-white mt-1 group-hover:text-amber-300 transition-colors truncate">
              {character.name}
            </h3>

            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
              <span className="capitalize flex items-center gap-1">
                <Swords className="w-3 h-3 text-slate-400" />
                {character.weaponType}
              </span>
              <span>•</span>
              <span className="text-slate-300 font-medium">{character.primaryRole}</span>
            </div>
          </div>
        </div>

        {/* Quick Build Summary Highlights (Mobile compact) */}
        <div className="mt-3.5 space-y-1.5 pt-3 border-t border-white/5 text-[11px]">
          {topWeapon && (
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> BiS Weapon:
              </span>
              <span className="font-semibold text-slate-200 truncate max-w-[140px] text-right">
                {topWeapon.name}
              </span>
            </div>
          )}

          {topArtifact && (
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
                <Layers className="w-3 h-3 text-sky-400" /> Best Artifact:
              </span>
              <span className="font-semibold text-slate-200 truncate max-w-[140px] text-right">
                {topArtifact.name}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Pill: Variant Count & Arrow */}
      <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/5 text-slate-400">
          {character.builds.length} Varian Build
        </span>
        <span className="text-xs font-bold text-amber-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
          Lihat Build <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
