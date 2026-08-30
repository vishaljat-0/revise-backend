import React, { useState } from 'react';
import { Scale, ChevronDown, ChevronUp } from 'lucide-react';
import ScoreBar from './ScoreBar';
import MarkdownContent from './MarkdownContent';

function ReviewCard({ label, content, isWinner }) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        isWinner
          ? 'border-emerald-500/30 bg-emerald-500/5'
          : 'border-[#2A2D3A] bg-[#13151E]'
      }`}
    >
      <p
        className={`text-xs font-semibold mb-3 uppercase tracking-wide ${
          isWinner ? 'text-emerald-400' : 'text-slate-500'
        }`}
      >
        {label}
      </p>
      <MarkdownContent content={content} />
    </div>
  );
}

export default function JudgeSection({ judge }) {
  const [showReviews, setShowReviews] = useState(false);

  const s1 = judge.aiSOlution_1_score;
  const s2 = judge.aiSolution_2_score;
  const winner = s1 > s2 ? 'Competitor 01' : s2 > s1 ? 'Competitor 02' : null;
  const winnerScore = winner === 'Competitor 01' ? s1 : s2;

  return (
    <div className="bg-[#1A1D27] border border-[#2A2D3A] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-[#2A2D3A] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Scale size={14} className="text-slate-500" />
          <span className="text-sm font-semibold text-slate-200">AI Judge</span>
        </div>
        {winner && (
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
            {winner} wins
          </span>
        )}
      </div>

      <div className="px-5 py-5 space-y-5">
        {/* Score rows */}
        <div className="space-y-3.5">
          <div>
            <p className="text-sm font-medium text-slate-400 mb-2">Competitor 01</p>
            <ScoreBar score={s1} isWinner={s1 > s2} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400 mb-2">Competitor 02</p>
            <ScoreBar score={s2} isWinner={s2 > s1} />
          </div>
        </div>

        {/* Verdict summary */}
        {winner && (
          <p className="text-sm text-slate-400 bg-[#13151E] border border-[#2A2D3A] rounded-lg px-4 py-3 leading-relaxed">
            <span className="font-semibold text-slate-200">{winner}</span> achieved a higher
            score ({winnerScore.toFixed(1)}/10) by better addressing all aspects of the challenge.
          </p>
        )}

        {/* Toggle reviews */}
        <button
          onClick={() => setShowReviews((v) => !v)}
          className="flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
        >
          {showReviews ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          {showReviews ? 'Hide' : 'Show'} detailed reviews
        </button>

        {/* Expandable reviews */}
        {showReviews && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 animate-in fade-in-0 slide-in-from-top-2 duration-200">
            <ReviewCard
              label="Competitor 01 Review"
              content={judge.Response_1_review}
              isWinner={s1 > s2}
            />
            <ReviewCard
              label="Competitor 02 Review"
              content={judge.Response_2_review}
              isWinner={s2 > s1}
            />
          </div>
        )}
      </div>
    </div>
  );
}
