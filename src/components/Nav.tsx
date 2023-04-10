import Link from "next/link";

import { SIDE_NAV } from "~/lib/constants";
import { GenresDropdown } from "./GenresDropdown";

export function Nav() {
  return (
    <div className="h-full lg:mt-10">
      <ul className="flex flex-row items-center justify-center h-full space-x-4 lg:items-start lg:justify-start lg:space-x-0 lg:space-y-6 lg:flex-col">
        {SIDE_NAV.map((item) => (
          <li
            key={item.href}
            className="transition-colors duration-200 ease-in-out rounded-md hover:bg-pink-500/30"
          >
            <Link href={item.href} className="flex w-full h-full gap-4 p-2">
              <div>
                <item.icon size={24} />
              </div>
            </Link>
          </li>
        ))}

        <GenresDropdown />
      </ul>
    </div>
  );
}
