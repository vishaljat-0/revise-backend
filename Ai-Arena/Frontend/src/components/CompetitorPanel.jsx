import React from 'react';
import MarkdownContent from './MarkdownContent';

export default function CompetitorPanel({ label, latency, solution, isWinner }) {
  return (
    <div
      className={`bg-[#1A1D27] border rounded-lg overflow-hidden flex flex-col transition-all duration-300 ${
        isWinner
          ? 'border-emerald-500/50 shadow-[0_0_0_1px_rgba(52,211,153,0.2),0_4px_20px_rgba(52,211,153,0.08)]'
          : 'border-[#2A2D3A]'
      }`}
    >
      {/* Panel header */}
      <div
        className={`px-5 py-3 border-b flex items-center justify-between gap-3 ${
          isWinner
            ? 'border-emerald-500/20 bg-emerald-500/5'
            : 'border-[#2A2D3A]'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-200">{label}</span>
          {isWinner && (
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Winner
            </span>
          )}
        </div>
        <span className="text-xs text-slate-500 font-mono">{latency}</span>
      </div>

      {/* Response body */}
      <div className="px-5 py-4 flex-1 overflow-hidden">
        <MarkdownContent content={solution} />
      </div>
    </div>
  );
}
