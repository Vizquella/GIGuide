import fs from "fs";
import path from "path";

const weapons = [
  { file: "UI_EquipIcon_Pole_Narukami.png", name: "engulfing-lightning" },
  { file: "UI_EquipIcon_Pole_Homa.png", name: "staff-of-homa" },
  { file: "UI_EquipIcon_Pole_Macha.png", name: "the-catch" },
  { file: "UI_EquipIcon_Sword_Regalis.png", name: "splendor-of-tranquil-waters" },
  { file: "UI_EquipIcon_Sword_Pipes.png", name: "fleuve-cendre-ferryman" },
  { file: "UI_EquipIcon_Sword_Zephyrus.png", name: "favonius-sword" },
  { file: "UI_EquipIcon_Catalyst_Iudex.png", name: "tome-of-the-eternal-flow" },
  { file: "UI_EquipIcon_Catalyst_Proto.png", name: "prototype-amber" },
  { file: "UI_EquipIcon_Catalyst_Yue.png", name: "sacrificial-jade" },
  { file: "UI_EquipIcon_Claymore_GoldenSun.png", name: "a-thousand-blazing-suns" },
  { file: "UI_EquipIcon_Sword_Xochitl.png", name: "peak-patrol-song" },
  { file: "UI_EquipIcon_Sword_Widsith.png", name: "freedom-sworn" },
  { file: "UI_EquipIcon_Catalyst_Ayus.png", name: "a-thousand-floating-dreams" },
  { file: "UI_EquipIcon_Sword_Fossil.png", name: "sacrificial-sword" },
  { file: "UI_EquipIcon_Pole_Stardust.png", name: "dragons-bane" },
  { file: "UI_EquipIcon_Claymore_Umpalapa.png", name: "earth-shaker" },
  { file: "UI_EquipIcon_Sword_Umpalapa.png", name: "flute-of-ezpitzal" },
];

const targetDir = path.join(process.cwd(), "public", "assets", "weapons");

async function download() {
  for (const item of weapons) {
    const url = `https://enka.network/ui/${item.file}`;
    const dest = path.join(targetDir, `${item.name}.png`);
    try {
      const res = await fetch(url);
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(dest, Buffer.from(buffer));
        console.log(`✓ Downloaded ${item.name}.png`);
      } else {
        console.warn(`✗ HTTP ${res.status} for ${item.name} (${url})`);
      }
    } catch (e) {
      console.error(`✗ Error downloading ${item.name}:`, e.message);
    }
  }
}

download();
