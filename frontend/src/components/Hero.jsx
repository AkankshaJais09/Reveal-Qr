import { ArrowRight, ShieldCheck } from "lucide-react";
import HeroVisual from "./HeroVisual";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#0B0D14] pt-16 text-white">

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1B222C_1px,transparent_1px),linear-gradient(to_bottom,#1B222C_1px,transparent_1px)] bg-[size:70px_70px] opacity-30" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D14] via-[#0B0D14]/95 to-[#0B0D14]/90" />

      {/* Hero Container */}
      <div className="relative mx-auto flex max-w-7xl items-center px-6 pt-12 pb-20 lg:px-8">

        <div className="grid w-full items-center gap-16 lg:grid-cols-[1fr_1fr]">

          {/* Left Content */}

          <div>

            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-[#E53935]/30 bg-[#E53935]/10 px-5 py-2 text-sm font-semibold text-[#E53935]">

              <ShieldCheck size={16} />

              Privacy-First Logistics Platform

            </div>

            {/* Heading */}

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight lg:text-6xl">

              Secure Shipping

              <br />

              Without Exposing

              <br />

              <span className="text-[#E53935]">
                Customer Privacy
              </span>

            </h1>

            {/* Description */}

            <p className="mt-8 max-w-lg text-[17px] leading-8 text-gray-300">

              RevealQR replaces traditional shipping labels with
              dynamic QR-powered labels that protect customer
              information throughout the delivery journey while
              preserving your existing logistics workflow.

            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">

              <button className="rounded-md bg-[#E53935] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#C62828] hover:shadow-red-600/40">

                Request Demo

              </button>

              <button className="flex items-center gap-2 rounded-md border border-white px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#0B0D14]">

                Explore Workflow

                <ArrowRight size={18} />

              </button>

            </div>

            {/* Stats */}

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[#232A33] pt-8">

              <div>

                <h3 className="text-3xl font-extrabold text-white">
                  100%
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Data Protected
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-extrabold text-white">
                  QR
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Dynamic Access
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-extrabold text-white">
                  RBAC
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Secure Permissions
                </p>

              </div>

            </div>

          </div>

          {/* Right Side */}

          <HeroVisual />
                  </div>

      </div>

    </section>
  );
};

export default Hero;