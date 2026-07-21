import { ArrowRight, Check } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-[#7F1D1D] py-24 text-white">

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.03)_0%,transparent_60%),radial-gradient(circle_at_80%_20%,rgba(0,0,0,0.2)_0%,transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>

            {/* Provocative headline */}
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-[1.1] mb-8">
              Still printing
              <br />
              customer names
              <br />
              <span className="text-red-200">on every box?</span>
            </h2>

            {/* Divider */}
            <div className="w-12 h-[2px] bg-white/20 mb-8" />

            {/* Checklist */}
            <div className="space-y-4 mb-10">
              {[
                { stage: "Warehouse", sees: "Package ID only" },
                { stage: "Sorting Hub", sees: "Route only" },
                { stage: "Delivery Rider", sees: "Address only" },
                { stage: "After delivery", sees: "Data wiped automatically" },
              ].map((item) => (
                <div key={item.stage} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-white">
                      {item.stage}
                    </span>
                    <span className="text-white/30">—</span>
                    <span className="text-[13px] text-white/60">
                      {item.sees}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Single CTA */}
            <button className="flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-[14px] font-bold text-[#7F1D1D] transition-all hover:-translate-y-0.5 hover:bg-red-50 shadow-lg">
              Request Demo <ArrowRight size={16} />
            </button>

          </div>

          {/* Right — Phone mockup */}
          <div className="flex justify-center relative">

            {/* Glow */}
            <div className="absolute w-[220px] h-[220px] bg-black/30 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[50px]" />

            {/* Phone */}
            <div className="relative w-[210px] bg-[#111] rounded-[36px] border-[6px] border-[#222] pt-3 px-2.5 pb-4 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">

              {/* Notch */}
              <div className="w-14 h-2 bg-[#222] rounded-full mx-auto mb-3" />

              {/* Screen */}
              <div className="bg-white rounded-[18px] overflow-hidden p-3.5">

                {/* App header */}
                <div className="flex items-center gap-1.5 mb-2.5 pb-2 border-b border-gray-100">
                  <div className="w-5 h-5 bg-[#7F1D1D] rounded-[4px] flex items-center justify-center text-[8px] font-black text-white">
                    R
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-900 leading-none">RevealQR</p>
                    <p className="text-[8px] text-gray-400">Scan to authorize</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[8px] text-gray-500">Delivery Partner</span>
                  <span className="bg-red-50 border border-red-200 rounded-full px-2 py-0.5 text-[8px] font-bold text-red-800">
                    Authorized
                  </span>
                </div>

                {/* QR frame with scan line */}
                <div className="relative border-2 border-[#991B1B] rounded-[10px] p-2 mb-2.5 overflow-hidden">
                  <div
                    className="absolute left-0 right-0 h-[2px] bg-[#991B1B]/70"
                    style={{ animation: "scan 2s ease-in-out infinite" }}
                  />
                  <svg viewBox="0 0 100 100" className="w-full block">
                    <rect width="100" height="100" fill="white"/>
                    <rect x="5" y="5" width="35" height="35" fill="none" stroke="#111" strokeWidth="3"/>
                    <rect x="11" y="11" width="23" height="23" fill="#111"/>
                    <rect x="60" y="5" width="35" height="35" fill="none" stroke="#111" strokeWidth="3"/>
                    <rect x="66" y="11" width="23" height="23" fill="#111"/>
                    <rect x="5" y="60" width="35" height="35" fill="none" stroke="#111" strokeWidth="3"/>
                    <rect x="11" y="66" width="23" height="23" fill="#111"/>
                    <rect x="60" y="60" width="8" height="8" fill="#111"/>
                    <rect x="72" y="60" width="8" height="8" fill="#111"/>
                    <rect x="84" y="60" width="8" height="8" fill="#111"/>
                    <rect x="60" y="72" width="8" height="8" fill="#111"/>
                    <rect x="84" y="72" width="8" height="8" fill="#111"/>
                    <rect x="60" y="84" width="8" height="8" fill="#111"/>
                    <rect x="72" y="84" width="8" height="8" fill="#111"/>
                    <rect x="84" y="84" width="8" height="8" fill="#111"/>
                  </svg>
                </div>

                {/* Fields */}
                {[
                  { label: "Customer", value: "Akanksha J.", hidden: false },
                  { label: "Phone", value: "+91 98XXX XXXXX", hidden: false },
                  { label: "Address", value: "LPU, Punjab", hidden: false },
                  { label: "Payment", value: "••••••••", hidden: true },
                ].map((f) => (
                  <div key={f.label} className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="text-[8px] text-gray-400">{f.label}</span>
                    <span className={`text-[8px] font-semibold ${f.hidden ? "text-gray-300 tracking-widest" : "text-gray-900"}`}>
                      {f.value}
                    </span>
                  </div>
                ))}

                {/* Access granted */}
                <div className="mt-2.5 bg-[#7F1D1D] rounded-[7px] py-2 text-center">
                  <p className="text-[9px] font-bold text-white">✓ Access granted — Delivery stage</p>
                </div>

              </div>

              {/* Home bar */}
              <div className="w-10 h-1 bg-[#222] rounded-full mx-auto mt-2.5" />
            </div>
          </div>

        </div>
      </div>

      {/* Scan line animation */}
      <style>{`
        @keyframes scan {
          0% { top: 8px; }
          50% { top: calc(100% - 10px); }
          100% { top: 8px; }
        }
      `}</style>

    </section>
  );
};

export default CTA;