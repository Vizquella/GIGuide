import fs from "fs";
import path from "path";

const characters = [
  { id: "raiden-shogun", name: "Raiden Shogun", initials: "RS", elementColor: "#A855F7", bg: "#2E1065", stars: 5 },
  { id: "nahida", name: "Nahida", initials: "NH", elementColor: "#84CC16", bg: "#14532D", stars: 5 },
  { id: "furina", name: "Furina", initials: "FR", elementColor: "#0284C7", bg: "#082F49", stars: 5 },
  { id: "neuvillette", name: "Neuvillette", initials: "NV", elementColor: "#0284C7", bg: "#0C4A6E", stars: 5 },
  { id: "hu-tao", name: "Hu Tao", initials: "HT", elementColor: "#EF4444", bg: "#450A0A", stars: 5 },
  { id: "kaedehara-kazuha", name: "Kazuha", initials: "KZ", elementColor: "#10B981", bg: "#064E3B", stars: 5 },
  { id: "mavuika", name: "Mavuika", initials: "MV", elementColor: "#EF4444", bg: "#7F1D1D", stars: 5 },
  { id: "xilonen", name: "Xilonen", initials: "XL", elementColor: "#F59E0B", bg: "#78350F", stars: 5 },
  { id: "bennett", name: "Bennett", initials: "BN", elementColor: "#EF4444", bg: "#581C87", stars: 4 },
  { id: "xingqiu", name: "Xingqiu", initials: "XQ", elementColor: "#0284C7", bg: "#1E1B4B", stars: 4 },
];

const targetDir = path.join(process.cwd(), "public", "assets", "characters");

characters.forEach((char) => {
  const starIcons = Array(char.stars).fill("★").join("");
  const starColor = char.stars === 5 ? "#F59E0B" : "#A855F7";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <linearGradient id="bg_${char.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${char.bg}"/>
      <stop offset="100%" stop-color="#0b0e14"/>
    </linearGradient>
    <filter id="glow_${char.id}">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="128" height="128" rx="18" fill="url(#bg_${char.id})" stroke="${char.elementColor}" stroke-width="2.5"/>
  <circle cx="64" cy="54" r="32" fill="${char.elementColor}" fill-opacity="0.2"/>
  <text x="64" y="66" font-family="system-ui, sans-serif" font-size="34" font-weight="900" fill="#FFFFFF" text-anchor="middle" filter="url(#glow_${char.id})">${char.initials}</text>
  <rect x="0" y="98" width="128" height="30" rx="0" fill="rgba(11, 14, 20, 0.85)"/>
  <text x="64" y="117" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="${starColor}" text-anchor="middle">${starIcons}</text>
</svg>`;

  fs.writeFileSync(path.join(targetDir, `${char.id}.svg`), svg);
});

console.log("Generated character local SVGs successfully!");
