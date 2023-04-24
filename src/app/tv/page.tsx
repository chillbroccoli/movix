import { Featured } from "~/components/Featured";
import { ItemsList } from "~/components/ItemsList";
import { ViewToggle } from "~/components/ViewToggle";
import { getByGenre, getGenres, getPopular, getTopRated, getTrending } from "~/lib/api";
import { getRandomResource } from "~/lib/helpers/getRandomResource";
import { SearchParams, TvShow } from "~/lib/types";

export default async function TvShowsPage({ searchParams }: { searchParams: SearchParams }) {
  const [topRated, popular, trending] = await Promise.all([
    getTopRated("tv"),
    getPopular("tv"),
    getTrending("tv"),
  ]);

  const values =
    searchParams?.genre && searchParams?.page
      ? await Promise.all([
          getByGenre("tv", searchParams?.genre as string, Number(searchParams.page) ?? 1),
          getGenres("tv"),
        ])
      : null;

  const genre =
    values &&
    values[1] &&
    values[1].genres.find(
      (genre: { id: number; name: string }) => genre.id === Number(searchParams.genre)
    );

  const randomResource = getRandomResource<TvShow>(values ? values[0]?.results : topRated.results);

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
      {searchParams.genre && searchParams.page && values ? (
        <ItemsList
          items={values[0].results}
          title={genre.name}
          withPagination
          currentPage={values[0].page}
          totalPages={values[0].total_pages}
          hrefType="tv"
        />
      ) : (
        <>
          <ItemsList items={topRatedSorted} title="Top Rated" shortened hrefType="tv" />
          <ItemsList items={popularSorted} title="Popular" shortened hrefType="tv" />
          <ItemsList items={trendingSorted} title="Trending" shortened hrefType="tv" />
        </>
      )}
    </div>
  );
}
