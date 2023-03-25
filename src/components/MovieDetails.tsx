"use client";

import { IconExternalLink, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import { IMDB_LINK_BASE_URL, POSTER_IMAGE } from "~/lib/constants";
import { convertTime } from "~/lib/helpers/convertTime";
import { formatMoney } from "~/lib/helpers/formatMoney";
import { MovieDetails, Resource } from "~/lib/types";
import { Carousel } from "./Carousel";

export function MovieDetails({ item, similar }: { item: MovieDetails; similar: Resource[] }) {
  return (
    <div className="p-10 pt-16">
      <div className="flex space-x-12">
        <MoviePosterImage src={item?.poster_path} title={item.title} />
        <MovieDetailsInfo item={item} />
      </div>

      <div className="pt-8">
        <Carousel title="Similar Movies" items={similar} />
      </div>
    </div>
  );
}

function MoviePosterImage({ src, title }: { src?: string; title: string }) {
  return (
    <div className="relative h-[450px] min-w-[350px] overflow-hidden border-2 border-gray-700 rounded-md">
      <Image
        src={`${POSTER_IMAGE.W342}${src}`}
        alt={title}
        fill
        className="transition-all duration-200 ease-in-out group-hover:scale-110"
      />
    </div>
  );
}

function MovieDetailsInfo({ item }: { item: MovieDetails }) {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <p className="mb-2 text-xl font-semibold tracking-tighter">{item.title}</p>
        <p>{item.tagline}</p>
        <MovieDetailsInfoList item={item} />
      </div>

      <div>
        {item.imdb_id && (
          <a
            className="inline-flex items-center gap-x-1.5 rounded-md bg-pink-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            href={`${IMDB_LINK_BASE_URL}/${item.imdb_id}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            Check on IMDB
            <IconExternalLink className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          </a>
        )}
      </div>
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
        <span className="w-[120px]">Genres</span>
        <div className="flex space-x-1">
          {item.genres.map((genre, index) => (
            <span key={genre.id}>
              {genre.name}
              {index < item.genres.length - 1 && ","}
            </span>
          ))}
        </div>
      </li>
      <li className="flex items-center">
        <span className="w-[120px]">Languages</span>
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
        <span className="w-[120px]">Production</span>
        <div className="flex space-x-1">
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
