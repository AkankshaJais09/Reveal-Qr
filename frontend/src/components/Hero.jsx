import { ArrowRight, ShieldCheck } from "lucide-react";
import HeroVisual from "./HeroVisual";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#0B0D14] text-white min-h-screen flex items-center">

      {/* Grid bg */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1B222C_1px,transparent_1px),linear-gradient(to_bottom,#1B222C_1px,transparent_1px)] bg-[size:70px_70px] opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D14] via-[#0B0D14]/95 to-transparent" />

      <div className="relative w-full mx-auto max-w-7xl px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E53935]/30 bg-[#E53935]/10 px-4 py-1.5 text-[12px] font-semibold text-[#E53935]">
              <ShieldCheck size={14} />
              Privacy-First Logistics Platform
            </div>

            <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight">
              Secure Shipping
              <br />
              Without Exposing
              <br />
              <span className="text-[#E53935]">Customer Privacy</span>
            </h1>

            <p className="mt-6 text-[16px] leading-8 text-gray-400 max-w-lg">
              RevealQR replaces traditional shipping labels with dynamic
              QR-powered labels that protect customer information throughout
              the delivery journey while preserving your existing logistics workflow.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-lg bg-[#E53935] px-7 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-red-900/30 transition-all hover:-translate-y-0.5 hover:bg-[#C62828]"
              >
                Request Demo
              </button>
              <button
                onClick={() => document.getElementById('privacy')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 rounded-lg border border-white/20 px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-white/10"
              >
                Explore Workflow <ArrowRight size={16} />
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {[
                { stat: "100%", label: "Privacy Protected" },
                { stat: "QR", label: "Dynamic Access" },
                { stat: "RBAC", label: "Role-Based Access" },
              ].map((s) => (
                <div key={s.stat}>
                  <h3 className="text-2xl font-extrabold text-white">{s.stat}</h3>
                  <p className="mt-1 text-[12px] text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center lg:justify-end">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;