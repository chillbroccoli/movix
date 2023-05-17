"use client";

import { Featured } from "~/components/Featured";
import { ItemsList } from "~/components/ItemsList";
import { ViewToggle } from "~/components/ViewToggle";
import { getRandomResource } from "~/lib/helpers/getRandomResource";
import { ListResponse, Movie } from "~/lib/types";

type MoviesViewProps = {
  topRated: ListResponse<Movie>;
  popular: ListResponse<Movie>;
  nowPlaying: ListResponse<Movie>;
};

export function MoviesView({ topRated, popular, nowPlaying }: MoviesViewProps) {
  const randomResource = getRandomResource<Movie>(topRated.results);

  return (
    <div className="w-full">
      <Featured item={randomResource} />
      <div className="pt-3">
        <ViewToggle />
      </div>

      <ItemsList items={popular.results} title="Popular" shortened hrefType="movies" />
      <ItemsList items={topRated.results} title="Top Rated" shortened hrefType="movies" />
      <ItemsList items={nowPlaying.results} title="Now Playing" shortened hrefType="movies" />
    </div>
  );
}
