import fs from "fs";
import path from "path";

const elementColors = {
  pyro: "#FF5F33",
  hydro: "#29ACFF",
  anemo: "#44E3B1",
  electro: "#BF6EFF",
  dendro: "#8AD034",
  cryo: "#82D4FF",
  geo: "#F6B83B",
};

const dir = path.join(process.cwd(), "public", "assets", "elements");

for (const [elem, color] of Object.entries(elementColors)) {
  const filePath = path.join(dir, `${elem}.svg`);
  if (!fs.existsSync(filePath)) {
    console.error(`Not found: ${filePath}`);
    continue;
  }
  let svg = fs.readFileSync(filePath, "utf8");
  
  // Replace fill="#fff" or fill="#ffffff" or fill="white" with official element color
  svg = svg.replace(/fill="#fff"/gi, `fill="${color}"`);
  svg = svg.replace(/fill="#ffffff"/gi, `fill="${color}"`);
  svg = svg.replace(/fill="white"/gi, `fill="${color}"`);
  
  fs.writeFileSync(filePath, svg, "utf8");
  console.log(`✓ Updated ${elem}.svg with color ${color}`);
}
