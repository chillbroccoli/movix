import { getByGenre, getGenres } from "~/lib/api";
import { Genre, SearchParams } from "~/lib/types";
import { TvByGenreView } from "~/views/TvByGenre.view";

export default async function TvByGenrePage({ searchParams }: { searchParams: SearchParams }) {
  const [tv, genres] = await Promise.all([
    getByGenre("tv", searchParams?.id as string, Number(searchParams.page) ?? 1),
    getGenres("tv"),
  ]);

  const genre = genres.genres.find((genre: Genre) => genre.id === Number(searchParams?.id));

  return <TvByGenreView data={tv} genre={genre} />;
}
