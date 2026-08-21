import type { AppId } from "@/data/desktopApps";

type AppIconProps = {
  appId: AppId;
  size?: "small" | "medium" | "large";
};

const appIndex: Record<AppId, string> = {
  projects: "01",
  research: "02",
  achievements: "03",
  about: "04",
  contact: "05",
  terminal: "06",
  resume: "07",
};

export function AppIcon({ appId, size = "medium" }: AppIconProps) {
  return (
    <span className={`app-icon app-icon-${appId} app-icon-${size}`} aria-hidden="true">
      <span className="app-icon-grid" />
      <span className="app-icon-core" />
      <span className="app-icon-index">{appIndex[appId]}</span>
    </span>
  );
}
