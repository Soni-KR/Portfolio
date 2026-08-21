"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AppIcon } from "@/components/os/AppIcon";
import { desktopApps, type AppId } from "@/data/desktopApps";
import { projects } from "@/data/projects";
import { research } from "@/data/research";
import { skillGroups } from "@/data/skills";

type CommandPaletteProps = {
  onClose: () => void;
  onOpenApp: (appId: AppId, targetId?: string) => void;
  onResetDesktop: () => void;
};

type PaletteResult = {
  id: string;
  label: string;
  detail: string;
  appId: AppId;
  keywords: string;
  action?: "reset";
  targetId?: string;
};

export function CommandPalette({ onClose, onOpenApp, onResetDesktop }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const restoreFocus = useRef(true);

  useEffect(() => {
    previouslyFocused.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    inputRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      if (restoreFocus.current) previouslyFocused.current?.focus();
    };
  }, [onClose]);

  const allResults = useMemo<PaletteResult[]>(() => {
    const appResults = desktopApps.map((app) => ({
      id: `app-${app.id}`,
      label: app.label,
      detail: "Application",
      appId: app.id,
      keywords: `${app.label} app open launch`,
    }));
    const projectResults = projects.map((project) => ({
      id: `project-${project.id}`,
      label: project.name,
      detail: `Project // ${project.domains[0]}`,
      appId: "projects" as const,
      keywords: `${project.name} ${project.domains.join(" ")} ${project.technologies.join(" ")}`,
      targetId: project.id,
    }));
    const researchResults = research.map((record) => ({
      id: `research-${record.id}`,
      label: record.title,
      detail: `Research // ${record.status}`,
      appId: "research" as const,
      keywords: `${record.title} ${record.methodology.join(" ")}`,
      targetId: record.id,
    }));
    const skillResults = skillGroups.flatMap((group) =>
      group.items.map((skill) => ({
        id: `skill-${group.label}-${skill}`,
        label: skill,
        detail: `Skill // ${group.label}`,
        appId: "about" as const,
        keywords: `${skill} ${group.label}`,
      })),
    );

    return [
      ...appResults,
      ...projectResults,
      ...researchResults,
      ...skillResults,
      {
        id: "command-reset",
        label: "Reset Desktop",
        detail: "System command",
        appId: "about",
        keywords: "reset desktop restore icons widgets positions",
        action: "reset",
      },
    ];
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const results = allResults
    .filter((result) => !normalizedQuery || `${result.label} ${result.keywords}`.toLowerCase().includes(normalizedQuery))
    .slice(0, 9);
  const selectedIndex = Math.min(activeIndex, Math.max(0, results.length - 1));

  const chooseResult = (result: PaletteResult) => {
    restoreFocus.current = false;
    if (result.action === "reset") onResetDesktop();
    else onOpenApp(result.appId, result.targetId);
    onClose();
  };

  const keepFocusInsideDialog = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>("input, button, [href], [tabindex]:not([tabindex='-1'])")]
      .filter((element) => !element.hasAttribute("disabled"));
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="command-palette-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section
        ref={dialogRef}
        className="command-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Search OperatingSoni-KR"
        aria-describedby="command-palette-help"
        onKeyDown={keepFocusInsideDialog}
      >
        <label className="command-input-row">
          <span aria-hidden="true">⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" && results.length > 0) {
                event.preventDefault();
                setActiveIndex((index) => (index + 1) % results.length);
              } else if (event.key === "ArrowUp" && results.length > 0) {
                event.preventDefault();
                setActiveIndex((index) => (index - 1 + results.length) % results.length);
              } else if (event.key === "Enter" && results[selectedIndex]) {
                chooseResult(results[selectedIndex]);
              }
            }}
            placeholder="Search apps, projects, research, skills..."
            aria-label="Search portfolio"
            aria-controls="command-palette-results"
            aria-activedescendant={results.length > 0 ? `command-result-${selectedIndex}` : undefined}
          />
          <kbd>ESC</kbd>
        </label>

        <p className="sr-only" role="status">{results.length} search results</p>
        <div id="command-palette-results" className="command-results" role="listbox" aria-label="Search results">
          {results.map((result, index) => (
            <button
              id={`command-result-${index}`}
              key={result.id}
              type="button"
              className={`command-result ${index === selectedIndex ? "command-result-active" : ""}`}
              onClick={() => chooseResult(result)}
              onMouseEnter={() => setActiveIndex(index)}
              role="option"
              aria-selected={index === selectedIndex}
            >
              <AppIcon appId={result.appId} size="small" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-[var(--os-paper)]">{result.label}</span>
                <span className="mt-1 block truncate text-[0.6rem] uppercase tracking-[0.14em] text-cyan-100/35">{result.detail}</span>
              </span>
              <span className="text-amber-200/45">↵</span>
            </button>
          ))}
          {results.length === 0 && <p className="p-6 text-center text-sm text-cyan-100/45">No matching records.</p>}
        </div>
        <footer id="command-palette-help" className="command-footer"><span>↑↓ Navigate</span><span>Enter Open</span><span>Esc Close</span></footer>
      </section>
    </div>
  );
}
