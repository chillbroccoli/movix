import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { SIDE_NAV } from "~/lib/constants";

export function Nav() {
  return (
    <div className="mt-10">
      <ul className="space-y-6">
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
        <button className="transition-colors duration-200 ease-in-out rounded-md hover:bg-pink-500/30">
          <div className="flex w-full h-full gap-4 p-2">
            <IconMenu2 size={24} />
          </div>
        </button>
      </ul>
    </div>
  );
}
