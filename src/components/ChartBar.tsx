import React from "react";

export default function ChartBar({
  data,
}: {
  data: { label: string; value: number }[];
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div
          key={d.label}
          className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
          <div className="text-sm text-gray-600 dark:text-gray-300 w-full sm:w-28 truncate">
            {d.label}
          </div>
          <div className="flex-1 mt-1 sm:mt-0">
            <div className="h-4 rounded bg-gray-100 dark:bg-gray-700">
              <div
                className="h-4 rounded bg-gray-900 dark:bg-gray-200 transition-all"
                style={{ width: `${(d.value / max) * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-1 sm:mt-0 text-right text-sm text-gray-600 dark:text-gray-300 w-full sm:w-12">
            {d.value}
          </div>
        </div>
      ))}
    </div>
  );
}
