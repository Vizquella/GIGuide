import { notFound } from "next/navigation";
import { getCharacterById, getAllCharacters } from "@/lib/dataService";
import { CharacterDetailView } from "./CharacterDetailView";

export function generateStaticParams() {
  const characters = getAllCharacters();
  return characters.map((c) => ({
    id: c.id,
  }));
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const character = getCharacterById(id);

  if (!character) {
    notFound();
  }

  return <CharacterDetailView character={character} />;
}
