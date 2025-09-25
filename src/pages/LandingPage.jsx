import heroImage from "../assets/hero-image.jpg";
import FeaturesSection from "../components/FeaturesSection";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <main className="px-6 py-16 text-center">
      <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-violet-500 to-violet-300 bg-clip-text text-transparent">
        QuickDB
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-xl font-medium leading-relaxed text-slate-200 md:text-2xl">
        Create your database and backend APIs without writing code
      </p>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
        The fastest way to prototype, build, and deploy your database-driven
        applications. No backend knowledge required.
      </p>
      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          onClick={() => navigate("/auth")}
          className="rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 px-5 py-3 text-white shadow transition-colors hover:from-violet-500 hover:to-violet-400"
        >
          Get Started
        </button>
      </div>
      <img
        src={heroImage}
        alt="QuickDB"
        className="mt-12 mx-auto w-full max-w-5xl md:max-w-6xl rounded-2xl shadow-xl ring-1 ring-slate-700/50 object-cover"
      />

      <FeaturesSection />

      <section className="mt-20 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-6 pt-32 pb-28">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-100">
            Ready to build faster?
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-400">
            Start creating your database and APIs today. No credit card
            required.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => navigate("/auth")}
              className="rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 px-5 py-3 text-white shadow transition-colors hover:from-violet-500 hover:to-violet-400"
            >
              Start Building Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
