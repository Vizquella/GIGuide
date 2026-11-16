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
    color: "#EF4444",
    textColor: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    glowColor: "rgba(239, 68, 68, 0.3)",
    badgeBg: "bg-red-500/20 text-red-300 border-red-500/40",
    gradientBg: "from-red-950/40 via-red-900/10 to-transparent",
  },
  hydro: {
    name: "Hydro",
    color: "#0284C7",
    textColor: "text-sky-400",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    glowColor: "rgba(2, 132, 199, 0.3)",
    badgeBg: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    gradientBg: "from-sky-950/40 via-sky-900/10 to-transparent",
  },
  anemo: {
    name: "Anemo",
    color: "#10B981",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    glowColor: "rgba(16, 185, 129, 0.3)",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    gradientBg: "from-emerald-950/40 via-emerald-900/10 to-transparent",
  },
  electro: {
    name: "Electro",
    color: "#A855F7",
    textColor: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    glowColor: "rgba(168, 85, 247, 0.3)",
    badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    gradientBg: "from-purple-950/40 via-purple-900/10 to-transparent",
  },
  dendro: {
    name: "Dendro",
    color: "#84CC16",
    textColor: "text-lime-400",
    bgColor: "bg-lime-500/10",
    borderColor: "border-lime-500/30",
    glowColor: "rgba(132, 204, 22, 0.3)",
    badgeBg: "bg-lime-500/20 text-lime-300 border-lime-500/40",
    gradientBg: "from-lime-950/40 via-lime-900/10 to-transparent",
  },
  cryo: {
    name: "Cryo",
    color: "#06B6D4",
    textColor: "text-cyan-300",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    glowColor: "rgba(6, 182, 212, 0.3)",
    badgeBg: "bg-cyan-500/20 text-cyan-200 border-cyan-500/40",
    gradientBg: "from-cyan-950/40 via-cyan-900/10 to-transparent",
  },
  geo: {
    name: "Geo",
    color: "#F59E0B",
    textColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    glowColor: "rgba(245, 158, 11, 0.3)",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    gradientBg: "from-amber-950/40 via-amber-900/10 to-transparent",
  },
};

export function getElementStyle(element: ElementType): ElementStyle {
  return ELEMENT_STYLES[element] || ELEMENT_STYLES.pyro;
}
