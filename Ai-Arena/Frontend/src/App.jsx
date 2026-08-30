import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import { ChevronDown, ChevronUp, Copy, Check, Swords, Scale } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// MOCK DATA — Replace this with your API response
// ─────────────────────────────────────────────────────────────
const MOCK_DATA = {
  problem:
    "Explain the difference between **deep learning** and **machine learning**. Provide a Python code example of a simple neural network using PyTorch, and compare it to a classical ML approach using scikit-learn for the same problem.",

  aiSolution_1: `## Machine Learning vs Deep Learning

**Machine Learning** is a subset of AI where algorithms learn patterns from data to make predictions. It relies on hand-crafted features.

**Deep Learning** is a subset of ML using multi-layer neural networks that learn feature representations automatically.

### Classical ML Approach (scikit-learn)

\`\`\`python
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load data
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Evaluate
preds = clf.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, preds):.4f}")
\`\`\`

### Key Differences

| Feature | Machine Learning | Deep Learning |
|---|---|---|
| Feature engineering | Manual | Automatic |
| Data requirements | Low to medium | High |
| Interpretability | High | Low |
| Training speed | Fast | Slow (GPU needed) |

Use ML for structured/tabular data with limited samples. Use DL for images, audio, or NLP at scale.`,

  aiSolution_2: `## Understanding ML vs Deep Learning

Machine learning and deep learning differ primarily in **how they extract features** from data.

### Deep Learning with PyTorch

\`\`\`python
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# Prepare data
X, y = load_iris(return_X_y=True)
scaler = StandardScaler()
X = scaler.fit_transform(X)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

X_train = torch.FloatTensor(X_train)
y_train = torch.LongTensor(y_train)
X_test  = torch.FloatTensor(X_test)
y_test  = torch.LongTensor(y_test)

# Define model
class IrisNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(4, 16),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(16, 3),
        )
    def forward(self, x):
        return self.net(x)

model     = IrisNet()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.01)

# Train
for epoch in range(200):
    optimizer.zero_grad()
    loss = criterion(model(X_train), y_train)
    loss.backward()
    optimizer.step()

# Evaluate
with torch.no_grad():
    preds = model(X_test).argmax(dim=1)
    acc = (preds == y_test).float().mean()
    print(f"Accuracy: {acc:.4f}")
\`\`\`

The neural network learns hierarchical representations, while classical ML relies on hand-crafted feature engineering. For Iris (small tabular data), both perform similarly — DL shines at scale with unstructured data.`,

  Judge: {
    Response_1_review: `**Competitor 01** delivers a well-structured, balanced comparison. The scikit-learn example is production-ready, with a clean train/test split and proper evaluation. The comparison table is a strong pedagogical tool.

- ✅ Clear conceptual framing with good contrast between approaches
- ✅ Excellent use of a markdown table for side-by-side comparison
- ⚠️ Missing the PyTorch neural network example explicitly requested in the problem statement`,

    Response_2_review: `**Competitor 02** fully addresses the problem prompt by providing both a PyTorch neural network and a comparative explanation. The code is complete, idiomatic, and includes data normalisation with \`StandardScaler\`, which is important for neural network convergence.

- ✅ Complete PyTorch implementation with Dropout and Adam optimiser
- ✅ Addresses the "same problem" requirement using Iris dataset for both approaches
- ✅ Correct insight about DL vs ML on structured vs unstructured data
- ⚠️ Comparison table would improve readability`,

    aiSOlution_1_score: 7.2,
    aiSolution_2_score: 8.8,
  },
};

// ─────────────────────────────────────────────────────────────
// ScoreBar — animated progress bar component
// ─────────────────────────────────────────────────────────────
function ScoreBar({ score, isWinner }) {
  const pct = Math.min(Math.max((score / 10) * 100, 0), 100);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full overflow-hidden bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isWinner ? 'bg-emerald-500' : 'bg-blue-400'
          }`}
          style={{ width: animate ? `${pct}%` : '0%' }}
        />
      </div>
      <span
        className={`text-sm font-semibold tabular-nums w-14 text-right ${
          isWinner ? 'text-emerald-600' : 'text-slate-700'
        }`}
      >
        {score.toFixed(1)}&thinsp;<span className="font-normal text-slate-400">/10</span>
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CodeBlock — syntax-highlighted code with copy button
// ─────────────────────────────────────────────────────────────
function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false);
  const code = String(children).replace(/\n$/, '');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="code-block-wrapper">
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        className="code-copy-btn"
      >
        {copied ? (
          <span className="flex items-center gap-1 text-emerald-600">
            <Check size={10} /> Copied
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Copy size={10} /> Copy
          </span>
        )}
      </button>
      <code className={className}>{children}</code>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MarkdownContent — renders markdown with GFM + syntax highlighting
// ─────────────────────────────────────────────────────────────
function MarkdownContent({ content }) {
  return (
    <div className="prose-arena">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Inline code (not in a pre block)
          code({ node, inline, className, children, ...props }) {
            if (inline) {
              return <code className={className} {...props}>{children}</code>;
            }
            return <CodeBlock className={className} {...props}>{children}</CodeBlock>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────────────────────
function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <Swords size={14} className="text-white" />
          </div>
          <span className="font-semibold text-slate-900 text-[15px] tracking-tight">
            AI Arena
          </span>
        </div>
        <span className="text-xs text-slate-400 font-medium tracking-wide hidden sm:block">
          Benchmark. Compare. Decide.
        </span>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────
// ProblemCard — shows the user's question
// ─────────────────────────────────────────────────────────────
function ProblemCard({ problem }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2.5">
        <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full uppercase tracking-wide">
          Challenge
        </span>
      </div>
      <div className="px-5 py-4">
        <MarkdownContent content={problem} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CompetitorPanel — one side of the VS battle
// ─────────────────────────────────────────────────────────────
function CompetitorPanel({ label, latency, solution, isWinner }) {
  return (
    <div
      className={`bg-white border rounded-lg overflow-hidden flex flex-col transition-shadow ${
        isWinner
          ? 'border-emerald-300 shadow-[0_0_0_1px_#6EE7B7,0_2px_8px_rgba(16,185,129,0.12)]'
          : 'border-slate-200'
      }`}
    >
      {/* Panel header */}
      <div
        className={`px-5 py-3 border-b flex items-center justify-between gap-3 ${
          isWinner ? 'border-emerald-100 bg-emerald-50' : 'border-slate-100'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-800">{label}</span>
          {isWinner && (
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
              Winner
            </span>
          )}
        </div>
        <span className="text-xs text-slate-400 font-mono">{latency}</span>
      </div>

      {/* Response body */}
      <div className="px-5 py-4 flex-1 overflow-hidden">
        <MarkdownContent content={solution} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// BattleSection — VS layout (side-by-side / stacked)
// ─────────────────────────────────────────────────────────────
function BattleSection({ data }) {
  const s1 = data.Judge.aiSOlution_1_score;
  const s2 = data.Judge.aiSolution_2_score;
  const alpha1wins = s1 > s2;
  const alpha2wins = s2 > s1;

  return (
    <div>
      {/* VS header row */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-slate-200" />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white">
          <Scale size={13} className="text-slate-400" />
          <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
            Battle
          </span>
        </div>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Two columns with VS badge */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-start">
        <CompetitorPanel
          label="Competitor 01"
          latency="Latency: 1.24s"
          solution={data.aiSolution_1}
          isWinner={alpha1wins}
        />

        {/* VS divider — hidden on mobile, row on desktop */}
        <div className="hidden lg:flex flex-col items-center justify-center pt-14 gap-1 select-none">
          <span className="text-xl font-black text-slate-300 tracking-tighter">VS</span>
        </div>

        {/* Mobile VS divider */}
        <div className="lg:hidden flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-sm font-bold text-slate-300">VS</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <CompetitorPanel
          label="Competitor 02"
          latency="Latency: 1.51s"
          solution={data.aiSolution_2}
          isWinner={alpha2wins}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// JudgeSection — scores + review
// ─────────────────────────────────────────────────────────────
function JudgeSection({ judge }) {
  const [showReviews, setShowReviews] = useState(false);
  const s1 = judge.aiSOlution_1_score;
  const s2 = judge.aiSolution_2_score;
  const winner = s1 > s2 ? 'Competitor 01' : s2 > s1 ? 'Competitor 02' : null;

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Scale size={14} className="text-slate-500" />
          <span className="text-sm font-semibold text-slate-800">AI Judge</span>
        </div>
        {winner && (
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            {winner} wins
          </span>
        )}
      </div>

      {/* Scores */}
      <div className="px-5 py-5 space-y-4">
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-slate-700">Competitor 01</span>
            </div>
            <ScoreBar score={s1} isWinner={s1 > s2} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-slate-700">Competitor 02</span>
            </div>
            <ScoreBar score={s2} isWinner={s2 > s1} />
          </div>
        </div>

        {/* Verdict summary */}
        {winner && (
          <p className="text-sm text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
            <span className="font-semibold text-slate-700">{winner}</span> achieved a higher
            score ({winner === 'Competitor 01' ? s1 : s2}/10) by better addressing the problem
            requirements.
          </p>
        )}

        {/* Toggle reviews */}
        <button
          onClick={() => setShowReviews((v) => !v)}
          className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
        >
          {showReviews ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          {showReviews ? 'Hide' : 'Show'} detailed reviews
        </button>

        {/* Expandable reviews */}
        {showReviews && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <ReviewCard
              label="Competitor 01 Review"
              isWinner={s1 > s2}
              content={judge.Response_1_review}
            />
            <ReviewCard
              label="Competitor 02 Review"
              isWinner={s2 > s1}
              content={judge.Response_2_review}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewCard({ label, content, isWinner }) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        isWinner ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50'
      }`}
    >
      <p
        className={`text-xs font-semibold mb-2 uppercase tracking-wide ${
          isWinner ? 'text-emerald-700' : 'text-slate-500'
        }`}
      >
        {label}
      </p>
      <div className="prose-arena">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// InputBar — fixed bottom input dock
// ─────────────────────────────────────────────────────────────
function InputBar() {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // TODO: connect to your API here
      console.log('Run battle:', value);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-end gap-3">
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your challenge…"
            className="flex-1 resize-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400
              focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10
              transition min-h-10.5 max-h-40 overflow-y-auto"
          />
          <button
            onClick={() => console.log('Run battle:', value)}
            className="shrink-0 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800
              text-white text-sm font-semibold px-5 h-10.5 transition-colors cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            Run Battle
          </button>
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5 text-right hidden sm:block">
          Press <kbd className="bg-slate-100 border border-slate-200 rounded px-1 text-slate-500 font-mono">Enter</kbd> to submit &middot; <kbd className="bg-slate-100 border border-slate-200 rounded px-1 text-slate-500 font-mono">Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// App — root component
// Swap MOCK_DATA with your actual API response to connect backend
// ─────────────────────────────────────────────────────────────
export default function App() {
  // TODO: Replace with your API state management
  // e.g. const [data, setData] = useState(null);
  const data = MOCK_DATA;

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-36 space-y-6">
        {data ? (
          <>
            <ProblemCard problem={data.problem} />
            <BattleSection data={data} />
            <JudgeSection judge={data.Judge} />
          </>
        ) : (
          /* Empty / idle state */
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <Swords size={22} className="text-blue-500" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Ready to Battle</h2>
            <p className="text-sm text-slate-500 max-w-sm">
              Describe your challenge below and click <strong>Run Battle</strong> to see two AI models compete head-to-head.
            </p>
          </div>
        )}
      </main>

      <InputBar />
    </div>
  );
}