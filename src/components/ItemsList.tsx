"use client";

import { IconHeart, IconHeartFilled, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { POSTER_IMAGE } from "~/lib/constants";
import { useLocalStorage } from "~/lib/hooks/useLocalStorage";
import { Resource } from "~/lib/types";

export function ItemsList({
  items = [],
  title,
  shortened = false,
  hrefType = "movies",
}: {
  items: Resource[];
  title: string;
  shortened?: boolean;
  hrefType?: "movies" | "tv";
}) {
  return (
    <div className="p-4 px-8 pt-8">
      <h5 className="pb-8 text-3xl font-semibold tracking-tighter">{title}</h5>

      <div className="grid grid-cols-5 gap-6">
        {(shortened ? items.slice(0, 10) : items).map((item) => (
          <ListItem key={item.id} item={item} hrefType={hrefType} />
        ))}
      </div>
    </div>
  );
}

function ListItem({ item, hrefType }: { item: Resource; hrefType: "movies" | "tv" }) {
  const [watchlist, setWatchlist] = useLocalStorage("watchlist");

  const addToWatchList = (e: React.MouseEvent<HTMLButtonElement>, item: Resource) => {
    e.preventDefault();

    if (watchlist.find((itemInList: Resource) => itemInList.id === item.id)) {
      setWatchlist(watchlist.filter((itemInList: Resource) => itemInList.id !== item.id));
    } else {
      const newItem = {
        id: item.id,
        ...(item.title && { title: item.title }),
        ...(item.name && { name: item.name }),
        ...(item.poster_path && { poster_path: item.poster_path }),
      };

      setWatchlist([...watchlist, newItem]);
    }
  };

  return (
    <Link href={`/${hrefType}/${item.id}`} className="group">
      <div className="relative overflow-hidden rounded-md shadow-sm bg-zinc-800 shadow-white/20">
        <div className="relative">
          <ListItemPosterImage item={item} />
          <button
            onClick={(e) => addToWatchList(e, item)}
            className="absolute rounded-bl-xl top-0 p-2 -right-[100%] bg-pink-500/80 group-hover:-right-0 transition-all duration-300 ease-in-out z-10"
          >
            {watchlist.find((itemInList: Resource) => itemInList.id === item.id) ? (
              <IconHeartFilled className="text-white" />
            ) : (
              <IconHeart className="text-white" />
            )}
          </button>
          <div className="absolute top-0 bottom-0 left-0 right-0 transition-all duration-200 ease-in-out bg-black/20 group-hover:bg-black/40"></div>
        </div>

        <ListItemInfo item={item} />
      </div>
    </Link>
  );
}

function ListItemPosterImage({ item }: { item: Resource }) {
  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      <Image
        src={`${POSTER_IMAGE.W342}${item.poster_path}`}
        alt={item?.title ?? item?.name ?? ""}
        fill
        className="transition-all duration-200 ease-in-out group-hover:scale-110"
      />
    </div>
  );
}

function ListItemInfo({ item }: { item: Resource }) {
  return (
    <div className="p-2">
      <div className="flex items-center justify-between mt-1">
        {item.vote_average && (
          <div className="flex items-center space-x-1">
            <IconStarFilled className="text-pink-500" />
            <span className="text-sm font-light text-gray-100">{item.vote_average.toFixed(1)}</span>
          </div>
        )}

        {item?.release_date ? (
          <span className="text-sm font-light text-gray-100">
            {new Date(item.release_date).getFullYear()}
          </span>
        ) : item?.first_air_date ? (
          <span className="text-sm font-light text-gray-100">
            {new Date(item.first_air_date).getFullYear()}
          </span>
        ) : null}
      </div>
      <p className="pt-3 pb-1 text-sm font-light">{item?.title ?? item?.name ?? ""}</p>
    </div>
  );
}
