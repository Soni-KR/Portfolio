"use client";

import { useEffect, useState } from "react";
import { AppPreview } from "@/components/apps/AppPreview";
import { desktopApps, type DesktopApp } from "@/data/desktopApps";
import { DesktopIcon } from "./DesktopIcon";
import { PortfolioWindow, type WindowPosition } from "./PortfolioWindow";
import { Taskbar } from "./Taskbar";

export function OperatingSoni() {
  const [booting, setBooting] = useState(true);
  const [activeApp, setActiveApp] = useState<DesktopApp | null>(null);
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState<WindowPosition>({ x: 160, y: 96 });

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  const openApp = (app: DesktopApp) => {
    const panelWidth = Math.min(680, window.innerWidth - 32);

    setActiveApp(app);
    setMinimized(false);
    setPosition({
      x: Math.max(16, (window.innerWidth - panelWidth) / 2),
      y: Math.max(24, Math.min(112, window.innerHeight / 5)),
    });
  };

  if (booting) {
    return (
      <main className="boot-screen">
        <div className="boot-frame">
          <p className="boot-code">SYS.INIT // 199X</p>
          <div className="boot-logo" aria-hidden="true">
            S
          </div>
          <h1>OperatingSoni-KR</h1>
          <p className="boot-message">LOADING PILOT PROFILE...</p>
          <div className="boot-progress" aria-label="Starting portfolio">
            <span />
          </div>
          <button type="button" onClick={() => setBooting(false)}>
            [ SKIP BOOT ]
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="desktop">
      <div className="desktop-grid" aria-hidden="true" />
      <div className="desktop-orbit" aria-hidden="true">
        <span>OS</span>
      </div>

      <header className="desktop-heading">
        <p>PERSONAL SYSTEM // ONLINE</p>
        <h1>Welcome, pilot.</h1>
        <span>Double-click an application to begin.</span>
      </header>

      <nav className="desktop-icons" aria-label="Portfolio applications">
        {desktopApps.map((app) => (
          <DesktopIcon key={app.id} app={app} onOpen={openApp} />
        ))}
      </nav>

      {activeApp && !minimized && (
        <PortfolioWindow
          title={activeApp.title}
          glyph={activeApp.glyph}
          position={position}
          onMove={setPosition}
          onMinimize={() => setMinimized(true)}
          onClose={() => setActiveApp(null)}
        >
          <AppPreview appId={activeApp.id} />
        </PortfolioWindow>
      )}

      <Taskbar
        activeApp={activeApp}
        minimized={minimized}
        onToggleWindow={() => setMinimized((current) => !current)}
      />
    </main>
  );
}
