import React, { useState, useEffect } from "react";
import { useChat } from "../hooks/useChat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  Search,
  Plus,
  Library,
  Settings,
  Sparkles,
  ArrowUp,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentChatId } from "../chat.slice";
/**
 * QuerivoAi — Dashboard
 * -----------------------------------------------------------------------
 * Pure presentation layer. Real state comes from Redux (`state.chat`)
 * via `useChat` hook + `useSelector`.
 * -----------------------------------------------------------------------
 */

const SUGGESTED_PROMPTS = [
  "Summarize the latest FOMC statement and its market impact",
  "Compare Rust and Go for building high-throughput APIs",
  "What changed in the EU AI Act enforcement timeline?",
];

function formatTime(iso) {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const { handlesendmessage, fetchAllChats, openChat } = useChat();
  const [hasThread, setHasThread] = useState(false);
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const isLoading = useSelector((state) => state.chat.isLoading);
  const error = useSelector((state) => state.chat.error);

  const EMPTY_MESSAGES = [];
  const messages = useSelector(
    (state) => state.chat.chats[currentChatId]?.messages ?? EMPTY_MESSAGES,
  );
  const currentTitle = useSelector(
    (state) => state.chat.chats[currentChatId]?.title,
  );

  // Real chat list for the sidebar (sorted by most recently updated)
  const chatList = useSelector((state) =>
    Object.values(state.chat.chats).sort(
      (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated),
    ),
  );

  useEffect(() => {
    fetchAllChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleThreadClick = async (chatId) => {
    const result = await openChat(chatId);
    if (result?.success) {
      setHasThread(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const result = await handlesendmessage({
      ChatId: currentChatId,
      message: query,
    });

    // Sirf success pe hi thread view pe switch karo
    if (result?.success) {
      setHasThread(true);
      fetchAllChats(); // sidebar mein naya/updated chat turant dikhe
    }
    setQuery("");
  };

  return (
    <div
      className="flex h-screen w-full overflow-hidden bg-[#0B0C0E] text-[#EDEDEF] antialiased"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: #2A2B31; border-radius: 999px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      {/* ---------------------------------------------------------- */}
      {/* Sidebar                                                     */}
      {/* ---------------------------------------------------------- */}
      <aside
        className={`flex h-full flex-col border-r border-[#1F2024] bg-[#101114] transition-all duration-200 ${
          sidebarOpen ? "w-64" : "w-18"
        }`}
      >
        <div className="flex items-center gap-2.5 px-5 py-6">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C9A227]/40 bg-[#C9A227]/8">
            <Sparkles size={15} className="text-[#C9A227]" strokeWidth={1.75} />
          </div>
          {sidebarOpen && (
            <span className="font-display text-[19px] tracking-tight text-[#F5F1E6]">
              Querivo<span className="text-[#C9A227]">Ai</span>
            </span>
          )}
        </div>

        <div className="px-3">
          <button
            onClick={() => {
              setHasThread(false);
              dispatch(setCurrentChatId(""));
            }}
            className="flex w-full items-center gap-2.5 rounded-lg border border-[#2A2B31] bg-[#17181C] px-3 py-2.5 text-[13px] font-medium text-[#EDEDEF] transition-colors hover:border-[#C9A227]/40 hover:bg-[#1C1D22]"
          >
            <Plus size={15} strokeWidth={2} />
            {sidebarOpen && "New thread"}
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-0.5 px-3">
          <SidebarItem
            icon={Library}
            label="Library"
            active
            sidebarOpen={sidebarOpen}
          />
          <SidebarItem icon={Clock} label="Recent" sidebarOpen={sidebarOpen} />
        </nav>

        {sidebarOpen && (
          <div className="mt-2 flex-1 overflow-y-auto px-3">
            <p className="px-2 pb-2 pt-4 text-[11px] font-medium uppercase tracking-wider text-[#5C5D66]">
              Threads
            </p>
            <div className="flex flex-col gap-0.5">
              {chatList.length === 0 ? (
                <p className="px-2.5 py-2 text-[12.5px] text-[#5C5D66]">
                  No threads yet
                </p>
              ) : (
                chatList.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleThreadClick(t.id)}
                    className={`group flex flex-col items-start rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-[#17181C] ${
                      t.id === currentChatId ? "bg-[#17181C]" : ""
                    }`}
                  >
                    <span className="line-clamp-1 text-[13px] text-[#C9CACF] group-hover:text-[#EDEDEF]">
                      {t.title}
                    </span>
                    <span className="font-mono text-[11px] text-[#5C5D66]">
                      {formatTime(t.lastUpdated)}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        <div className="mt-auto border-t border-[#1F2024] p-3">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-[#9A9BA3] transition-colors hover:bg-[#17181C] hover:text-[#EDEDEF]"
          >
            <Settings size={15} strokeWidth={1.75} />
            {sidebarOpen && "Settings"}
          </button>
        </div>
      </aside>

      {/* ---------------------------------------------------------- */}
      {/* Main                                                        */}
      {/* ---------------------------------------------------------- */}
      <main className="flex h-full flex-1 flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between border-b border-[#1F2024] px-8 py-4">
          <div className="flex items-center gap-1.5 text-[13px] text-[#5C5D66]">
            <span>Threads</span>
            {hasThread && (
              <>
                <ChevronRight size={13} />
                <span className="text-[#C9CACF]">
                  {currentTitle || "New chat"}
                </span>
              </>
            )}
          </div>
          <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2A2B31] bg-[#17181C] text-[12px] font-medium text-[#C9CACF]">
            RS
          </button>
        </header>

        {/* Error banner */}
        {error && (
          <div className="border-b border-[#3A1F22] bg-[#1F1315] px-8 py-2 text-[13px] text-[#E5A2A2]">
            {error}
          </div>
        )}

        {!hasThread ? (
          <HeroSearch
            query={query}
            setQuery={setQuery}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        ) : (
          <ThreadView
            messages={messages}
            query={query}
            onSubmit={handleSubmit}
            setQuery={setQuery}
            isLoading={isLoading}
          />
        )}
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sidebar item                                                        */
/* ------------------------------------------------------------------ */
function SidebarItem({ icon: Icon, label, active, sidebarOpen }) {
  return (
    <button
      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors ${
        active
          ? "bg-[#17181C] text-[#EDEDEF]"
          : "text-[#9A9BA3] hover:bg-[#17181C] hover:text-[#EDEDEF]"
      }`}
    >
      <Icon size={15} strokeWidth={1.75} />
      {sidebarOpen && label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Hero / empty state                                                  */
/* ------------------------------------------------------------------ */
function HeroSearch({ query, setQuery, onSubmit, isLoading }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6">
      <div className="w-full max-w-160">
        <h1 className="font-display text-center text-[34px] leading-tight text-[#F5F1E6]">
          What do you want to know?
        </h1>
        <p className="mt-2 text-center text-[13.5px] text-[#5C5D66]">
          Answers, grounded and to the point.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-8 rounded-2xl border border-[#2A2B31] bg-[#141519] p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-colors focus-within:border-[#C9A227]/40"
        >
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything…"
            rows={2}
            disabled={isLoading}
            className="w-full resize-none bg-transparent px-2 pt-1 text-[14.5px] text-[#EDEDEF] placeholder:text-[#5C5D66] focus:outline-none disabled:opacity-50"
          />
          <div className="flex items-center justify-end px-2 pt-1">
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C9A227] text-[#0B0C0E] transition-opacity disabled:opacity-30"
            >
              <ArrowUp size={15} strokeWidth={2.25} />
            </button>
          </div>
        </form>

        <div className="mt-6 flex flex-col gap-1.5">
          {SUGGESTED_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => setQuery(p)}
              className="group flex items-center justify-between rounded-xl border border-transparent px-3.5 py-2.5 text-left text-[13.5px] text-[#9A9BA3] transition-colors hover:border-[#2A2B31] hover:bg-[#141519] hover:text-[#EDEDEF]"
            >
              <span className="flex items-center gap-2.5">
                <Search
                  size={13}
                  strokeWidth={1.75}
                  className="shrink-0 text-[#5C5D66]"
                />
                {p}
              </span>
              <ArrowUp
                size={13}
                className="rotate-45 opacity-0 transition-opacity group-hover:opacity-60"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Thread view (chat messages)                                         */

/* Thread view (chat messages)                                         */
/* ------------------------------------------------------------------ */
function ThreadView({ messages, query, onSubmit, setQuery, isLoading }) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div className="mx-auto flex max-w-170 flex-col gap-6">
          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[75%] rounded-2xl border border-[#2A2B31] bg-[#17181C] px-4 py-2.5 text-[14.5px] leading-relaxed text-[#EDEDEF]">
                  {m.content}
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex justify-start">
                <div className="max-w-[85%]">
                  {/* Name/avatar row */}
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#C9A227]/40 bg-[#C9A227]/8">
                      <Sparkles
                        size={12}
                        className="text-[#C9A227]"
                        strokeWidth={1.75}
                      />
                    </div>
                    <span className="text-[12.5px] font-medium text-[#9A9BA3]">
                      AI
                    </span>
                  </div>

                  <div
                    className="
                      prose
                      prose-invert
                      max-w-none

                      prose-p:mb-5
                      prose-p:leading-8

                      prose-headings:mb-4
                      prose-headings:mt-8

                      prose-ul:my-5
                      prose-ol:my-5

                      prose-li:my-2

                      prose-pre:my-6
                      prose-blockquote:my-6
                    "
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {m.content}
                    </ReactMarkdown>
                  </div>

                  <div className="mt-3 flex items-center gap-1 border-b border-[#1F2024] pb-5 text-[#5C5D66]">
                    <IconAction icon={Copy} />
                    <IconAction icon={ThumbsUp} />
                    <IconAction icon={ThumbsDown} />
                    <IconAction icon={RotateCcw} />
                  </div>
                </div>
              </div>
            ),
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#C9A227]/40 bg-[#C9A227]/8">
                  <Sparkles
                    size={12}
                    className="text-[#C9A227]"
                    strokeWidth={1.75}
                  />
                </div>
                <p className="text-[13.5px] text-[#5C5D66]">Thinking…</p>
              </div>
            </div>
          )}

          {/* Follow-up composer */}
          <form
            onSubmit={onSubmit}
            className="sticky bottom-6 rounded-2xl border border-[#2A2B31] bg-[#141519] p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] focus-within:border-[#C9A227]/40"
          >
            <div className="flex items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a follow-up…"
                disabled={isLoading}
                className="flex-1 bg-transparent px-2 text-[13.5px] text-[#EDEDEF] placeholder:text-[#5C5D66] focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!query.trim() || isLoading}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C9A227] text-[#0B0C0E] disabled:opacity-30"
              >
                <ArrowUp size={15} strokeWidth={2.25} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function IconAction({ icon: Icon }) {
  return (
    <button className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-[#17181C] hover:text-[#EDEDEF]">
      <Icon size={14} strokeWidth={1.75} />
    </button>
  );
}