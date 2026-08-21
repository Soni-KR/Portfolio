import { achievements } from "@/data/achievements";

export function AchievementsApp() {
  const primary = achievements.filter((achievement) => achievement.prominence === "primary");
  const secondary = achievements.filter((achievement) => achievement.prominence === "secondary");

  return (
    <article>
      <header className="border-b border-cyan-300/15 pb-5">
        <p className="text-[0.6rem] uppercase tracking-[0.24em] text-amber-200/75">Achievement archive // verified records</p>
        <h3 className="mt-2 text-2xl font-black text-cyan-50">Awards, Leadership & Research</h3>
        <p className="mt-3 text-sm leading-6 text-cyan-50/50">Primary records appear first; supporting competition milestones remain secondary.</p>
      </header>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {primary.map((achievement, index) => (
          <section key={achievement.id} className="achievement-record">
            <div className="flex items-start justify-between gap-3"><p className="text-[0.6rem] uppercase tracking-[0.16em] text-amber-200/75">{achievement.category}</p><span className="text-[0.6rem] text-cyan-100/25">REC-{String(index + 1).padStart(2, "0")}</span></div>
            <h4 className="mt-3 font-semibold leading-6 text-cyan-50">{achievement.title}</h4>
            {achievement.metric && <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-lime-300">{achievement.metric}</p>}
            <p className="mt-3 flex-1 text-xs leading-5 text-cyan-50/55">{achievement.detail}</p>
            {achievement.url && <a className="mt-4 w-fit border-b border-cyan-300/40 pb-1 text-xs uppercase tracking-[0.12em] text-cyan-300" href={achievement.url} target="_blank" rel="noreferrer">Verify record ↗</a>}
          </section>
        ))}
      </div>

      <section className="mt-7 border-t border-cyan-300/15 pt-5">
        <h4 className="app-section-title">Secondary records</h4>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {secondary.map((achievement) => <div key={achievement.id} className="border border-cyan-300/10 bg-cyan-950/15 p-4"><p className="text-[0.58rem] uppercase tracking-[0.14em] text-cyan-100/35">{achievement.category}</p><h5 className="mt-2 text-sm font-semibold text-cyan-50/80">{achievement.title}</h5><p className="mt-2 text-xs leading-5 text-cyan-50/45">{achievement.detail}</p></div>)}
        </div>
      </section>
    </article>
  );
}
