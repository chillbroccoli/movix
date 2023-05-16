"use client";

import { IconExternalLink, IconHeart, IconHeartFilled, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect } from "react";
import { IMDB_LINK_BASE_URL, POSTER_IMAGE } from "~/lib/constants";
import { BREAKPOINTS } from "~/lib/constants/breakpoints";
import { convertTime } from "~/lib/helpers/convertTime";
import { formatMoney } from "~/lib/helpers/formatMoney";
import { useMediaQuery } from "~/lib/hooks/useMediaQuery";
import { useWatchlistStore } from "~/lib/stores/watchlist-store";
import { MovieDetails, Resource } from "~/lib/types";
import { Carousel } from "./Carousel";

export function MovieDetails({ item, similar }: { item: MovieDetails; similar: Resource[] }) {
  return (
    <div className="p-10 pt-8 lg:pt-16">
      <div className="flex flex-col lg:space-x-12 lg:flex-row">
        <MoviePosterImage src={item?.poster_path} title={item.title} />
        <MovieDetailsInfo item={item} />
      </div>

      <div className="pt-8">
        <h5 className="pb-4 text-3xl font-semibold tracking-tighter">Similar Movies</h5>
        <Carousel items={similar} />
      </div>
    </div>
  );
}

function MoviePosterImage({ src, title }: { src?: string; title: string }) {
  const imageSrc = `${POSTER_IMAGE.W342}${src}`;

  return (
    <div className="relative h-[450px] w-full lg:w-fit lg:min-w-[350px] overflow-hidden border-2 border-gray-700 rounded-md">
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="transition-all duration-200 ease-in-out group-hover:scale-110"
      />
    </div>
  );
}

function MovieDetailsInfo({ item }: { item: MovieDetails }) {
  const matchesLargeScreen = useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`);
  const watchlist = useWatchlistStore((store) => store.watchlist);
  const addToWatchlist = useWatchlistStore((store) => store.addToWatchlist);
  const itemInWatchlist = (watchlist ?? []).find(
    (itemInList: Resource) => itemInList.id === item.id
  );
  const imdbHref = `${IMDB_LINK_BASE_URL}/${item.imdb_id}`;

  useEffect(() => {
    useWatchlistStore.persist.rehydrate();
  }, []);

  const handleAddToWatchlistClick = (e: React.MouseEvent<HTMLButtonElement>, item: Resource) => {
    e.preventDefault();

    addToWatchlist(item, "movies");
  };

  return (
    <div className="flex flex-col justify-between pt-8 lg:pt-0">
      <div>
        <p className="mb-2 text-xl font-semibold tracking-tighter">{item.title}</p>
        <p>{item.tagline}</p>
        <MovieDetailsInfoList item={item} />
      </div>

      {!matchesLargeScreen ? (
        <div className="pt-4 lg:pt-0">
          <button
            onClick={(event) => handleAddToWatchlistClick(event, item)}
            className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-transparent border rounded-md shadow-sm border-pink-500/70 w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
          >
            {itemInWatchlist ? (
              <IconHeartFilled className="text-pink-500/70" />
            ) : (
              <IconHeart className="text-pink-500/70" />
            )}
          </button>
        </div>
      ) : null}

      {item.imdb_id && (
        <div className="pt-4 lg:pt-0">
          <a
            className="inline-flex items-center gap-x-1.5 rounded-md bg-pink-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            href={imdbHref}
            target="_blank"
            rel="noreferrer noopener"
          >
            Check on IMDB
            <IconExternalLink className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}

function MovieDetailsInfoList({ item }: { item: MovieDetails }) {
  return (
    <ul className="mt-6 space-y-2 font-light">
      <li className="flex items-center">
        <span className="w-[120px]">Released</span>
        <span>{item.release_date}</span>
      </li>
      <li className="flex items-center">
        <span className="w-[120px]">Rating</span>
        <div className="flex space-x-1">
          <IconStarFilled className="text-pink-500" />
          <span>{item.vote_average.toFixed(1)}</span>
        </div>
      </li>
      <li className="flex items-center">
        <span className="w-[120px]">Runtime</span>
        <span>{convertTime(item.runtime)}</span>
      </li>
      <li className="flex items-center">
        <span className="w-[120px]">Budget</span>
        <span>{formatMoney(item.budget)}</span>
      </li>
      <li className="flex items-center">
        <span className="w-[120px]">Revenue</span>
        <span>{formatMoney(item.revenue)}</span>
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
        <div className="flex space-x-1">
          {item.spoken_languages.map((language, index) => (
            <span key={language.name}>
              {language.name}
              {index < item.spoken_languages.length - 1 && ","}
            </span>
          ))}
        </div>
      </li>
      <li className="flex items-center">
        <span className="min-w-[120px] w-fit overflow-hidden">Production</span>
        <div className="flex flex-wrap space-x-1">
          {item.production_companies.map((company, index) => (
            <span key={company.id}>
              {company.name}
              {index < item.production_companies.length - 1 && ","}
            </span>
          ))}
        </div>
      </li>
    </ul>
  );
}
