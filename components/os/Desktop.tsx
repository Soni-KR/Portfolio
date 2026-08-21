"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { AppContent } from "@/components/apps/AppContent";
import { DesktopIcon } from "@/components/os/DesktopIcon";
import { DesktopItem } from "@/components/os/DesktopItem";
import { PixelMourad, StatusWidget } from "@/components/os/DesktopWidgets";
import {
  clampDesktopLayout,
  getDefaultDesktopLayout,
  loadDesktopLayout,
  saveDesktopLayout,
  type DesktopItemId,
  type DesktopItemPosition,
} from "@/components/os/desktopLayoutStorage";
import { StartMenu } from "@/components/os/StartMenu";
import { SystemBar } from "@/components/os/SystemBar";
import { Taskbar } from "@/components/os/Taskbar";
import { useSystemSound } from "@/components/os/useSystemSound";
import { Window } from "@/components/os/Window";
import { windowReducer } from "@/components/os/windowReducer";
import { loadWindows, saveWindows } from "@/components/os/windowStorage";
import {
  SYSTEM_BAR_HEIGHT,
  TASKBAR_HEIGHT,
  type ViewportSize,
  type WindowPosition,
  type WindowSize,
  type WindowState,
} from "@/components/os/windowTypes";
import { desktopApps, type AppId, type DesktopApp } from "@/data/desktopApps";

const CommandPalette = dynamic(() =>
  import("@/components/os/CommandPalette").then((module) => module.CommandPalette),
);

function getViewport(): ViewportSize {
  return { width: window.innerWidth, height: window.innerHeight };
}

const companionMessages: Partial<Record<AppId, string>> = {
  projects: "Project drive mounted.",
  research: "Research archive online.",
  resume: "Personnel record ready.",
  terminal: "Try the help command.",
  achievements: "Records verified.",
};

export function Desktop() {
  const [windows, dispatch] = useReducer(windowReducer, []);
  const [layout, setLayout] = useState(() => getDefaultDesktopLayout());
  const [hasHydrated, setHasHydrated] = useState(false);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [appTargets, setAppTargets] = useState<Partial<Record<AppId, string>>>({});
  const [companionMood, setCompanionMood] = useState<"idle" | "working" | "excited">("idle");
  const [companionMessage, setCompanionMessage] = useState<string | null>(null);
  const nextZIndex = useRef(1);
  const companionTimer = useRef<number | null>(null);
  const playSound = useSystemSound(layout.soundEnabled);
  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  const takeNextZIndex = () => {
    const zIndex = nextZIndex.current;
    nextZIndex.current += 1;
    return zIndex;
  };

  useEffect(() => {
    const storedWindows = loadWindows();
    const viewport = getViewport();
    const highestZIndex = storedWindows.reduce(
      (highest, windowState) => Math.max(highest, windowState.zIndex),
      0,
    );

    nextZIndex.current = highestZIndex + 1;
    dispatch({
      type: "hydrate",
      windows: storedWindows,
      viewport,
      preserveGeometry: viewport.width < 640,
    });
    const storedLayout =
      viewport.width < 640
        ? loadDesktopLayout(viewport.width)
        : clampDesktopLayout(loadDesktopLayout(viewport.width), viewport);

    const hydrationReadyTimer = window.setTimeout(() => {
      setLayout(storedLayout);
      setHasHydrated(true);
    }, 0);
    return () => window.clearTimeout(hydrationReadyTimer);
  }, []);

  useEffect(() => {
    const handleGlobalKeys = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
      if (event.key === "Escape") setStartMenuOpen(false);
    };
    window.addEventListener("keydown", handleGlobalKeys);
    return () => window.removeEventListener("keydown", handleGlobalKeys);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    const persistenceTimer = window.setTimeout(() => saveWindows(windows), 150);
    return () => window.clearTimeout(persistenceTimer);
  }, [hasHydrated, windows]);

  useEffect(() => {
    if (!hasHydrated) return;
    const persistenceTimer = window.setTimeout(() => saveDesktopLayout(layout), 150);
    return () => window.clearTimeout(persistenceTimer);
  }, [hasHydrated, layout]);

  useEffect(() => {
    const keepDesktopInsideViewport = () => {
      const viewport = getViewport();
      if (viewport.width >= 640) {
        dispatch({ type: "clampToViewport", viewport });
        setLayout((current) => clampDesktopLayout(current, viewport));
      }
    };
    window.addEventListener("resize", keepDesktopInsideViewport);
    return () => window.removeEventListener("resize", keepDesktopInsideViewport);
  }, []);

  useEffect(() => {
    return () => {
      if (companionTimer.current !== null) window.clearTimeout(companionTimer.current);
    };
  }, []);

  const activeWindowId =
    windows
      .filter((windowState) => !windowState.minimized)
      .reduce<WindowState | null>(
        (activeWindow, windowState) =>
          !activeWindow || windowState.zIndex > activeWindow.zIndex ? windowState : activeWindow,
        null,
      )?.id ?? null;

  const reactCompanion = useCallback((appId: AppId) => {
    if (companionTimer.current !== null) window.clearTimeout(companionTimer.current);
    setCompanionMood(appId === "achievements" ? "excited" : "working");
    setCompanionMessage(companionMessages[appId] ?? null);
    companionTimer.current = window.setTimeout(() => {
      setCompanionMood("idle");
      setCompanionMessage(null);
    }, 2600);
  }, []);

  const openApp = (app: DesktopApp) => {
    const existingWindow = windows.find((windowState) => windowState.app.id === app.id);
    if (existingWindow) {
      dispatch({
        type: "restore",
        id: existingWindow.id,
        zIndex: takeNextZIndex(),
      });
      playSound("focus");
      reactCompanion(app.id);
      return;
    }

    const viewport = getViewport();
    const mobile = viewport.width < 640;
    const availableHeight = Math.max(
      0,
      viewport.height - TASKBAR_HEIGHT - SYSTEM_BAR_HEIGHT,
    );
    const offset = (windows.length % 6) * 28;
    const size = mobile
      ? app.defaultSize
      : {
          width: Math.min(app.defaultSize.width, viewport.width),
          height: Math.min(app.defaultSize.height, availableHeight),
        };
    const maximumX = Math.max(0, viewport.width - size.width);
    const maximumY = Math.max(SYSTEM_BAR_HEIGHT, viewport.height - TASKBAR_HEIGHT - size.height);

    dispatch({
      type: "open",
      window: {
        id: crypto.randomUUID(),
        app,
        position: {
          x: Math.min(284 + offset, maximumX),
          y: Math.min(76 + offset, maximumY),
        },
        size,
        zIndex: takeNextZIndex(),
        minimized: false,
        maximized: false,
      },
    });
    playSound("open");
    reactCompanion(app.id);
  };

  const openAppById = (appId: AppId, targetId?: string) => {
    const app = desktopApps.find((desktopApp) => desktopApp.id === appId);
    if (!app) return;
    if (targetId) {
      setAppTargets((current) => ({ ...current, [appId]: targetId }));
    }
    setStartMenuOpen(false);
    setPaletteOpen(false);
    openApp(app);
  };

  const focusWindow = (id: string) => {
    dispatch({ type: "focus", id, zIndex: takeNextZIndex() });
    playSound("focus");
  };

  const toggleTaskbarWindow = (windowState: WindowState) => {
    if (windowState.minimized) {
      dispatch({ type: "restore", id: windowState.id, zIndex: takeNextZIndex() });
      playSound("focus");
    } else if (windowState.id === activeWindowId) {
      dispatch({ type: "minimize", id: windowState.id });
    } else {
      focusWindow(windowState.id);
    }
  };

  const moveDesktopItem = (itemId: DesktopItemId, position: DesktopItemPosition) => {
    setLayout((current) => ({
      ...current,
      positions: { ...current.positions, [itemId]: position },
    }));
  };

  const resetDesktop = () => {
    setLayout(getDefaultDesktopLayout(window.innerWidth));
    setStartMenuOpen(false);
    playSound("reset");
    setCompanionMood("excited");
    setCompanionMessage("Desktop restored.");
    if (companionTimer.current !== null) window.clearTimeout(companionTimer.current);
    companionTimer.current = window.setTimeout(() => {
      setCompanionMood("idle");
      setCompanionMessage(null);
    }, 2200);
  };

  const toggleSound = () => {
    setLayout((current) => ({ ...current, soundEnabled: !current.soundEnabled }));
  };

  const primaryApps = desktopApps.filter((app) => app.showOnDesktop);

  return (
    <main className="os-screen desktop-shell text-cyan-50">
      <div className="desktop-grid" aria-hidden="true" />
      <div className="wallpaper-orbit wallpaper-orbit-one" aria-hidden="true" />
      <div className="wallpaper-orbit wallpaper-orbit-two" aria-hidden="true" />
      <div className="wallpaper-wordmark" aria-hidden="true">SONI//KR</div>
      <div className="crt-overlay" aria-hidden="true" />

      <SystemBar
        soundEnabled={layout.soundEnabled}
        onOpenApp={openAppById}
        onOpenPalette={openPalette}
        onToggleSound={toggleSound}
      />

      <section className="desktop-intro" aria-labelledby="portfolio-owner">
        <p>Personal Engineering System // TUN-01</p>
        <h1 id="portfolio-owner">Mourad Kraiem</h1>
        <h2>Computer Science Engineering Student</h2>
        <div className="desktop-intro-rule" />
        <strong>Artificial Intelligence &amp; Machine Learning</strong>
        <span>Enter the Engineering Workspace.</span>
      </section>

      <section className="desktop-items-layer" aria-label="Desktop applications and widgets">
        {primaryApps.map((app) => (
          <DesktopItem
            key={app.id}
            position={layout.positions[`app-${app.id}`]}
            width={104}
            height={104}
            className="desktop-item-app"
            onMove={(position) => moveDesktopItem(`app-${app.id}`, position)}
          >
            <DesktopIcon appId={app.id} label={app.label} onOpen={() => openAppById(app.id)} />
          </DesktopItem>
        ))}

        <DesktopItem
          position={layout.positions["status-widget"]}
          width={252}
          height={148}
          className="desktop-item-status"
          onMove={(position) => moveDesktopItem("status-widget", position)}
        >
          <StatusWidget />
        </DesktopItem>

        <DesktopItem
          position={layout.positions["pixel-mourad"]}
          width={176}
          height={248}
          className="desktop-item-companion"
          onMove={(position) => moveDesktopItem("pixel-mourad", position)}
        >
          <PixelMourad mood={companionMood} message={companionMessage} />
        </DesktopItem>
      </section>

      {windows.map((windowState) => (
        <Window
          key={windowState.id}
          windowState={windowState}
          active={windowState.id === activeWindowId}
          onFocus={() => focusWindow(windowState.id)}
          onMove={(position: WindowPosition) => dispatch({ type: "move", id: windowState.id, position })}
          onResize={(size: WindowSize) => dispatch({ type: "resize", id: windowState.id, size })}
          onMinimize={() => dispatch({ type: "minimize", id: windowState.id })}
          onToggleMaximize={() => dispatch({ type: "toggleMaximize", id: windowState.id, zIndex: takeNextZIndex() })}
          onClose={() => dispatch({ type: "close", id: windowState.id })}
        >
          <AppContent
            appId={windowState.app.id}
            targetId={appTargets[windowState.app.id]}
            onOpenApp={openAppById}
            onResetDesktop={resetDesktop}
          />
        </Window>
      ))}

      {startMenuOpen && (
        <>
          <button type="button" className="absolute inset-0 z-[2147483644] cursor-default" onClick={() => setStartMenuOpen(false)} aria-label="Close application launcher" />
          <StartMenu apps={desktopApps} onOpenApp={openAppById} onOpenPalette={openPalette} onResetDesktop={resetDesktop} />
        </>
      )}

      {paletteOpen && <CommandPalette onClose={closePalette} onOpenApp={openAppById} onResetDesktop={resetDesktop} />}

      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        startMenuOpen={startMenuOpen}
        soundEnabled={layout.soundEnabled}
        onToggleStartMenu={() => setStartMenuOpen((open) => !open)}
        onToggleWindow={toggleTaskbarWindow}
      />
    </main>
  );
}
