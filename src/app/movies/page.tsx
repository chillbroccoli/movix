import { getMoviesNowPlaying, getPopular, getTopRated } from "~/lib/api";
import { MoviesView } from "~/views/Movies.view";

export default async function MoviesPage() {
  const [topRated, popular, nowPlaying] = await Promise.all([
    getTopRated("movie"),
    getPopular("movie"),
    getMoviesNowPlaying(),
  ]);

  return <MoviesView topRated={topRated} popular={popular} nowPlaying={nowPlaying} />;
}
