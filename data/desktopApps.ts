export const appIds = ["projects", "about", "terminal"] as const;

export type AppId = (typeof appIds)[number];

export type DesktopApp = {
  id: AppId;
  title: string;
  glyph: string;
  accent: string;
};

export const desktopApps: DesktopApp[] = [
  { id: "projects", title: "Projects", glyph: "▱", accent: "#ff9f68" },
  { id: "about", title: "About", glyph: "◎", accent: "#68e0cf" },
  { id: "terminal", title: "Terminal", glyph: ">_", accent: "#b3ff66" },
];
