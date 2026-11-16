import fs from "fs";
import path from "path";

async function buildEnkaMap() {
  console.log("Fetching Enka characters.json and loc.json...");
  const [charsRes, locRes] = await Promise.all([
    fetch("https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/characters.json"),
    fetch("https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/loc.json"),
  ]);

  const chars = await charsRes.json();
  const loc = await locRes.json();

  const idLoc = loc["id"] || {};
  const enLoc = loc["en"] || {};

  const elementMap = {
    Electric: "electro",
    Fire: "pyro",
    Water: "hydro",
    Wind: "anemo",
    Grass: "dendro",
    Ice: "cryo",
    Rock: "geo",
  };

  const weaponMap = {
    WEAPON_SWORD_ONE_HAND: "sword",
    WEAPON_CLAYMORE: "claymore",
    WEAPON_POLE: "polearm",
    WEAPON_CATALYST: "catalyst",
    WEAPON_BOW: "bow",
  };

  const fullMap = {};

  for (const [avatarId, char] of Object.entries(chars)) {
    const hash = String(char.NameTextMapHash);
    const name = idLoc[hash] || enLoc[hash] || `Karakter ${avatarId}`;
    const element = elementMap[char.Element] || "pyro";
    const weaponType = weaponMap[char.WeaponType] || "sword";
    const rarity = char.QualityType === "QUALITY_ORANGE" ? 5 : 4;
    const iconName = char.SideIconName
      ? char.SideIconName.replace("UI_AvatarIcon_Side_", "UI_AvatarIcon_") + ".png"
      : "";

    // create a slug
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    fullMap[avatarId] = {
      id: slug,
      name,
      element,
      weaponType,
      rarity,
      iconName,
    };
  }

  const outPath = path.join(process.cwd(), "src", "data", "enkaCharactersMap.json");
  fs.writeFileSync(outPath, JSON.stringify(fullMap, null, 2));
  console.log(`Successfully generated full Enka map for ${Object.keys(fullMap).length} characters!`);
}

buildEnkaMap().catch(console.error);
