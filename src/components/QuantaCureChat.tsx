import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}

const BACKEND_URL = import.meta.env.VITE_API_URL || "https://fastapi-backend-3-wqvz.onrender.com";

export default function QuantaCureChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the QuantaCure Assistant 🧬 Ask me anything about this project — prediction modes, the GIN model, virtual screening, datasets, or the roadmap.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;

    const userMsg: Message = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ message: msg, history }),
      });

      if (!res.ok) throw new Error("Backend error");
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
          sources: data.sources ?? [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't reach the QuantaCure backend. Make sure your FastAPI server is running and ngrok is active.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white hover:scale-105 transition-transform"
        aria-label="Toggle QuantaCure chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[370px] max-h-[520px] flex flex-col rounded-2xl overflow-hidden p-[1.5px] bg-gradient-to-br from-cyan-400 via-purple-500 to-green-400 shadow-[0_0_40px_rgba(0,212,255,0.4)] animate-pulse-glow">
          <div className="flex flex-col h-full rounded-2xl bg-[#0a0a1a] overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-orange-500/20 bg-gradient-to-r from-purple-900/40 to-cyan-900/40">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.5)]">
              <Bot size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">QuantaCure Assistant</p>
              <p className="text-[10px] text-cyan-300">Powered by RAG · Project Knowledge Base</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-green-500/15 px-2 py-0.5 border border-green-400/40">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="text-[9px] font-mono uppercase tracking-wider text-green-300">AI Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-thin">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-white/10 mt-0.5">
                  {msg.role === "user" ? <User size={14} className="text-purple-300" /> : <Bot size={14} className="text-cyan-300" />}
                </div>
                <div className="max-w-[80%] space-y-1">
                  <div className={`text-sm leading-relaxed px-3 py-2 rounded-xl ${msg.role === "user" ? "bg-gradient-to-br from-purple-600 to-purple-700 text-white" : "bg-gradient-to-br from-cyan-600/30 to-cyan-700/20 text-gray-100 border border-orange-500/20"}`}>
                    {msg.content}
                  </div>
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="flex flex-wrap gap-1 px-1">
                      {msg.sources.map((s, j) => (
                        <span key={j} className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-900/50 text-cyan-300 border border-cyan-700/40">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2">
                <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-white/10">
                  <Bot size={14} className="text-cyan-300" />
                </div>
                <div className="px-3 py-2.5 rounded-xl bg-gradient-to-br from-cyan-600/30 to-cyan-700/20 border border-orange-500/20 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested questions */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-2">
              {[
                "What is QuantaCure?",
                "How does the GIN model work?",
                "What prediction modes are available?",
                "What are the known limitations?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-violet-700/50 text-violet-300 hover:bg-violet-900/40 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-end gap-2 px-3 py-3 border-t border-white/10">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about QuantaCure..."
              rows={1}
              className="flex-1 resize-none bg-white/[0.08] border border-white/15 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={15} className="text-white" />
            </button>
          </div>
          </div>
        </div>
      )}
    </>
  );
}
