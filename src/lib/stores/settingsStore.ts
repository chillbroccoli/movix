import { create } from "zustand";

export type DisplayMode = "grid" | "carousel";

type SettingsStore = {
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
};

export const useSettingsStore = create<SettingsStore>()((set) => ({
  displayMode: "grid",
  setDisplayMode: (mode: DisplayMode) => set({ displayMode: mode }),
}));
