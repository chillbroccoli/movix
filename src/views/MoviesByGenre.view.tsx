"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Featured } from "~/components/Featured";
import { ItemsList } from "~/components/ItemsList";
import { ViewToggle } from "~/components/ViewToggle";
import { getRandomResource } from "~/lib/helpers/getRandomResource";
import type { Genre, ListResponse, Movie } from "~/lib/types";

type MoviesByGenreViewProps = {
  data: ListResponse<Movie>;
  genre: Genre;
};

export function MoviesByGenreView({ data, genre }: MoviesByGenreViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const randomResource = getRandomResource<Movie>(data.results);

  const generatePath = (page: "next" | "prev") => {
    const params = new URLSearchParams();
    const genre = searchParams.get("id") ?? "";
    const currentPage = Number(searchParams.get("page")) ?? 1;
    params.set("id", genre);
    params.set("page", String((currentPage ?? 1) + (page === "next" ? 1 : -1)));
    return decodeURIComponent(`${pathname}?${params.toString()}`);
  };

  const goToNextPage = () => {
    router.push(generatePath("next"));
  };

  const goToPreviousPage = () => {
    router.push(generatePath("prev"));
  };

  return (
    <div className="w-full">
      <Featured item={randomResource} />
      <div className="pt-3">
        <ViewToggle />
      </div>
      <ItemsList
        items={data.results}
        title={genre.name}
        withPagination
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        currentPage={data.page}
        totalPages={data.total_pages}
      />
    </div>
  );
}
