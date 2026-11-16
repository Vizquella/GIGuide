import { z } from "zod";

export const ElementTypeSchema = z.enum([
  "pyro",
  "hydro",
  "anemo",
  "electro",
  "dendro",
  "cryo",
  "geo",
]);

export const WeaponTypeSchema = z.enum([
  "sword",
  "claymore",
  "polearm",
  "catalyst",
  "bow",
]);

export const DayOfWeekSchema = z.enum([
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]);

export const RegionSchema = z.enum([
  "Mondstadt",
  "Liyue",
  "Inazuma",
  "Sumeru",
  "Fontaine",
  "Natlan",
  "Snezhnaya",
]);

export const StatThresholdSchema = z.object({
  min: z.number(),
  recommended: z.number(),
  unit: z.string(),
});

export const TargetEndgameStatsSchema = z.object({
  critRate: StatThresholdSchema,
  critDmg: StatThresholdSchema,
  energyRecharge: StatThresholdSchema,
  elementalMastery: StatThresholdSchema.optional(),
  atk: StatThresholdSchema.optional(),
  hp: StatThresholdSchema.optional(),
  def: StatThresholdSchema.optional(),
});

export const WeaponRecommendationSchema = z.object({
  name: z.string(),
  ranking: z.enum(["BiS", "5-Star Best", "4-Star Best", "F2P"]),
  rarity: z.union([z.literal(3), z.literal(4), z.literal(5)]),
  notes: z.string(),
  icon: z.string().optional(),
});

export const ArtifactSetItemSchema = z.object({
  name: z.string(),
  pieces: z.number(),
  icon: z.string().optional(),
});

export const ArtifactRecommendationSchema = z.object({
  type: z.enum(["4-piece", "2-piece-combo"]),
  sets: z.array(ArtifactSetItemSchema),
  notes: z.string(),
});

export const TeamMemberSchema = z.object({
  characterId: z.string(),
  name: z.string(),
  role: z.string(),
  element: ElementTypeSchema,
  icon: z.string(),
});

export const TeamCompSchema = z.object({
  name: z.string(),
  description: z.string(),
  members: z.array(TeamMemberSchema),
  rotationOrder: z.array(z.string()),
});

export const BuildVariantSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  talentPriority: z.array(z.string()),
  weapons: z.array(WeaponRecommendationSchema),
  artifacts: z.array(ArtifactRecommendationSchema),
  mainStats: z.object({
    sands: z.array(z.string()),
    goblet: z.array(z.string()),
    circlet: z.array(z.string()),
  }),
  subStatsPriority: z.array(z.string()),
  targetEndgameStats: TargetEndgameStatsSchema,
  teamComps: z.array(TeamCompSchema),
});

export const CharacterSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  rarity: z.union([z.literal(4), z.literal(5)]),
  element: ElementTypeSchema,
  weaponType: WeaponTypeSchema,
  region: RegionSchema,
  primaryRole: z.enum(["Main DPS", "Sub-DPS", "Support", "Sustain / Healer"]),
  icon: z.string(),
  splash: z.string().optional(),
  materials: z.object({
    bookName: z.string(),
    days: z.array(DayOfWeekSchema),
    domain: z.string(),
    weeklyBoss: z.string(),
    worldBoss: z.string(),
    localSpecialty: z.string(),
    commonMaterial: z.string(),
    elementalGem: z.string(),
  }),
  builds: z.array(BuildVariantSchema).min(1),
});

export type ValidatedCharacter = z.infer<typeof CharacterSchema>;
