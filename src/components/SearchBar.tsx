"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query) {
      router.push(`/search?q=${query}`);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="query"
          id="query"
          className="block w-full px-6 py-4 text-lg text-gray-400 border-0 border-b-2 shadow-sm outline-none bg-zinc-800 border-b-zinc-600 placeholder:text-gray-400 placeholder:text-lg focus:ring-0 focus:border-b-pink-500"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}
