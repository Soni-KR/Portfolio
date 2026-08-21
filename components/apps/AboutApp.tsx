"use client";

import { useState } from "react";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { profile, socials } from "@/data/profile";
import { skillGroups } from "@/data/skills";

const sections = ["Overview", "Education", "Experience", "Skills"] as const;
type ProfileSection = (typeof sections)[number];

export function AboutApp() {
  const [section, setSection] = useState<ProfileSection>("Overview");

  return (
    <article>
      <header className="border-b border-cyan-300/15 pb-5">
        <p className="text-[0.6rem] uppercase tracking-[0.24em] text-amber-200/75">System Profile // verified</p>
        <h3 className="mt-3 text-2xl font-black text-cyan-50">{profile.name}</h3>
        <p className="mt-1 text-sm text-cyan-100/65">{profile.role}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-cyan-300/70">{profile.specialization}</p>
      </header>

      <nav className="mt-4 flex gap-1 overflow-x-auto border-b border-cyan-300/15" aria-label="System profile sections">
        {sections.map((item) => (
          <button key={item} type="button" className={`app-tab ${section === item ? "app-tab-active" : ""}`} onClick={() => setSection(item)} aria-pressed={section === item}>
            {item}
          </button>
        ))}
      </nav>

      <div className="mt-5">
        {section === "Overview" && (
          <div>
            <p className="max-w-3xl text-sm leading-7 text-cyan-50/65">{profile.summary}</p>
            <dl className="mt-6 grid gap-px border border-cyan-300/15 bg-cyan-300/15 sm:grid-cols-3">
              <div className="bg-[#07161b] p-4"><dt className="app-section-title">Base</dt><dd className="mt-2 text-sm text-cyan-50/70">{profile.location}</dd></div>
              <div className="bg-[#07161b] p-4"><dt className="app-section-title">Focus</dt><dd className="mt-2 text-sm text-cyan-50/70">AI / ML systems</dd></div>
              <div className="bg-[#07161b] p-4"><dt className="app-section-title">Status</dt><dd className="mt-2 text-sm text-lime-200/70">Open to EoS opportunities</dd></div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((social) => <a key={social.id} className="os-button px-4 py-2 text-xs" href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel={social.href.startsWith("http") ? "noreferrer" : undefined}>{social.label} ↗</a>)}
            </div>
          </div>
        )}

        {section === "Education" && education.map((item) => (
          <section key={item.degree} className="mb-4 border border-cyan-300/15 bg-cyan-950/20 p-5">
            <div className="flex flex-col justify-between gap-1 sm:flex-row"><h4 className="font-semibold text-cyan-50">{item.degree}</h4><span className="text-xs text-amber-200/70">{item.period}</span></div>
            <p className="mt-2 text-sm text-cyan-50/55">{item.institution}{" // "}{item.location}</p>
            {"detail" in item && item.detail && <p className="mt-3 text-sm text-lime-200/65">{item.detail}</p>}
          </section>
        ))}

        {section === "Experience" && experience.map((item) => (
          <section key={item.id} className="mb-4 border-l-2 border-cyan-300/40 bg-cyan-950/20 p-4">
            <div className="flex flex-col justify-between gap-1 sm:flex-row"><h4 className="font-semibold text-cyan-50">{item.title}</h4><span className="text-xs text-amber-200/70">{item.period}</span></div>
            <p className="mt-1 text-[0.62rem] uppercase tracking-[0.14em] text-cyan-100/40">{item.organization}</p>
            <p className="mt-3 text-sm leading-6 text-cyan-50/60">{item.summary}</p>
          </section>
        ))}

        {section === "Skills" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group) => <section key={group.label} className="border border-cyan-300/15 bg-cyan-950/20 p-4"><h4 className="app-section-title">{group.label}</h4><div className="mt-3 flex flex-wrap gap-2">{group.items.map((skill) => <span key={skill} className="tech-chip">{skill}</span>)}</div></section>)}
          </div>
        )}
      </div>
    </article>
  );
}
