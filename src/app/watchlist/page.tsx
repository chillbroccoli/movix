"use client";

import { useEffect } from "react";

import { ItemsList } from "~/components/ItemsList";
import { ViewToggle } from "~/components/ViewToggle";
import { useWatchlistStore, WatchlistItem } from "~/lib/stores/watchlist-store";

export default function WatchlistPage() {
  const watchlist = useWatchlistStore((store) => store.watchlist);

  useEffect(() => {
    useWatchlistStore.persist.rehydrate();
  }, []);

  const movies = watchlist.filter((item: WatchlistItem) => item.resourceType === "movie");
  const tvShows = watchlist.filter((item: WatchlistItem) => item.resourceType === "tv");

  return (
    <div>
      <div className="pt-3">
        <ViewToggle />
      </div>
      <ItemsList title="Movies" items={movies} hrefType="movies" />
      <ItemsList title="Tv Shows" items={tvShows} hrefType="tv" />
    </div>
  );
}
