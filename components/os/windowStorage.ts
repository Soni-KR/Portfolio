import { desktopApps, type AppId } from "@/data/desktopApps";
import type { WindowState } from "@/components/os/windowTypes";

const STORAGE_KEY = "operating-soni-kr.windows.v2";
const LEGACY_STORAGE_KEY = "operating-soni-kr.windows";
const STORAGE_VERSION = 2;

type StoredWindow = Omit<WindowState, "app"> & {
  appId: AppId;
};

type StoredWindowPayload = {
  version: typeof STORAGE_VERSION;
  windows: StoredWindow[];
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
  const serializedWindows =
    localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);

  if (!serializedWindows) {
    return [];
  }

  try {
    const parsedWindows: unknown = JSON.parse(serializedWindows);
    const records =
      isRecord(parsedWindows) &&
      parsedWindows.version === STORAGE_VERSION &&
      Array.isArray(parsedWindows.windows)
        ? parsedWindows.windows
        : parsedWindows;

    if (!Array.isArray(records)) {
      return [];
    }

    const validWindows = records
      .map(readStoredWindow)
      .filter((windowState): windowState is WindowState => windowState !== null);

    // An app behaves like one running process: keep only its newest persisted
    // window if an older build accidentally stored duplicate instances.
    const newestWindowByApp = new Map<AppId, WindowState>();
    for (const windowState of validWindows) {
      const existing = newestWindowByApp.get(windowState.app.id);
      if (!existing || windowState.zIndex > existing.zIndex) {
        newestWindowByApp.set(windowState.app.id, windowState);
      }
    }

    return [...newestWindowByApp.values()];
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

  const payload: StoredWindowPayload = {
    version: STORAGE_VERSION,
    windows: storedWindows,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}
