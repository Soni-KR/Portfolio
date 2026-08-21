import type { AppId } from "@/data/desktopApps";

type AppIconProps = {
  appId: AppId;
  size?: "small" | "medium" | "large";
};

export function AppIcon({ appId, size = "medium" }: AppIconProps) {
  return (
    <span className={`app-icon app-icon-${appId} app-icon-${size}`} aria-hidden="true">
      <span className="app-icon-core" />
    </span>
  );
}
