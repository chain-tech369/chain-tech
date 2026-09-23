export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= HERO ================= */}
      <section className="border-b border-slate-800">

        <div className="mx-auto max-w-7xl px-4 py-24 text-center">

          <p className="font-semibold uppercase tracking-widest text-yellow-400">
            Who We Are
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-6xl">
            Building Technology With Purpose
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Chain-Tech is a technology company focused on building digital
            products, software solutions and infrastructure that solve
            real-world problems.
          </p>

        </div>

      </section>

      {/* ================= STORY ================= */}
      <section>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 lg:grid-cols-2">

          {/* Story */}
          <div>

            <p className="font-semibold uppercase tracking-widest text-blue-400">
              Our Story
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Technology Should Create Opportunities
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              We believe technology should not simply automate processes.
              It should create opportunities, connect people and make
              organizations more efficient.
            </p>

            <p className="mt-4 leading-8 text-slate-400">
              Chain-Tech brings together software engineering, cloud
              technologies, digital transformation and modern development
              practices to build solutions that are secure, scalable and
              maintainable.
            </p>

          </div>

          {/* Statistics */}
          <div className="rounded-3xl border border-blue-900 bg-blue-950/40 p-8">

            <div className="grid grid-cols-2 gap-5">

              {/* Digital Focus */}
              <div className="rounded-2xl bg-slate-900 p-6">
                <p className="text-3xl font-black text-blue-400">
                  100%
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Digital Focus
                </p>
              </div>

              {/* Innovation */}
              <div className="rounded-2xl bg-slate-900 p-6">
                <p className="text-3xl font-black text-yellow-400">
                  24/7
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Innovation
                </p>
              </div>

              {/* Possibilities */}
              <div className="rounded-2xl bg-slate-900 p-6">
                <p className="text-3xl font-black text-blue-400">
                  ∞
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Possibilities
                </p>
              </div>

              {/* Mission */}
              <div className="rounded-2xl bg-slate-900 p-6">
                <p className="text-3xl font-black text-yellow-400">
                  1
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Mission
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= VALUES ================= */}
      <section className="bg-slate-900/50">

        <div className="mx-auto max-w-7xl px-4 py-20">

          {/* Heading */}
          <div className="text-center">

            <p className="text-yellow-400">
              OUR VALUES
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              What Drives Us
            </h2>

          </div>

          {/* Values */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {/* Innovation */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8">

              <h3 className="text-xl font-bold">
                Innovation
              </h3>

              <p className="mt-4 text-slate-400">
                We continuously explore better ways to solve problems.
              </p>

            </div>

            {/* Security */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8">

              <h3 className="text-xl font-bold">
                Security
              </h3>

              <p className="mt-4 text-slate-400">
                Security is considered from architecture to deployment.
              </p>

            </div>

            {/* Excellence */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8">

              <h3 className="text-xl font-bold">
                Excellence
              </h3>

              <p className="mt-4 text-slate-400">
                We build solutions with quality, performance and
                maintainability in mind.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= MISSION ================= */}
      <section>

        <div className="mx-auto max-w-4xl px-4 py-24 text-center">

          <h2 className="text-3xl font-bold">
            Our Mission
          </h2>

          <p className="mt-6 text-xl leading-9 text-slate-400">
            To empower businesses and communities through reliable,
            accessible and innovative technology.
          </p>

          <a
            href="/service"
            className="mt-8 inline-block rounded-xl bg-yellow-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-yellow-300"
          >
            Explore Our Services
          </a>

        </div>

      </section>

    </div>
  );
}