import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type DisplayMode = "grid" | "carousel";

type SettingsStore = {
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      displayMode: "grid",
      setDisplayMode: (mode: DisplayMode) => set({ displayMode: mode }),
    }),
    {
      name: "movix.settings",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
