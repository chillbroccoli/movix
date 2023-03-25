"use client";

import { ItemsList } from "~/components/ItemsList";
import { useLocalStorage } from "~/lib/hooks/useLocalStorage";

export default function WatchlistPage() {
  const [watchlist] = useLocalStorage("watchlist");

  return (
    <div>
      <ItemsList title="Your watchlist" items={watchlist} />
    </div>
  );
}
