import type { CSSProperties, KeyboardEvent } from "react";
import type { DesktopApp } from "@/data/desktopApps";

type DesktopIconProps = {
  app: DesktopApp;
  onOpen: (app: DesktopApp) => void;
};

export function DesktopIcon({ app, onOpen }: DesktopIconProps) {
  const openFromKeyboard = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") onOpen(app);
  };

  return (
    <button
      className="desktop-icon"
      type="button"
      onDoubleClick={() => onOpen(app)}
      onKeyDown={openFromKeyboard}
      aria-label={`Open ${app.title}`}
    >
      <span
        className="desktop-icon__glyph"
        style={{ "--icon-accent": app.accent } as CSSProperties}
      >
        {app.glyph}
      </span>
      <span>{app.title}</span>
    </button>
  );
}
