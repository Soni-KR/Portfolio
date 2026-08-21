"use client";

import { useState } from "react";
import { research } from "@/data/research";

type ResearchAppProps = {
  initialResearchId?: string;
};

export function ResearchApp({ initialResearchId }: ResearchAppProps) {
  const [selectedId, setSelectedId] = useState(
    () => research.find((record) => record.id === initialResearchId)?.id ?? research[0].id,
  );
  const selected = research.find((record) => record.id === selectedId) ?? research[0];

  return (
    <div className="-m-4 min-h-full bg-[#07161b]/60 sm:-m-6 sm:grid sm:grid-cols-[16rem_1fr]">
      <aside className="border-b border-cyan-300/15 bg-[#081a20] p-4 sm:border-b-0 sm:border-r">
        <p className="text-[0.6rem] uppercase tracking-[0.24em] text-amber-200/75">
          Research Archive /
        </p>
        <p className="mt-2 text-xs leading-5 text-cyan-100/40">
          Published work and applied research records.
        </p>

        <div className="mt-5 space-y-2">
          {research.map((record, index) => (
            <button
              key={record.id}
              type="button"
              className={`research-file ${record.id === selected.id ? "research-file-active" : ""}`}
              onClick={() => setSelectedId(record.id)}
              aria-pressed={record.id === selected.id}
            >
              <span className="document-glyph" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-left text-[0.58rem] uppercase tracking-[0.14em] text-cyan-100/35">
                  DOC-{String(index + 1).padStart(2, "0")}{" // "}{record.status}
                </span>
                <span className="mt-1 block text-left text-xs font-semibold leading-5 text-cyan-50">
                  {record.title}
                </span>
              </span>
            </button>
          ))}
        </div>
      </aside>

      <article className="p-5 sm:p-7">
        <header className="border-b border-cyan-300/15 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="border border-amber-300/30 bg-amber-300/5 px-2 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-amber-200">
              {selected.status}
            </span>
            <span className="text-xs text-cyan-100/35">{selected.period}</span>
          </div>
          <h3 className="mt-4 text-xl font-black leading-tight text-cyan-50 sm:text-2xl">
            {selected.title}
          </h3>
          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-cyan-200/45">
            {selected.organization}
          </p>
        </header>

        <section className="mt-6">
          <h4 className="app-section-title">Overview</h4>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-cyan-50/65">
            {selected.overview}
          </p>
        </section>

        <section className="mt-6">
          <h4 className="app-section-title">Methodology</h4>
          <ol className="mt-3 space-y-3">
            {selected.methodology.map((item, index) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-cyan-50/65">
                <span className="grid h-6 w-6 shrink-0 place-items-center border border-cyan-300/25 text-[0.6rem] text-cyan-200">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </section>

        {selected.result && (
          <section className="mt-6 border-l-2 border-lime-300 bg-lime-300/5 p-4">
            <h4 className="app-section-title text-lime-200">Verified result</h4>
            <p className="mt-2 text-sm text-lime-50/70">{selected.result}</p>
          </section>
        )}

        <footer className="mt-7 flex flex-wrap gap-3 border-t border-cyan-300/15 pt-5">
          {selected.repositoryUrl && (
            <a className="os-button px-4 py-2 text-xs" href={selected.repositoryUrl} target="_blank" rel="noreferrer">
              Source repository ↗
            </a>
          )}
          {selected.publicationUrl && (
            <a className="os-button px-4 py-2 text-xs" href={selected.publicationUrl} target="_blank" rel="noreferrer">
              Publication ↗
            </a>
          )}
          {!selected.repositoryUrl && !selected.publicationUrl && (
            <p className="text-xs uppercase tracking-[0.14em] text-cyan-100/35">
              Research record // public files not listed
            </p>
          )}
        </footer>
      </article>
    </div>
  );
}
