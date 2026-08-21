import { useEffect, useState } from "react";
import type { AppId } from "@/data/desktopApps";

type SystemBarProps = {
  soundEnabled: boolean;
  onOpenApp: (appId: AppId) => void;
  onOpenPalette: () => void;
  onToggleSound: () => void;
};

export function SystemBar({
  soundEnabled,
  onOpenApp,
  onOpenPalette,
  onToggleSound,
}: SystemBarProps) {
  const [date, setDate] = useState("--- --");

  useEffect(() => {
    const updateDate = () => {
      setDate(
        new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
        })
          .format(new Date())
          .toUpperCase(),
      );
    };
    updateDate();
    const timer = window.setInterval(updateDate, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <nav className="system-bar" aria-label="System navigation">
      <button type="button" className="system-mark" onClick={() => onOpenApp("about")}>
        <span className="system-mark-pulse" aria-hidden="true" />
        <span className="hidden sm:inline">OperatingSoni-KR</span>
        <span className="sm:hidden">OSKR</span>
      </button>

      <div className="system-nav-links">
        <button type="button" onClick={() => onOpenApp("projects")}>Work</button>
        <button type="button" onClick={() => onOpenApp("research")}>Research</button>
        <button type="button" onClick={() => onOpenApp("resume")}>Resume</button>
      </div>

      <div className="ml-auto flex h-full items-center">
        <button type="button" className="system-search" onClick={onOpenPalette} aria-label="Open command palette">
          <span aria-hidden="true">⌕</span>
          <span className="hidden md:inline">Search system</span>
          <kbd className="hidden lg:inline">Ctrl K</kbd>
        </button>
        <button type="button" className="system-control" onClick={onToggleSound} aria-label={`${soundEnabled ? "Mute" : "Enable"} system sounds`} aria-pressed={soundEnabled}>
          {soundEnabled ? "SND ON" : "SND OFF"}
        </button>
        <time className="system-date">{date}</time>
      </div>
    </nav>
  );
}
