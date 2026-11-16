import { Character } from "@/types";

// Common aliases, nicknames, and typo variants for Genshin characters
const CHARACTER_ALIASES: Record<string, string[]> = {
  "arlecchino": [
    "arlechinno",
    "arlechino",
    "the knave",
    "knave",
    "father",
    "bapak",
    "peruere",
  ],
  "raiden-shogun": [
    "raiden",
    "ei",
    "shogun",
    "baal",
    "electro archon",
    "makoto",
  ],
  "furina": [
    "focalors",
    "hydro archon",
    "salon solitaire",
  ],
  "nahida": [
    "kusanali",
    "dendro archon",
    "lesser lord",
    "buer",
  ],
  "neuvillette": [
    "iudex",
    "hydro dragon",
    "dragon sovereign",
    "sovereign",
  ],
  "hu-tao": [
    "hutao",
    "walnut",
    "director hu",
  ],
  "kaedehara-kazuha": [
    "kazuha",
    "kazoo",
    "ronin",
  ],
  "zhongli": [
    "morax",
    "rex lapis",
    "geo archon",
    "shield bot",
  ],
  "mitya": [
    "dimitri",
    "dmitry",
    "snezhnaya",
  ],
  "mavuika": [
    "pyro archon",
    "habringer",
  ],
  "xilonen": [
    "roller",
    "dj",
    "children of echoes",
  ],
  "bennett": [
    "benny",
    "archon pyro bintang 6",
    "bouken da bouken",
  ],
  "xingqiu": [
    "water boy",
    "feiyun",
    "raincutter",
  ],
  "xiangling": [
    "pyronado",
    "guoba",
    "chef",
  ],
  "chevreuse": [
    "musket",
    "special patrol",
  ],
  "kachina": [
    "turbo twirly",
  ],
  "kujou-sara": [
    "sara",
    "tengu",
  ],
};

// Simple Levenshtein distance for fuzzy matching typos (e.g. arlechinno -> arlecchino)
function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}

export function matchesCharacterSearch(char: Character, rawQuery: string): boolean {
  if (!rawQuery.trim()) return true;

  const q = rawQuery.toLowerCase().trim();
  const name = char.name.toLowerCase();
  const id = char.id.toLowerCase();
  const title = char.title.toLowerCase();
  const role = char.primaryRole.toLowerCase();
  const region = char.region.toLowerCase();
  const element = char.element.toLowerCase();

  // 1. Direct Substring
  if (
    name.includes(q) ||
    id.includes(q) ||
    title.includes(q) ||
    role.includes(q) ||
    region.includes(q) ||
    element.includes(q)
  ) {
    return true;
  }

  // 2. Alias match
  const aliases = CHARACTER_ALIASES[char.id] || [];
  for (const alias of aliases) {
    if (alias.includes(q) || q.includes(alias)) {
      return true;
    }
  }

  // 3. Typo-tolerant matching (Levenshtein distance <= 2 for words >= 5 letters)
  if (q.length >= 5) {
    // compare query to name words
    const nameWords = name.split(" ");
    for (const word of nameWords) {
      if (Math.abs(word.length - q.length) <= 2) {
        const dist = levenshteinDistance(word, q);
        if (dist <= 2) return true;
      }
    }

    // compare against aliases
    for (const alias of aliases) {
      if (Math.abs(alias.length - q.length) <= 2) {
        const dist = levenshteinDistance(alias, q);
        if (dist <= 2) return true;
      }
    }
  }

  return false;
}
