"use client";

import { useState } from "react";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";

const tabs = ["Overview", "Experience", "Education", "Skills"] as const;
type ResumeTab = (typeof tabs)[number];

export function ResumeApp() {
  const [activeTab, setActiveTab] = useState<ResumeTab>("Overview");

  return (
    <article className="flex min-h-full flex-col">
      <header className="border-b border-cyan-300/15 pb-5">
        <p className="text-[0.6rem] uppercase tracking-[0.24em] text-amber-200/75">
          Personnel record // MK-01
        </p>
        <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h3 className="text-2xl font-black text-cyan-50">{profile.name}</h3>
            <p className="mt-1 text-sm text-cyan-100/65">{profile.role}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-cyan-300/70">
              {profile.specialization}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a className="os-button px-3 py-2 text-[0.65rem]" href="/resume.pdf" target="_blank" rel="noreferrer">
              View PDF ↗
            </a>
            <a className="os-button px-3 py-2 text-[0.65rem]" href="/resume.pdf" download="Mourad_Kraiem_Resume.pdf">
              Download PDF
            </a>
          </div>
        </div>
      </header>

      <nav className="mt-4 flex gap-1 overflow-x-auto border-b border-cyan-300/15" aria-label="Resume sections">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`app-tab ${activeTab === tab ? "app-tab-active" : ""}`}
            onClick={() => setActiveTab(tab)}
            aria-pressed={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="mt-5 flex-1">
        {activeTab === "Overview" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <section className="border border-cyan-300/15 bg-cyan-950/20 p-5 sm:col-span-2">
              <h4 className="app-section-title">Profile</h4>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-cyan-50/65">{profile.summary}</p>
            </section>
            <section className="border border-cyan-300/15 bg-cyan-950/20 p-5">
              <h4 className="app-section-title">Research focus</h4>
              <p className="mt-3 text-sm leading-6 text-cyan-50/65">
                Explainable retrieval, computer vision, Arabic NLP, graph machine learning, and distributed AI.
              </p>
            </section>
            <section className="border border-cyan-300/15 bg-cyan-950/20 p-5">
              <h4 className="app-section-title">Availability</h4>
              <p className="mt-3 text-sm leading-6 text-cyan-50/65">{profile.availability}.</p>
            </section>
          </div>
        )}

        {activeTab === "Experience" && (
          <div className="space-y-4">
            {experience.map((item) => (
              <section key={item.id} className="border-l-2 border-cyan-300/40 bg-cyan-950/20 p-4">
                <div className="flex flex-col justify-between gap-1 sm:flex-row">
                  <h4 className="font-semibold text-cyan-50">{item.title}</h4>
                  <span className="text-xs text-amber-200/70">{item.period}</span>
                </div>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.14em] text-cyan-100/40">{item.organization}</p>
                <p className="mt-3 text-sm leading-6 text-cyan-50/60">{item.summary}</p>
              </section>
            ))}
          </div>
        )}

        {activeTab === "Education" && (
          <div className="space-y-4">
            {education.map((item) => (
              <section key={item.degree} className="border border-cyan-300/15 bg-cyan-950/20 p-5">
                <div className="flex flex-col justify-between gap-1 sm:flex-row">
                  <h4 className="font-semibold text-cyan-50">{item.degree}</h4>
                  <span className="text-xs text-amber-200/70">{item.period}</span>
                </div>
                <p className="mt-2 text-sm text-cyan-50/55">{item.institution}{" // "}{item.location}</p>
                {"detail" in item && item.detail && <p className="mt-3 text-sm text-lime-200/65">{item.detail}</p>}
              </section>
            ))}
          </div>
        )}

        {activeTab === "Skills" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <section key={group.label} className="border border-cyan-300/15 bg-cyan-950/20 p-4">
                <h4 className="app-section-title">{group.label}</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((skill) => <span key={skill} className="tech-chip">{skill}</span>)}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
