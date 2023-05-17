"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tabs from "@radix-ui/react-tabs";
import { IconMenu2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getGenres } from "~/lib/api";
import { BREAKPOINTS } from "~/lib/constants/breakpoints";
import { useMediaQuery } from "~/lib/hooks/useMediaQuery";
import { Genre } from "~/lib/types";

export function GenresDropdown() {
  const router = useRouter();

  const matchesLargeScreen = useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`);

  const [moviesGenres, setMoviesGenres] = useState<Genre[]>([]);
  const [tvGenres, setTvGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const [moviesGenres, tvGenres] = await Promise.all([getGenres("movie"), getGenres("tv")]);

      setMoviesGenres(moviesGenres.genres);
      setTvGenres(tvGenres.genres);
    };

    fetchGenres();
  }, []);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild className="outline-none">
        <button className="transition-colors duration-200 ease-in-out rounded-md hover:bg-pink-500/30">
          <div className="flex w-full h-full gap-4 p-2">
            <IconMenu2 size={24} />
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side={matchesLargeScreen ? "right" : "top"}
          className="max-w-[300px] z-50 mr-6 lg:mr-0 bg-zinc-800 rounded-md shadow-sm shadow-white/20 border border-pink-500/70"
          sideOffset={5}
        >
          <Tabs.Root defaultValue="movies">
            <Tabs.List className="flex pb-2">
              <Tabs.Trigger
                value="movies"
                className="w-full p-1 data-[state=active]:bg-pink-500/50 border-b border-b-zinc-500 data-[state=active]:border-b-pink-400"
              >
                Movies
              </Tabs.Trigger>
              <Tabs.Trigger
                value="tv"
                className="w-full p-1 data-[state=active]:bg-pink-500/50 border-b border-b-zinc-500 data-[state=active]:border-b-pink-400"
              >
                Tv Shows
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="movies">
              <div className="flex flex-wrap items-center justify-start gap-2 px-2 pt-2 pb-2">
                {moviesGenres.map((genre) => (
                  <DropdownMenu.Item
                    key={genre.id}
                    className="p-1 border border-pink-500 rounded-md outline-none data-[highlighted]:bg-pink-500/30 transition-all duration-200 ease-in-out"
                  >
                    {/* Need to use buttons since, closing menu it's kinda not working with links */}
                    <button onClick={() => router.push(`/movies/by-genre?id=${genre.id}&page=1`)}>
                      <span>{genre.name}</span>
                    </button>
                  </DropdownMenu.Item>
                ))}
              </div>
            </Tabs.Content>
            <Tabs.Content value="tv">
              <div className="flex flex-wrap items-center justify-start gap-2 px-2 pt-2 pb-2">
                {tvGenres.map((genre) => (
                  <DropdownMenu.Item
                    key={genre.id}
                    className="p-1 border border-pink-500 rounded-md outline-none data-[highlighted]:bg-pink-500/30 transition-all duration-200 ease-in-out"
                  >
                    <button onClick={() => router.push(`/tv/by-genre?id=${genre.id}&page=1`)}>
                      <span>{genre.name}</span>
                    </button>
                  </DropdownMenu.Item>
                ))}
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
