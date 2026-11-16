import fs from "fs";
import path from "path";

const elements = [
  { file: "elementPyro.svg", target: "pyro.svg" },
  { file: "elementHydro.svg", target: "hydro.svg" },
  { file: "elementAmeno.svg", target: "anemo.svg" },
  { file: "elementElectro.svg", target: "electro.svg" },
  { file: "elementDendro.svg", target: "dendro.svg" },
  { file: "elementCryo.svg", target: "cryo.svg" },
  { file: "elementGeo.svg", target: "geo.svg" },
];

const targetDir = path.join(process.cwd(), "public", "assets", "elements");

async function downloadElements() {
  for (const el of elements) {
    const url = `https://raw.githubusercontent.com/Sacr3d/genshin-icons/main/Elements/SVG/${el.file}`;
    const res = await fetch(url);
    if (res.ok) {
      const svg = await res.text();
      fs.writeFileSync(path.join(targetDir, el.target), svg);
      console.log(`✓ Downloaded official SVG: ${el.target}`);
    } else {
      console.error(`✗ Failed ${el.file}: HTTP ${res.status}`);
    }
  }
}

downloadElements();
