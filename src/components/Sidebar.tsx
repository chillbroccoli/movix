"use client";

import { Logo } from "./Logo";
import { Nav } from "./Nav";

export function Sidebar() {
  return (
    <div className="fixed z-10 lg:z-0 lg:top-0 bottom-0 left-0 right-0 lg:w-[100px] h-[70px] lg:h-full lg:border-r lg:border-pink-500/30 bg-zinc-800 lg:bg-transparent">
      <div className="flex flex-row items-center justify-center h-full lg:pt-6 lg:flex-col">
        <div className="hidden lg:block">
          <Logo />
        </div>
        <Nav />
      </div>
    </div>
  );
}
