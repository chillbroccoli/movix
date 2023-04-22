"use client";

import Image from "next/image";
import Link from "next/link";

import { POSTER_IMAGE } from "~/lib/constants";
import { Resource } from "~/lib/types";
import imageNotFound from "~/images/image_not_available.png";

export function Carousel({
  items,
  hrefType = "movies",
}: {
  items: Resource[];
  hrefType?: "movies" | "tv";
}) {
  return (
    <div>
      <div className="flex p-4 space-x-6 overflow-x-scroll flex-nowrap snap-x">
        {items.map((item) => (
          <CarouselItem key={item.id} item={item} hrefType={hrefType} />
        ))}
      </div>
    </div>
  );
}

function CarouselItem({ item, hrefType }: { item: Resource; hrefType: "movies" | "tv" }) {
  return (
    <Link href={`/${hrefType}/${item.id}`} className="relative rounded-md group">
      <div className="snap-start w-[225px] h-[350px] flex-shrink-0 shadow-md shadow-white/20 rounded-md overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={item.poster_path ? `${POSTER_IMAGE.W342}${item.poster_path}` : imageNotFound}
            alt={item?.title ?? item?.name ?? ""}
            fill
          />
        </div>
      </div>

      <div className="absolute top-0 bottom-0 left-0 right-0 transition-all duration-200 ease-in-out bg-black/20 group-hover:bg-black/50"></div>
    </Link>
  );
}
