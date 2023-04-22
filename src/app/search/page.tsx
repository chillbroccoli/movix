import { ItemsList } from "~/components/ItemsList";
import { SearchBar } from "~/components/SearchBar";
import { ViewToggle } from "~/components/ViewToggle";
import { multiSearch } from "~/lib/api";
import { SearchParams } from "~/lib/types";

export default async function SearchPage({ searchParams }: { searchParams?: SearchParams }) {
  const data = await multiSearch(searchParams?.q as string);

  return (
    <div>
      <SearchBar />
      <div className="pt-3">
        <ViewToggle />
      </div>
      {!!data?.results?.length && (
        <ItemsList items={data.results} title={`Search result for: ${searchParams?.q}`} />
      )}
    </div>
  );
}
