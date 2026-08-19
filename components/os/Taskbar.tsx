"use client";

import { useEffect, useState } from "react";
import type { DesktopApp } from "@/data/desktopApps";

type TaskbarProps = {
  activeApp: DesktopApp | null;
  minimized: boolean;
  onToggleWindow: () => void;
};

export function Taskbar({ activeApp, minimized, onToggleWindow }: TaskbarProps) {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <footer className="taskbar">
      <div className="taskbar__brand">
        <span className="brand-mark">S</span>
        <span>OperatingSoni-KR</span>
      </div>

      <div className="taskbar__apps">
        {activeApp && (
          <button
            className={
              minimized ? "taskbar-app" : "taskbar-app taskbar-app--active"
            }
            type="button"
            onClick={onToggleWindow}
          >
            <span>{activeApp.glyph}</span>
            {activeApp.title}
          </button>
        )}
      </div>

      <div className="taskbar__system">
        <span aria-hidden="true">CH 01</span>
        <time>{time}</time>
      </div>
    </footer>
  );
}
