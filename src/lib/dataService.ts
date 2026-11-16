import { Character, ActiveBannerPhase, ServerRegion, DayOfWeek, DailyDomainItem } from "@/types";
import { CharacterSchema } from "@/schemas/characterSchema";

// Static Character Imports
import raidenData from "@/data/characters/raiden-shogun.json";
import nahidaData from "@/data/characters/nahida.json";
import furinaData from "@/data/characters/furina.json";
import neuvilletteData from "@/data/characters/neuvillette.json";
import hutaoData from "@/data/characters/hu-tao.json";
import kazuhaData from "@/data/characters/kaedehara-kazuha.json";
import mavuikaData from "@/data/characters/mavuika.json";
import xilonenData from "@/data/characters/xilonen.json";
import bennettData from "@/data/characters/bennett.json";
import xingqiuData from "@/data/characters/xingqiu.json";
import kachinaData from "@/data/characters/kachina.json";
import saraData from "@/data/characters/kujou-sara.json";
import xianglingData from "@/data/characters/xiangling.json";
import chevreuseData from "@/data/characters/chevreuse.json";
import zhongliData from "@/data/characters/zhongli.json";
import arlecchinoData from "@/data/characters/arlecchino.json";
import mityaData from "@/data/characters/mitya.json";

import bannersData from "@/data/banners.json";

const rawCharacters = [
  raidenData,
  nahidaData,
  furinaData,
  neuvilletteData,
  hutaoData,
  kazuhaData,
  mavuikaData,
  xilonenData,
  bennettData,
  xingqiuData,
  kachinaData,
  saraData,
  xianglingData,
  chevreuseData,
  zhongliData,
  arlecchinoData,
  mityaData,
];

// Validate & Cache Characters
let cachedCharacters: Character[] | null = null;

export function getAllCharacters(): Character[] {
  if (cachedCharacters) return cachedCharacters;

  cachedCharacters = rawCharacters.map((char) => {
    const parsed = CharacterSchema.safeParse(char);
    if (!parsed.success) {
      console.warn(`Data validation warning for ${char.id}:`, parsed.error.issues);
      return char as unknown as Character;
    }
    return parsed.data as Character;
  });

  return cachedCharacters;
}

export function getCharacterById(id: string): Character | undefined {
  const characters = getAllCharacters();
  return characters.find((c) => c.id === id);
}

export function getActiveBanners(): {
  currentPatch: string;
  activePhase: 1 | 2;
  currentPhaseData: ActiveBannerPhase;
  allPhases: ActiveBannerPhase[];
} {
  const allPhases = bannersData.phases as ActiveBannerPhase[];
  const currentPhase = allPhases.find((p) => p.phase === bannersData.activePhase) || allPhases[0];

  return {
    currentPatch: bannersData.currentPatch,
    activePhase: bannersData.activePhase as 1 | 2,
    currentPhaseData: currentPhase,
    allPhases,
  };
}

// Server Timezone calculation
export function getServerCurrentDay(region: ServerRegion = "Asia"): DayOfWeek {
  const now = new Date();
  let offsetHours = 8; // Asia default UTC+8
  if (region === "Europe") offsetHours = 1; // UTC+1
  if (region === "America") offsetHours = -5; // UTC-5

  // UTC timestamp + offset in ms
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const serverTime = new Date(utc + 3600000 * offsetHours);

  // Genshin daily reset happens at 04:00 AM server time
  if (serverTime.getHours() < 4) {
    serverTime.setDate(serverTime.getDate() - 1);
  }

  const days: DayOfWeek[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[serverTime.getDay()];
}

export function getDailyDomainSchedule(
  region: ServerRegion = "Asia",
  targetDay?: DayOfWeek
): { day: DayOfWeek; isSundayAllOpen: boolean; domains: DailyDomainItem[] } {
  const activeDay = targetDay || getServerCurrentDay(region);
  const isSunday = activeDay === "Sunday";
  const allCharacters = getAllCharacters();

  // Group characters by bookName & domain
  const domainMap = new Map<string, DailyDomainItem>();

  allCharacters.forEach((char) => {
    const mat = char.materials;
    const isAvailableToday = isSunday || mat.days.includes(activeDay);

    if (isAvailableToday) {
      if (!domainMap.has(mat.bookName)) {
        domainMap.set(mat.bookName, {
          domainName: mat.domain,
          region: char.region,
          bookName: mat.bookName,
          days: mat.days,
          characters: [],
        });
      }

      domainMap.get(mat.bookName)!.characters.push({
        id: char.id,
        name: char.name,
        element: char.element,
        icon: char.icon,
        rarity: char.rarity,
      });
    }
  });

  return {
    day: activeDay,
    isSundayAllOpen: isSunday,
    domains: Array.from(domainMap.values()),
  };
}
