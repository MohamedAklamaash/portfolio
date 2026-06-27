import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/router";
import {
  DEFAULT_TRACK,
  isTrackId,
  rememberTrack,
  TRACKS,
  useCurrentTrack,
  type TrackId,
} from "@/lib/tracks";
import { buildCommands } from "./commands";
import type { CommandContext, LineKind, OutputLine } from "./types";

interface TerminalApi {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  track: TrackId;
  lines: OutputLine[];
  history: string[];
  run: (raw: string) => void;
  complete: (partial: string) => string | null;
}

const TerminalContext = createContext<TerminalApi | null>(null);

const BOOT: Omit<OutputLine, "id">[] = [
  { kind: "system", text: "portfolio shell — type 'help' for commands." },
];

export function TerminalProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const track = useCurrentTrack();

  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<OutputLine[]>(() =>
    BOOT.map((l, i) => ({ ...l, id: i }))
  );
  const [history, setHistory] = useState<string[]>([]);
  const idRef = useRef(BOOT.length);

  const commands = useMemo(() => buildCommands(), []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const push = useCallback((text: string, kind: LineKind) => {
    setLines((prev) => [...prev, { id: idRef.current++, kind, text }]);
  }, []);

  const navigate = useCallback(
    (path: string) => {
      router.push(path);
      setIsOpen(false);
    },
    [router]
  );

  const switchTrack = useCallback(
    (t: TrackId) => {
      rememberTrack(t);
      const path = router.asPath.split("#")[0].split("?")[0];
      const segs = path.split("/");
      const dest = isTrackId(segs[1]) ? ((segs[1] = t), segs.join("/")) : `/${t}`;
      router.push(dest || `/${t}`);
      setIsOpen(false);
    },
    [router]
  );

  const run = useCallback(
    (raw: string) => {
      const input = raw.trim();
      push(`~/${track} $ ${input}`, "input");
      if (!input) return;
      setHistory((h) => (h[h.length - 1] === input ? h : [...h, input]));

      const [name, ...args] = input.split(/\s+/);
      const cmd = commands[name.toLowerCase()];
      if (!cmd) {
        push(`command not found: ${name} — try 'help'`, "error");
        return;
      }

      const ctx: CommandContext = {
        track,
        navigate,
        switchTrack,
        openExternal: (url) => window.open(url, "_blank", "noopener,noreferrer"),
        print: (l, kind = "output") =>
          (Array.isArray(l) ? l : [l]).forEach((line) => push(line, kind)),
        clear: () => setLines([]),
        close,
        commands,
      };
      cmd.run(args, ctx);
    },
    [commands, track, navigate, switchTrack, close, push]
  );

  const complete = useCallback(
    (partial: string) => {
      const p = partial.trim().toLowerCase();
      if (!p) return null;
      const names = Object.values(commands)
        .filter((c) => !c.hidden)
        .map((c) => c.name);
      const matches = Array.from(new Set(names)).filter((n) => n.startsWith(p));
      return matches.length === 1 ? matches[0] : null;
    },
    [commands]
  );

  // Global hotkey: ` or ~ opens/closes, unless typing in a field. Esc closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null;
      const typing =
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable);
      if ((e.key === "`" || e.key === "~") && !typing) {
        e.preventDefault();
        toggle();
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  const value = useMemo(
    () => ({ isOpen, open, close, toggle, track, lines, history, run, complete }),
    [isOpen, open, close, toggle, track, lines, history, run, complete]
  );

  return <TerminalContext.Provider value={value}>{children}</TerminalContext.Provider>;
}

export function useTerminal(): TerminalApi {
  const ctx = useContext(TerminalContext);
  if (!ctx) {
    // Defensive fallback so a stray <Terminal/> outside the provider won't crash.
    return {
      isOpen: false,
      open: () => {},
      close: () => {},
      toggle: () => {},
      track: DEFAULT_TRACK,
      lines: [],
      history: [],
      run: () => {},
      complete: () => null,
    };
  }
  return ctx;
}

export const lineColor = (kind: LineKind): string =>
  ({
    input: "var(--text-3)",
    output: "var(--text-2)",
    error: "#d98c6a",
    system: "var(--text-3)",
    accent: "var(--amber)",
  }[kind]);

export { TRACKS };
