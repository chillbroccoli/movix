"use client";

import { IconHeart, IconHeartFilled, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect } from "react";

import { POSTER_IMAGE } from "~/lib/constants";
import { BREAKPOINTS } from "~/lib/constants/breakpoints";
import { convertTime } from "~/lib/helpers/convertTime";
import { getAverage } from "~/lib/helpers/getAverage";
import { useMediaQuery } from "~/lib/hooks/useMediaQuery";
import { useWatchlistStore, WatchlistItem } from "~/lib/stores/watchlist-store";
import { Resource, TvShowDetails } from "~/lib/types";

import { Carousel } from "./Carousel";

export function TvShowDetails({ item, similar }: { item: TvShowDetails; similar: Resource[] }) {
  return (
    <div className="p-10 pt-8 lg:pt-16">
      <div className="flex flex-col lg:space-x-12 lg:flex-row">
        <TvShowPosterImage src={item?.poster_path} title={item.name} />
        <TvShowDetailsInfo item={item} />
      </div>

      <div className="pt-8">
        <h5 className="pb-4 text-3xl font-semibold tracking-tighter">Similar Tv Shows</h5>
        <Carousel items={similar} />
      </div>
    </div>
  );
}

function TvShowPosterImage({ src, title }: { src?: string; title: string }) {
  return (
    <div className="relative h-[450px] w-full lg:w-fit lg:min-w-[350px] overflow-hidden border-2 border-gray-700 rounded-md">
      <Image
        src={`${POSTER_IMAGE.W342}${src}`}
        alt={title}
        fill
        className="transition-all duration-200 ease-in-out group-hover:scale-110"
      />
    </div>
  );
}

function TvShowDetailsInfo({ item }: { item: TvShowDetails }) {
  const matchesLargeScreen = useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`);
  const watchlist = useWatchlistStore((store) => store.watchlist);
  const setWatchlist = useWatchlistStore((store) => store.setWatchlist);

  useEffect(() => {
    useWatchlistStore.persist.rehydrate();
  }, []);

  const addToWatchList = (e: React.MouseEvent<HTMLButtonElement>, item: Resource) => {
    e.preventDefault();

    if ((watchlist ?? []).find((itemInList: Resource) => itemInList.id === item.id)) {
      setWatchlist(watchlist.filter((itemInList: Resource) => itemInList.id !== item.id));
    } else {
      const newItem = {
        id: item.id,
        ...(item.title && { title: item.title }),
        ...(item.name && { name: item.name }),
        ...(item.poster_path && { poster_path: item.poster_path }),
        resourceType: "tv",
      } as WatchlistItem;

      setWatchlist([...watchlist, newItem]);
    }
  };

  return (
    <div className="flex flex-col justify-between pt-8 lg:pt-0">
      <div>
        <p className="mb-2 text-xl font-semibold tracking-tighter">{item.name}</p>
        <p>{item.tagline}</p>
        <TvShowDetailsInfoList item={item} />
      </div>

      {!matchesLargeScreen ? (
        <div className="pt-4 lg:pt-0">
          <button
            onClick={(e) => addToWatchList(e, item)}
            className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-transparent border rounded-md shadow-sm border-pink-500/70 w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
          >
            {(watchlist ?? []).find((itemInList: Resource) => itemInList.id === item.id) ? (
              <IconHeartFilled className="text-pink-500/70" />
            ) : (
              <IconHeart className="text-pink-500/70" />
            )}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function TvShowDetailsInfoList({ item }: { item: TvShowDetails }) {
  return (
    <ul className="mt-6 space-y-2 font-light">
      <li className="flex items-center">
        <span className="w-[120px]">First Air Date</span>
        <span>{item.first_air_date}</span>
      </li>
      <li className="flex items-center">
        <span className="w-[120px]">Rating</span>
        <div className="flex space-x-1">
          <IconStarFilled className="text-pink-500" />
          <span>{item.vote_average.toFixed(1)}</span>
        </div>
      </li>
      <li className="flex items-center">
        <span className="w-[120px]">Created By</span>
        <div className="flex space-x-1">
          {item.created_by.map((creator, index) => (
            <span key={creator.id}>
              {creator.name}
              {index < item.created_by.length - 1 && ","}
            </span>
          ))}
        </div>
      </li>
      <li className="flex items-center">
        <span className="w-[120px]">Seasons</span>
        <span>{item.number_of_seasons}</span>
      </li>
      <li className="flex items-center">
        <span className="w-[120px]">Episodes</span>
        <span>{item.number_of_episodes}</span>
      </li>
      <li className="flex items-center">
        <span className="w-[120px]">Runtime</span>
        <span>{convertTime(getAverage(item.episode_run_time))}</span>
      </li>
      <li className="flex items-center">
        <span className="min-w-[120px] w-fit overflow-hidden">Networks</span>
        <div className="flex flex-wrap space-x-1">
          {item.networks.map((network, index) => (
            <span key={network.id}>
              {network.name}
              {index < item.networks.length - 1 && ","}
            </span>
          ))}
        </div>
      </li>
      <li className="flex items-center">
        <span className="min-w-[120px] w-fit overflow-hidden">Genres</span>
        <div className="flex flex-wrap space-x-1">
          {item.genres.map((genre, index) => (
            <span key={genre.id}>
              {genre.name}
              {index < item.genres.length - 1 && ","}
            </span>
          ))}
        </div>
      </li>
      <li className="flex items-center">
        <span className="min-w-[120px] w-fit overflow-hidden">Languages</span>
        <div className="flex flex-wrap space-x-1">
          {item.spoken_languages.map((language, index) => (
            <span key={language.name}>
              {language.name}
              {index < item.spoken_languages.length - 1 && ","}
            </span>
          ))}
        </div>
      </li>
      <li className="flex items-center">
        <span className="w-[120px]">Status</span>
        <span>{item.status}</span>
      </li>
    </ul>
  );
}
