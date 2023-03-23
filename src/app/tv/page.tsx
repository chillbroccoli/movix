import { Featured } from "~/components/Featured";
import { ItemsList } from "~/components/ItemsList";
import { getAiringToday, getPopular, getTopRated } from "~/lib/api";
import { getRandomResource } from "~/lib/helpers/getRandomResource";
import { TvShow } from "~/lib/types";

export default async function TvShowsPage() {
  const [topRated, popular, airingToday] = await Promise.all([
    getTopRated("tv"),
    getPopular("tv"),
    getAiringToday(),
  ]);

  const randomTopRated = getRandomResource<TvShow>(topRated.results);

  return (
    <div className="w-full">
      <Featured item={randomTopRated} />
      <ItemsList items={popular.results} title="Popular" shortened hrefType="tv" />
      <ItemsList items={topRated.results} title="Top Rated" shortened hrefType="tv" />
      <ItemsList items={airingToday.results} title="Airing Today" shortened hrefType="tv" />
    </div>
  );
}
