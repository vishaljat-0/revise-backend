import React, { useState, useEffect } from 'react';

export default function ScoreBar({ score, isWinner }) {
  const [animate, setAnimate] = useState(false);
  const pct = Math.min(Math.max((score / 10) * 100, 0), 100);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-[#2A2D3A]">
        <div
          className={`h-full rounded-full transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isWinner ? 'bg-emerald-500' : 'bg-blue-500'
          }`}
          style={{ width: animate ? `${pct}%` : '0%' }}
        />
      </div>
      <span
        className={`text-sm font-semibold tabular-nums w-14 text-right ${
          isWinner ? 'text-emerald-400' : 'text-slate-400'
        }`}
      >
        {score.toFixed(1)}&thinsp;
        <span className="font-normal text-slate-600">/10</span>
      </span>
    </div>
  );
}
