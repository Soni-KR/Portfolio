import { profile } from "@/data/profile";

const channels = [
  {
    label: "Email",
    value: "mourad.kraiem@ensi-uma.tn",
    href: profile.links.email,
    symbol: "@",
  },
  {
    label: "LinkedIn",
    value: "mourad-kraiem-99a0952a1",
    href: profile.links.linkedin,
    symbol: "in",
  },
  {
    label: "GitHub",
    value: "Soni-KR",
    href: profile.links.github,
    symbol: "git",
  },
];

export function ContactApp() {
  return (
    <article>
      <header className="border-l-2 border-lime-300 pl-4">
        <p className="text-[0.65rem] uppercase tracking-[0.26em] text-lime-300/75">
          Communication uplink // available
        </p>
        <h3 className="mt-2 text-2xl font-black text-cyan-50">
          Start a conversation
        </h3>
        <p className="mt-3 text-sm leading-6 text-cyan-50/55">
          {profile.availability}. Reach out through any verified channel below.
        </p>
      </header>

      <div className="mt-6 space-y-3">
        {channels.map((channel) => (
          <a
            key={channel.label}
            className="group flex items-center gap-4 border border-cyan-300/20 bg-cyan-950/20 p-4 transition hover:border-fuchsia-300/50 hover:bg-fuchsia-400/5"
            href={channel.href}
            target={channel.href.startsWith("http") ? "_blank" : undefined}
            rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center border border-cyan-300/35 text-xs font-bold text-cyan-200 group-hover:border-fuchsia-300/60 group-hover:text-fuchsia-200">
              {channel.symbol}
            </span>
            <span className="min-w-0">
              <span className="block text-[0.6rem] uppercase tracking-[0.18em] text-cyan-100/35">
                {channel.label}
              </span>
              <span className="mt-1 block truncate text-sm text-cyan-50/75">
                {channel.value}
              </span>
            </span>
            <span className="ml-auto text-fuchsia-200">↗</span>
          </a>
        ))}
      </div>
    </article>
  );
}
