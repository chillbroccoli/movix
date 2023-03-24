"use client";

import { Logo } from "./Logo";
import { Nav } from "./Nav";

export function Sidebar() {
  return (
    <div className="fixed top-0 bottom-0 left-0 w-[100px] h-full border-r border-pink-500/30">
      <div className="flex flex-col items-center justify-center pt-6">
        <Logo />
        <Nav />
      </div>
    </div>
  );
}
