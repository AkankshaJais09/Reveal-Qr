import { ArrowRight, ShieldCheck } from "lucide-react";
import HeroVisual from "./HeroVisual";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#050816] text-white">
      {/* Background Glow */}
      <div className="absolute top-20 right-0 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[150px]" />
      <div className="absolute left-0 bottom-0 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-6 py-20">

    <div className="grid w-full items-center gap-20 lg:grid-cols-[1.05fr_0.95fr]">

          {/* Left */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-cyan-300">

              <ShieldCheck size={18} />

              Privacy First Logistics

            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight lg:text-7xl">

              Protect Customer

              <br />

              <span className="text-cyan-400">

                Privacy

              </span>

              <br />

              Without Changing

              <br />

              Your Logistics

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">

              RevealQR replaces exposed shipping labels with
              secure QR-powered labels. Customer information
              is revealed only to authorized personnel during
              the delivery journey.

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <button className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold transition hover:scale-105 hover:bg-cyan-400">

                Request Demo

              </button>

              <button className="flex items-center gap-2 rounded-xl border border-slate-700 px-8 py-4 transition hover:border-cyan-500 hover:bg-slate-900">

                See Workflow

                <ArrowRight size={18} />

              </button>

            </div>

          </div>

          {/* Right */}

          <HeroVisual />

        </div>

      </div>

    </section>
  );
};

export default Hero;