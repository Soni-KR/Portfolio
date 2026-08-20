import type { ReactNode } from "react";
import { AboutApp } from "@/components/apps/AboutApp";
import { AchievementsApp } from "@/components/apps/AchievementsApp";
import { ContactApp } from "@/components/apps/ContactApp";
import { ProjectsApp } from "@/components/apps/ProjectsApp";
import { ResearchApp } from "@/components/apps/ResearchApp";
import { TerminalApp } from "@/components/apps/TerminalApp";
import type { AppId } from "@/data/desktopApps";

type AppRuntime = {
  onOpenApp: (appId: AppId) => void;
};

type AppContentProps = AppRuntime & {
  appId: AppId;
};

const appRenderers: Record<AppId, (runtime: AppRuntime) => ReactNode> = {
  about: () => <AboutApp />,
  achievements: () => <AchievementsApp />,
  contact: () => <ContactApp />,
  projects: () => <ProjectsApp />,
  research: () => <ResearchApp />,
  terminal: ({ onOpenApp }) => <TerminalApp onOpenApp={onOpenApp} />,
};

export function AppContent({ appId, onOpenApp }: AppContentProps) {
  return appRenderers[appId]({ onOpenApp });
}
