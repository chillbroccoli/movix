import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { HrefType, Resource } from "../types";

export type WatchlistItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  resourceType: HrefType;
};

type WatchlistStore = {
  watchlist: WatchlistItem[];
  setWatchlist: (item: WatchlistItem[]) => void;
  addToWatchlist: (item: Resource, hrefType: string) => void;
};

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set) => ({
      watchlist: [],
      setWatchlist: (item: WatchlistItem[]) => set({ watchlist: item }),
      addToWatchlist: (item: Resource, hrefType: string) =>
        set((state) => {
          const itemExists = (state.watchlist ?? []).find(
            (itemInList: Resource) => itemInList.id === item.id
          );

          if (itemExists) {
            const filteredWatchlist = state.watchlist.filter(
              (itemInList: Resource) => itemInList.id !== item.id
            );

            return { ...state, watchlist: filteredWatchlist };
          }

          const newItem = {
            id: item.id,
            ...(item.title && { title: item.title }),
            ...(item.name && { name: item.name }),
            ...(item.poster_path && { poster_path: item.poster_path }),
            resourceType: hrefType === "movies" ? "movie" : "tv",
          } as WatchlistItem;

          return { ...state, watchlist: [...state.watchlist, newItem] };
        }),
    }),
    {
      name: "movix.watchlist",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
