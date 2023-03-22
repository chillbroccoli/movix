import Image from "next/image";
import Link from "next/link";
import { POSTER_IMAGE } from "~/lib/constants";
import { TrendingResource } from "~/lib/types";

export function Carousel({ items, title }: { items: TrendingResource[]; title: string }) {
  return (
    <div className="p-4 mt-2">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>

      <div className="flex p-4 space-x-4 overflow-x-scroll flex-nowrap snap-x">
        {items.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function CarouselItem({ item }: { item: TrendingResource }) {
  return (
    <Link
      href={item.media_type === "movie" ? `/movies/${item.id}` : `/tv/${item.id}`}
      className="relative group"
    >
      <div className="snap-start w-[225px] h-[350px] flex-shrink-0 skew-y-3">
        <div className="relative w-full h-full">
          <Image
            src={`${POSTER_IMAGE.W342}${item.poster_path}`}
            alt={item?.title ?? item?.name ?? ""}
            fill
          />
        </div>
      </div>

      <div className="absolute top-0 bottom-0 left-0 right-0 transition-all duration-200 ease-in-out skew-y-3 bg-black/20 group-hover:bg-black/50"></div>
    </Link>
  );
}
