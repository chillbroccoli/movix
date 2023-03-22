"use client";

import Image from "next/image";
import Link from "next/link";
import { POSTER_IMAGE } from "~/lib/constants";
import { Movie } from "~/lib/types";

export function ItemsList({ items, title }: { items: Movie[]; title: string }) {
  return (
    <div className="p-4 px-8 mt-8">
      <h5 className="mb-8 text-3xl font-semibold tracking-tighter">{title}</h5>

      <div className="grid grid-cols-6 gap-6">
        {items.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function ListItem({ item }: { item: Movie }) {
  return (
    <Link href={`/movies/${item.id}`} className="group">
      <div className="relative">
        <div className="relative">
          <div className="relative w-full h-[300px]">
            <Image src={`${POSTER_IMAGE.W342}${item.poster_path}`} alt={item.title} fill />
          </div>
          <div className="absolute top-0 bottom-0 left-0 right-0 transition-all duration-200 ease-in-out bg-black/20 group-hover:bg-black/40"></div>
        </div>

        <p className="pt-2 text-sm font-light">{item.title}</p>
      </div>
    </Link>
  );
}
