import type { AppId, DesktopApp } from "@/data/desktopApps";
import { AppIcon } from "@/components/os/AppIcon";

type StartMenuProps = {
  apps: DesktopApp[];
  onOpenApp: (appId: AppId) => void;
  onOpenPalette: () => void;
  onResetDesktop: () => void;
};

export function StartMenu({ apps, onOpenApp, onOpenPalette, onResetDesktop }: StartMenuProps) {
  return (
    <section
      className="absolute bottom-16 left-3 z-[2147483645] w-[min(24rem,calc(100vw-1.5rem))] border border-cyan-300/35 bg-[#041016]/98 p-1 shadow-[12px_16px_0_rgba(0,0,0,0.4),0_0_50px_rgba(34,211,238,0.12)] backdrop-blur"
      aria-label="Application launcher"
    >
      <header className="border border-cyan-300/15 bg-cyan-300/5 p-4">
        <p className="text-[0.6rem] uppercase tracking-[0.24em] text-amber-200">
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
            <AppIcon appId={app.id} size="medium" />
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

      <footer className="grid grid-cols-2 gap-1 border-t border-cyan-300/15 p-1 text-[0.6rem] uppercase tracking-[0.14em]">
        <button type="button" className="launcher-utility" onClick={onOpenPalette}>Search system</button>
        <button type="button" className="launcher-utility" onClick={onResetDesktop}>Reset desktop</button>
      </footer>
    </section>
  );
}
