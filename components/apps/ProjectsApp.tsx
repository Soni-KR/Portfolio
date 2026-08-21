"use client";

import { useMemo, useState } from "react";
import {
  getFolderForProject,
  getProjectsForFolder,
  projectFolders,
  projects,
  type PortfolioProject,
} from "@/data/projects";

function ProjectDetail({
  project,
  onOpenResearch,
}: {
  project: PortfolioProject;
  onOpenResearch: (researchId: string) => void;
}) {
  return (
    <article className="project-detail min-w-0">
      <header className="border-b border-cyan-300/15 pb-5">
        <div className="flex flex-wrap items-center gap-2 text-[0.62rem] uppercase tracking-[0.16em]">
          <span className="border border-amber-300/30 bg-amber-300/5 px-2 py-1 text-amber-200">
            {project.kind}
          </span>
          {project.domains.map((domain) => (
            <span key={domain} className="text-cyan-100/40">
              {domain}
            </span>
          ))}
        </div>
        <h3 className="mt-4 text-xl font-black leading-tight text-cyan-50 sm:text-2xl">
          {project.name}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-cyan-50/60">
          {project.summary}
        </p>
      </header>

      <section className="mt-5">
        <h4 className="app-section-title">What I built</h4>
        <ul className="mt-3 space-y-2">
          {project.built.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-cyan-50/65">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-cyan-300" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {project.result && (
        <section className="mt-5 border-l-2 border-lime-300 bg-lime-300/5 p-4">
          <h4 className="app-section-title text-lime-200">Verified result</h4>
          <p className="mt-2 text-sm leading-6 text-lime-50/70">{project.result}</p>
        </section>
      )}

      <section className="mt-5">
        <h4 className="app-section-title">Technical inventory</h4>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span key={technology} className="tech-chip">
              {technology}
            </span>
          ))}
        </div>
      </section>

      <footer className="mt-6 flex flex-wrap gap-3 border-t border-cyan-300/15 pt-5">
        {project.repositoryUrl && (
          <a className="os-button px-4 py-2 text-xs" href={project.repositoryUrl} target="_blank" rel="noreferrer">
            Open GitHub ↗
          </a>
        )}
        {project.publicationUrl && (
          <a className="os-button px-4 py-2 text-xs" href={project.publicationUrl} target="_blank" rel="noreferrer">
            View publication ↗
          </a>
        )}
        {project.researchId && (
          <button
            type="button"
            className="os-button px-4 py-2 text-xs"
            onClick={() => onOpenResearch(project.researchId!)}
          >
            Open in Research Archive ↗
          </button>
        )}
        {!project.repositoryUrl && !project.publicationUrl && !project.researchId && (
          <p className="text-xs uppercase tracking-[0.14em] text-cyan-100/35">
            Portfolio record // public links not listed
          </p>
        )}
      </footer>
    </article>
  );
}

type ProjectsAppProps = {
  initialProjectId?: string;
  onOpenResearch: (researchId: string) => void;
};

export function ProjectsApp({ initialProjectId, onOpenResearch }: ProjectsAppProps) {
  const initialProject =
    projects.find((project) => project.id === initialProjectId) ?? projects[0];
  const [folderId, setFolderId] = useState<string>(() => getFolderForProject(initialProject));
  const folderProjects = useMemo(() => getProjectsForFolder(folderId), [folderId]);
  const [selectedProjectId, setSelectedProjectId] = useState(initialProject.id);
  const selectedProject =
    folderProjects.find((project) => project.id === selectedProjectId) ?? folderProjects[0];

  const openFolder = (nextFolderId: string) => {
    const firstProject = getProjectsForFolder(nextFolderId)[0];
    setFolderId(nextFolderId);
    if (firstProject) setSelectedProjectId(firstProject.id);
  };

  return (
    <div className="projects-explorer -m-4 min-h-full sm:-m-6 sm:grid sm:grid-cols-[14.5rem_minmax(15rem,0.8fr)_minmax(18rem,1.25fr)]">
      <nav className="border-b border-cyan-300/15 bg-[#07161b] p-4 sm:border-b-0 sm:border-r" aria-label="Project folders">
        <p className="mb-3 text-[0.6rem] uppercase tracking-[0.24em] text-amber-200/70">
          Project Drive /
        </p>
        <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 sm:grid-cols-1">
          {projectFolders.map((folder) => (
            <button
              key={folder.id}
              type="button"
              className={`folder-button ${folder.id === folderId ? "folder-button-active" : ""}`}
              onClick={() => openFolder(folder.id)}
              aria-pressed={folder.id === folderId}
            >
              <span className="folder-glyph" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block truncate font-bold text-cyan-50">{folder.label}</span>
                <span className="mt-0.5 block truncate text-[0.58rem] text-cyan-100/35">
                  {folder.description}
                </span>
              </span>
            </button>
          ))}
        </div>
      </nav>

      <section className="border-b border-cyan-300/15 bg-[#091a20]/80 p-4 sm:border-b-0 sm:border-r" aria-label="Project files">
        <div className="flex items-center justify-between border-b border-cyan-300/15 pb-3">
          <div>
            <p className="text-[0.58rem] uppercase tracking-[0.18em] text-cyan-100/35">Folder</p>
            <h3 className="mt-1 text-sm font-bold text-cyan-50">
              {projectFolders.find((folder) => folder.id === folderId)?.label}
            </h3>
          </div>
          <span className="text-[0.6rem] text-cyan-100/35">{folderProjects.length} files</span>
        </div>
        <div className="mt-3 space-y-1">
          {folderProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              className={`project-file ${selectedProject?.id === project.id ? "project-file-active" : ""}`}
              onClick={() => setSelectedProjectId(project.id)}
              aria-pressed={selectedProject?.id === project.id}
            >
              <span className="project-file-icon" aria-hidden="true">P</span>
              <span className="min-w-0">
                <span className="block text-left font-semibold leading-5 text-cyan-50">{project.name}</span>
                <span className="mt-0.5 block truncate text-left text-[0.58rem] uppercase tracking-[0.1em] text-cyan-100/35">
                  {project.kind}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="bg-[#07161b]/60 p-5 sm:p-6">
        {selectedProject ? (
          <ProjectDetail project={selectedProject} onOpenResearch={onOpenResearch} />
        ) : (
          <p>No records in this folder.</p>
        )}
      </div>
    </div>
  );
}
