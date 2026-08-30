import React from 'react';
import { Swords } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-[#0F1117]/90 backdrop-blur-md border-b border-[#2A2D3A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.4)]">
            <Swords size={14} className="text-white" />
          </div>
          <span className="font-semibold text-white text-[15px] tracking-tight">
            AI Arena
          </span>
        </div>
        <span className="text-xs text-slate-500 font-medium tracking-wide hidden sm:block">
          Benchmark. Compare. Decide.
        </span>
      </div>
    </header>
  );
}
