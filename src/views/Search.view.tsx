"use client";

import { ItemsList } from "~/components/ItemsList";
import { SearchBar } from "~/components/SearchBar";
import { ListResponse, Resource } from "~/lib/types";

type SearchViewProps = {
  query?: string;
  data?: ListResponse<Resource>;
};

export function SearchView({ data, query }: SearchViewProps) {
  return (
    <div>
      <SearchBar />
      {!!data?.results?.length && (
        <ItemsList
          items={data.results}
          title={`Search results for: ${query}`}
          defaultDisplayMode="grid"
        />
      )}
    </div>
  );
}
