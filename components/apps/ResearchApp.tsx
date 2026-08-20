import { experience } from "@/data/profile";

export function ResearchApp() {
  return (
    <article>
      <header className="border-b border-cyan-300/20 pb-5">
        <p className="text-[0.65rem] uppercase tracking-[0.26em] text-fuchsia-300">
          Research archive // 03 tracks
        </p>
        <h3 className="mt-2 text-2xl font-black tracking-tight text-cyan-50">
          Applied AI Research
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-cyan-50/55">
          Research internships spanning explainable retrieval, distributed
          learning, Arabic NLP, symbolic reasoning, and graph neural networks.
        </p>
      </header>

      <div className="mt-6 space-y-5">
        {experience.map((item, index) => (
          <section
            key={item.title}
            className="relative border-l-2 border-cyan-300/35 bg-cyan-950/20 p-5"
          >
            <span className="absolute -left-3 top-5 grid h-6 w-6 place-items-center border border-cyan-300/50 bg-[#06151d] text-[0.6rem] text-fuchsia-200">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col justify-between gap-2 pl-2 sm:flex-row sm:gap-4">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-cyan-200/45">
                  {item.organization}
                </p>
                <h4 className="mt-1 font-semibold text-cyan-50">
                  {item.title}
                </h4>
              </div>
              <span className="shrink-0 text-xs text-fuchsia-200/70">
                {item.period}
              </span>
            </div>
            <p className="mt-3 pl-2 text-sm leading-6 text-cyan-50/60">
              {item.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-3 pl-2 text-xs uppercase tracking-[0.12em] text-cyan-300">
              {item.url && (
                <a href={item.url} target="_blank" rel="noreferrer">
                  Source code ↗
                </a>
              )}
              {item.publicationUrl && (
                <a
                  href={item.publicationUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Published paper ↗
                </a>
              )}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
