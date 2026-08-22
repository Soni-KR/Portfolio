import type { AppId } from "@/data/desktopApps";
import { SYSTEM_BAR_HEIGHT, TASKBAR_HEIGHT } from "@/components/os/windowTypes";

export type DesktopItemId = `app-${AppId}` | "status-widget";

export type DesktopItemPosition = {
  x: number;
  y: number;
};

export type DesktopLayout = {
  version: 3;
  positions: Record<DesktopItemId, DesktopItemPosition>;
  soundEnabled: boolean;
};

const STORAGE_KEY = "operating-soni-kr.desktop-layout.v3";

const itemSizes: Record<DesktopItemId, { width: number; height: number }> = {
  "app-projects": { width: 104, height: 104 },
  "app-research": { width: 104, height: 104 },
  "app-resume": { width: 104, height: 104 },
  "app-about": { width: 104, height: 104 },
  "app-achievements": { width: 104, height: 104 },
  "app-contact": { width: 104, height: 104 },
  "app-terminal": { width: 104, height: 104 },
  "status-widget": { width: 328, height: 230 },
};

export function getDefaultDesktopLayout(viewportWidth = 1280): DesktopLayout {
  return {
    version: 3,
    soundEnabled: false,
    positions: {
      "app-projects": { x: 28, y: 82 },
      "app-research": { x: 140, y: 82 },
      "app-resume": { x: 28, y: 200 },
      "app-about": { x: 140, y: 200 },
      "app-achievements": { x: 28, y: 318 },
      "app-contact": { x: 140, y: 318 },
      "app-terminal": { x: 28, y: 436 },
      "status-widget": { x: Math.max(280, viewportWidth - 368), y: 82 },
    },
  };
}

function isPosition(value: unknown): value is DesktopItemPosition {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.x === "number" &&
    Number.isFinite(record.x) &&
    typeof record.y === "number" &&
    Number.isFinite(record.y)
  );
}

export function clampDesktopLayout(
  layout: DesktopLayout,
  viewport: { width: number; height: number },
): DesktopLayout {
  const positions = { ...layout.positions };

  for (const itemId of Object.keys(positions) as DesktopItemId[]) {
    const size = itemSizes[itemId];
    const current = positions[itemId];
    positions[itemId] = {
      x: Math.min(Math.max(current.x, 8), Math.max(8, viewport.width - size.width - 8)),
      y: Math.min(
        Math.max(current.y, SYSTEM_BAR_HEIGHT + 8),
        Math.max(SYSTEM_BAR_HEIGHT + 8, viewport.height - TASKBAR_HEIGHT - size.height - 8),
      ),
    };
  }

  return { ...layout, positions };
}

export function loadDesktopLayout(viewportWidth: number): DesktopLayout {
  const defaults = getDefaultDesktopLayout(viewportWidth);
  const serialized = localStorage.getItem(STORAGE_KEY);
  if (!serialized) return defaults;

  try {
    const parsed: unknown = JSON.parse(serialized);
    if (typeof parsed !== "object" || parsed === null) return defaults;
    const record = parsed as Record<string, unknown>;
    if (record.version !== 3 || typeof record.positions !== "object" || record.positions === null) {
      return defaults;
    }

    const storedPositions = record.positions as Record<string, unknown>;
    const positions = { ...defaults.positions };
    for (const itemId of Object.keys(positions) as DesktopItemId[]) {
      if (isPosition(storedPositions[itemId])) positions[itemId] = storedPositions[itemId];
    }

    return {
      version: 3,
      positions,
      soundEnabled: record.soundEnabled === true,
    };
  } catch {
    return defaults;
  }
}

export function saveDesktopLayout(layout: DesktopLayout) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
}
