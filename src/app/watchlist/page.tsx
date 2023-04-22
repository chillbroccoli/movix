"use client";

import { ItemsList } from "~/components/ItemsList";
import { ViewToggle } from "~/components/ViewToggle";
import { useLocalStorage } from "~/lib/hooks/useLocalStorage";

export default function WatchlistPage() {
  const [watchlist] = useLocalStorage("watchlist");

  return (
    <div>
      <div className="pt-3">
        <ViewToggle />
      </div>
      <ItemsList title="Your watchlist" items={watchlist} />
    </div>
  );
}
