import {
  useEffect,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import {
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
  SYSTEM_BAR_HEIGHT,
  TASKBAR_HEIGHT,
  type WindowPosition,
  type WindowSize,
  type WindowState,
} from "@/components/os/windowTypes";
import { AppIcon } from "@/components/os/AppIcon";

type InteractionState =
  | {
      kind: "drag";
      pointerId: number;
      pointerX: number;
      pointerY: number;
      position: WindowPosition;
    }
  | {
      kind: "resize";
      pointerId: number;
      pointerX: number;
      pointerY: number;
      size: WindowSize;
    };

type PendingUpdate =
  | { kind: "move"; position: WindowPosition }
  | { kind: "resize"; size: WindowSize };

type WindowProps = {
  windowState: WindowState;
  active: boolean;
  children: ReactNode;
  onFocus: () => void;
  onMove: (position: WindowPosition) => void;
  onResize: (size: WindowSize) => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onClose: () => void;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function Window({
  windowState,
  active,
  children,
  onFocus,
  onMove,
  onResize,
  onMinimize,
  onToggleMaximize,
  onClose,
}: WindowProps) {
  const interaction = useRef<InteractionState | null>(null);
  const pendingUpdate = useRef<PendingUpdate | null>(null);
  const animationFrame = useRef<number | null>(null);
  const windowElement = useRef<HTMLElement | null>(null);

  const scheduleUpdate = (update: PendingUpdate) => {
    pendingUpdate.current = update;

    if (animationFrame.current !== null) {
      return;
    }

    animationFrame.current = window.requestAnimationFrame(() => {
      const nextUpdate = pendingUpdate.current;

      if (nextUpdate?.kind === "move") {
        onMove(nextUpdate.position);
      } else if (nextUpdate?.kind === "resize") {
        onResize(nextUpdate.size);
      }

      pendingUpdate.current = null;
      animationFrame.current = null;
    });
  };

  useEffect(() => {
    return () => {
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  useEffect(() => {
    if (active && !windowState.minimized) {
      windowElement.current?.focus({ preventScroll: true });
    }
  }, [active, windowState.minimized]);

  const startDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (windowState.maximized || window.innerWidth < 640) {
      return;
    }

    interaction.current = {
      kind: "drag",
      position: windowState.position,
      pointerId: event.pointerId,
      pointerX: event.clientX,
      pointerY: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const drag = (event: PointerEvent<HTMLDivElement>) => {
    const currentInteraction = interaction.current;

    if (
      !currentInteraction ||
      currentInteraction.kind !== "drag" ||
      currentInteraction.pointerId !== event.pointerId
    ) {
      return;
    }

    const nextX =
      currentInteraction.position.x + event.clientX - currentInteraction.pointerX;
    const nextY =
      currentInteraction.position.y + event.clientY - currentInteraction.pointerY;
    const maximumX = Math.max(0, window.innerWidth - windowState.size.width);
    const maximumY = Math.max(
      SYSTEM_BAR_HEIGHT,
      window.innerHeight - TASKBAR_HEIGHT - windowState.size.height,
    );

    scheduleUpdate({
      kind: "move",
      position: {
        x: clamp(nextX, 0, maximumX),
        y: clamp(nextY, SYSTEM_BAR_HEIGHT, maximumY),
      },
    });
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    interaction.current = null;
  };

  const startResizing = (event: PointerEvent<HTMLButtonElement>) => {
    if (window.innerWidth < 640) {
      return;
    }

    event.stopPropagation();
    onFocus();
    interaction.current = {
      kind: "resize",
      size: windowState.size,
      pointerId: event.pointerId,
      pointerX: event.clientX,
      pointerY: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const resize = (event: PointerEvent<HTMLButtonElement>) => {
    const currentInteraction = interaction.current;

    if (
      !currentInteraction ||
      currentInteraction.kind !== "resize" ||
      currentInteraction.pointerId !== event.pointerId
    ) {
      return;
    }

    const maximumWidth = Math.max(0, window.innerWidth - windowState.position.x);
    const maximumHeight = Math.max(
      0,
      window.innerHeight - TASKBAR_HEIGHT - windowState.position.y,
    );
    const minimumWidth = Math.min(MIN_WINDOW_WIDTH, maximumWidth);
    const minimumHeight = Math.min(MIN_WINDOW_HEIGHT, maximumHeight);

    scheduleUpdate({
      kind: "resize",
      size: {
        width: clamp(
          currentInteraction.size.width +
            event.clientX -
            currentInteraction.pointerX,
          minimumWidth,
          maximumWidth,
        ),
        height: clamp(
          currentInteraction.size.height +
            event.clientY -
            currentInteraction.pointerY,
          minimumHeight,
          maximumHeight,
        ),
      },
    });
  };

  const stopResizing = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    interaction.current = null;
  };

  const resizeWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = event.shiftKey ? 48 : 16;
    const widthChange =
      event.key === "ArrowRight" ? step : event.key === "ArrowLeft" ? -step : 0;
    const heightChange =
      event.key === "ArrowDown" ? step : event.key === "ArrowUp" ? -step : 0;

    if (widthChange === 0 && heightChange === 0) {
      return;
    }

    event.preventDefault();
    onFocus();

    const maximumWidth = Math.max(0, window.innerWidth - windowState.position.x);
    const maximumHeight = Math.max(
      0,
      window.innerHeight - TASKBAR_HEIGHT - windowState.position.y,
    );

    onResize({
      width: clamp(
        windowState.size.width + widthChange,
        Math.min(MIN_WINDOW_WIDTH, maximumWidth),
        maximumWidth,
      ),
      height: clamp(
        windowState.size.height + heightChange,
        Math.min(MIN_WINDOW_HEIGHT, maximumHeight),
        maximumHeight,
      ),
    });
  };

  const windowStyle: CSSProperties = windowState.minimized
    ? { display: "none" }
    : windowState.maximized
      ? { inset: `${SYSTEM_BAR_HEIGHT}px 0 ${TASKBAR_HEIGHT}px 0`, zIndex: windowState.zIndex }
      : {
        left: windowState.position.x,
        top: windowState.position.y,
        width: windowState.size.width,
        height: windowState.size.height,
        zIndex: windowState.zIndex,
      };

  return (
    <section
      ref={windowElement}
      className={`os-window absolute flex flex-col overflow-hidden border bg-[#06151d]/95 shadow-[12px_16px_0_rgba(0,0,0,0.35),0_0_40px_rgba(34,211,238,0.05)] backdrop-blur-sm ${
        windowState.maximized ? "rounded-none" : "rounded-sm"
      } ${
        active
          ? "border-cyan-300 shadow-[12px_16px_0_rgba(0,0,0,0.35),0_0_34px_rgba(34,211,238,0.15)]"
          : "border-cyan-900"
      }`}
      style={windowStyle}
      onPointerDown={onFocus}
      tabIndex={-1}
      aria-label={`${windowState.app.label} window`}
    >
      <header
        className={`flex touch-none select-none items-center justify-between border-b border-cyan-300/20 bg-[#0a2430] px-3 py-2 ${
          windowState.maximized ? "cursor-default" : "cursor-move"
        }`}
        onDoubleClick={onToggleMaximize}
        onPointerDown={startDragging}
        onPointerMove={drag}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        <div className="flex min-w-0 items-center gap-3">
          <AppIcon appId={windowState.app.id} size="small" />
          <div className="min-w-0">
            <h2 className="truncate text-xs font-bold uppercase tracking-[0.18em] text-cyan-50">
              {windowState.app.label}
            </h2>
            <p className="text-[0.55rem] uppercase tracking-[0.16em] text-cyan-100/35">
              OSKR // active process
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="grid h-7 w-7 place-items-center border border-transparent text-cyan-100/60 hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            onPointerDown={(event) => event.stopPropagation()}
            onDoubleClick={(event) => event.stopPropagation()}
            onClick={onMinimize}
            aria-label={`Minimize ${windowState.app.label} window`}
          >
            −
          </button>
          <button
            type="button"
            className="grid h-7 w-7 place-items-center border border-transparent text-cyan-100/60 hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            onPointerDown={(event) => event.stopPropagation()}
            onDoubleClick={(event) => event.stopPropagation()}
            onClick={onToggleMaximize}
            aria-label={`${windowState.maximized ? "Restore" : "Maximize"} ${windowState.app.label} window`}
          >
            {windowState.maximized ? "◇" : "□"}
          </button>
          <button
            type="button"
            className="grid h-7 w-7 place-items-center border border-transparent text-fuchsia-200/70 hover:border-fuchsia-300/60 hover:bg-fuchsia-400/15 hover:text-fuchsia-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300"
            onPointerDown={(event) => event.stopPropagation()}
            onDoubleClick={(event) => event.stopPropagation()}
            onClick={onClose}
            aria-label={`Close ${windowState.app.label} window`}
          >
            ×
          </button>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-auto bg-[linear-gradient(rgba(34,211,238,0.025)_1px,transparent_1px)] bg-[length:100%_24px] p-4 sm:p-6">
        {children}
      </div>

      {!windowState.maximized && (
        <button
          type="button"
          className="absolute bottom-0 right-0 hidden h-6 w-6 cursor-nwse-resize touch-none border-0 bg-transparent after:absolute after:bottom-1 after:right-1 after:h-2 after:w-2 after:border-b-2 after:border-r-2 after:border-cyan-400/60 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cyan-300 sm:block"
          onPointerDown={startResizing}
          onPointerMove={resize}
          onPointerUp={stopResizing}
          onPointerCancel={stopResizing}
          onKeyDown={resizeWithKeyboard}
          aria-label={`Resize ${windowState.app.label} window. Use arrow keys, or Shift plus arrow keys for larger steps.`}
        />
      )}
    </section>
  );
}
