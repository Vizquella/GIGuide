import fs from "fs";
import path from "path";

const avatarList = [
  { id: "raiden-shogun", file: "UI_AvatarIcon_Shougun.png" },
  { id: "nahida", file: "UI_AvatarIcon_Nahida.png" },
  { id: "furina", file: "UI_AvatarIcon_Furina.png" },
  { id: "neuvillette", file: "UI_AvatarIcon_Neuvillette.png" },
  { id: "hu-tao", file: "UI_AvatarIcon_Hutao.png" },
  { id: "kaedehara-kazuha", file: "UI_AvatarIcon_Kazuha.png" },
  { id: "mavuika", file: "UI_AvatarIcon_Mavuika.png" },
  { id: "xilonen", file: "UI_AvatarIcon_Xilonen.png" },
  { id: "bennett", file: "UI_AvatarIcon_Bennett.png" },
  { id: "xingqiu", file: "UI_AvatarIcon_Xingqiu.png" },
  // Banner 4-Stars
  { id: "kachina", file: "UI_AvatarIcon_Kachina.png" },
  { id: "kujou-sara", file: "UI_AvatarIcon_Sara.png" },
  { id: "xiangling", file: "UI_AvatarIcon_Xiangling.png" },
  { id: "chevreuse", file: "UI_AvatarIcon_Chevreuse.png" },
  // Showcase popular characters
  { id: "zhongli", file: "UI_AvatarIcon_Zhongli.png" },
  { id: "yelan", file: "UI_AvatarIcon_Yelan.png" },
  { id: "arlecchino", file: "UI_AvatarIcon_Arlecchino.png" },
  { id: "clorinde", file: "UI_AvatarIcon_Clorinde.png" },
  { id: "navia", file: "UI_AvatarIcon_Navia.png" },
  { id: "alhaitham", file: "UI_AvatarIcon_Alhatham.png" },
  { id: "kuki-shinobu", file: "UI_AvatarIcon_Shinobu.png" },
];

const targetDir = path.join(process.cwd(), "public", "assets", "characters");

async function download() {
  for (const item of avatarList) {
    const url = `https://enka.network/ui/${item.file}`;
    const dest = path.join(targetDir, `${item.id}.png`);
    try {
      const res = await fetch(url);
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(dest, Buffer.from(buffer));
        console.log(`✓ Downloaded ${item.id}.png`);
      } else {
        console.warn(`✗ HTTP ${res.status} for ${item.id} (${url})`);
      }
    } catch (e) {
      console.error(`✗ Error downloading ${item.id}:`, e.message);
    }
  }
}

download();
