"use client";

import { useState, type KeyboardEvent } from "react";
import { AppIcon } from "@/components/os/AppIcon";
import type { AppId } from "@/data/desktopApps";

type DesktopIconProps = {
  appId: AppId;
  label: string;
  onOpen: () => void;
};

export function DesktopIcon({ appId, label, onOpen }: DesktopIconProps) {
  const [selected, setSelected] = useState(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const isOpenKey = event.key === "Enter" || event.key === " ";

    if (isOpenKey && !event.repeat) {
      event.preventDefault();
      onOpen();
    }
  };

  const openOnTouch = () => {
    if (window.innerWidth < 640 || window.matchMedia("(pointer: coarse)").matches) {
      onOpen();
      return;
    }

    setSelected(true);
  };

  return (
    <button
      type="button"
      className="desktop-icon group flex w-[6.5rem] flex-col items-center gap-2 p-2 text-center text-cyan-50"
      onClick={openOnTouch}
      onDoubleClick={onOpen}
      onKeyDown={handleKeyDown}
      onBlur={() => setSelected(false)}
      aria-label={`Open ${label}`}
      data-cursor={`Double click // ${label}`}
      data-selected={selected ? "true" : "false"}
    >
      <AppIcon appId={appId} size="large" />
      <span className="desktop-icon-label">
        {label}
      </span>
    </button>
  );
}
