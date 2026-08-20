import { achievements } from "@/data/achievements";

export function AchievementsApp() {
  return (
    <article>
      <header className="border-b border-cyan-300/20 pb-5">
        <p className="text-[0.65rem] uppercase tracking-[0.26em] text-fuchsia-300">
          Achievement log // verified records
        </p>
        <h3 className="mt-2 text-2xl font-black tracking-tight text-cyan-50">
          Awards & Leadership
        </h3>
      </header>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {achievements.map((achievement, index) => (
          <section
            key={achievement.title}
            className="flex flex-col border border-cyan-300/20 bg-[#041016]/70 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-[0.6rem] uppercase tracking-[0.16em] text-fuchsia-200/70">
                {achievement.category}
              </p>
              <span className="text-[0.6rem] text-cyan-100/25">
                LOG-{String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h4 className="mt-3 font-semibold leading-6 text-cyan-50">
              {achievement.title}
            </h4>
            {achievement.metric && (
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-lime-300">
                {achievement.metric}
              </p>
            )}
            <p className="mt-3 flex-1 text-xs leading-5 text-cyan-50/55">
              {achievement.detail}
            </p>
            {achievement.url && (
              <a
                className="mt-4 w-fit border-b border-cyan-300/40 pb-1 text-xs uppercase tracking-[0.12em] text-cyan-300"
                href={achievement.url}
                target="_blank"
                rel="noreferrer"
              >
                Verify record ↗
              </a>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
