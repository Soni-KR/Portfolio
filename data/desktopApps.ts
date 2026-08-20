export type AppId =
  | "projects"
  | "research"
  | "achievements"
  | "about"
  | "contact"
  | "terminal";

export type DesktopApp = {
  id: AppId;
  symbol: string;
  label: string;
  defaultSize: {
    width: number;
    height: number;
  };
};

export const desktopApps: DesktopApp[] = [
  {
    id: "projects",
    symbol: "▱",
    label: "Projects",
    defaultSize: { width: 760, height: 540 },
  },
  {
    id: "research",
    symbol: "⌘",
    label: "Research",
    defaultSize: { width: 720, height: 560 },
  },
  {
    id: "achievements",
    symbol: "★",
    label: "Achievements",
    defaultSize: { width: 700, height: 540 },
  },
  {
    id: "about",
    symbol: "◎",
    label: "About",
    defaultSize: { width: 700, height: 560 },
  },
  {
    id: "contact",
    symbol: "@",
    label: "Contact",
    defaultSize: { width: 560, height: 420 },
  },
  {
    id: "terminal",
    symbol: ">_",
    label: "Terminal",
    defaultSize: { width: 680, height: 440 },
  },
];
