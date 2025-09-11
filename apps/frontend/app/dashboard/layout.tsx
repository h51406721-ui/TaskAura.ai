import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col p-6" style={{boxShadow: '2px 0 8px rgba(0,0,0,0.03)'}}>
        <div className="mb-8 flex items-center gap-2">
          <img src="/next.svg" alt="TaskAura.ai logo" width={32} height={32} />
          <span className="font-extrabold text-xl text-gray-900">TaskAura<span className="text-blue-600">.ai</span></span>
        </div>
        <nav className="flex flex-col gap-4 text-gray-700 font-medium">
          <a href="/dashboard" className="hover:text-blue-600 transition-colors">Home</a>
          <a href="/dashboard/tasks" className="hover:text-blue-600 transition-colors">Tasks</a>
          <a href="/dashboard/summaries" className="hover:text-blue-600 transition-colors">Summaries</a>
          <a href="/dashboard/settings" className="hover:text-blue-600 transition-colors">Settings</a>
        </nav>
        <div className="mt-auto pt-8">
          <a href="/" className="text-sm text-gray-400 hover:text-blue-600">← Back to Home</a>
        </div>
      </aside>
      <main className="flex-1 p-10" style={{minHeight: '100vh', background: '#f8fafc'}}>
        {children}
      </main>
    </div>
  );
}
