import JoinUsForm from "../../components/forms/JoinUsForm";

export default function JoinUsPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">

        {/* ================= INTRO ================= */}

        <div className="mb-10 text-center">

          {/* Icon */}

          <div
            className="mx-auto mb-5 flex h-16 w-16 items-center
                       justify-center rounded-2xl bg-blue-950"
          >
            <span className="text-2xl font-bold text-yellow-400">
              &lt;/&gt;
            </span>
          </div>

          {/* Title */}

          <h1 className="text-4xl font-bold text-blue-950 md:text-5xl">
            Join Chain-Tech
          </h1>

          {/* Description */}

          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            We are looking for passionate developers and technology
            professionals who want to build innovative digital solutions
            with us.
          </p>

        </div>

        {/* ================= APPLICATION CARD ================= */}

        <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-10">

          <JoinUsForm />

        </div>

      </div>
    </main>
  );
}