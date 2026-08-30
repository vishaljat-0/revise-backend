import React from 'react';
import MarkdownContent from './MarkdownContent';

export default function ProblemCard({ problem }) {
  return (
    <div className="bg-[#1A1D27] border border-[#2A2D3A] rounded-lg overflow-hidden">
      <div className="px-5 py-3 border-b border-[#2A2D3A] flex items-center gap-2.5">
        <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
          Challenge
        </span>
      </div>
      <div className="px-5 py-4">
        <MarkdownContent content={problem} />
      </div>
    </div>
  );
}
