import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import type { AppId } from "@/data/desktopApps";

function AppLoading() {
  return <p className="app-loading" role="status">Mounting application...</p>;
}

const AboutApp = dynamic(() => import("@/components/apps/AboutApp").then((module) => module.AboutApp), { loading: AppLoading });
const AchievementsApp = dynamic(() => import("@/components/apps/AchievementsApp").then((module) => module.AchievementsApp), { loading: AppLoading });
const ContactApp = dynamic(() => import("@/components/apps/ContactApp").then((module) => module.ContactApp), { loading: AppLoading });
const ProjectsApp = dynamic(() => import("@/components/apps/ProjectsApp").then((module) => module.ProjectsApp), { loading: AppLoading });
const ResearchApp = dynamic(() => import("@/components/apps/ResearchApp").then((module) => module.ResearchApp), { loading: AppLoading });
const ResumeApp = dynamic(() => import("@/components/apps/ResumeApp").then((module) => module.ResumeApp), { loading: AppLoading });
const TerminalApp = dynamic(() => import("@/components/apps/TerminalApp").then((module) => module.TerminalApp), { loading: AppLoading });

type AppRuntime = {
  onOpenApp: (appId: AppId, targetId?: string) => void;
  onResetDesktop: () => void;
};

type AppContentProps = AppRuntime & {
  appId: AppId;
  targetId?: string;
};

const appRenderers: Record<AppId, (runtime: AppRuntime, targetId?: string) => ReactNode> = {
  about: () => <AboutApp />,
  achievements: () => <AchievementsApp />,
  contact: () => <ContactApp />,
  projects: ({ onOpenApp }, targetId) => (
    <ProjectsApp
      key={targetId ?? "projects"}
      initialProjectId={targetId}
      onOpenResearch={(researchId) => onOpenApp("research", researchId)}
    />
  ),
  research: (_, targetId) => <ResearchApp key={targetId ?? "research"} initialResearchId={targetId} />,
  terminal: ({ onOpenApp, onResetDesktop }) => (
    <TerminalApp onOpenApp={onOpenApp} onResetDesktop={onResetDesktop} />
  ),
  resume: () => <ResumeApp />,
};

export function AppContent({ appId, targetId, onOpenApp, onResetDesktop }: AppContentProps) {
  return appRenderers[appId]({ onOpenApp, onResetDesktop }, targetId);
}
