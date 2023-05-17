"use client";

import { Featured } from "~/components/Featured";
import { ItemsList } from "~/components/ItemsList";
import { ViewToggle } from "~/components/ViewToggle";
import { getRandomResource } from "~/lib/helpers/getRandomResource";
import { ListResponse, Movie, TvShow } from "~/lib/types";

type HomeViewProps = {
  movies: ListResponse<Movie>;
  tvShows: ListResponse<TvShow>;
};

export function HomeView({ movies, tvShows }: HomeViewProps) {
  const randomTrending = getRandomResource<Movie | TvShow>([...movies.results, ...tvShows.results]);

  return (
    <div className="w-full h-full">
      <Featured item={randomTrending} />
      <div className="pt-3">
        <ViewToggle />
      </div>
      <ItemsList items={movies.results} title="Trending Movies" hrefType="movies" />
      <ItemsList items={tvShows.results} title="Trending Tv Shows" hrefType="tv" />
    </div>
  );
}
