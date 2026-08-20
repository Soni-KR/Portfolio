import { projects } from "@/data/projects";

export function ProjectsApp() {
  return (
    <article>
      <header className="flex flex-col justify-between gap-4 border-b border-cyan-300/20 pb-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.26em] text-fuchsia-300">
            Portfolio archive // {String(projects.length).padStart(2, "0")} records
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-cyan-50">
            Selected Projects
          </h3>
        </div>
        <p className="max-w-xs text-xs leading-5 text-cyan-100/45">
          Verified project descriptions and repository links from the current
          resume.
        </p>
      </header>

      <div className="mt-6 grid gap-5">
        {projects.map((project, index) => (
          <section
            key={project.id}
            className="group relative overflow-hidden border border-cyan-300/20 bg-[#041016]/70 p-5 transition hover:border-cyan-300/45"
          >
            <span className="absolute right-4 top-3 text-4xl font-black text-cyan-300/5 transition group-hover:text-fuchsia-300/10">
              {String(index + 1).padStart(2, "0")}
            </span>

            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-fuchsia-200/75">
              {project.category}
            </p>
            <h4 className="mt-2 text-xl font-bold text-cyan-50">
              {project.name}
            </h4>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-cyan-50/60">
              {project.summary}
            </p>

            <ul className="mt-4 space-y-2">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-xs leading-5 text-cyan-100/55"
                >
                  <span className="text-lime-300">›</span>
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="border border-cyan-300/15 bg-cyan-300/5 px-2 py-1 text-[0.65rem] uppercase tracking-[0.1em] text-cyan-100/55"
                >
                  {technology}
                </span>
              ))}
            </div>

            <a
              className="mt-5 inline-flex border-b border-fuchsia-300/50 pb-1 text-xs uppercase tracking-[0.16em] text-fuchsia-200 transition hover:border-cyan-300 hover:text-cyan-100"
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer"
            >
              Access repository ↗
            </a>
          </section>
        ))}
      </div>
    </article>
  );
}
