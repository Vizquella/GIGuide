import fs from "fs";
import path from "path";

async function saveLoc() {
  const res = await fetch("https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/loc.json");
  const loc = await res.json();

  // Combine Indonesian first, fallback to English
  const combined = {
    ...loc["en"],
    ...loc["id"],
  };

  const outPath = path.join(process.cwd(), "src", "data", "enkaLocalization.json");
  fs.writeFileSync(outPath, JSON.stringify(combined, null, 2));
  console.log(`Saved ${Object.keys(combined).length} localized strings to enkaLocalization.json`);
}

saveLoc().catch(console.error);
