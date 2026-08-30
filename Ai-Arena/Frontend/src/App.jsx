import React, { useState } from 'react';
import { Swords } from 'lucide-react';
import Header from './components/Header';
import ProblemCard from './components/ProblemCard';
import BattleSection from './components/BattleSection';
import JudgeSection from './components/JudgeSection';
import InputBar from './components/InputBar';
import { MOCK_DATA } from './data/mockData';

// ── App ────────────────────────────────────────────────────────
// `data` starts as MOCK_DATA for demonstration.
// Connect your backend: call your API in handleSubmit,
// then setData(apiResponse) — the shape must match MOCK_DATA.
export default function App() {
  const [data, setData] = useState(MOCK_DATA);

  const handleSubmit = (prompt) => {
    // TODO: replace with your API call, e.g.:
    // const response = await fetch('/api/battle', { method:'POST', body: JSON.stringify({ prompt }) });
    // setData(await response.json());
    console.log('Prompt submitted:', prompt);
  };

  return (
    <div className="min-h-screen bg-[#0F1117]">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-40 space-y-6">
        {data ? (
          <>
            <ProblemCard problem={data.problem} />
            <BattleSection data={data} />
            <JudgeSection judge={data.Judge} />
          </>
        ) : (
          /* Empty / idle state */
          <div className="flex flex-col items-center justify-center py-40 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Swords size={24} className="text-blue-400" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-lg font-semibold text-slate-200">Ready to Battle</h2>
              <p className="text-sm text-slate-500 max-w-sm">
                Describe your challenge below and click{' '}
                <strong className="text-slate-400">Run Battle</strong> to benchmark two AI models head-to-head.
              </p>
            </div>
          </div>
        )}
      </main>

      <InputBar onSubmit={handleSubmit} />
    </div>
  );
}