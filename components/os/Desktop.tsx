"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { AppContent } from "@/components/apps/AppContent";
import { DesktopIcon } from "@/components/os/DesktopIcon";
import { StartMenu } from "@/components/os/StartMenu";
import { Taskbar } from "@/components/os/Taskbar";
import { Window } from "@/components/os/Window";
import { windowReducer } from "@/components/os/windowReducer";
import { loadWindows, saveWindows } from "@/components/os/windowStorage";
import {
  TASKBAR_HEIGHT,
  type ViewportSize,
  type WindowPosition,
  type WindowSize,
  type WindowState,
} from "@/components/os/windowTypes";
import { desktopApps, type DesktopApp } from "@/data/desktopApps";
import { achievements } from "@/data/achievements";
import { experience } from "@/data/profile";
import { projects } from "@/data/projects";

function getViewport(): ViewportSize {
  return { width: window.innerWidth, height: window.innerHeight };
}

export function Desktop() {
  const [windows, dispatch] = useReducer(windowReducer, []);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const nextZIndex = useRef(1);

  const takeNextZIndex = () => {
    const zIndex = nextZIndex.current;
    nextZIndex.current += 1;
    return zIndex;
  };

  useEffect(() => {
    const storedWindows = loadWindows();
    const highestZIndex = storedWindows.reduce(
      (highest, windowState) => Math.max(highest, windowState.zIndex),
      0,
    );

    nextZIndex.current = highestZIndex + 1;
    dispatch({
      type: "hydrate",
      windows: storedWindows,
      viewport: getViewport(),
    });

    const hydrationReadyTimer = window.setTimeout(() => {
      setHasHydrated(true);
    }, 0);

    return () => window.clearTimeout(hydrationReadyTimer);
  }, []);

  useEffect(() => {
    const closeStartMenuWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setStartMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeStartMenuWithEscape);
    return () => window.removeEventListener("keydown", closeStartMenuWithEscape);
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    const persistenceTimer = window.setTimeout(() => {
      saveWindows(windows);
    }, 150);

    return () => window.clearTimeout(persistenceTimer);
  }, [hasHydrated, windows]);

  useEffect(() => {
    const keepWindowsInsideViewport = () => {
      dispatch({ type: "clampToViewport", viewport: getViewport() });
    };

    window.addEventListener("resize", keepWindowsInsideViewport);
    return () => window.removeEventListener("resize", keepWindowsInsideViewport);
  }, []);

  const activeWindowId =
    windows
      .filter((windowState) => !windowState.minimized)
      .reduce<WindowState | null>(
        (activeWindow, windowState) =>
          !activeWindow || windowState.zIndex > activeWindow.zIndex
            ? windowState
            : activeWindow,
        null,
      )?.id ?? null;

  const openApp = (app: DesktopApp) => {
    const viewport = getViewport();
    const availableHeight = Math.max(0, viewport.height - TASKBAR_HEIGHT);
    const offset = (windows.length % 6) * 28;
    const size = {
      width: Math.min(app.defaultSize.width, viewport.width),
      height: Math.min(app.defaultSize.height, availableHeight),
    };
    const maximumX = Math.max(0, viewport.width - size.width);
    const maximumY = Math.max(0, availableHeight - size.height);

    dispatch({
      type: "open",
      window: {
        id: crypto.randomUUID(),
        app,
        position: {
          x: Math.min(64 + offset, maximumX),
          y: Math.min(96 + offset, maximumY),
        },
        size,
        zIndex: takeNextZIndex(),
        minimized: false,
        maximized: false,
      },
    });
  };

  const focusWindow = (id: string) => {
    dispatch({ type: "focus", id, zIndex: takeNextZIndex() });
  };

  const openAppById = (appId: DesktopApp["id"]) => {
    const app = desktopApps.find((desktopApp) => desktopApp.id === appId);

    if (app) {
      setStartMenuOpen(false);
      openApp(app);
    }
  };

  const toggleTaskbarWindow = (windowState: WindowState) => {
    if (windowState.minimized) {
      dispatch({
        type: "restore",
        id: windowState.id,
        zIndex: takeNextZIndex(),
      });
    } else if (windowState.id === activeWindowId) {
      dispatch({ type: "minimize", id: windowState.id });
    } else {
      focusWindow(windowState.id);
    }
  };

  return (
    <main className="os-screen relative min-h-screen overflow-hidden p-6 pb-20 text-cyan-50 sm:p-8 sm:pb-20">
      <div className="desktop-grid" aria-hidden="true" />
      <div className="crt-overlay" aria-hidden="true" />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-20 right-6 text-right"
        aria-hidden="true"
      >
        <p className="text-[clamp(3rem,10vw,9rem)] font-black leading-none tracking-[-0.08em] text-cyan-200/[0.025]">
          SONI//KR
        </p>
        <p className="mr-2 mt-2 text-[0.6rem] uppercase tracking-[0.42em] text-fuchsia-200/15">
          Personal computing environment
        </p>
      </div>

      <header className="absolute right-8 top-8 hidden w-72 border border-cyan-300/15 bg-[#041016]/55 p-4 backdrop-blur-sm md:block">
        <div className="flex items-center justify-between">
          <p className="text-[0.6rem] uppercase tracking-[0.24em] text-fuchsia-300">
            System monitor
          </p>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-300 shadow-[0_0_10px_rgba(190,242,100,0.8)]" />
        </div>
        <h1 className="mt-3 text-lg font-black text-cyan-50">
          OperatingSoni<span className="text-fuchsia-400">-KR</span>
        </h1>
        <dl className="mt-4 grid grid-cols-3 gap-px bg-cyan-300/15 text-center">
          <div className="bg-[#06151d]/90 p-2">
            <dt className="text-lg font-black text-cyan-100">{projects.length}</dt>
            <dd className="text-[0.5rem] uppercase tracking-[0.12em] text-cyan-100/35">
              Projects
            </dd>
          </div>
          <div className="bg-[#06151d]/90 p-2">
            <dt className="text-lg font-black text-cyan-100">{experience.length}</dt>
            <dd className="text-[0.5rem] uppercase tracking-[0.12em] text-cyan-100/35">
              Research
            </dd>
          </div>
          <div className="bg-[#06151d]/90 p-2">
            <dt className="text-lg font-black text-cyan-100">
              {achievements.length}
            </dt>
            <dd className="text-[0.5rem] uppercase tracking-[0.12em] text-cyan-100/35">
              Records
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-[0.6rem] uppercase tracking-[0.14em] text-cyan-100/30">
          Double-click icons // OS button opens launcher
        </p>
      </header>

      <section
        className="relative grid w-fit grid-cols-2 gap-x-3 gap-y-2 sm:grid-flow-col sm:grid-cols-none sm:grid-rows-3 sm:gap-x-4 sm:gap-y-3"
        aria-label="Desktop icons"
      >
        {desktopApps.map((app) => (
          <DesktopIcon
            key={app.id}
            symbol={app.symbol}
            label={app.label}
            onOpen={() => openAppById(app.id)}
          />
        ))}
      </section>

      {windows.map((windowState) => (
        <Window
          key={windowState.id}
          windowState={windowState}
          active={windowState.id === activeWindowId}
          onFocus={() => focusWindow(windowState.id)}
          onMove={(position: WindowPosition) =>
            dispatch({ type: "move", id: windowState.id, position })
          }
          onResize={(size: WindowSize) =>
            dispatch({ type: "resize", id: windowState.id, size })
          }
          onMinimize={() =>
            dispatch({ type: "minimize", id: windowState.id })
          }
          onToggleMaximize={() =>
            dispatch({
              type: "toggleMaximize",
              id: windowState.id,
              zIndex: takeNextZIndex(),
            })
          }
          onClose={() => dispatch({ type: "close", id: windowState.id })}
        >
          <AppContent
            appId={windowState.app.id}
            onOpenApp={openAppById}
          />
        </Window>
      ))}

      {startMenuOpen && (
        <>
          <button
            type="button"
            className="absolute inset-0 z-[2147483644] cursor-default"
            onClick={() => setStartMenuOpen(false)}
            aria-label="Close application launcher"
          />
          <StartMenu apps={desktopApps} onOpenApp={openAppById} />
        </>
      )}

      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        startMenuOpen={startMenuOpen}
        onToggleStartMenu={() => setStartMenuOpen((isOpen) => !isOpen)}
        onToggleWindow={toggleTaskbarWindow}
      />
    </main>
  );
}
