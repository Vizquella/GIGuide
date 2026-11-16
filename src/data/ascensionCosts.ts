// Data konstanta kebutuhan Ascension dan Talent Karakter Genshin Impact

export interface LevelMilestone {
  level: number;
  expNeeded: number; // EXP dari level sebelumnya ke level ini
  herosWit: number;
  levelingMora: number;
}

// Total EXP per bracket
export const LEVEL_EXP_TABLE: { [key: number]: { exp: number; herosWit: number; mora: number } } = {
  20: { exp: 120175, herosWit: 6, mora: 24000 },
  40: { exp: 578325, herosWit: 29, mora: 115800 },
  50: { exp: 579100, herosWit: 29, mora: 116000 },
  60: { exp: 854125, herosWit: 43, mora: 171000 },
  70: { exp: 1195925, herosWit: 60, mora: 239200 },
  80: { exp: 1611875, herosWit: 81, mora: 322400 },
  90: { exp: 3423125, herosWit: 171, mora: 684600 },
};

// Ascension Phase requirements
export const ASCENSION_PHASES = [
  {
    phase: 1,
    unlockLevel: 20,
    mora: 20000,
    gemTier: "sliver",
    gemCount: 1,
    bossMatCount: 0,
    specialtyCount: 3,
    commonGrey: 3,
    commonGreen: 0,
    commonBlue: 0,
  },
  {
    phase: 2,
    unlockLevel: 40,
    mora: 40000,
    gemTier: "fragment",
    gemCount: 3,
    bossMatCount: 2,
    specialtyCount: 10,
    commonGrey: 15,
    commonGreen: 0,
    commonBlue: 0,
  },
  {
    phase: 3,
    unlockLevel: 50,
    mora: 60000,
    gemTier: "fragment",
    gemCount: 6,
    bossMatCount: 4,
    specialtyCount: 20,
    commonGrey: 0,
    commonGreen: 12,
    commonBlue: 0,
  },
  {
    phase: 4,
    unlockLevel: 60,
    mora: 80000,
    gemTier: "chunk",
    gemCount: 3,
    bossMatCount: 8,
    specialtyCount: 30,
    commonGrey: 0,
    commonGreen: 18,
    commonBlue: 0,
  },
  {
    phase: 5,
    unlockLevel: 70,
    mora: 100000,
    gemTier: "chunk",
    gemCount: 6,
    bossMatCount: 12,
    specialtyCount: 45,
    commonGrey: 0,
    commonGreen: 0,
    commonBlue: 12,
  },
  {
    phase: 6,
    unlockLevel: 80,
    mora: 120000,
    gemTier: "gemstone",
    gemCount: 6,
    bossMatCount: 20,
    specialtyCount: 60,
    commonGrey: 0,
    commonGreen: 0,
    commonBlue: 24,
  },
];

// Talent per-level requirement (Level current -> current + 1)
export const TALENT_LEVEL_COSTS = [
  { level: 2, mora: 12500, teachings: 3, guides: 0, philosophies: 0, commonGrey: 6, commonGreen: 0, commonBlue: 0, weeklyBoss: 0, crown: 0 },
  { level: 3, mora: 17500, teachings: 0, guides: 2, philosophies: 0, commonGrey: 0, commonGreen: 3, commonBlue: 0, weeklyBoss: 0, crown: 0 },
  { level: 4, mora: 25000, teachings: 0, guides: 4, philosophies: 0, commonGrey: 0, commonGreen: 4, commonBlue: 0, weeklyBoss: 0, crown: 0 },
  { level: 5, mora: 30000, teachings: 0, guides: 6, philosophies: 0, commonGrey: 0, commonGreen: 6, commonBlue: 0, weeklyBoss: 0, crown: 0 },
  { level: 6, mora: 37500, teachings: 0, guides: 9, philosophies: 0, commonGrey: 0, commonGreen: 9, commonBlue: 0, weeklyBoss: 0, crown: 0 },
  { level: 7, mora: 120000, teachings: 0, guides: 0, philosophies: 4, commonGrey: 0, commonGreen: 0, commonBlue: 4, weeklyBoss: 1, crown: 0 },
  { level: 8, mora: 260000, teachings: 0, guides: 0, philosophies: 6, commonGrey: 0, commonGreen: 0, commonBlue: 6, weeklyBoss: 1, crown: 0 },
  { level: 9, mora: 450000, teachings: 0, guides: 0, philosophies: 12, commonGrey: 0, commonGreen: 0, commonBlue: 9, weeklyBoss: 2, crown: 0 },
  { level: 10, mora: 700000, teachings: 0, guides: 0, philosophies: 16, commonGrey: 0, commonGreen: 0, commonBlue: 12, weeklyBoss: 2, crown: 1 },
];

export interface CalculationInput {
  currentLevel: number;
  targetLevel: number;
  currentNormalAttack: number;
  targetNormalAttack: number;
  currentSkill: number;
  targetSkill: number;
  currentBurst: number;
  targetBurst: number;
}

export interface CalculationResult {
  totalMora: number;
  herosWit: number;
  slivers: number;
  fragments: number;
  chunks: number;
  gemstones: number;
  bossMaterials: number;
  localSpecialties: number;
  commonGrey: number;
  commonGreen: number;
  commonBlue: number;
  talentTeachings: number;
  talentGuides: number;
  talentPhilosophies: number;
  weeklyBossMaterials: number;
  crownsOfInsight: number;
  estimatedResin: number;
  estimatedDays: number;
}

export function calculateAscensionMaterials(input: CalculationInput): CalculationResult {
  const result: CalculationResult = {
    totalMora: 0,
    herosWit: 0,
    slivers: 0,
    fragments: 0,
    chunks: 0,
    gemstones: 0,
    bossMaterials: 0,
    localSpecialties: 0,
    commonGrey: 0,
    commonGreen: 0,
    commonBlue: 0,
    talentTeachings: 0,
    talentGuides: 0,
    talentPhilosophies: 0,
    weeklyBossMaterials: 0,
    crownsOfInsight: 0,
    estimatedResin: 0,
    estimatedDays: 0,
  };

  // 1. Character Leveling EXP & Mora
  const milestones = [20, 40, 50, 60, 70, 80, 90];
  for (const ms of milestones) {
    if (input.currentLevel < ms && input.targetLevel >= ms) {
      const data = LEVEL_EXP_TABLE[ms];
      if (data) {
        result.herosWit += data.herosWit;
        result.totalMora += data.mora;
      }
    }
  }

  // 2. Character Ascension Phase
  for (const phase of ASCENSION_PHASES) {
    if (input.currentLevel <= phase.unlockLevel && input.targetLevel > phase.unlockLevel) {
      result.totalMora += phase.mora;
      result.bossMaterials += phase.bossMatCount;
      result.localSpecialties += phase.specialtyCount;
      result.commonGrey += phase.commonGrey;
      result.commonGreen += phase.commonGreen;
      result.commonBlue += phase.commonBlue;

      if (phase.gemTier === "sliver") result.slivers += phase.gemCount;
      if (phase.gemTier === "fragment") result.fragments += phase.gemCount;
      if (phase.gemTier === "chunk") result.chunks += phase.gemCount;
      if (phase.gemTier === "gemstone") result.gemstones += phase.gemCount;
    }
  }

  // 3. Talent Calculator helper
  const addTalentCosts = (current: number, target: number) => {
    for (const cost of TALENT_LEVEL_COSTS) {
      if (cost.level > current && cost.level <= target) {
        result.totalMora += cost.mora;
        result.talentTeachings += cost.teachings;
        result.talentGuides += cost.guides;
        result.talentPhilosophies += cost.philosophies;
        result.commonGrey += cost.commonGrey;
        result.commonGreen += cost.commonGreen;
        result.commonBlue += cost.commonBlue;
        result.weeklyBossMaterials += cost.weeklyBoss;
        result.crownsOfInsight += cost.crown;
      }
    }
  };

  addTalentCosts(input.currentNormalAttack, input.targetNormalAttack);
  addTalentCosts(input.currentSkill, input.targetSkill);
  addTalentCosts(input.currentBurst, input.targetBurst);

  // 4. Resin Estimation
  // Boss mats: 40 resin per run, avg 2.5 drops
  const bossResin = Math.ceil(result.bossMaterials / 2.5) * 40;

  // Talent books: 20 resin per run, avg ~2.2 guides + 0.22 phil. Equivalent ~1.3 phil per run
  const totalPhilEquivalent =
    result.talentPhilosophies + result.talentGuides / 3 + result.talentTeachings / 9;
  const talentResin = Math.ceil(totalPhilEquivalent / 1.3) * 20;

  // Weekly boss: avg 2 drops per run (30 resin each for first 3)
  const weeklyResin = Math.ceil(result.weeklyBossMaterials / 2) * 30;

  // Mora Leyline: 20 resin = 60,000 Mora
  const moraResin = Math.ceil(result.totalMora / 60000) * 20;

  // EXP Leyline: 20 resin = ~4.5 Hero's Wit
  const expResin = Math.ceil(result.herosWit / 4.5) * 20;

  result.estimatedResin = bossResin + talentResin + weeklyResin + Math.round((moraResin + expResin) * 0.5); // assuming partial mora/exp from events
  // 180 resin natural recovery per day
  result.estimatedDays = Math.max(1, Math.ceil(result.estimatedResin / 180));

  return result;
}
