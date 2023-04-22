import { Featured } from "~/components/Featured";
import { ItemsList } from "~/components/ItemsList";
import { ViewToggle } from "~/components/ViewToggle";
import { getByGenre, getGenres, getMoviesNowPlaying, getPopular, getTopRated } from "~/lib/api";
import { getRandomResource } from "~/lib/helpers/getRandomResource";
import { Movie, SearchParams } from "~/lib/types";

export default async function MoviesPage({ searchParams }: { searchParams: SearchParams }) {
  const [topRated, popular, nowPlaying] = await Promise.all([
    getTopRated("movie"),
    getPopular("movie"),
    getMoviesNowPlaying(),
  ]);

  const values =
    searchParams?.genre && searchParams?.page
      ? await Promise.all([
          getByGenre("movie", searchParams?.genre as string, Number(searchParams.page) ?? 1),
          getGenres("movie"),
        ])
      : null;

  const genre =
    values &&
    values[1] &&
    values[1].genres.find(
      (genre: { id: number; name: string }) => genre.id === Number(searchParams.genre)
    );

  const randomResource = getRandomResource<Movie>(values ? values[0]?.results : topRated.results);

  return (
    <div className="w-full">
      <Featured item={randomResource} />
      <div className="pt-3">
        <ViewToggle />
      </div>
      {searchParams.genre && searchParams.page && values ? (
        <ItemsList
          items={values[0].results}
          title={genre.name}
          withPagination
          currentPage={values[0].page}
          totalPages={values[0].total_pages}
        />
      ) : (
        <>
          <ItemsList items={popular.results} title="Popular" shortened hrefType="movies" />
          <ItemsList items={topRated.results} title="Top Rated" shortened hrefType="movies" />
          <ItemsList items={nowPlaying.results} title="Now Playing" shortened hrefType="movies" />
        </>
      )}
    </div>
  );
}
