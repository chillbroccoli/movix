import { getByGenre, getGenres } from "~/lib/api";
import { Genre, SearchParams } from "~/lib/types";
import { MoviesByGenreView } from "~/views/MoviesByGenre.view";

export default async function MoviesByGenrePage({ searchParams }: { searchParams: SearchParams }) {
  const [movies, genres] = await Promise.all([
    getByGenre("movie", searchParams?.id as string, Number(searchParams.page) ?? 1),
    getGenres("movie"),
  ]);

  const genre = genres.genres.find((genre: Genre) => genre.id === Number(searchParams.id));

  return <MoviesByGenreView data={movies} genre={genre} />;
}
