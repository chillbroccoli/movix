"use client";

import { Logo } from "./Logo";
import { Nav } from "./Nav";
import { SearchBar } from "./SearchBar";

export function Sidebar() {
  return (
    <div className="fixed top-0 bottom-0 left-0 w-[15%] h-full p-6 px-8 border-r border-pink-500/30">
      <Logo />
      <Nav />
      <SearchBar />
    </div>
  );
}
