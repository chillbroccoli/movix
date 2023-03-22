import Link from "next/link";
import { SIDE_NAV } from "~/lib/constants";

export function Nav() {
  return (
    <div className="mt-10">
      <ul className="space-y-4">
        {SIDE_NAV.map((item) => (
          <li
            key={item.href}
            className="transition-colors duration-200 ease-in-out rounded-md hover:bg-pink-500/30"
          >
            <Link
              href={item.href}
              className="flex w-full h-full gap-4 p-3 pl-0"
            >
              <div className="pl-2">
                <item.icon size={24} />
              </div>
              <span className="text-xl">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
