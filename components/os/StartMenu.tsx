import type { AppId, DesktopApp } from "@/data/desktopApps";

type StartMenuProps = {
  apps: DesktopApp[];
  onOpenApp: (appId: AppId) => void;
};

export function StartMenu({ apps, onOpenApp }: StartMenuProps) {
  return (
    <section
      className="absolute bottom-16 left-3 z-[2147483645] w-[min(24rem,calc(100vw-1.5rem))] border border-cyan-300/35 bg-[#041016]/98 p-1 shadow-[12px_16px_0_rgba(0,0,0,0.4),0_0_50px_rgba(34,211,238,0.12)] backdrop-blur"
      aria-label="Application launcher"
    >
      <header className="border border-cyan-300/15 bg-cyan-300/5 p-4">
        <p className="text-[0.6rem] uppercase tracking-[0.24em] text-fuchsia-300">
          OperatingSoni-KR // launcher
        </p>
        <h2 className="mt-2 text-lg font-black text-cyan-50">
          Mourad Kraiem&apos;s Portfolio
        </h2>
        <p className="mt-1 text-xs text-cyan-100/40">
          Select an application to create a new window.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-1 p-1">
        {apps.map((app) => (
          <button
            key={app.id}
            type="button"
            className="flex items-center gap-3 border border-transparent p-3 text-left transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cyan-300"
            onClick={() => onOpenApp(app.id)}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center border border-fuchsia-300/35 bg-fuchsia-400/5 text-xs font-bold text-fuchsia-200">
              {app.symbol}
            </span>
            <span>
              <span className="block text-xs font-bold uppercase tracking-[0.12em] text-cyan-50">
                {app.label}
              </span>
              <span className="mt-1 block text-[0.55rem] uppercase tracking-[0.1em] text-cyan-100/30">
                Launch module
              </span>
            </span>
          </button>
        ))}
      </div>

      <footer className="flex items-center justify-between border-t border-cyan-300/15 px-4 py-3 text-[0.6rem] uppercase tracking-[0.16em] text-cyan-100/35">
        <span>Guest session</span>
        <span className="text-lime-300/70">System online</span>
      </footer>
    </section>
  );
}
