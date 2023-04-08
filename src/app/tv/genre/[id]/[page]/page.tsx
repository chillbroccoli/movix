import { Featured } from "~/components/Featured";
import { ItemsList } from "~/components/ItemsList";
import { getByGenre, getGenres } from "~/lib/api";
import { getRandomResource } from "~/lib/helpers/getRandomResource";
import { Resource } from "~/lib/types";

export default async function TvShowsGenresPage({
  params,
}: {
  params: { id: string; page: string };
}) {
  const [data, genres] = await Promise.all([
    getByGenre("tv", params.id, Number(params.page) ?? 1),
    getGenres("tv"),
  ]);

  const genre = genres.genres.find(
    (genre: { id: number; name: string }) => genre.id === Number(params.id)
  );

  const randomResource = getRandomResource<Resource>(data.results);

  return (
    <div>
      <Featured item={randomResource} />
      <ItemsList
        items={data.results}
        title={genre.name}
        withPagination
        currentPage={data.page}
        totalPages={data.total_pages}
        hrefType="tv"
      />
    </div>
  );
}
