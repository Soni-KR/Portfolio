import type { KeyboardEvent } from "react";
import { AppIcon } from "@/components/os/AppIcon";
import type { AppId } from "@/data/desktopApps";

type DesktopIconProps = {
  appId: AppId;
  label: string;
  onOpen: () => void;
};

export function DesktopIcon({ appId, label, onOpen }: DesktopIconProps) {
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
    }
  };

  return (
    <button
      type="button"
      className="desktop-icon group flex w-[6.5rem] flex-col items-center gap-2 p-2 text-center text-cyan-50"
      onClick={openOnTouch}
      onDoubleClick={onOpen}
      onKeyDown={handleKeyDown}
      aria-label={`Open ${label}`}
    >
      <AppIcon appId={appId} size="large" />
      <span className="desktop-icon-label">
        {label}
      </span>
    </button>
  );
}
