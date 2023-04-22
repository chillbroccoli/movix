"use client";

import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center">
      <button
        onClick={() => router.back()}
        className="absolute px-1 py-1 border rounded-full top-4 left-4 bg-pink-500/50 border-pink-500/70"
      >
        <IconChevronLeft />
      </button>

      <h1 className="text-4xl font-bold">Error</h1>
      <p className="mt-4 text-lg font-light text-gray-100">
        {error.message ?? "Something went wrong"}
      </p>
    </div>
  );
}
