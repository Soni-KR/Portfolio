type WelcomeScreenProps = {
  onEnter: () => void;
};

export function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  return (
    <main className="os-screen grid h-screen place-items-center overflow-x-hidden overflow-y-auto px-6 py-10 text-cyan-50">
      <div className="crt-overlay" aria-hidden="true" />
      <div className="welcome-orbit" aria-hidden="true" />

      <section className="screen-enter relative z-10 w-full max-w-xl border border-cyan-300/30 bg-[#06151d]/90 p-1 shadow-[0_0_80px_rgba(34,211,238,0.12)]">
        <div className="border border-cyan-300/15 p-6 sm:p-10">
          <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.26em] text-cyan-200/50">
            <span>Identity handshake</span>
            <span className="flex items-center gap-2 text-lime-300/80">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-300" />
              Link stable
            </span>
          </div>

          <div className="my-10 flex flex-col items-center text-center">
            <div className="relative grid h-28 w-28 place-items-center border border-fuchsia-300/60 bg-fuchsia-400/5 text-3xl font-black text-fuchsia-200 shadow-[0_0_36px_rgba(232,121,249,0.18)]">
              <span className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-cyan-300" />
              <span className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-cyan-300" />
              MK
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.36em] text-fuchsia-300">
              Welcome to
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Mourad Kraiem&apos;s Portfolio
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-cyan-100/55">
              AI/ML engineering student // local portfolio operator
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-px border border-cyan-300/20 bg-cyan-300/20 text-xs uppercase tracking-[0.16em]">
            <div className="bg-[#06151d] p-3">
              <dt className="text-cyan-100/40">Session</dt>
              <dd className="mt-1 text-cyan-100">Portfolio guest</dd>
            </div>
            <div className="bg-[#06151d] p-3">
              <dt className="text-cyan-100/40">Clearance</dt>
              <dd className="mt-1 text-lime-300">Read / explore</dd>
            </div>
          </dl>

          <button
            type="button"
            className="os-button mt-6 w-full px-5 py-4 text-sm font-bold uppercase tracking-[0.24em]"
            onClick={onEnter}
          >
            Initialize desktop
          </button>

          <p className="mt-4 text-center text-[0.65rem] uppercase tracking-[0.18em] text-cyan-100/35">
            No password required // public access terminal
          </p>
        </div>
      </section>
    </main>
  );
}
