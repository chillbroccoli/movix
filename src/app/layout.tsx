import "./globals.css";

import { Inter } from "next/font/google";
import clsx from "clsx";
import { Sidebar } from "~/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Movix",
  description: "Place for movies and tv shows",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="w-full h-full">
      <body className={clsx(inter.className, "h-full bg-zinc-900 text-white")}>
        <div className="w-full h-full">
          <Sidebar />
          <div className="w-[85%] ml-[15%] h-full">
            <main className="w-full h-full">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
