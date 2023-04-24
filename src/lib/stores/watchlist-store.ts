import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type WatchlistItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  resourceType: "movie" | "tv";
};

type WatchlistStore = {
  watchlist: WatchlistItem[];
  setWatchlist: (item: WatchlistItem[]) => void;
};

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set) => ({
      watchlist: [],
      setWatchlist: (item: WatchlistItem[]) => set({ watchlist: item }),
    }),
    {
      name: "movix.watchlist",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
