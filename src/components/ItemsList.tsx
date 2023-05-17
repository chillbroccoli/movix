"use client";

import { IconCalendar, IconHeart, IconHeartFilled, IconStarFilled } from "@tabler/icons-react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import imageNotFound from "~/images/image_not_available.png";
import { POSTER_IMAGE } from "~/lib/constants";
import { DisplayMode, useSettingsStore } from "~/lib/stores/settings-store";
import { useWatchlistStore } from "~/lib/stores/watchlist-store";
import { Resource } from "~/lib/types";

import { Carousel } from "./Carousel";
import { Pagination } from "./Pagination";

export function ItemsList({
  items = [],
  title,
  shortened = false,
  hrefType = "movies",
  withPagination = false,
  currentPage,
  totalPages,
  defaultDisplayMode,
  goToPreviousPage,
  goToNextPage,
}: {
  items: Resource[];
  title: string;
  shortened?: boolean;
  hrefType?: "movies" | "tv";
  withPagination?: boolean;
  itemsPerPage?: number;
  currentPage?: number;
  totalPages?: number;
  defaultDisplayMode?: DisplayMode;
  goToPreviousPage?: () => void;
  goToNextPage?: () => void;
}) {
  const displayMode = useSettingsStore((store) => store.displayMode);
  const itemsToDisplay = shortened ? items.slice(0, 12) : items;
  const shouldDisplayItemList =
    (defaultDisplayMode && defaultDisplayMode === "grid") ||
    (!defaultDisplayMode && displayMode === "grid");
  const shouldDisplayCarousel =
    (defaultDisplayMode && defaultDisplayMode === "carousel") ||
    (!defaultDisplayMode && displayMode === "carousel");
  let displayedContent;

  useEffect(() => {
    useSettingsStore.persist.rehydrate();
  }, []);

  if (shouldDisplayItemList) {
    displayedContent = (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
        {itemsToDisplay.map((item) => (
          <ListItem key={item.id} item={item} hrefType={hrefType} />
        ))}
      </div>
    );
  }

  if (shouldDisplayCarousel) {
    displayedContent = (
      <div>
        <Carousel items={items} hrefType={hrefType} />
      </div>
    );
  }

  return (
    <div className="p-4 px-8 pt-8">
      <h5 className="pb-4 text-3xl font-semibold tracking-tighter">{title}</h5>

      {displayedContent}

      {withPagination && goToNextPage && goToPreviousPage ? (
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
  const watchlist = useWatchlistStore((store) => store.watchlist);
  const addToWatchlist = useWatchlistStore((store) => store.addToWatchlist);
  const itemInWatchlist = (watchlist ?? []).find(
    (itemInList: Resource) => itemInList.id === item.id
  );
  const linkHref =
    item.media_type === "movie"
      ? `/movies/${item.id}`
      : item.media_type === "tv"
      ? `/tv/${item.id}`
      : `/${hrefType}/${item.id}`;

  useEffect(() => {
    useWatchlistStore.persist.rehydrate();
  }, []);

  const handleAddToWatchlistClick = (e: React.MouseEvent<HTMLButtonElement>, item: Resource) => {
    e.preventDefault();

    addToWatchlist(item, hrefType);
  };

  return (
    <Link href={linkHref} className="group" prefetch={false}>
      <div className="relative overflow-hidden rounded-md shadow-sm bg-zinc-800 shadow-white/20">
        <div className="relative">
          <ListItemPosterImage item={item} />
          <button
            onClick={(event) => handleAddToWatchlistClick(event, item)}
            className="absolute rounded-bl-xl top-0 p-2 -right-[100%] bg-pink-500/80 group-hover:-right-0 transition-all duration-300 ease-in-out z-10"
          >
            {itemInWatchlist ? (
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
  const imageSrc = item.poster_path ? `${POSTER_IMAGE.W342}${item.poster_path}` : imageNotFound;
  const imageAlt = item?.title ?? item?.name ?? "";

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="transition-all duration-200 ease-in-out group-hover:scale-110"
      />
    </div>
  );
}

function ListItemInfo({ item }: { item: Resource }) {
  const addPadding = item.vote_average && (item?.release_date || item?.first_air_date);
  const title = item?.title ?? item?.name ?? "";

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
          addPadding && "pt-3"
        )}
      >
        {title}
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
