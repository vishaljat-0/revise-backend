import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function InputBar({ onSubmit }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }, [value]);

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit?.(value.trim());
    // Note: don't clear value — let parent decide based on API response
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-[#0F1117]/95 backdrop-blur-md border-t border-[#2A2D3A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-end gap-3">
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your challenge…"
            className="flex-1 resize-none rounded-lg border border-[#2A2D3A] bg-[#1A1D27]
              px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600
              focus:outline-none focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/10
              transition min-h-[42px] max-h-40 overflow-y-auto"
          />
          <button
            onClick={handleSubmit}
            disabled={!value.trim()}
            className="shrink-0 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700
              disabled:opacity-40 disabled:cursor-not-allowed
              text-white text-sm font-semibold px-4 h-[42px] flex items-center gap-2
              transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            <Send size={14} />
            <span className="hidden sm:inline">Run Battle</span>
          </button>
        </div>
        <p className="text-[11px] text-slate-600 mt-1.5 text-right hidden sm:block">
          <kbd className="bg-[#1A1D27] border border-[#2A2D3A] rounded px-1 text-slate-500 font-mono">Enter</kbd>{' '}
          to run &middot;{' '}
          <kbd className="bg-[#1A1D27] border border-[#2A2D3A] rounded px-1 text-slate-500 font-mono">Shift+Enter</kbd>{' '}
          for new line
        </p>
      </div>
    </div>
  );
}
