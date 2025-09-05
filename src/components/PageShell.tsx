import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";

export default function PageShell({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
      <Navbar />

      <main className="container mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <h1 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h1>
        {children}
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
