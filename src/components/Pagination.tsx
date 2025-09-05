import React from "react";

export default function Pagination({
  page,
  total,
  perPage,
  onPageChange,
}: {
  page: number;
  total: number;
  perPage: number;
  onPageChange: (p: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / perPage));

  const buttonClasses =
    "rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-1 text-gray-700 dark:text-gray-200 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors";

  return (
    <div className="flex items-center justify-between text-sm">
      <div className="text-gray-600 dark:text-gray-300">
        Page {page} of {pages}
      </div>
      <div className="flex items-center gap-2 ml-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          className={buttonClasses}>
          First
        </button>
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className={buttonClasses}>
          Prev
        </button>
        <button
          onClick={() => onPageChange(Math.min(pages, page + 1))}
          disabled={page === pages}
          className={buttonClasses}>
          Next
        </button>
        <button
          onClick={() => onPageChange(pages)}
          disabled={page === pages}
          className={buttonClasses}>
          Last
        </button>
      </div>
    </div>
  );
}
