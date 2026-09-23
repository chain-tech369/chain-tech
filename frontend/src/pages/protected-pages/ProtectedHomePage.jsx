export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= HERO ================= */}
      <main>
        <section className="relative overflow-hidden">

          {/* Background effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.20),_transparent_40%)]" />

          <div className="absolute left-0 top-40 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-32">

            {/* ================= HERO CONTENT ================= */}
            <div>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-800 bg-blue-950/80 px-4 py-2 text-sm text-blue-300">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Building the Digital Future
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Technology That{" "}
                <span className="text-blue-400">
                  Connects
                </span>{" "}
                Possibilities.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                Chain-Tech builds modern digital solutions that help
                businesses transform ideas into scalable, secure and
                intelligent technology.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">

                <a
                  href="/service"
                  className="rounded-xl bg-yellow-400 px-7 py-3.5 text-center font-bold text-slate-950 transition hover:bg-yellow-300"
                >
                  Explore Services
                </a>

                <a
                  href="/join-us"
                  className="rounded-xl border border-blue-600 px-7 py-3.5 text-center font-bold transition hover:bg-blue-900"
                >
                  Join Our Team
                </a>

              </div>
            </div>

            {/* ================= TECHNOLOGY CARD ================= */}
            <div className="relative">

              <div className="rounded-3xl border border-blue-900/60 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl">

                {/* Window header */}
                <div className="mb-5 flex items-center justify-between">

                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                  </div>

                  <span className="text-xs text-slate-500">
                    chain-tech.dev
                  </span>

                </div>

                {/* Code */}
                <div className="rounded-xl bg-slate-950 p-6 font-mono text-sm leading-8">

                  <p className="text-slate-500">
                    // Innovation starts here
                  </p>

                  <p>
                    <span className="text-purple-400">
                      const
                    </span>{" "}
                    <span className="text-blue-400">
                      solution
                    </span>{" "}
                    ={" "}
                    <span className="text-yellow-300">
                      ChainTech
                    </span>
                  </p>

                  <p className="pl-4">
                    .build({"{"}
                  </p>

                  <p className="pl-8 text-green-400">
                    innovation: true,
                  </p>

                  <p className="pl-8 text-green-400">
                    security: true,
                  </p>

                  <p className="pl-8 text-green-400">
                    scalability: true
                  </p>

                  <p className="pl-4">
                    {"}"});
                  </p>

                  <p className="mt-4 text-slate-500">
                    // Ready for the future.
                  </p>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section className="border-y border-slate-800 bg-slate-900/40">

          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

            {/* Section heading */}
            <div className="mx-auto max-w-2xl text-center">

              <p className="font-semibold uppercase tracking-widest text-yellow-400">
                What We Do
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Our Technology Services
              </h2>

              <p className="mt-4 text-slate-400">
                From software development to cloud infrastructure,
                we provide technology solutions designed for growth.
              </p>

            </div>

            {/* Service cards */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {/* Software Development */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7 transition hover:-translate-y-1 hover:border-blue-500">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-2xl text-blue-400">
                  ›
                </div>

                <h3 className="text-xl font-bold">
                  Software Development
                </h3>

                <p className="mt-3 text-slate-400">
                  Modern web and software applications built with
                  scalable architecture.
                </p>

              </div>

              {/* Cloud Solutions */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7 transition hover:-translate-y-1 hover:border-blue-500">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-2xl text-blue-400">
                  ☁
                </div>

                <h3 className="text-xl font-bold">
                  Cloud Solutions
                </h3>

                <p className="mt-3 text-slate-400">
                  Reliable cloud infrastructure, deployment and
                  DevOps solutions.
                </p>

              </div>

              {/* Digital Transformation */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7 transition hover:-translate-y-1 hover:border-blue-500">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-2xl text-blue-400">
                  ◈
                </div>

                <h3 className="text-xl font-bold">
                  Digital Transformation
                </h3>

                <p className="mt-3 text-slate-400">
                  Helping organizations modernize their digital
                  operations.
                </p>

              </div>

            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section>

          <div className="mx-auto max-w-5xl px-4 py-24 text-center">

            <h2 className="text-3xl font-bold sm:text-4xl">
              Have an Idea?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Let's transform your idea into a powerful digital product.
            </p>

            <a
              href="/join-us"
              className="mt-8 inline-block rounded-xl bg-yellow-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-yellow-300"
            >
              Start With Chain-Tech
            </a>

          </div>

        </section>
      </main>
    </div>
  );
}