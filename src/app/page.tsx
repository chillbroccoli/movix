import { Carousel } from "~/components/Carousel";
import { Featured } from "~/components/Featured";
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
    <div className="w-full">
      <Featured item={randomTrending} />
      <div className="px-6 pb-12">
        <div className="pt-8">
          <Carousel items={moviesData.results} title="Trending Movies" hrefType="movies" />
        </div>
        <div className="pt-8">
          <Carousel items={tvData.results} title="Trending Tv Shows" hrefType="tv" />
        </div>
      </div>
    </div>
  );
}
