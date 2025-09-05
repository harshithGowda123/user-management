import React, { useEffect, useMemo, useState } from "react";
import PageShell from "../components/PageShell";
import Card from "../components/Card";
import ChartBar from "../components/ChartBar";
import ChartPie from "../components/ChartPie";
import { fetchNinetyUsers } from "../lib/usersService";

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        setError(err.message || "Failed");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const total = users.length;

  const nationalityData = useMemo(() => {
    const map = new Map<string, number>();
    users.forEach((u) => map.set(u.nat, (map.get(u.nat) || 0) + 1));
    return Array.from(map.entries())
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
  }, [users]);

  const genderData = useMemo(() => {
    const map = new Map<string, number>();
    users.forEach((u) => map.set(u.gender, (map.get(u.gender) || 0) + 1));
    return Array.from(map.entries()).map(([label, value]) => ({
      label,
      value,
    }));
  }, [users]);

  return (
    <PageShell title="Dashboard">
      <div className="w-full px-6 py-4">
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
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Large card for total users */}
            <Card className="lg:col-span-3 flex flex-col items-center justify-center text-center py-10">
              <div className="text-lg text-gray-600 dark:text-gray-400">
                Total Users
              </div>
              <div className="mt-2 text-5xl font-bold text-gray-900 dark:text-gray-100">
                {total}
              </div>
            </Card>

            <Card className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Nationality distribution
                  </h3>
                  <ChartBar data={nationalityData} />
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Gender distribution
                  </h3>
                  <ChartPie data={genderData} />
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </PageShell>
  );
}
