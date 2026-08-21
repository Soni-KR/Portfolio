import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import type { DesktopItemPosition } from "@/components/os/desktopLayoutStorage";
import { SYSTEM_BAR_HEIGHT, TASKBAR_HEIGHT } from "@/components/os/windowTypes";

type DesktopItemProps = {
  position: DesktopItemPosition;
  width: number;
  height: number;
  className?: string;
  children: ReactNode;
  onMove: (position: DesktopItemPosition) => void;
};

type DragState = {
  pointerId: number;
  originX: number;
  originY: number;
  startX: number;
  startY: number;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function DesktopItem({
  position,
  width,
  height,
  className = "",
  children,
  onMove,
}: DesktopItemProps) {
  const dragState = useRef<DragState | null>(null);
  const pendingPosition = useRef<DesktopItemPosition | null>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth < 640 || event.button !== 0) return;

    dragState.current = {
      pointerId: event.pointerId,
      originX: position.x,
      originY: position.y,
      startX: event.clientX,
      startY: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const drag = (event: PointerEvent<HTMLDivElement>) => {
    const activeDrag = dragState.current;
    if (!activeDrag || activeDrag.pointerId !== event.pointerId) return;

    pendingPosition.current = {
      x: clamp(
        activeDrag.originX + event.clientX - activeDrag.startX,
        8,
        Math.max(8, window.innerWidth - width - 8),
      ),
      y: clamp(
        activeDrag.originY + event.clientY - activeDrag.startY,
        SYSTEM_BAR_HEIGHT + 8,
        Math.max(SYSTEM_BAR_HEIGHT + 8, window.innerHeight - TASKBAR_HEIGHT - height - 8),
      ),
    };

    if (frame.current !== null) return;
    frame.current = window.requestAnimationFrame(() => {
      if (pendingPosition.current) onMove(pendingPosition.current);
      pendingPosition.current = null;
      frame.current = null;
    });
  };

  const stopDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragState.current = null;
  };

  const style: CSSProperties = {
    left: position.x,
    top: position.y,
    width,
    minHeight: height,
  };

  return (
    <div
      className={`desktop-item absolute touch-none select-none ${className}`}
      style={style}
      onPointerDown={startDrag}
      onPointerMove={drag}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
    >
      {children}
    </div>
  );
}
