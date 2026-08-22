"use client";

import { useRef } from "react";
import gsap from "gsap";

import { AppIcon } from "@/components/os/AppIcon";
import { desktopApps, type AppId } from "@/data/desktopApps";

type DesktopDockProps = {
  onOpenApp: (appId: AppId) => void;
  runningApps: Set<AppId>;
};

const dockOrder: AppId[] = [
  "projects",
  "research",
  "resume",
  "about",
  "achievements",
  "terminal",
  "contact",
];

export function DesktopDock({
  onOpenApp,
  runningApps,
}: DesktopDockProps) {
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const apps = dockOrder
    .map((id) => desktopApps.find((app) => app.id === id))
    .filter((app) => app !== undefined);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const mouseX = event.clientX;

    iconRefs.current.forEach((icon) => {
      if (!icon) return;

      const rect = icon.getBoundingClientRect();
      const iconCenter = rect.left + rect.width / 2;

      const distance = Math.abs(mouseX - iconCenter);

      // How far the mouse can influence nearby icons
      const maxDistance = 130;

      const influence = Math.max(
        0,
        1 - distance / maxDistance,
      );

      const scale = 1 + influence * 0.55;
      const lift = influence * -14;

      gsap.to(icon, {
        scale,
        y: lift,
        duration: 0.22,
        ease: "power3.out",
        overwrite: true,
      });
    });
  };

  const handleMouseLeave = () => {
    iconRefs.current.forEach((icon) => {
      if (!icon) return;

      gsap.to(icon, {
        scale: 1,
        y: 0,
        duration: 0.32,
        ease: "elastic.out(1, 0.55)",
        overwrite: true,
      });
    });
  };

  return (
    <nav
      className="desktop-dock"
      aria-label="Application dock"
    >
      <div
        className="desktop-dock-inner"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {apps.map((app, index) => {
          const running = runningApps.has(app.id);

          return (
            <button
              key={app.id}
              ref={(element) => {
                iconRefs.current[index] = element;
              }}
              type="button"
              className="dock-app"
              onClick={() => onOpenApp(app.id)}
              aria-label={`Open ${app.label}`}
              data-label={app.label}
              data-running={running}
            >
              <AppIcon
                appId={app.id}
                size="medium"
              />

              <span className="dock-running-indicator" />
            </button>
          );
        })}
      </div>
    </nav>
  );
}