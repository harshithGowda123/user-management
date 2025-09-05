import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || !savedTheme) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const { pathname } = useLocation();

  const linkClasses = (path: string) =>
    `px-6 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
      pathname === path
        ? "border-gray-900 text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
        : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 dark:text-gray-300 dark:hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-gray-900 text-white">
            UM
          </div>
          <div className="text-base font-semibold dark:text-gray-100 hidden sm:block">
            User Management
          </div>
        </div>
        <nav className="absolute left-1/2 top-0 h-16 -translate-x-1/2 flex items-end gap-2">
          <Link to="/dashboard" className={linkClasses("/dashboard")}>
            Dashboard
          </Link>
          <Link to="/users" className={linkClasses("/users")}>
            Users
          </Link>
        </nav>

        <button
          onClick={toggleTheme}
          className="ml-4 rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
          {isDark ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
          )}
        </button>
      </div>
    </header>
  );
}
