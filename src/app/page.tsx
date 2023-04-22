import { Featured } from "~/components/Featured";
import { ItemsList } from "~/components/ItemsList";
import { ViewToggle } from "~/components/ViewToggle";
import { getTrending } from "~/lib/api";
import { getRandomResource } from "~/lib/helpers/getRandomResource";
import { Movie, TvShow } from "~/lib/types";

export default async function HomePage() {
  const moviesData = await getTrending("movie");
  const tvData = await getTrending("tv");

  const randomTrending = getRandomResource<Movie | TvShow>([
    ...moviesData.results,
    ...tvData.results,
  ]);

  return (
    <div className="w-full h-full">
      <Featured item={randomTrending} />
      <div className="pt-3">
        <ViewToggle />
      </div>
      <ItemsList items={moviesData.results} title="Trending Movies" hrefType="movies" />
      <ItemsList items={tvData.results} title="Trending Tv Shows" hrefType="tv" />
    </div>
  );
}
