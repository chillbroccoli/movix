import { getPopular, getTopRated, getTrending } from "~/lib/api";
import { TvShowsView } from "~/views/TvShows.view";

export default async function TvShowsPage() {
  const [topRated, popular, trending] = await Promise.all([
    getTopRated("tv"),
    getPopular("tv"),
    getTrending("tv"),
  ]);

  return <TvShowsView topRated={topRated} popular={popular} trending={trending} />;
}
