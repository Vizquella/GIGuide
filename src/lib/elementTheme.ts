import { ElementType } from "@/types";

export interface ElementStyle {
  name: string;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
  badgeBg: string;
  gradientBg: string;
}

export const ELEMENT_STYLES: Record<ElementType, ElementStyle> = {
  pyro: {
    name: "Pyro",
    color: "#FF5F33",
    textColor: "text-orange-400",
    bgColor: "bg-[#FF5F33]/15",
    borderColor: "border-[#FF5F33]/30",
    glowColor: "rgba(255, 95, 51, 0.35)",
    badgeBg: "bg-[#FF5F33]/20 text-[#FF8566] border-[#FF5F33]/40",
    gradientBg: "from-[#FF5F33]/20 via-[#FF5F33]/5 to-transparent",
  },
  hydro: {
    name: "Hydro",
    color: "#29ACFF",
    textColor: "text-sky-400",
    bgColor: "bg-[#29ACFF]/15",
    borderColor: "border-[#29ACFF]/30",
    glowColor: "rgba(41, 172, 255, 0.35)",
    badgeBg: "bg-[#29ACFF]/20 text-[#61C2FF] border-[#29ACFF]/40",
    gradientBg: "from-[#29ACFF]/20 via-[#29ACFF]/5 to-transparent",
  },
  anemo: {
    name: "Anemo",
    color: "#44E3B1",
    textColor: "text-emerald-400",
    bgColor: "bg-[#44E3B1]/15",
    borderColor: "border-[#44E3B1]/30",
    glowColor: "rgba(68, 227, 177, 0.35)",
    badgeBg: "bg-[#44E3B1]/20 text-[#72EBC5] border-[#44E3B1]/40",
    gradientBg: "from-[#44E3B1]/20 via-[#44E3B1]/5 to-transparent",
  },
  electro: {
    name: "Electro",
    color: "#BF6EFF",
    textColor: "text-purple-400",
    bgColor: "bg-[#BF6EFF]/15",
    borderColor: "border-[#BF6EFF]/30",
    glowColor: "rgba(191, 110, 255, 0.35)",
    badgeBg: "bg-[#BF6EFF]/20 text-[#D294FF] border-[#BF6EFF]/40",
    gradientBg: "from-[#BF6EFF]/20 via-[#BF6EFF]/5 to-transparent",
  },
  dendro: {
    name: "Dendro",
    color: "#8AD034",
    textColor: "text-lime-400",
    bgColor: "bg-[#8AD034]/15",
    borderColor: "border-[#8AD034]/30",
    glowColor: "rgba(138, 208, 52, 0.35)",
    badgeBg: "bg-[#8AD034]/20 text-[#A6DE5B] border-[#8AD034]/40",
    gradientBg: "from-[#8AD034]/20 via-[#8AD034]/5 to-transparent",
  },
  cryo: {
    name: "Cryo",
    color: "#82D4FF",
    textColor: "text-cyan-300",
    bgColor: "bg-[#82D4FF]/15",
    borderColor: "border-[#82D4FF]/30",
    glowColor: "rgba(130, 212, 255, 0.35)",
    badgeBg: "bg-[#82D4FF]/20 text-[#A8E2FF] border-[#82D4FF]/40",
    gradientBg: "from-[#82D4FF]/20 via-[#82D4FF]/5 to-transparent",
  },
  geo: {
    name: "Geo",
    color: "#F6B83B",
    textColor: "text-amber-400",
    bgColor: "bg-[#F6B83B]/15",
    borderColor: "border-[#F6B83B]/30",
    glowColor: "rgba(246, 184, 59, 0.35)",
    badgeBg: "bg-[#F6B83B]/20 text-[#FFCE68] border-[#F6B83B]/40",
    gradientBg: "from-[#F6B83B]/20 via-[#F6B83B]/5 to-transparent",
  },
};

export function getElementStyle(element: ElementType): ElementStyle {
  return ELEMENT_STYLES[element] || ELEMENT_STYLES.pyro;
}
