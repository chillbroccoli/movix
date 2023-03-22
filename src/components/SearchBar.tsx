"use client";

import { IconSearch } from "@tabler/icons-react";

export function SearchBar() {
  return (
    <div className="mt-10">
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full bg-zinc-700 rounded-md border-0 pl-2 py-1.5 pr-10 text-gray-200 ring-1 ring-inset ring-pink-500 placeholder:text-gray-200 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 outline-none"
          placeholder="Search..."
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <IconSearch className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
