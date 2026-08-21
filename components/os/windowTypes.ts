import type { DesktopApp } from "@/data/desktopApps";

export const TASKBAR_HEIGHT = 56;
export const SYSTEM_BAR_HEIGHT = 40;
export const MIN_WINDOW_WIDTH = 280;
export const MIN_WINDOW_HEIGHT = 200;

export type WindowPosition = {
  x: number;
  y: number;
};

export type WindowSize = {
  width: number;
  height: number;
};

export type ViewportSize = {
  width: number;
  height: number;
};

export type WindowState = {
  id: string;
  app: DesktopApp;
  position: WindowPosition;
  size: WindowSize;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
};
