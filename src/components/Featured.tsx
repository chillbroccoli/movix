"use client";

import { IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import { BACKDROP_IMAGE } from "~/lib/constants";
import { Resource } from "~/lib/types";

export function Featured({ item }: { item: Resource }) {
  return (
    <div className="w-full h-[650px] relative">
      <BackdropImage item={item} />

      <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/70">
        <div className="flex flex-col items-start justify-center h-full px-12">
          <FeaturedContent item={item} />
        </div>
      </div>
    </div>
  );
}

function BackdropImage({ item }: { item: Resource }) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={`${BACKDROP_IMAGE.W1280}${item.backdrop_path}`}
        alt={item?.title ?? item?.name ?? ""}
        fill
      />
    </div>
  );
}

function FeaturedContent({ item }: { item: Resource }) {
  return (
    <>
      <h2 className="text-4xl font-semibold tracking-tight">{item?.title ?? item?.name}</h2>
      <div className="flex items-end mt-4 space-x-2">
        <IconStarFilled className="text-pink-500" />
        {item.vote_average && (
          <span className="text-sm font-light text-gray-100">
            {item.vote_average.toFixed(1)} rating
          </span>
        )}

        <span className="text-sm font-light text-gray-100">
          {item?.release_date ?? item?.first_air_date}
        </span>
      </div>

      <p className="mt-4 max-w-[50%] text-md font-light text-gray-100 tracking-tighter">
        {item.overview}
      </p>
    </>
  );
}
