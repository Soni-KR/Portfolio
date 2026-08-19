import type { AppId } from "@/data/desktopApps";

export function AppPreview({ appId }: { appId: AppId }) {
  if (appId === "projects") {
    return (
      <section className="app-content">
        <p className="eyebrow">DISK / PROJECTS</p>
        <h2>Project files will live here.</h2>
        <p>
          This placeholder keeps V1 focused on the desktop itself. Real case
          studies and project data come in the next content milestone.
        </p>
        <div className="file-placeholders" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>
    );
  }

  if (appId === "about") {
    return (
      <section className="app-content">
        <p className="eyebrow">USER / PROFILE</p>
        <h2>Mourad Kraiem</h2>
        <p>
          AI/ML engineering student interested in research, intelligent
          systems, and software that solves real problems.
        </p>
      </section>
    );
  }

  return (
    <section className="terminal-content" aria-label="Terminal preview">
      <p>
        <span>guest@soni-kr</span>:~$ whoami
      </p>
      <p>Mourad Kraiem</p>
      <p>AI/ML Engineering Student</p>
      <p className="terminal-note">[ interactive commands: next milestone ]</p>
      <p>
        <span>guest@soni-kr</span>:~$ <i className="terminal-caret" />
      </p>
    </section>
  );
}
