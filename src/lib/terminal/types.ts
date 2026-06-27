import type { TrackId } from "@/lib/tracks";

export type LineKind = "input" | "output" | "error" | "system" | "accent";

export interface OutputLine {
  id: number;
  kind: LineKind;
  text: string;
}

export interface CommandContext {
  track: TrackId;
  /** Internal route push; closes the overlay if open. */
  navigate: (path: string) => void;
  /** Switch track: persist + route to the mirrored path. */
  switchTrack: (t: TrackId) => void;
  openExternal: (url: string) => void;
  print: (lines: string | string[], kind?: LineKind) => void;
  clear: () => void;
  close: () => void;
  /** The full registry, for `help` and tab-completion. */
  commands: Record<string, TerminalCommand>;
}

export interface TerminalCommand {
  name: string;
  summary: string;
  usage?: string;
  /** Hidden from `help` (easter eggs). */
  hidden?: boolean;
  run: (args: string[], ctx: CommandContext) => void;
}
