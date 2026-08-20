import {
  education,
  experience,
  highlights,
  profile,
  skillGroups,
} from "@/data/profile";

const contactLinks = [
  { label: "Email", href: profile.links.email },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "GitHub", href: profile.links.github },
];

export function AboutApp() {
  return (
    <article className="space-y-8">
      <header className="border-l-2 border-fuchsia-400 pl-4">
        <p className="text-[0.65rem] uppercase tracking-[0.26em] text-fuchsia-300">
          User profile // verified from resume
        </p>
        <h3 className="mt-2 text-2xl font-black tracking-tight text-cyan-50">
          {profile.name}
        </h3>
        <p className="mt-1 text-sm text-cyan-200/70">{profile.role}</p>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-cyan-50/65">
          {profile.summary}
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.14em] text-lime-300/80">
          {profile.availability}
        </p>
      </header>

      <nav className="flex flex-wrap gap-2" aria-label="Contact links">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            className="border border-cyan-300/30 bg-cyan-300/5 px-3 py-2 text-xs uppercase tracking-[0.14em] text-cyan-100 transition hover:border-fuchsia-300/60 hover:text-fuchsia-200"
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
          >
            {link.label} ↗
          </a>
        ))}
      </nav>

      <section aria-labelledby="education-title">
        <h3
          id="education-title"
          className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200"
        >
          01 // Education
        </h3>
        <div className="mt-3 space-y-3">
          {education.map((item) => (
            <div
              key={item.degree}
              className="border border-cyan-300/15 bg-cyan-950/25 p-4"
            >
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
                <h4 className="font-semibold text-cyan-50">{item.degree}</h4>
                <span className="shrink-0 text-xs text-fuchsia-200/75">
                  {item.period}
                </span>
              </div>
              <p className="mt-1 text-sm text-cyan-100/60">
                {item.institution}
                {" // "}
                {item.location}
              </p>
              {item.detail && (
                <p className="mt-2 text-xs leading-5 text-lime-200/65">
                  {item.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="experience-title">
        <h3
          id="experience-title"
          className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200"
        >
          02 // Research experience
        </h3>
        <div className="mt-3 space-y-4 border-l border-cyan-300/25 pl-4">
          {experience.map((item) => (
            <article key={item.title}>
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
                <h4 className="font-semibold text-cyan-50">{item.title}</h4>
                <span className="shrink-0 text-xs text-fuchsia-200/75">
                  {item.period}
                </span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-cyan-200/45">
                {item.organization}
              </p>
              <p className="mt-2 text-sm leading-6 text-cyan-50/60">
                {item.summary}
              </p>
              <div className="mt-2 flex gap-3 text-xs text-cyan-300">
                {item.url && (
                  <a href={item.url} target="_blank" rel="noreferrer">
                    Repository ↗
                  </a>
                )}
                {item.publicationUrl && (
                  <a
                    href={item.publicationUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Publication ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="skills-title">
        <h3
          id="skills-title"
          className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200"
        >
          03 // Technical inventory
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="border border-cyan-300/15 bg-[#041016]/60 p-4"
            >
              <h4 className="text-xs uppercase tracking-[0.16em] text-fuchsia-200">
                {group.label}
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="border border-cyan-300/20 px-2 py-1 text-xs text-cyan-100/65"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="highlights-title">
        <h3
          id="highlights-title"
          className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200"
        >
          04 // Highlights
        </h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {highlights.map((highlight) => (
            <li
              key={highlight}
              className="border-l border-lime-300/60 bg-lime-300/5 px-3 py-2 text-xs leading-5 text-cyan-50/65"
            >
              {highlight}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
