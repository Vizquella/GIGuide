import { TargetEndgameStats } from "@/types";
import enkaCharMap from "@/data/enkaCharactersMap.json";
import enkaLoc from "@/data/enkaLocalization.json";

export interface ParsedEnkaCharacter {
  avatarId: number;
  characterId: string;
  name: string;
  level: number;
  rarity: number;
  element: string;
  icon: string;
  friendship: number;
  constellation: number;
  weapon: {
    name: string;
    level: number;
    refinement: number;
    rarity: number;
    icon?: string;
  };
  artifacts: {
    setName: string;
    pieceName: string;
    slot: string;
    mainStat: string;
  }[];
  stats: {
    maxHp: number;
    atk: number;
    def: number;
    elementalMastery: number;
    critRate: number;
    critDmg: number;
    energyRecharge: number;
    elementalDmg: number;
    elementalType: string;
  };
}

export interface StatComparisonItem {
  name: string;
  userValue: number;
  targetMin: number;
  targetRec: number;
  unit: string;
  diff: number;
  status: "optimal" | "warning" | "danger";
  statusText: string;
}

export interface BuildEvaluationResult {
  overallScore: number; // 0 - 100
  ratingTitle: string;
  verdict: string;
  comparisons: StatComparisonItem[];
  tips: string[];
}

// Translate TextMapHash into human readable name (Indonesian / English)
export function getLocalizedText(hash: string | number | undefined): string {
  if (!hash) return "";
  const key = String(hash);
  const locMap = enkaLoc as Record<string, string>;
  return locMap[key] || "";
}

// Get Character Meta from all 134 Enka mapped characters
export function getEnkaCharacterMeta(avatarId: number | string) {
  const map = enkaCharMap as Record<
    string,
    {
      id: string;
      name: string;
      element: string;
      weaponType: string;
      rarity: number;
      iconName: string;
    }
  >;
  return map[String(avatarId)];
}

// Default benchmark for characters that don't have a dedicated build guide yet
export const DEFAULT_GENERAL_BENCHMARK: TargetEndgameStats = {
  critRate: { min: 55, recommended: 70, unit: "%" },
  critDmg: { min: 120, recommended: 150, unit: "%" },
  energyRecharge: { min: 130, recommended: 160, unit: "%" },
  atk: { min: 1600, recommended: 1900, unit: "" },
};

export function evaluateCharacterStats(
  userStats: ParsedEnkaCharacter["stats"],
  targetStats: TargetEndgameStats
): BuildEvaluationResult {
  const comparisons: StatComparisonItem[] = [];
  const tips: string[] = [];

  let passedPoints = 0;
  let totalMetrics = 0;

  // 1. CRIT Rate
  const cr = userStats.critRate;
  const crMin = targetStats.critRate.min;
  const crRec = targetStats.critRate.recommended;
  totalMetrics++;
  if (cr >= crRec) {
    passedPoints += 100;
    comparisons.push({
      name: "CRIT Rate",
      userValue: Number(cr.toFixed(1)),
      targetMin: crMin,
      targetRec: crRec,
      unit: "%",
      diff: Number((cr - crRec).toFixed(1)),
      status: "optimal",
      statusText: "Optimal",
    });
  } else if (cr >= crMin) {
    passedPoints += 70;
    comparisons.push({
      name: "CRIT Rate",
      userValue: Number(cr.toFixed(1)),
      targetMin: crMin,
      targetRec: crRec,
      unit: "%",
      diff: Number((cr - crRec).toFixed(1)),
      status: "warning",
      statusText: "Cukup",
    });
    tips.push(
      `CRIT Rate (${cr.toFixed(1)}%) sudah di atas ambang minimal (${crMin}%), namun tingkatkan menuju ${crRec}% untuk konsistensi serangan.`
    );
  } else {
    passedPoints += 30;
    comparisons.push({
      name: "CRIT Rate",
      userValue: Number(cr.toFixed(1)),
      targetMin: crMin,
      targetRec: crRec,
      unit: "%",
      diff: Number((cr - crRec).toFixed(1)),
      status: "danger",
      statusText: "Kurang",
    });
    tips.push(
      `Prioritas: CRIT Rate masih rendah (${cr.toFixed(1)}%). Pertimbangkan Circlet dengan main stat CRIT Rate.`
    );
  }

  // 2. CRIT DMG
  const cd = userStats.critDmg;
  const cdMin = targetStats.critDmg.min;
  const cdRec = targetStats.critDmg.recommended;
  totalMetrics++;
  if (cd >= cdRec) {
    passedPoints += 100;
    comparisons.push({
      name: "CRIT DMG",
      userValue: Number(cd.toFixed(1)),
      targetMin: cdMin,
      targetRec: cdRec,
      unit: "%",
      diff: Number((cd - cdRec).toFixed(1)),
      status: "optimal",
      statusText: "Optimal",
    });
  } else if (cd >= cdMin) {
    passedPoints += 70;
    comparisons.push({
      name: "CRIT DMG",
      userValue: Number(cd.toFixed(1)),
      targetMin: cdMin,
      targetRec: cdRec,
      unit: "%",
      diff: Number((cd - cdRec).toFixed(1)),
      status: "warning",
      statusText: "Cukup",
    });
  } else {
    passedPoints += 30;
    comparisons.push({
      name: "CRIT DMG",
      userValue: Number(cd.toFixed(1)),
      targetMin: cdMin,
      targetRec: cdRec,
      unit: "%",
      diff: Number((cd - cdRec).toFixed(1)),
      status: "danger",
      statusText: "Kurang",
    });
    tips.push(`CRIT DMG (${cd.toFixed(1)}%) masih di bawah target (${cdRec}%). Cari substat CRIT DMG pada Flower dan Feather.`);
  }

  // 3. Energy Recharge
  const er = userStats.energyRecharge;
  const erMin = targetStats.energyRecharge.min;
  const erRec = targetStats.energyRecharge.recommended;
  totalMetrics++;
  if (er >= erRec) {
    passedPoints += 100;
    comparisons.push({
      name: "Energy Recharge",
      userValue: Number(er.toFixed(1)),
      targetMin: erMin,
      targetRec: erRec,
      unit: "%",
      diff: Number((er - erRec).toFixed(1)),
      status: "optimal",
      statusText: "Optimal",
    });
  } else if (er >= erMin) {
    passedPoints += 75;
    comparisons.push({
      name: "Energy Recharge",
      userValue: Number(er.toFixed(1)),
      targetMin: erMin,
      targetRec: erRec,
      unit: "%",
      diff: Number((er - erRec).toFixed(1)),
      status: "warning",
      statusText: "Cukup",
    });
  } else {
    passedPoints += 20;
    comparisons.push({
      name: "Energy Recharge",
      userValue: Number(er.toFixed(1)),
      targetMin: erMin,
      targetRec: erRec,
      unit: "%",
      diff: Number((er - erRec).toFixed(1)),
      status: "danger",
      statusText: "Kurang",
    });
    tips.push(`Penting: Energy Recharge (${er.toFixed(1)}%) di bawah target (${erRec}%). Burst Anda berisiko terhambat tiap rotasi.`);
  }

  // 4. Elemental Mastery
  if (targetStats.elementalMastery) {
    const em = userStats.elementalMastery;
    const emMin = targetStats.elementalMastery.min || 0;
    const emRec = targetStats.elementalMastery.recommended;
    totalMetrics++;
    if (em >= emRec) {
      passedPoints += 100;
      comparisons.push({
        name: "Elemental Mastery",
        userValue: em,
        targetMin: emMin,
        targetRec: emRec,
        unit: "",
        diff: em - emRec,
        status: "optimal",
        statusText: "Optimal",
      });
    } else if (em >= emMin) {
      passedPoints += 65;
      comparisons.push({
        name: "Elemental Mastery",
        userValue: em,
        targetMin: emMin,
        targetRec: emRec,
        unit: "",
        diff: em - emRec,
        status: "warning",
        statusText: "Cukup",
      });
    } else {
      passedPoints += 25;
      comparisons.push({
        name: "Elemental Mastery",
        userValue: em,
        targetMin: emMin,
        targetRec: emRec,
        unit: "",
        diff: em - emRec,
        status: "danger",
        statusText: "Kurang",
      });
      tips.push(`Elemental Mastery (${em}) masih kurang dari target reaksi (${emRec}).`);
    }
  }

  // 5. HP
  if (targetStats.hp) {
    const hp = userStats.maxHp;
    const hpMin = targetStats.hp.min || 0;
    const hpRec = targetStats.hp.recommended;
    totalMetrics++;
    if (hp >= hpRec) {
      passedPoints += 100;
      comparisons.push({
        name: "Total HP",
        userValue: Math.round(hp),
        targetMin: hpMin,
        targetRec: hpRec,
        unit: "",
        diff: Math.round(hp - hpRec),
        status: "optimal",
        statusText: "Optimal",
      });
    } else {
      passedPoints += Math.max(30, Math.round((hp / hpRec) * 100));
      comparisons.push({
        name: "Total HP",
        userValue: Math.round(hp),
        targetMin: hpMin,
        targetRec: hpRec,
        unit: "",
        diff: Math.round(hp - hpRec),
        status: hp >= hpMin ? "warning" : "danger",
        statusText: hp >= hpMin ? "Cukup" : "Kurang",
      });
    }
  }

  // 6. DEF
  if (targetStats.def) {
    const def = userStats.def;
    const defMin = targetStats.def.min || 0;
    const defRec = targetStats.def.recommended;
    totalMetrics++;
    if (def >= defRec) {
      passedPoints += 100;
      comparisons.push({
        name: "Total DEF",
        userValue: Math.round(def),
        targetMin: defMin,
        targetRec: defRec,
        unit: "",
        diff: Math.round(def - defRec),
        status: "optimal",
        statusText: "Optimal",
      });
    } else {
      passedPoints += Math.max(30, Math.round((def / defRec) * 100));
      comparisons.push({
        name: "Total DEF",
        userValue: Math.round(def),
        targetMin: defMin,
        targetRec: defRec,
        unit: "",
        diff: Math.round(def - defRec),
        status: def >= defMin ? "warning" : "danger",
        statusText: def >= defMin ? "Cukup" : "Kurang",
      });
    }
  }

  const overallScore = Math.min(100, Math.round(passedPoints / totalMetrics));

  let ratingTitle = "Grade S (Endgame Ready)";
  let verdict = "Build karakter Anda sudah sangat seimbang dan siap mendominasi Spiral Abyss Floor 12!";
  if (overallScore < 60) {
    ratingTitle = "Grade C (Butuh Perbaikan)";
    verdict = "Masih terdapat beberapa stat kunci yang belum mencapai ambang minimal. Fokus perbaiki prioritas di bawah.";
  } else if (overallScore < 85) {
    ratingTitle = "Grade A (Sangat Layak)";
    verdict = "Karakter Anda sudah sangat kompeten untuk sebagian besar konten game, hanya butuh sedikit min-maxing substat.";
  }

  if (tips.length === 0) {
    tips.push("Seluruh stat kunci Anda telah memenuhi standar rekomendasi target build GIGuide!");
  }

  return {
    overallScore,
    ratingTitle,
    verdict,
    comparisons,
    tips,
  };
}

// Demo Showcase data with real assets and clear names
export const DEMO_SHOWCASE_CHARACTERS: ParsedEnkaCharacter[] = [
  {
    avatarId: 10000052,
    characterId: "raiden-shogun",
    name: "Raiden Shogun",
    level: 90,
    rarity: 5,
    element: "electro",
    icon: "/assets/characters/raiden-shogun.png",
    friendship: 10,
    constellation: 2,
    weapon: {
      name: "The Catch",
      level: 90,
      refinement: 5,
      rarity: 4,
    },
    artifacts: [
      { setName: "Emblem of Severed Fate", pieceName: "Magnificent Tsuba", slot: "Flower", mainStat: "HP" },
      { setName: "Emblem of Severed Fate", pieceName: "Sundered Feather", slot: "Plume", mainStat: "ATK" },
      { setName: "Emblem of Severed Fate", pieceName: "Storm Cage", slot: "Sands", mainStat: "Energy Recharge%" },
      { setName: "Emblem of Severed Fate", pieceName: "Scarlet Vessel", slot: "Goblet", mainStat: "Electro DMG Bonus%" },
      { setName: "Gladiator's Finale", pieceName: "Triumphus", slot: "Circlet", mainStat: "CRIT Rate%" },
    ],
    stats: {
      maxHp: 19800,
      atk: 1740,
      def: 820,
      elementalMastery: 72,
      critRate: 64.2,
      critDmg: 148.6,
      energyRecharge: 262.4,
      elementalDmg: 82.5,
      elementalType: "Electro",
    },
  },
  {
    avatarId: 10000089,
    characterId: "furina",
    name: "Furina",
    level: 90,
    rarity: 5,
    element: "hydro",
    icon: "/assets/characters/furina.png",
    friendship: 10,
    constellation: 1,
    weapon: {
      name: "Fleuve Cendre Ferryman",
      level: 90,
      refinement: 5,
      rarity: 4,
    },
    artifacts: [
      { setName: "Golden Troupe", pieceName: "Golden Song", slot: "Flower", mainStat: "HP" },
      { setName: "Golden Troupe", pieceName: "Golden Plume", slot: "Plume", mainStat: "ATK" },
      { setName: "Golden Troupe", pieceName: "Golden Clock", slot: "Sands", mainStat: "HP%" },
      { setName: "Golden Troupe", pieceName: "Golden Goblet", slot: "Goblet", mainStat: "Hydro DMG%" },
      { setName: "Marechaussee Hunter", pieceName: "Circlet", slot: "Circlet", mainStat: "CRIT DMG%" },
    ],
    stats: {
      maxHp: 38200,
      atk: 1150,
      def: 740,
      elementalMastery: 40,
      critRate: 72.5,
      critDmg: 165.2,
      energyRecharge: 184.0,
      elementalDmg: 46.6,
      elementalType: "Hydro",
    },
  },
  {
    avatarId: 10000087,
    characterId: "neuvillette",
    name: "Neuvillette",
    level: 90,
    rarity: 5,
    element: "hydro",
    icon: "/assets/characters/neuvillette.png",
    friendship: 10,
    constellation: 1,
    weapon: {
      name: "Prototype Amber",
      level: 90,
      refinement: 5,
      rarity: 4,
    },
    artifacts: [
      { setName: "Marechaussee Hunter", pieceName: "Hunter Flower", slot: "Flower", mainStat: "HP" },
      { setName: "Marechaussee Hunter", pieceName: "Hunter Feather", slot: "Plume", mainStat: "ATK" },
      { setName: "Marechaussee Hunter", pieceName: "Hunter Clock", slot: "Sands", mainStat: "HP%" },
      { setName: "Marechaussee Hunter", pieceName: "Hunter Goblet", slot: "Goblet", mainStat: "HP%" },
      { setName: "Heart of Depth", pieceName: "Circlet", slot: "Circlet", mainStat: "CRIT DMG%" },
    ],
    stats: {
      maxHp: 41200,
      atk: 1200,
      def: 680,
      elementalMastery: 20,
      critRate: 58.4,
      critDmg: 236.8,
      energyRecharge: 124.0,
      elementalDmg: 28.8,
      elementalType: "Hydro",
    },
  },
  {
    avatarId: 10000023,
    characterId: "xiangling",
    name: "Xiangling",
    level: 90,
    rarity: 4,
    element: "pyro",
    icon: "/assets/characters/xiangling.png",
    friendship: 10,
    constellation: 6,
    weapon: {
      name: "The Catch",
      level: 90,
      refinement: 5,
      rarity: 4,
    },
    artifacts: [
      { setName: "Emblem of Severed Fate", pieceName: "Flower", slot: "Flower", mainStat: "HP" },
      { setName: "Emblem of Severed Fate", pieceName: "Plume", slot: "Plume", mainStat: "ATK" },
      { setName: "Emblem of Severed Fate", pieceName: "Sands", slot: "Sands", mainStat: "Energy Recharge%" },
      { setName: "Emblem of Severed Fate", pieceName: "Goblet", slot: "Goblet", mainStat: "Pyro DMG Bonus%" },
      { setName: "Crimson Witch", pieceName: "Circlet", slot: "Circlet", mainStat: "CRIT Rate%" },
    ],
    stats: {
      maxHp: 18500,
      atk: 1420,
      def: 790,
      elementalMastery: 185,
      critRate: 62.4,
      critDmg: 142.0,
      energyRecharge: 215.0,
      elementalDmg: 61.6,
      elementalType: "Pyro",
    },
  },
];
