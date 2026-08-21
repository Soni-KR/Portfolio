import { useEffect, useState } from "react";
import type { WindowState } from "@/components/os/windowTypes";
import { AppIcon } from "@/components/os/AppIcon";

type TaskbarProps = {
  windows: WindowState[];
  activeWindowId: string | null;
  startMenuOpen: boolean;
  onToggleStartMenu: () => void;
  onToggleWindow: (windowState: WindowState) => void;
  soundEnabled: boolean;
};

export function Taskbar({
  windows,
  activeWindowId,
  startMenuOpen,
  onToggleStartMenu,
  onToggleWindow,
  soundEnabled,
}: TaskbarProps) {
  const [clock, setClock] = useState("--:--");

  useEffect(() => {
    const updateClock = () => {
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };
    const initialClockTimer = window.setTimeout(updateClock, 0);
    const clockTimer = window.setInterval(updateClock, 1000);

    return () => {
      window.clearTimeout(initialClockTimer);
      window.clearInterval(clockTimer);
    };
  }, []);

  return (
    <footer className="absolute inset-x-0 bottom-0 z-[2147483647] flex h-14 items-center gap-3 border-t border-cyan-300/25 bg-[#041016]/95 px-3 shadow-[0_-8px_30px_rgba(0,0,0,0.25)] backdrop-blur sm:px-4">
      <button
        type="button"
        className={`flex shrink-0 items-center gap-2 border-r border-cyan-300/20 pr-3 transition sm:pr-4 ${
          startMenuOpen ? "text-fuchsia-100" : "text-cyan-100"
        }`}
        onClick={onToggleStartMenu}
        aria-expanded={startMenuOpen}
        aria-label={`${startMenuOpen ? "Close" : "Open"} application launcher`}
      >
        <span className="grid h-8 w-8 place-items-center border border-fuchsia-300/50 bg-fuchsia-400/10 text-xs font-black text-fuchsia-200">
          OS
        </span>
        <div className="hidden sm:block">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-cyan-100">
          OSKR
          </p>
          <p className="text-[0.55rem] uppercase tracking-[0.14em] text-cyan-100/35">
            Local session
          </p>
        </div>
      </button>

      <div className="taskbar-apps flex min-w-0 flex-1 gap-2 overflow-x-auto">
        {windows.map((windowState) => {
          const isActive = windowState.id === activeWindowId;

          return (
            <button
              key={windowState.id}
              type="button"
              className={`flex min-w-28 items-center gap-2 border px-3 py-2 text-xs uppercase tracking-[0.1em] transition ${
                isActive
                  ? "border-cyan-300 bg-cyan-300/10 text-cyan-100 shadow-[inset_0_-2px_0_rgba(103,232,249,0.75)]"
                  : "border-cyan-900 bg-[#071820] text-cyan-100/50 hover:border-cyan-300/40 hover:text-cyan-100/80"
              }`}
              onClick={() => onToggleWindow(windowState)}
              aria-label={`${
                windowState.minimized ? "Restore" : isActive ? "Minimize" : "Focus"
              } ${windowState.app.label} from taskbar`}
            >
              <AppIcon appId={windowState.app.id} size="small" />
              <span className="truncate">{windowState.app.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex shrink-0 items-center gap-3 border-l border-cyan-300/20 pl-3 sm:pl-4">
        <span className="hidden text-[0.55rem] uppercase tracking-[0.12em] text-cyan-100/30 md:block">
          {soundEnabled ? "sound on" : "muted"}
        </span>
        <span className="hidden h-2 w-2 animate-pulse rounded-full bg-lime-300 shadow-[0_0_10px_rgba(190,242,100,0.7)] sm:block" />
        <time className="text-xs font-bold tracking-[0.16em] text-cyan-100" dateTime={clock}>
          {clock}
        </time>
      </div>
    </footer>
  );
}
