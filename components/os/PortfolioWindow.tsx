"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

export type WindowPosition = { x: number; y: number };

type PortfolioWindowProps = {
  title: string;
  glyph: string;
  position: WindowPosition;
  children: ReactNode;
  onMove: (position: WindowPosition) => void;
  onMinimize: () => void;
  onClose: () => void;
};

export function PortfolioWindow({
  title,
  glyph,
  position,
  children,
  onMove,
  onMinimize,
  onClose,
}: PortfolioWindowProps) {
  const dragStart = useRef<
    WindowPosition & { pointerX: number; pointerY: number }
  >(null);

  const startDragging = (event: PointerEvent<HTMLDivElement>) => {
    dragStart.current = {
      ...position,
      pointerX: event.clientX,
      pointerY: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const drag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;

    const panelWidth = Math.min(680, window.innerWidth - 32);
    const nextX = dragStart.current.x + event.clientX - dragStart.current.pointerX;
    const nextY = dragStart.current.y + event.clientY - dragStart.current.pointerY;

    onMove({
      x: Math.max(16, Math.min(nextX, window.innerWidth - panelWidth - 16)),
      y: Math.max(16, Math.min(nextY, window.innerHeight - 160)),
    });
  };

  const stopDragging = () => {
    dragStart.current = null;
  };

  const stopControlPointer = (event: PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <section
      className="portfolio-window"
      style={{ left: position.x, top: position.y }}
      aria-label={`${title} window`}
    >
      <div
        className="window-bar"
        onPointerDown={startDragging}
        onPointerMove={drag}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        <div className="window-title">
          <span>{glyph}</span>
          {title}.EXE
        </div>
        <div className="window-controls">
          <button
            type="button"
            onPointerDown={stopControlPointer}
            onClick={onMinimize}
            aria-label={`Minimize ${title}`}
          >
            _
          </button>
          <button
            type="button"
            onPointerDown={stopControlPointer}
            onClick={onClose}
            aria-label={`Close ${title}`}
          >
            ×
          </button>
        </div>
      </div>
      <div className="window-body">{children}</div>
      <div className="window-status">
        <span>READY</span>
        <span>MEM: 64K</span>
      </div>
    </section>
  );
}
