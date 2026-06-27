import { useEffect, useRef, type MouseEvent as ReactMouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTerminal } from "@/lib/terminal/terminal-context";
import Terminal from "./terminal";

const TerminalOverlay = () => {
  const { isOpen, close } = useTerminal();
  const prefersReduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<Element | null>(null);

  // Lock body scroll + remember focus to restore on close.
  useEffect(() => {
    if (!isOpen) return;
    restoreRef.current = document.activeElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      (restoreRef.current as HTMLElement | null)?.focus?.();
    };
  }, [isOpen]);

  // Minimal focus trap: keep Tab within the panel.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'input, button, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || !focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const dur = prefersReduced ? 0 : 0.18;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center p-4 sm:p-6 md:pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: dur }}
          onMouseDown={(e: ReactMouseEvent) => {
            if (e.target === e.currentTarget) close();
          }}
          style={{ background: "rgba(8,8,8,0.6)", backdropFilter: "blur(4px)" }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Terminal"
            initial={{ opacity: 0, y: prefersReduced ? 0 : 12, scale: prefersReduced ? 1 : 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : 8, scale: prefersReduced ? 1 : 0.99 }}
            transition={{ duration: dur, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl"
            style={{ height: "min(60vh, 460px)" }}
          >
            <Terminal className="h-full" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalOverlay;
