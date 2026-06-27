import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { lineColor, useTerminal } from "@/lib/terminal/terminal-context";

interface TerminalProps {
  /** Compact hero variant (no autofocus). Overlay variant when false. */
  embedded?: boolean;
  className?: string;
}

const Terminal = ({ embedded = false, className = "" }: TerminalProps) => {
  const { lines, history, run, complete, track } = useTerminal();
  const [value, setValue] = useState("");
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => {
    if (!embedded) inputRef.current?.focus();
  }, [embedded]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
      setHistIdx(null);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === null) return;
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(null);
        setValue("");
      } else {
        setHistIdx(next);
        setValue(history[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = complete(value);
      if (match) setValue(match);
    }
  };

  return (
    <div
      className={`flex flex-col font-mono text-[12.5px] overflow-hidden ${className}`}
      style={{
        border: "1px solid var(--border-2)",
        borderRadius: "4px",
        background: "rgba(18,18,18,0.78)",
        backdropFilter: "blur(6px)",
        boxShadow: "0 10px 50px rgba(0,0,0,0.5)",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-3.5 py-2.5 shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <span className="flex gap-1.5" aria-hidden>
          <span className="w-2 h-2 rounded-full" style={{ background: "var(--border-2)" }} />
          <span className="w-2 h-2 rounded-full" style={{ background: "var(--border-2)" }} />
          <span className="w-2 h-2 rounded-full" style={{ background: "var(--amber-dim)" }} />
        </span>
        <span style={{ color: "var(--text-3)" }}>aklamaash@portfolio: ~/{track}</span>
      </div>

      {/* Scrollback */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 leading-[1.65] min-h-0"
        aria-live="polite"
      >
        {lines.map((l) => (
          <div
            key={l.id}
            className="whitespace-pre-wrap break-words"
            style={{ color: lineColor(l.kind) }}
          >
            {l.text}
          </div>
        ))}

        {/* Live input */}
        <div className="flex items-center gap-2 mt-0.5">
          <span className="shrink-0" style={{ color: "var(--green)" }}>
            ~/{track}
            <span style={{ color: "var(--amber)" }}> $</span>
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal input"
            className="flex-1 bg-transparent outline-none border-none"
            style={{ color: "var(--text)", caretColor: "var(--amber)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
