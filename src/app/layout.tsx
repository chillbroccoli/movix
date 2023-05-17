import "./globals.css";

import clsx from "clsx";
import { Inter } from "next/font/google";

import { Footer } from "~/components/Footer";
import { Sidebar } from "~/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Movix",
  description: "Place for movies and tv shows",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="w-full h-full">
      <head />
      <body className={clsx(inter.className, "h-full bg-zinc-900 text-white")}>
        <div className="w-full h-full">
          <Sidebar />
          <div className="lg:w-[calc(100%_-_100px)] w-full lg:ml-[100px] h-full flex flex-col justify-between relative">
            <main className="w-full">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
