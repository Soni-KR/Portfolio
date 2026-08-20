import { desktopApps, type AppId } from "@/data/desktopApps";
import type { WindowState } from "@/components/os/windowTypes";

const STORAGE_KEY = "operating-soni-kr.windows";

type StoredWindow = Omit<WindowState, "app"> & {
  appId: AppId;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function readStoredWindow(value: unknown): WindowState | null {
  if (!isRecord(value) || !isRecord(value.position) || !isRecord(value.size)) {
    return null;
  }

  const app = desktopApps.find((item) => item.id === value.appId);

  if (
    !app ||
    typeof value.id !== "string" ||
    !isFiniteNumber(value.position.x) ||
    !isFiniteNumber(value.position.y) ||
    !isFiniteNumber(value.size.width) ||
    !isFiniteNumber(value.size.height) ||
    !isFiniteNumber(value.zIndex) ||
    typeof value.minimized !== "boolean" ||
    typeof value.maximized !== "boolean"
  ) {
    return null;
  }

  return {
    id: value.id,
    app,
    position: { x: value.position.x, y: value.position.y },
    size: { width: value.size.width, height: value.size.height },
    zIndex: value.zIndex,
    minimized: value.minimized,
    maximized: value.maximized,
  };
}

export function loadWindows(): WindowState[] {
  const serializedWindows = localStorage.getItem(STORAGE_KEY);

  if (!serializedWindows) {
    return [];
  }

  try {
    const parsedWindows: unknown = JSON.parse(serializedWindows);

    if (!Array.isArray(parsedWindows)) {
      return [];
    }

    return parsedWindows
      .map(readStoredWindow)
      .filter((windowState): windowState is WindowState => windowState !== null);
  } catch {
    return [];
  }
}

export function saveWindows(windows: WindowState[]) {
  const storedWindows: StoredWindow[] = windows.map(
    ({ app, ...windowState }) => ({
      ...windowState,
      appId: app.id,
    }),
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storedWindows));
}
