"use client";
import React from "react";

interface Summary {
  id: number;
  period: string;
  summary: string;
  createdAt: string;
}

export default function SummaryCard({ summary }: { summary: Summary }) {
  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <div className="text-xs text-gray-400 mb-1">{summary.period.toUpperCase()} SUMMARY</div>
      <div className="text-gray-800 mb-2 whitespace-pre-line">{summary.summary}</div>
      <div className="text-xs text-gray-500">Generated: {new Date(summary.createdAt).toLocaleString()}</div>
    </div>
  );
}
