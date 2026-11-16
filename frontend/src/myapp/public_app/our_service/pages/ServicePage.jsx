export default function ServicePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= HERO ================= */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-24 text-center">

          <p className="uppercase tracking-widest text-yellow-400">
            What We Build
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-6xl">
            Our Technology Services
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
            Professional technology services designed to help businesses
            build, modernize and scale their digital platforms.
          </p>

        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="pb-24">

        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* ================= WEB DEVELOPMENT ================= */}
          <div className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 text-2xl text-blue-400">
              ⌘
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              Web Development
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Modern responsive websites and web applications built
              for performance and scalability.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>✓ React applications</li>
              <li>✓ Backend APIs</li>
              <li>✓ Responsive design</li>
              <li>✓ Database integration</li>
            </ul>

          </div>

          {/* ================= CLOUD SOLUTIONS ================= */}
          <div className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 text-2xl text-blue-400">
              ☁
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              Cloud Solutions
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Cloud architecture and infrastructure designed for
              reliability and scalability.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>✓ Cloud deployment</li>
              <li>✓ Infrastructure</li>
              <li>✓ Containerization</li>
              <li>✓ Monitoring</li>
            </ul>

          </div>

          {/* ================= DEVOPS ================= */}
          <div className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 text-2xl text-blue-400">
              ⚙
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              DevOps
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Automation and infrastructure practices that make
              software delivery faster and safer.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>✓ Docker</li>
              <li>✓ CI/CD</li>
              <li>✓ Kubernetes</li>
              <li>✓ Infrastructure automation</li>
            </ul>

          </div>

          {/* ================= CYBERSECURITY ================= */}
          <div className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 text-2xl text-blue-400">
              🔐
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              Cybersecurity
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Security-focused application architecture and
              development practices.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>✓ Authentication</li>
              <li>✓ Authorization</li>
              <li>✓ Secure APIs</li>
              <li>✓ Security best practices</li>
            </ul>

          </div>

          {/* ================= DIGITAL TRANSFORMATION ================= */}
          <div className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 text-2xl text-blue-400">
              ◈
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              Digital Transformation
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Helping organizations move from traditional processes
              to modern digital platforms.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>✓ Digital strategy</li>
              <li>✓ Process automation</li>
              <li>✓ Platform modernization</li>
              <li>✓ System integration</li>
            </ul>

          </div>

          {/* ================= CUSTOM SOLUTIONS ================= */}
          <div className="group rounded-3xl border border-yellow-500/30 bg-yellow-400/5 p-8 transition duration-300 hover:-translate-y-2">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-2xl text-slate-950">
              +
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              Custom Solutions
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Have a unique technology challenge?
              Let's design a solution specifically for you.
            </p>

            <a
              href="/join-us"
              className="mt-6 inline-block font-bold text-yellow-400 hover:text-yellow-300"
            >
              Discuss Your Idea →
            </a>

          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="border-t border-slate-800 bg-blue-950">

        <div className="mx-auto max-w-4xl px-4 py-20 text-center">

          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Build Something Great?
          </h2>

          <p className="mt-4 text-blue-200">
            Let's turn your idea into a real digital product.
          </p>

          <a
            href="/join-us"
            className="mt-8 inline-block rounded-xl bg-yellow-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-yellow-300"
          >
            Start a Conversation
          </a>

        </div>
      </section>

    </div>
  );
}