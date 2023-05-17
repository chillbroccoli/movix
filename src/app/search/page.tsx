import { ItemsList } from "~/components/ItemsList";
import { SearchBar } from "~/components/SearchBar";
import { multiSearch } from "~/lib/api";
import { SearchParams } from "~/lib/types";

export default async function SearchPage({ searchParams }: { searchParams?: SearchParams }) {
  const data = await multiSearch(searchParams?.q as string);

  return (
    <div>
      <SearchBar />
      {!!data?.results?.length && (
        <ItemsList
          items={data.results}
          title={`Search results for: ${searchParams?.q}`}
          defaultDisplayMode="grid"
        />
      )}
    </div>
  );
}
