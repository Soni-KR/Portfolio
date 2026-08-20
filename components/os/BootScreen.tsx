import { useEffect, useState } from "react";

const bootMessages = [
  "MEMORY ARRAY .............. 64 TB VIRTUAL",
  "NEURAL BUS ............... SYNCHRONIZED",
  "PORTFOLIO ARCHIVE ........ MOUNTED",
  "WINDOW MANAGER ........... ONLINE",
  "AESTHETIC MODULE ......... RETRO-ANIME",
  "LOCAL USER ............... DETECTED",
];

type BootScreenProps = {
  onComplete: () => void;
};

export function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleMessageCount, setVisibleMessageCount] = useState(1);
  const progress = Math.round(
    (visibleMessageCount / bootMessages.length) * 100,
  );

  useEffect(() => {
    const messageTimer = window.setInterval(() => {
      setVisibleMessageCount((currentCount) => {
        if (currentCount >= bootMessages.length) {
          window.clearInterval(messageTimer);
          return currentCount;
        }

        return currentCount + 1;
      });
    }, 320);
    const completionTimer = window.setTimeout(onComplete, 2800);

    return () => {
      window.clearInterval(messageTimer);
      window.clearTimeout(completionTimer);
    };
  }, [onComplete]);

  return (
    <main className="os-screen grid h-screen place-items-center overflow-x-hidden overflow-y-auto px-6 py-10 text-cyan-100">
      <div className="crt-overlay" aria-hidden="true" />

      <section className="screen-enter w-full max-w-3xl" aria-labelledby="boot-title">
        <div className="mb-10 flex items-center justify-between border-b border-cyan-300/30 pb-3 text-[0.65rem] uppercase tracking-[0.28em] text-cyan-200/60">
          <span>SONI SYSTEMS // TUN NODE 01</span>
          <span>POST REV. 1.0</span>
        </div>

        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-fuchsia-300">
          Personal operating environment
        </p>
        <h1 id="boot-title" className="text-4xl font-black tracking-[-0.05em] sm:text-6xl">
          OperatingSoni<span className="text-fuchsia-400">-KR</span>
        </h1>
        <p className="mt-3 text-sm text-cyan-100/50">
          Copyright 2026 // All creative processes nominal
        </p>

        <div
          className="mt-12 min-h-48 space-y-3 border-l border-cyan-300/30 pl-5 text-xs leading-relaxed text-cyan-100/70 sm:text-sm"
          aria-live="polite"
        >
          {bootMessages.slice(0, visibleMessageCount).map((message, index) => (
            <p key={message} className="boot-line">
              <span className="mr-3 text-fuchsia-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              {message}
              <span className="ml-3 text-lime-300">[OK]</span>
            </p>
          ))}
        </div>

        <div className="mt-8 flex items-end gap-4">
          <div className="flex-1">
            <div className="mb-2 flex justify-between text-[0.65rem] uppercase tracking-[0.25em] text-cyan-100/50">
              <span>Loading kernel</span>
              <span>{progress}%</span>
            </div>
            <div
              className="h-2 overflow-hidden border border-cyan-300/40 bg-cyan-950/60"
              role="progressbar"
              aria-label="System boot progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="h-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.8)] transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            className="os-button shrink-0 px-4 py-2 text-xs"
            onClick={onComplete}
          >
            Skip boot
          </button>
        </div>
      </section>
    </main>
  );
}
