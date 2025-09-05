import React, { useEffect, useMemo, useState } from "react";
import PageShell from "../components/PageShell";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import UsersTable from "../components/UsersTable";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import { fetchNinetyUsers } from "../lib/usersService";
import type { User } from "../types";

const PER_PAGE = 30;

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchNinetyUsers()
      .then((data) => {
        if (!mounted) return;
        setUsers(data);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || "Failed to load users");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u: any) => {
      const name = (u.name.first + " " + u.name.last).toLowerCase();
      const nat = (u.nat || "").toLowerCase();
      return name.includes(q) || nat.includes(q);
    });
  }, [users, query]);

  const start = (page - 1) * PER_PAGE;
  const pageRows = filtered.slice(start, start + PER_PAGE);

  return (
    <PageShell title="Users">
      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Users
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {users.length} users
            </p>
          </div>
          <div className="flex w-full gap-2 sm:w-64">
            <SearchBar value={query} onChange={setQuery} />
          </div>
        </div>

        {loading && (
          <div className="rounded border border-gray-200 dark:border-gray-700 p-3 text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900">
            Loading...
          </div>
        )}
        {error && (
          <div className="rounded border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/30 p-3 text-sm text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            <UsersTable users={pageRows} onNameClick={(u) => setSelected(u)} />
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total matching: {filtered.length}
              </div>
              <Pagination
                page={page}
                total={filtered.length}
                perPage={PER_PAGE}
                onPageChange={setPage}
              />
            </div>
          </div>
        )}

        <Modal open={!!selected} onClose={() => setSelected(null)}>
          {selected && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={selected.picture.large}
                  alt="pic"
                  className="h-20 w-20 rounded-full"
                />
                <div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {selected.name.first} {selected.name.last}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {selected.email}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-800 dark:text-gray-200">
                <div>
                  <strong>Gender:</strong> {selected.gender}
                </div>
                <div>
                  <strong>DOB:</strong>{" "}
                  {new Date(selected.dob.date).toLocaleDateString()}
                </div>
                <div>
                  <strong>Nationality:</strong> {selected.nat}
                </div>
                <div>
                  <strong>ID:</strong>{" "}
                  {selected.id.value || selected.login.uuid}
                </div>
                <div>
                  <strong>Address:</strong> {selected.location.street.number}{" "}
                  {selected.location.street.name}, {selected.location.city},{" "}
                  {selected.location.country}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </Card>
    </PageShell>
  );
}
