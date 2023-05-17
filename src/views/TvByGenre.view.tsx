"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Featured } from "~/components/Featured";
import { ItemsList } from "~/components/ItemsList";
import { ViewToggle } from "~/components/ViewToggle";
import { Genre, ListResponse, TvShow } from "~/lib/types";

type TvByGenreViewProps = {
  data: ListResponse<TvShow>;
  randomResource: TvShow;
  genre: Genre;
};

export function TvByGenreView({ data, genre, randomResource }: TvByGenreViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
        hrefType="tv"
      />
    </div>
  );
}
