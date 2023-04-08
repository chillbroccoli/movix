"use client";

import { IconHeart, IconHeartFilled, IconStarFilled, IconCalendar } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useRouter, usePathname } from "next/navigation";
import imageNotFound from "~/images/image_not_available.png";
import { POSTER_IMAGE } from "~/lib/constants";
import { useLocalStorage } from "~/lib/hooks/useLocalStorage";
import { Resource } from "~/lib/types";
import { Pagination } from "./Pagination";

export function ItemsList({
  items = [],
  title,
  shortened = false,
  hrefType = "movies",
  withPagination = false,
  currentPage,
  totalPages,
}: {
  items: Resource[];
  title: string;
  shortened?: boolean;
  hrefType?: "movies" | "tv";
  withPagination?: boolean;
  itemsPerPage?: number;
  currentPage?: number;
  totalPages?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const goToNextPage = () => {
    const pathnameItems = pathname.split("/");
    pathnameItems.pop();
    pathnameItems.push(String((currentPage ?? 1) + 1));
    router.push(pathnameItems.join("/"));
  };

  const goToPreviousPage = () => {
    const pathnameItems = pathname.split("/");
    pathnameItems.pop();
    pathnameItems.push(String((currentPage ?? 1) - 1));
    router.push(pathnameItems.join("/"));
  };

  return (
    <div className="p-4 px-8 pt-8">
      <h5 className="pb-8 text-3xl font-semibold tracking-tighter">{title}</h5>

      <div className="grid grid-cols-6 gap-6">
        {(shortened ? items.slice(0, 12) : items).map((item) => (
          <ListItem key={item.id} item={item} hrefType={hrefType} />
        ))}
      </div>

      {withPagination ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
        />
      ) : null}
    </div>
  );
}

function ListItem({ item, hrefType }: { item: Resource; hrefType: "movies" | "tv" }) {
  const [watchlist, setWatchlist] = useLocalStorage("watchlist");

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
      };

      setWatchlist([...watchlist, newItem]);
    }
  };

  return (
    <Link
      href={
        item?.media_type === "movie"
          ? `/movies/${item.id}`
          : item?.media_type === "tv"
          ? `/tv/${item.id}`
          : `/${hrefType}/${item.id}`
      }
      className="group"
      prefetch={false}
    >
      <div className="relative overflow-hidden rounded-md shadow-sm bg-zinc-800 shadow-white/20">
        <div className="relative">
          <ListItemPosterImage item={item} />
          <button
            onClick={(e) => addToWatchList(e, item)}
            className="absolute rounded-bl-xl top-0 p-2 -right-[100%] bg-pink-500/80 group-hover:-right-0 transition-all duration-300 ease-in-out z-10"
          >
            {(watchlist ?? []).find((itemInList: Resource) => itemInList.id === item.id) ? (
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
        src={item.poster_path ? `${POSTER_IMAGE.W342}${item.poster_path}` : imageNotFound}
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
      <div className="flex items-center mt-1 space-x-2">
        {item.vote_average && item.vote_average > 0 ? (
          <Votes voteAverage={item.vote_average} />
        ) : null}

        {item?.release_date ? (
          <ReleaseOrAirDate date={item.release_date} />
        ) : item?.first_air_date ? (
          <ReleaseOrAirDate date={item.first_air_date} />
        ) : null}
      </div>
      <p
        className={clsx(
          "pb-1 text-sm font-extralight text-zinc-100 flex items-end h-[50px]",
          item.vote_average && (item?.release_date || item?.first_air_date) && "pt-3"
        )}
      >
        {item?.title ?? item?.name ?? ""}
      </p>
    </div>
  );
}

function ReleaseOrAirDate({ date }: { date: string }) {
  return (
    <div className="flex items-center space-x-1">
      <IconCalendar className="text-pink-500" size={16} />
      <span className="text-sm font-extralight text-zinc-300">{new Date(date).getFullYear()}</span>
    </div>
  );
}

function Votes({ voteAverage }: { voteAverage: number }) {
  return (
    <div className="flex items-center space-x-1">
      <IconStarFilled className="text-pink-500" size={16} />
      <span className="text-sm font-extralight text-zinc-300">{voteAverage.toFixed(1)}</span>
    </div>
  );
}
