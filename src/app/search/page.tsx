import { ItemsList } from "~/components/ItemsList";
import { SearchBar } from "~/components/SearchBar";
import { multiSearch } from "~/lib/api";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const data = await multiSearch(searchParams?.q as string);

  return (
    <div>
      <SearchBar />
      {!!data?.results?.length && (
        <ItemsList items={data.results} title={`Search result for: ${searchParams?.q}`} />
      )}
    </div>
  );
}
