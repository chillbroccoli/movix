import { getTrending } from "~/lib/api";
import { HomeView } from "~/views/Home.view";

export default async function HomePage() {
  const moviesData = await getTrending("movie");
  const tvData = await getTrending("tv");

  return <HomeView movies={moviesData} tvShows={tvData} />;
}
