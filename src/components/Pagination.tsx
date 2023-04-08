import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export function Pagination({
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
}: {
  currentPage?: number;
  totalPages?: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}) {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-2">
        <button
          className="cursor-pointer rounded-md border border-pink-600/60 bg-pink-600/50 py-1.5  px-3 text-gray-200 hover:bg-pink-600/20 disabled:cursor-not-allowed disabled:bg-pink-600/5"
          onClick={() => goToPreviousPage()}
          disabled={currentPage === 1}
        >
          <IconChevronLeft size={20} />
        </button>
        <button
          className="cursor-pointer rounded-md border border-pink-600/60 bg-pink-600/50 py-1.5 px-3 text-gray-200 hover:bg-pink-600/20 disabled:cursor-not-allowed disabled:bg-pink-600/5"
          onClick={() => goToNextPage()}
          disabled={currentPage === totalPages}
        >
          <IconChevronRight size={20} />
        </button>
      </div>
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {currentPage} of {totalPages}
        </strong>
      </span>
    </div>
  );
}
