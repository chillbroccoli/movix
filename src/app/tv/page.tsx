import { Featured } from "~/components/Featured";
import { ItemsList } from "~/components/ItemsList";
import { ViewToggle } from "~/components/ViewToggle";
import { getPopular, getTopRated, getTrending } from "~/lib/api";
import { getRandomResource } from "~/lib/helpers/getRandomResource";
import { TvShow } from "~/lib/types";

export default async function TvShowsPage() {
  const [topRated, popular, trending] = await Promise.all([
    getTopRated("tv"),
    getPopular("tv"),
    getTrending("tv"),
  ]);

  const randomResource = getRandomResource<TvShow>(topRated.results);

  const popularSorted = popular.results.sort(
    (a: TvShow, b: TvShow) => b.vote_average - a.vote_average
  );
  const topRatedSorted = topRated.results.sort(
    (a: TvShow, b: TvShow) => b.vote_average - a.vote_average
  );
  const trendingSorted = trending.results.sort(
    (a: TvShow, b: TvShow) => b.vote_average - a.vote_average
  );

  return (
    <div className="w-full">
      <Featured item={randomResource} />
      <div className="pt-3">
        <ViewToggle />
      </div>
      <ItemsList items={topRatedSorted} title="Top Rated" shortened hrefType="tv" />
      <ItemsList items={popularSorted} title="Popular" shortened hrefType="tv" />
      <ItemsList items={trendingSorted} title="Trending" shortened hrefType="tv" />
    </div>
  );
}
