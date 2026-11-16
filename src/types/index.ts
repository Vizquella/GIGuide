export type ElementType =
  | "pyro"
  | "hydro"
  | "anemo"
  | "electro"
  | "dendro"
  | "cryo"
  | "geo";

export type WeaponType = "sword" | "claymore" | "polearm" | "catalyst" | "bow";

export type Rarity = 4 | 5;

export type Region =
  | "Mondstadt"
  | "Liyue"
  | "Inazuma"
  | "Sumeru"
  | "Fontaine"
  | "Natlan"
  | "Snezhnaya";

export type CharacterRole = "Main DPS" | "Sub-DPS" | "Support" | "Sustain / Healer";

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface TalentAscensionData {
  bookName: string;
  days: DayOfWeek[];
  domain: string;
  weeklyBoss: string;
  worldBoss: string;
  localSpecialty: string;
  commonMaterial: string;
  elementalGem: string;
}

export type WeaponRanking = "BiS" | "5-Star Best" | "4-Star Best" | "F2P";

export interface WeaponRecommendation {
  name: string;
  ranking: WeaponRanking;
  rarity: 3 | 4 | 5;
  notes: string;
  icon?: string;
}

export interface ArtifactSetItem {
  name: string;
  pieces: number;
  icon?: string;
}

export interface ArtifactRecommendation {
  type: "4-piece" | "2-piece-combo";
  sets: ArtifactSetItem[];
  notes: string;
}

export interface MainStats {
  sands: string[];
  goblet: string[];
  circlet: string[];
}

export interface StatThreshold {
  min: number;
  recommended: number;
  unit: string;
}

export interface TargetEndgameStats {
  critRate: StatThreshold;
  critDmg: StatThreshold;
  energyRecharge: StatThreshold;
  elementalMastery?: StatThreshold;
  atk?: StatThreshold;
  hp?: StatThreshold;
  def?: StatThreshold;
}

export interface TeamMember {
  characterId: string;
  name: string;
  role: string;
  element: ElementType;
  icon: string;
}

export interface TeamComp {
  name: string;
  description: string;
  members: TeamMember[];
  rotationOrder: string[];
}

export interface BuildVariant {
  id: string;
  name: string;
  description: string;
  talentPriority: string[];
  weapons: WeaponRecommendation[];
  artifacts: ArtifactRecommendation[];
  mainStats: MainStats;
  subStatsPriority: string[];
  targetEndgameStats: TargetEndgameStats;
  teamComps: TeamComp[];
}

export interface Character {
  id: string;
  name: string;
  title: string;
  rarity: Rarity;
  element: ElementType;
  weaponType: WeaponType;
  region: Region;
  primaryRole: CharacterRole;
  icon: string;
  splash?: string;
  materials: TalentAscensionData;
  builds: BuildVariant[];
}

export interface BannerCharacter {
  id: string;
  name: string;
  element: ElementType;
  weaponType: WeaponType;
  icon: string;
  bannerTitle?: string;
}

export interface BannerWeapon {
  name: string;
  type: WeaponType;
  rarity: 4 | 5;
  icon: string;
}

export interface ActiveBannerPhase {
  patch: string;
  phase: 1 | 2;
  title: string;
  startDate: string;
  endDate: string;
  characters5Star: BannerCharacter[];
  characters4Star: BannerCharacter[];
  weapons5Star: BannerWeapon[];
  weapons4Star: BannerWeapon[];
}

export type ServerRegion = "Asia" | "America" | "Europe";

export interface DailyDomainItem {
  domainName: string;
  region: Region;
  bookName: string;
  days: DayOfWeek[];
  characters: {
    id: string;
    name: string;
    element: ElementType;
    icon: string;
    rarity: Rarity;
  }[];
}
