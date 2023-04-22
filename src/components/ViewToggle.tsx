"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { IconGridDots, IconCarouselHorizontal } from "@tabler/icons-react";
import { DisplayMode, useSettingsStore } from "~/lib/stores/settingsStore";

const toggleGroupItemClassName = `hover:bg-pink-500/40 data-[state=on]:bg-pink-500/50 rounded-md p-1`;

export function ViewToggle() {
  const displayMode = useSettingsStore((store) => store.displayMode);
  const setDisplayMode = useSettingsStore((store) => store.setDisplayMode);

  return (
    <div className="flex items-center p-4 px-8">
      <ToggleGroup.Root
        type="single"
        value={displayMode}
        onValueChange={(val: DisplayMode) => setDisplayMode(val)}
        aria-label="View of displayed items"
        className="inline-flex p-1 px-2 space-x-1 rounded-md bg-pink-500/30"
      >
        <ToggleGroup.Item
          className={toggleGroupItemClassName}
          value="grid"
          aria-label="Display items in grid view"
        >
          <IconGridDots />
        </ToggleGroup.Item>
        <ToggleGroup.Item
          className={toggleGroupItemClassName}
          value="carousel"
          aria-label="Display items in carousel view"
        >
          <IconCarouselHorizontal />
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
  );
}
