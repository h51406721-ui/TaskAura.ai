import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white p-4 font-bold">Dashboard</nav>
      <main className="p-8">{children}</main>
    </div>
  );
}
