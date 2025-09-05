import React from "react";
import PageShell from "../components/PageShell";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <PageShell title="Not found">
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Page not found
        </p>
        <Link
          to="/dashboard"
          className="mt-4 inline-block rounded bg-gray-900 dark:bg-gray-100 px-4 py-2 text-sm text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200">
          Go home
        </Link>
      </div>
    </PageShell>
  );
}
