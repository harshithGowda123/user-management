import React from "react";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search name or nationality..."
      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 
                 bg-white dark:bg-gray-800 px-3 py-2 text-sm 
                 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                 outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 
                 transition-colors"
    />
  );
}
