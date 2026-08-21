import {
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
  SYSTEM_BAR_HEIGHT,
  TASKBAR_HEIGHT,
  type ViewportSize,
  type WindowPosition,
  type WindowSize,
  type WindowState,
} from "@/components/os/windowTypes";

export type WindowAction =
  | { type: "open"; window: WindowState }
  | { type: "focus"; id: string; zIndex: number }
  | { type: "move"; id: string; position: WindowPosition }
  | { type: "resize"; id: string; size: WindowSize }
  | { type: "close"; id: string }
  | { type: "minimize"; id: string }
  | { type: "restore"; id: string; zIndex: number }
  | { type: "toggleMaximize"; id: string; zIndex: number }
  | { type: "clampToViewport"; viewport: ViewportSize }
  | {
      type: "hydrate";
      windows: WindowState[];
      viewport: ViewportSize;
      preserveGeometry?: boolean;
    };

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function clampWindowToViewport(
  windowState: WindowState,
  viewport: ViewportSize,
): WindowState {
  const availableHeight = Math.max(0, viewport.height - TASKBAR_HEIGHT - SYSTEM_BAR_HEIGHT);
  const minimumWidth = Math.min(MIN_WINDOW_WIDTH, viewport.width);
  const minimumHeight = Math.min(MIN_WINDOW_HEIGHT, availableHeight);

  const size = {
    width: clamp(windowState.size.width, minimumWidth, viewport.width),
    height: clamp(
      windowState.size.height,
      minimumHeight,
      availableHeight,
    ),
  };

  const maximumX = Math.max(0, viewport.width - size.width);
  const maximumY = Math.max(
    SYSTEM_BAR_HEIGHT,
    viewport.height - TASKBAR_HEIGHT - size.height,
  );

  return {
    ...windowState,
    position: {
      x: clamp(windowState.position.x, 0, maximumX),
      y: clamp(windowState.position.y, SYSTEM_BAR_HEIGHT, maximumY),
    },
    size,
  };
}

export function windowReducer(
  windows: WindowState[],
  action: WindowAction,
): WindowState[] {
  switch (action.type) {
    case "open":
      return [...windows, action.window];

    case "focus":
      return windows.map((windowState) =>
        windowState.id === action.id
          ? { ...windowState, zIndex: action.zIndex }
          : windowState,
      );

    case "move":
      return windows.map((windowState) =>
        windowState.id === action.id && !windowState.maximized
          ? { ...windowState, position: action.position }
          : windowState,
      );

    case "resize":
      return windows.map((windowState) =>
        windowState.id === action.id && !windowState.maximized
          ? { ...windowState, size: action.size }
          : windowState,
      );

    case "close":
      return windows.filter((windowState) => windowState.id !== action.id);

    case "minimize":
      return windows.map((windowState) =>
        windowState.id === action.id
          ? { ...windowState, minimized: true }
          : windowState,
      );

    case "restore":
      return windows.map((windowState) =>
        windowState.id === action.id
          ? {
              ...windowState,
              minimized: false,
              zIndex: action.zIndex,
            }
          : windowState,
      );

    case "toggleMaximize":
      return windows.map((windowState) =>
        windowState.id === action.id
          ? {
              ...windowState,
              minimized: false,
              maximized: !windowState.maximized,
              zIndex: action.zIndex,
            }
          : windowState,
      );

    case "clampToViewport":
      return windows.map((windowState) =>
        clampWindowToViewport(windowState, action.viewport),
      );

    case "hydrate":
      if (action.preserveGeometry) {
        return action.windows;
      }

      return action.windows.map((windowState) =>
        clampWindowToViewport(windowState, action.viewport),
      );
  }
}
