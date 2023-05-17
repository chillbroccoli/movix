import { multiSearch } from "~/lib/api";
import { SearchParams } from "~/lib/types";
import { SearchView } from "~/views/Search.view";

export default async function SearchPage({ searchParams }: { searchParams?: SearchParams }) {
  const data = await multiSearch(searchParams?.q as string);

  return <SearchView data={data} query={searchParams?.q as string} />;
}
