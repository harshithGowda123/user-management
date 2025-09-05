import React from "react";
import type { User } from "../types";
import { Eye } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

export default function UsersTable({
  users,
  onNameClick,
}: {
  users: User[];
  onNameClick: (u: User) => void;
}) {
  return (
    <div className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="max-h-96 overflow-y-auto overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                Name
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                Gender
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                DOB
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                Address
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                ID
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                Email
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                Nationality
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr
                key={u.login.uuid}
                className={
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                }>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                  {u.name.first} {u.name.last}
                </td>
                <td className="px-4 py-3 capitalize text-gray-800 dark:text-gray-200">
                  {u.gender}
                </td>
                <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                  {new Date(u.dob.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 max-w-xs truncate text-gray-800 dark:text-gray-200">
                  {u.location.street.number} {u.location.street.name},{" "}
                  {u.location.city}
                </td>
                <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                  {u.id.value || u.login.uuid}
                </td>
                <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                  {u.email}
                </td>
                <td className="px-4 py-3 flex items-center justify-center gap-2 text-gray-800 dark:text-gray-200">
                  <ReactCountryFlag
                    countryCode={u.nat}
                    svg
                    style={{ width: "1.5em", height: "1.5em", padding: "2px" }}
                    title={u.nat}
                  />
                  <span>{u.nat}</span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onNameClick(u)}
                    className="inline-flex items-center justify-center rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                    <Eye className="h-4 w-4 ml-2" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
