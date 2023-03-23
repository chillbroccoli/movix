import { Featured } from "~/components/Featured";
import { ItemsList } from "~/components/ItemsList";
import { getMoviesNowPlaying, getPopular, getTopRated } from "~/lib/api";
import { getRandomResource } from "~/lib/helpers/getRandomResource";
import { Movie } from "~/lib/types";

export default async function MoviesPage() {
  const [topRated, popular, nowPlaying] = await Promise.all([
    getTopRated("movie"),
    getPopular("movie"),
    getMoviesNowPlaying(),
  ]);

  const randomTopRated = getRandomResource<Movie>(topRated.results);

  return (
    <div className="w-full">
      <Featured item={randomTopRated} />
      <ItemsList items={popular.results} title="Popular" shortened hrefType="movies" />
      <ItemsList items={topRated.results} title="Top Rated" shortened hrefType="movies" />
      <ItemsList items={nowPlaying.results} title="Now Playing" shortened hrefType="movies" />
    </div>
  );
}
