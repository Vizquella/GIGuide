import { NextRequest, NextResponse } from "next/server";
import {
  DEMO_SHOWCASE_CHARACTERS,
  ParsedEnkaCharacter,
  getEnkaCharacterMeta,
  getLocalizedText,
} from "@/lib/enkaService";
import { getAllCharacters } from "@/lib/dataService";
import fs from "fs";
import path from "path";

const cache = new Map<string, { timestamp: number; data: unknown }>();
const CACHE_TTL = 60 * 1000;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const { uid } = await params;
    const cleanUid = uid.trim();

    // Check demo UID
    if (cleanUid === "demo" || cleanUid === "800000001" || cleanUid === "123456789") {
      return NextResponse.json({
        success: true,
        isDemo: true,
        playerInfo: {
          nickname: "Traveler (Demo Showcase)",
          level: 60,
          signature: "Menjelajahi Teyvat bersama GIGuide!",
          worldLevel: 8,
          avatarCount: DEMO_SHOWCASE_CHARACTERS.length,
        },
        characters: DEMO_SHOWCASE_CHARACTERS,
      });
    }

    // Validate Genshin UID
    if (!/^\d{9,10}$/.test(cleanUid)) {
      return NextResponse.json(
        {
          success: false,
          error: "Format UID tidak valid. UID Genshin Impact harus berupa 9 atau 10 digit angka.",
        },
        { status: 400 }
      );
    }

    // Check Cache
    const cached = cache.get(cleanUid);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json(cached.data);
    }

    // Fetch from Enka.Network API with required User-Agent
    const enkaUrl = `https://enka.network/api/uid/${cleanUid}`;
    const enkaRes = await fetch(enkaUrl, {
      headers: {
        "User-Agent": "GIGuide-BuildEvaluator/1.0 (https://github.com/traveler/giguide)",
        Accept: "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!enkaRes.ok) {
      if (enkaRes.status === 404) {
        return NextResponse.json(
          {
            success: false,
            error: "UID tidak ditemukan di server Genshin Impact. Pastikan nomor UID sudah benar.",
          },
          { status: 404 }
        );
      }
      if (enkaRes.status === 424) {
        return NextResponse.json(
          {
            success: false,
            error: "Server game sedang maintenance atau API sedang tidak dapat dijangkau.",
          },
          { status: 424 }
        );
      }
      if (enkaRes.status === 429) {
        return NextResponse.json(
          {
            success: false,
            error: "API Enka.Network sedang sibuk (Rate Limit). Silakan coba lagi dalam beberapa saat atau gunakan 'Coba Akun Demo'.",
          },
          { status: 429 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          error: `Gagal mengambil data dari Enka.Network (Status: ${enkaRes.status}).`,
        },
        { status: enkaRes.status }
      );
    }

    const enkaData = await enkaRes.json();

    const avatarList = enkaData.avatarInfoList;
    if (!avatarList || !Array.isArray(avatarList) || avatarList.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Profil ditemukan, tetapi tidak ada karakter yang dipajang di Showcase atau opsi 'Tampilkan Detail Karakter' dinonaktifkan di profil in-game pemain.",
        },
        { status: 422 }
      );
    }

    const allGIGuideChars = getAllCharacters();
    const localCharDir = path.join(process.cwd(), "public", "assets", "characters");

    const parsedCharacters: ParsedEnkaCharacter[] = avatarList.map((av: any) => {
      const avatarId = av.avatarId;
      const meta = getEnkaCharacterMeta(avatarId);

      // Check if character exists in our local build database
      const mappedChar = meta
        ? allGIGuideChars.find(
            (c) =>
              c.id === meta.id ||
              c.name.toLowerCase() === meta.name.toLowerCase()
          )
        : undefined;

      // Determine avatar icon path (prefer local PNG, fallback to Enka CDN)
      let iconPath = "/assets/characters/raiden-shogun.png";
      if (meta) {
        const localFile = path.join(localCharDir, `${meta.id}.png`);
        if (fs.existsSync(localFile)) {
          iconPath = `/assets/characters/${meta.id}.png`;
        } else if (meta.iconName) {
          iconPath = `https://enka.network/ui/${meta.iconName}`;
        }
      } else if (mappedChar) {
        iconPath = mappedChar.icon;
      }

      const fightProps = av.fightPropMap || {};
      const maxHp = fightProps[2000] || fightProps[1] || 0;
      const atk = fightProps[2001] || fightProps[4] || 0;
      const def = fightProps[2002] || fightProps[7] || 0;
      const em = Math.round(fightProps[28] || 0);
      const critRate = (fightProps[20] || 0) * 100;
      const critDmg = (fightProps[22] || 0) * 100;
      const energyRecharge = (fightProps[23] || 1) * 100;

      // Extract weapon with localized name
      const equipList = av.equipList || [];
      const weaponItem = equipList.find((eq: any) => eq.weapon);

      let weaponName = "";
      if (weaponItem?.flat?.nameTextMapHash) {
        weaponName = getLocalizedText(weaponItem.flat.nameTextMapHash);
      }
      if (!weaponName && weaponItem?.flat?.icon) {
        // Clean weapon name from icon name
        weaponName = weaponItem.flat.icon
          .replace("UI_EquipIcon_", "")
          .replace(/_/g, " ");
      }
      if (!weaponName) weaponName = "Senjata Tidak Dikenal";

      const weaponData = {
        name: weaponName,
        level: weaponItem?.weapon?.level || 90,
        refinement:
          weaponItem?.weapon?.affixMap && Object.values(weaponItem.weapon.affixMap)[0] !== undefined
            ? Number(Object.values(weaponItem.weapon.affixMap)[0]) + 1
            : 1,
        rarity: weaponItem?.flat?.rankLevel || 4,
        icon: weaponItem?.flat?.icon ? `https://enka.network/ui/${weaponItem.flat.icon}.png` : undefined,
      };

      // Extract artifacts with localized set name
      const artifactItems = equipList
        .filter((eq: any) => eq.reliquary)
        .map((eq: any) => {
          let setName = "";
          if (eq.flat?.setNameTextMapHash) {
            setName = getLocalizedText(eq.flat.setNameTextMapHash);
          }
          if (!setName) setName = "Artefak Set";

          return {
            setName,
            pieceName: getLocalizedText(eq.flat?.nameTextMapHash) || "Piece",
            slot: eq.flat?.equipType || "Piece",
            mainStat: eq.flat?.reliquaryMainstat?.mainPropId || "",
          };
        });

      return {
        avatarId,
        characterId: mappedChar ? mappedChar.id : meta ? meta.id : `char-${avatarId}`,
        name: mappedChar?.name || meta?.name || `Karakter (${avatarId})`,
        level: av.propMap?.["4001"]?.val ? Number(av.propMap["4001"].val) : 90,
        rarity: mappedChar?.rarity || meta?.rarity || 5,
        element: mappedChar?.element || meta?.element || "pyro",
        icon: iconPath,
        friendship: av.fetterInfo?.expLevel || 10,
        constellation: av.talentIdList ? av.talentIdList.length : 0,
        weapon: weaponData,
        artifacts: artifactItems,
        stats: {
          maxHp: Math.round(maxHp),
          atk: Math.round(atk),
          def: Math.round(def),
          elementalMastery: em,
          critRate: Number(critRate.toFixed(1)),
          critDmg: Number(critDmg.toFixed(1)),
          energyRecharge: Number(energyRecharge.toFixed(1)),
          elementalDmg: 0,
          elementalType: mappedChar?.element || meta?.element || "Neutral",
        },
      };
    });

    const responsePayload = {
      success: true,
      playerInfo: {
        nickname: enkaData.playerInfo?.nickname || "Traveler",
        level: enkaData.playerInfo?.level || 60,
        signature: enkaData.playerInfo?.signature || "",
        worldLevel: enkaData.playerInfo?.worldLevel || 8,
        avatarCount: parsedCharacters.length,
      },
      characters: parsedCharacters,
    };

    cache.set(cleanUid, { timestamp: Date.now(), data: responsePayload });

    return NextResponse.json(responsePayload);
  } catch (error: any) {
    console.error("Enka API Proxy Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan pada server saat menghubungi Enka.Network API.",
      },
      { status: 500 }
    );
  }
}
