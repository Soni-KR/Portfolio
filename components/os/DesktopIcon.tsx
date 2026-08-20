import type { KeyboardEvent } from "react";

type DesktopIconProps = {
  symbol: string;
  label: string;
  onOpen: () => void;
};

export function DesktopIcon({ symbol, label, onOpen }: DesktopIconProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const isOpenKey = event.key === "Enter" || event.key === " ";

    if (isOpenKey && !event.repeat) {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <button
      type="button"
      className="group flex w-24 flex-col items-center gap-2 p-2 text-center text-cyan-50 transition hover:bg-cyan-300/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
      onDoubleClick={onOpen}
      onKeyDown={handleKeyDown}
      aria-label={`Open ${label}`}
    >
      <span
        className="relative grid h-14 w-14 place-items-center border border-cyan-300/35 bg-[#071820]/90 text-xl font-bold text-cyan-200 shadow-[4px_4px_0_rgba(8,51,68,0.7)] transition group-hover:-translate-y-1 group-hover:border-fuchsia-300/70 group-hover:text-fuchsia-200 group-hover:shadow-[4px_6px_0_rgba(112,26,117,0.45)]"
        aria-hidden="true"
      >
        {symbol}
      </span>
      <span className="bg-[#02090d]/70 px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-50/80 group-hover:text-cyan-50">
        {label}
      </span>
    </button>
  );
}
