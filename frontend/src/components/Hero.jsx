import {
  ShieldCheck,
  Lock,
  QrCode,
  Package,
} from "lucide-react";
import QRCode from "react-qr-code";

function Hero() {
  return (
    <section className="bg-slate-950">
      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row">

        {/* Left Content */}
        <div className="max-w-2xl">

          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
            Privacy First Logistics
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight text-white lg:text-6xl">
            Privacy-First <br />
            Shipping Labels
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Replace traditional shipping labels containing customer
            information with secure dynamic QR codes that reveal only
            the required details to authorized personnel during the
            delivery process.
          </p>

          {/* Features */}
          <div className="mt-8 space-y-5">

            <div className="flex items-center gap-3">
              <ShieldCheck className="text-cyan-400" size={22} />
              <span className="text-lg text-slate-300">
                Protect Customer Privacy
              </span>
            </div>

            <div className="flex items-center gap-3">
              <QrCode className="text-cyan-400" size={22} />
              <span className="text-lg text-slate-300">
                Dynamic QR-Based Shipping Labels
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Lock className="text-cyan-400" size={22} />
              <span className="text-lg text-slate-300">
                Role-Based Secure Access
              </span>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            <button className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-cyan-400">
              Get Started
            </button>

            <button className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-400">
              Learn More
            </button>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex justify-center">

          <div className="w-[420px] rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/40 hover:shadow-cyan-500/10">

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">

              <div>
                <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
                  <Package size={22} className="text-cyan-400" />
                  Shipment Preview
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Secure Dynamic QR
                </p>
              </div>

              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
                Protected
              </span>

            </div>

            {/* Shipment ID */}
            <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800 p-4">

              <p className="text-xs uppercase tracking-wider text-slate-400">
                Shipment ID
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                RQ-2026-001
              </p>

            </div>

            {/* QR Code */}
           <div className="mx-auto flex h-72 w-72 items-center justify-center rounded-2xl bg-white p-6 shadow-2xl ring-4 ring-slate-800">

              <QRCode
                value={JSON.stringify({
                  shipmentId: "RQ-2026-001",
                  status: "In Transit",
                  access: "Protected",
                })}
                size={180}
                bgColor="#FFFFFF"
                fgColor="#000000"
              />
`              
            </div>
            <p className="mt-4 text-center text-sm font-medium text-slate-500">
  Scan to View Shipment
</p>
            {/* Divider */}
            <div className="my-6 border-t border-slate-700"></div>

            {/* Shipment Details */}
            <div className="space-y-4">

              <div className="flex items-center justify-between">

                <span className="text-slate-400">
                  Status
                </span>

                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-400">
                 🚚 In Transit
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-400">
                  Access
                </span>

                <span className="font-medium text-cyan-400">
                  Authorized Only
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-400">
                  Customer Data
                </span>

                <span className="font-medium text-red-400">
                  Hidden
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;