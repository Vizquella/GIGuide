# GIGuide - Rekomendasi Build Karakter & Farming Database Genshin Impact

Aplikasi web modern, responsif (Mobile-First), dan berkinerja tinggi untuk panduan build karakter Genshin Impact, jadwal domain harian, kalkulator material ascension & resin, serta evaluasi stat in-game via UID profil (Enka.Network API).

---

## 🚀 Fitur Unggulan

1. **Skema Multi-Build per Karakter (One-to-Many Architecture)**
   - 1 karakter dapat memiliki beberapa varian build (misalnya: *Raiden Shogun - Electro Burst DPS vs Hyperbloom Full EM Trigger*).
   - Dilengkapi rekomendasi senjata bertingkat (*BiS, 5-Star Best, 4-Star Best, F2P*), rekomendasi artefak 4-piece / 2-piece combo, prioritas main stat (Sands, Goblet, Circlet), sub-stat, target endgame stats, serta urutan rotasi skill tim.

2. **Logo Elemen Resmi & Visual Asli (Official Vector Crests)**
   - Menggunakan logo elemen resmi Genshin Impact (*Pyro, Hydro, Anemo, Electro, Dendro, Cryo, Geo*) dalam format vector SVG tajam dan modern.
   - Dilengkapi avatar artwork karakter resmi dan thumbnail senjata.

3. **Widget Banner Aktif dengan Live Countdown Timer**
   - Menampilkan karakter & senjata rate-up bintang 5 dan bintang 4 pada fase berjalan (Fase 1: Mitya & Furina, Fase 2: Neuvillette & Arlecchino).
   - Dilengkapi countdown timer real-time per detik hingga banner berakhir serta tombol pintas ke halaman build.

4. **Pencarian Cerdas & Filter Multi-Kategori**
   - Pencarian toleran salah ketik / typo (*fuzzy search & Levenshtein distance*, misal mengetik "arlechinno" otomatis menemukan "Arlecchino").
   - Filter lengkap: Elemen, Tipe Senjata, Rarity (4★ / 5★), dan Region (Mondstadt, Liyue, Inazuma, Sumeru, Fontaine, Natlan, Snezhnaya).

5. **Widget Jadwal Domain & Farming Harian**
   - Mendeteksi hari berjalan secara otomatis dengan pilihan zona waktu server (*Asia [UTC+8], America [UTC-5], Europe [UTC+1]*).
   - Menghitung reset harian pukul 04:00 AM server time.
   - Menampilkan buku talent dan karakter apa saja yang materialnya dapat di-farm hari ini (dengan status Hari Minggu di mana seluruh domain terbuka).

6. **Kalkulator Material Ascension & Resin Estimator**
   - Slider interaktif level karakter (Lv 1 - 90) dan 3 level talenta (Normal Attack, Skill, Burst Lv 1 - 10).
   - Otomatis menghitung total Mora, Hero's Wit EXP, boss drops, local specialty, common mob drops, buku talent, weekly boss drops, dan Crown of Insight.
   - Mengestimasi total Original Resin dan estimasi jumlah hari farming alami (180 Resin per hari).
   - Tombol preset cepat (*Max All 90 & 10/10/10*, *Comfort Build 80 & 6/8/8*, dan *Reset*).

7. **Cek & Evaluasi Build via UID Akun (Enka.Network Integration)**
   - Memasukkan 9 digit UID in-game untuk membaca karakter yang dipajang di showcase profil pemain dengan auto-save UID di localStorage.
   - Menggunakan backend proxy `/api/enka/[uid]` di Next.js untuk mematuhi User-Agent Enka.Network dan mencegah isu CORS.
   - Menampilkan komparasi side-by-side stat aktual pengguna dengan *Target Endgame Stats* panduan (CRIT Rate, CRIT DMG, Energy Recharge, EM, HP, dsb).
   - Memberikan skor kelayakan (*Grade S, Grade A, Grade C*), selisih stat, dan tips min-maxing spesifik.
   - Dilengkapi tombol coba akun demo (*Demo Mode*).

8. **Desain Mobile-First & Dark Mode**
   - Tampilan card compact untuk kenyamanan scrolling di HP saat bermain game di PC/Konsol.
   - Mobile bottom navigation bar bergaya aplikasi native.
   - Color-coding dinamis sesuai elemen karakter (*Pyro, Hydro, Anemo, Electro, Dendro, Cryo, Geo*).

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **Icons:** Lucide React
- **Schema Validation:** Zod
- **API Proxy:** Next.js Route Handlers (`/api/enka/[uid]`) dengan in-memory cache
- **Asset Mode:** Local SVG Assets & Responsive Icons

---

## 📦 Cara Menjalankan Proyek

### 1. Masuk ke direktori proyek
```bash
cd E:\Project_Pribadi\GIGuide
```

### 2. Jalankan Development Server
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

### 3. Build untuk Production
```bash
npm run build
npm run start
```

---

## 🔄 Panduan Update Patch Baru (Setiap 6 Minggu)

Sistem dirancang modular tanpa database server yang rumit agar mudah diperbarui setiap patch baru rilis:

### A. Menambahkan Karakter Baru
1. Buat file baru di folder `src/data/characters/[id-karakter].json` (misalnya: `chasca.json`).
2. Gunakan template JSON berikut:
```json
{
  "id": "chasca",
  "name": "Chasca",
  "title": "Vows in Flight",
  "rarity": 5,
  "element": "anemo",
  "weaponType": "bow",
  "region": "Natlan",
  "primaryRole": "Main DPS",
  "icon": "/assets/characters/chasca.svg",
  "materials": {
    "bookName": "Teachings of Conflict",
    "days": ["Wednesday", "Saturday", "Sunday"],
    "domain": "Blazing Ruins",
    "weeklyBoss": "The All-Consuming Flame",
    "worldBoss": "Secret Source Core",
    "localSpecialty": "Withering Purpurbloom",
    "commonMaterial": "Saurian Claws",
    "elementalGem": "Vayuda Turquoise"
  },
  "builds": [
    {
      "id": "chasca-dps",
      "name": "Nightsoul Shadowhunter DPS",
      "description": "Fokus pada serangan Charged Attack Nightsoul multi-elemen.",
      "talentPriority": ["Normal Attack (Lv 9-10)", "Skill (Lv 8-9)", "Burst (Lv 8)"],
      "weapons": [
        { "name": "Astral Vulture's Crimson Plumage", "ranking": "BiS", "rarity": 5, "notes": "Senjata signature terbaik." }
      ],
      "artifacts": [
        { "type": "4-piece", "sets": [{ "name": "Obsidian Codex", "pieces": 4 }], "notes": "+40% CRIT Rate." }
      ],
      "mainStats": {
        "sands": ["ATK%"],
        "goblet": ["Anemo DMG Bonus%"],
        "circlet": ["CRIT DMG%"]
      },
      "subStatsPriority": ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"],
      "targetEndgameStats": {
        "critRate": { "min": 50, "recommended": 60, "unit": "%" },
        "critDmg": { "min": 180, "recommended": 220, "unit": "%" },
        "energyRecharge": { "min": 120, "recommended": 130, "unit": "%" }
      },
      "teamComps": [
        {
          "name": "Chasca Rainbow Catalyst",
          "description": "Tim multi-elemen untuk memicu konversi peluru.",
          "members": [
            { "characterId": "chasca", "name": "Chasca", "role": "Main DPS", "element": "anemo", "icon": "/assets/characters/chasca.svg" }
          ],
          "rotationOrder": ["1. Pasang buff elemen rekan", "2. Chasca E dan tembak peluru"]
        }
      ]
    }
  ]
}
```
3. Daftarkan import karakter di `src/lib/dataService.ts` pada array `rawCharacters`.

### B. Memperbarui Banner Berjalan
Buka file `src/data/banners.json`, ubah:
- `currentPatch` (misal: `"5.5"`)
- `activePhase` (`1` atau `2`)
- Perbarui daftar karakter dan senjata rate-up bintang 5 & 4 beserta tanggal `startDate` dan `endDate`.

---

## ⚖️ Legalitas & Disclaimer

GIGuide adalah proyek penggemar independen (*fan-made community project*) yang tidak berafiliasi dengan miHoYo / HoYoverse / Cognosphere Pte. Ltd.

Seluruh aset grafis, nama karakter, suara, dan materi Genshin Impact adalah hak cipta dan merek dagang terdaftar milik COGNOSPHERE PTE. LTD. Data profil akun diambil secara publik melalui API Enka.Network atas persetujuan fitur showcase dalam game pengguna.
