"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursor = useRef<HTMLDivElement | null>(null);
  const label = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches || !cursor.current) return;

    const cursorElement = cursor.current;
    let frame: number | null = null;
    let x = -40;
    let y = -40;

    document.documentElement.classList.add("os-custom-cursor-enabled");

    const render = () => {
      cursorElement.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = null;
    };

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      cursorElement.classList.add("custom-cursor-visible");
      if (frame === null) frame = window.requestAnimationFrame(render);

      const target = event.target instanceof Element ? event.target : null;
      const textTarget = target?.closest("input, textarea, [contenteditable='true']");
      const actionTarget = target?.closest("button, a, [role='button'], [role='option']");
      cursorElement.dataset.mode = textTarget ? "text" : actionTarget ? "action" : "default";

      if (label.current) {
        const rawLabel =
          actionTarget?.getAttribute("data-cursor") ??
          actionTarget?.getAttribute("data-hint") ??
          actionTarget?.getAttribute("aria-label") ??
          "SELECT";
        label.current.textContent = rawLabel
          .replace(/^(open|switch|turn|enable|mute|dim|power)\s+/i, "")
          .replace(/\s+from\s+.*$/i, "")
          .slice(0, 34)
          .toUpperCase();
      }
    };

    const press = () => cursorElement.classList.add("custom-cursor-pressed");
    const release = () => cursorElement.classList.remove("custom-cursor-pressed");
    const hide = () => cursorElement.classList.remove("custom-cursor-visible");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);

    return () => {
      document.documentElement.classList.remove("os-custom-cursor-enabled");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.documentElement.removeEventListener("mouseleave", hide);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={cursor} className="custom-cursor" aria-hidden="true">
      <span className="cursor-arrow" />
      <span className="cursor-reticle" />
      <span ref={label} className="cursor-context">SELECT</span>
    </div>
  );
}
