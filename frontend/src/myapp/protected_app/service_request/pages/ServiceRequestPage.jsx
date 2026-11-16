import ServiceRequestForm from "../../components/forms/ServiceRequestForm";

export default function ServiceRequestPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bg-blue-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-blue-900 px-4 py-2 text-sm font-semibold text-blue-300">
              WORK WITH CHAIN-TECH
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Tell Us What You{" "}
              <span className="text-yellow-400">Need</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-blue-100">
              Have a project, business idea, or technology challenge?
              Tell us about it and our team will help you find the right
              technology solution.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* =================================================
              LEFT INFORMATION
          ================================================= */}

          <aside className="space-y-6">
            {/* INTRODUCTION */}

            <div>
              <h2 className="text-2xl font-bold">
                Let's build something together.
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Give us some information about your project. You don't
                need to know all the technical details — our team will
                help you define the solution.
              </p>
            </div>

            {/* =================================================
                WHAT HAPPENS NEXT
            ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold">What happens next?</h3>

              <div className="mt-6 space-y-5">
                {/* STEP 1 */}

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                    1
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      Submit your request
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                      Tell us about your project and requirements.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                    2
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      We review your project
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                      Our team evaluates your requirements.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                    3
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      We contact you
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                      We discuss your project and possible solutions.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                    4
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      Start building
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                      Once approved, our team begins working on your
                      project.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                CONTACT
            ================================================= */}

            <div className="rounded-2xl bg-blue-950 p-6 text-white">
              <h3 className="font-bold">Need to talk first?</h3>

              <p className="mt-2 text-sm leading-6 text-blue-200">
                If you are not sure what service you need, contact us
                and we can discuss your requirements.
              </p>

              <a
                href="mailto:info@chain-tech.com"
                className="mt-5 inline-block font-semibold text-yellow-400 hover:text-yellow-300"
              >
                info@chain-tech.com →
              </a>
            </div>
          </aside>

          {/* =================================================
              REQUEST FORM
          ================================================= */}

          <section className="lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-10">
              {/* FORM HEADER */}

              <div className="border-b border-slate-200 pb-6">
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Request a Service
                </h2>

                <p className="mt-2 text-slate-500">
                  Fill in the form below and tell us about your project.
                </p>
              </div>

              {/* FORM */}

              <div className="mt-8">
                <ServiceRequestForm />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}