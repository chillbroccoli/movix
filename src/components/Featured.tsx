"use client";

import { IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import { BACKDROP_IMAGE } from "~/lib/constants";
import { BREAKPOINTS } from "~/lib/constants/breakpoints";
import { trimLongText } from "~/lib/helpers/trimLongText";
import { useMediaQuery } from "~/lib/hooks/useMediaQuery";
import { Resource } from "~/lib/types";

export function Featured({ item }: { item: Resource }) {
  return (
    <div className="w-full h-[450px] lg:h-[650px] relative">
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
  const imageSrc = `${BACKDROP_IMAGE.W1280}${item.backdrop_path}`;
  const imageAlt = item?.title ?? item?.name ?? "";

  return (
    <div className="relative w-full h-full">
      <Image src={imageSrc} alt={imageAlt} fill />
    </div>
  );
}

function FeaturedContent({ item }: { item: Resource }) {
  const matchesLargeScreen = useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`);

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

      <p className="mt-4 max-w-[75%] lg:max-w-[50%]  text-sm lg:text-md font-light text-gray-100 lg:tracking-tighter">
        {item.overview &&
          (!matchesLargeScreen ? <>{trimLongText(item.overview, 250)}</> : <>{item.overview}</>)}
      </p>
    </>
  );
}
