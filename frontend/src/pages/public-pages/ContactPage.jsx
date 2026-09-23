export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= HERO ================= */}
      <section className="border-b border-slate-800">

        <div className="mx-auto max-w-7xl px-4 py-24 text-center">

          <p className="font-semibold uppercase tracking-widest text-yellow-400">
            Get In Touch
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-6xl">
            Let&apos;s Build Something Together
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Have a project, idea or technology challenge? Get in touch with
            Chain-Tech and let&apos;s explore how we can help.
          </p>

        </div>

      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 lg:grid-cols-2">

          {/* Contact Information */}
          <div>

            <p className="font-semibold uppercase tracking-widest text-blue-400">
              Contact Information
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              We&apos;d Love To Hear From You
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              Whether you need software development, cloud solutions,
              digital transformation or technical consultation, our team
              is ready to discuss your needs.
            </p>

            {/* Email */}
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h3 className="font-bold text-blue-400">
                Email
              </h3>

              <p className="mt-2 text-slate-400">
                info@chain-tech.com
              </p>

            </div>

            {/* Phone */}
            <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h3 className="font-bold text-yellow-400">
                Phone
              </h3>

              <p className="mt-2 text-slate-400">
                +254 XXX XXX XXX
              </p>

            </div>

            {/* Location */}
            <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h3 className="font-bold text-blue-400">
                Location
              </h3>

              <p className="mt-2 text-slate-400">
                Nairobi, Kenya
              </p>

            </div>

          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-blue-900 bg-blue-950/40 p-8">

            <p className="text-sm font-semibold uppercase tracking-widest text-yellow-400">
              Send Us A Message
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Start a Conversation
            </h2>

            <form className="mt-8 space-y-6">

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  placeholder="What would you like to discuss?"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows="6"
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-yellow-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-yellow-300"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* ================= WHY CONTACT US ================= */}
      <section className="bg-slate-900/50">

        <div className="mx-auto max-w-7xl px-4 py-20">

          <div className="text-center">

            <p className="text-yellow-400">
              WHY CHAIN-TECH
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              How We Can Help
            </h2>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {/* Software */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8">

              <h3 className="text-xl font-bold">
                Software Development
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                Build reliable and scalable web and software applications
                designed around your business needs.
              </p>

            </div>

            {/* Cloud */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8">

              <h3 className="text-xl font-bold">
                Cloud Solutions
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                Design and deploy modern cloud infrastructure that supports
                performance, reliability and growth.
              </p>

            </div>

            {/* Consultation */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8">

              <h3 className="text-xl font-bold">
                Technical Consultation
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                Get technical guidance for architecture, development,
                infrastructure and digital transformation.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section>

        <div className="mx-auto max-w-4xl px-4 py-24 text-center">

          <h2 className="text-3xl font-bold">
            Have an Idea?
          </h2>

          <p className="mt-6 text-xl leading-9 text-slate-400">
            Tell us what you are building and let&apos;s discuss how
            technology can turn your idea into reality.
          </p>

          <a
            href="/service"
            className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-500"
          >
            Explore Our Services
          </a>

        </div>

      </section>

    </div>
  );
}