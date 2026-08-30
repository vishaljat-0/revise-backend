import React from 'react';
import CompetitorPanel from './CompetitorPanel';

export default function BattleSection({ data }) {
  const s1 = data.Judge.aiSOlution_1_score;
  const s2 = data.Judge.aiSolution_2_score;

  return (
    <div>
      {/* Section label */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-[#2A2D3A]" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-1">
          Battle
        </span>
        <div className="flex-1 h-px bg-[#2A2D3A]" />
      </div>

      {/* Desktop: side-by-side with VS | Mobile: stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_40px_1fr] gap-4 items-start">
        <CompetitorPanel
          label="Competitor 01"
          latency="1.24s"
          solution={data.aiSolution_1}
          isWinner={s1 > s2}
        />

        {/* VS — desktop */}
        <div className="hidden lg:flex items-center justify-center pt-16 select-none">
          <span className="text-base font-black text-[#2E3244] tracking-tight">VS</span>
        </div>

        {/* VS — mobile */}
        <div className="flex lg:hidden items-center gap-3">
          <div className="flex-1 h-px bg-[#2A2D3A]" />
          <span className="text-sm font-bold text-[#2E3244]">VS</span>
          <div className="flex-1 h-px bg-[#2A2D3A]" />
        </div>

        <CompetitorPanel
          label="Competitor 02"
          latency="1.51s"
          solution={data.aiSolution_2}
          isWinner={s2 > s1}
        />
      </div>
    </div>
  );
}
