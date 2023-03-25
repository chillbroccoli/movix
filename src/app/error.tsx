"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-4xl font-bold">Error</h1>
      <p className="mt-4 text-lg font-light text-gray-100">
        {error.message ?? "Something went wrong"}
      </p>
    </div>
  );
}
