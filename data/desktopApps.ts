export type AppId =
  | "projects"
  | "research"
  | "achievements"
  | "about"
  | "contact"
  | "terminal"
  | "resume";

export type DesktopApp = {
  id: AppId;
  label: string;
  showOnDesktop: boolean;
  defaultSize: {
    width: number;
    height: number;
  };
};

export const desktopApps: DesktopApp[] = [
  {
    id: "projects",
    label: "Projects",
    showOnDesktop: true,
    defaultSize: { width: 760, height: 540 },
  },
  {
    id: "research",
    label: "Research",
    showOnDesktop: true,
    defaultSize: { width: 640, height: 500 },
  },
  {
    id: "achievements",
    label: "Achievements",
    showOnDesktop: false,
    defaultSize: { width: 700, height: 540 },
  },
  {
    id: "about",
    label: "About",
    showOnDesktop: true,
    defaultSize: { width: 700, height: 560 },
  },
  {
    id: "contact",
    label: "Contact",
    showOnDesktop: false,
    defaultSize: { width: 560, height: 420 },
  },
  {
    id: "terminal",
    label: "Terminal",
    showOnDesktop: false,
    defaultSize: { width: 680, height: 440 },
  },
  {
    id: "resume",
    label: "Resume",
    showOnDesktop: true,
    defaultSize: { width: 620, height: 420 },
},
];
