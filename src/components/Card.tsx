import React, { PropsWithChildren } from "react";

export default function Card({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`relative rounded-xl border border-gray-300 dark:border-gray-700 
                  bg-white dark:bg-gray-800 p-6 shadow-sm transition-all duration-300 
                  hover:shadow-2xl hover:-translate-y-1 ${className}`}>
      <div
        className="absolute inset-0 rounded-xl 
                      bg-gradient-to-br from-gray-100 to-transparent dark:from-gray-700 
                      opacity-50 pointer-events-none"
      />
      <div className="relative z-10 text-gray-900 dark:text-gray-100">
        {children}
      </div>
    </div>
  );
}
