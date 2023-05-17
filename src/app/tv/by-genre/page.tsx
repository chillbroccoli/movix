import { getByGenre, getGenres } from "~/lib/api";
import { getRandomResource } from "~/lib/helpers/getRandomResource";
import { Genre, SearchParams, TvShow } from "~/lib/types";
import { TvByGenreView } from "~/views/TvByGenre.view";

export default async function TvByGenrePage({ searchParams }: { searchParams: SearchParams }) {
  const [tv, genres] = await Promise.all([
    getByGenre("tv", searchParams?.id as string, Number(searchParams.page) ?? 1),
    getGenres("tv"),
  ]);

  const genre = genres.genres.find((genre: Genre) => genre.id === Number(searchParams?.id));

  const randomResource = getRandomResource<TvShow>(tv.results);

  return <TvByGenreView data={tv} genre={genre} randomResource={randomResource} />;
}
