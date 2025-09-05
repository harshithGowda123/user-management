import React, { Suspense, lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

const Dashboard = lazy(() => import("./pages/Dashboard"))
const Users = lazy(() => import("./pages/Users"))
const NotFound = lazy(() => import("./pages/NotFound"))

export default function AppRouter() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-sm text-gray-600">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}