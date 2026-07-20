import { EyeOff, ShieldCheck, Truck } from "lucide-react";
import QRCode from "react-qr-code";

const Problem = () => {
  return (
    <section className="bg-[#F7F8FA] py-20 px-6">
      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[4px] text-[#E53935] mb-3">
            Why RevealQR
          </p>
          <h2 className="text-4xl font-extrabold text-[#111827] leading-tight mb-4">
            Protect Customer Privacy
          </h2>
          <p className="text-[15px] text-gray-500 max-w-lg mx-auto leading-relaxed">
            Traditional labels expose names, phone numbers and addresses to every
            handler. RevealQR keeps that data encrypted until an authorized scan occurs.
          </p>
        </div>

        {/* Comparison */}
        <div className="flex items-center justify-center">

          {/* Bad Card */}
          <div className="w-[300px] flex-shrink-0 rounded-2xl overflow-hidden border-[1.5px] border-red-200 bg-white">
            <div className="flex items-center justify-between px-4 py-3 bg-red-50 border-b border-red-100">
              <div>
                <p className="text-[13px] font-bold text-gray-900">Current Shipping Label</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Info is visible to everyone</p>
              </div>
              <svg className="w-[18px] h-[18px] text-[#E53935]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <div className="p-4 flex flex-col gap-2.5">
              {[
                { label: "Recipient", value: "Akanksha Jaiswal" },
                { label: "Phone", value: "+91 98XXXXXXX" },
                { label: "Address", value: "LPU, Punjab" },
              ].map((f) => (
                <div key={f.label} className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-[10px] uppercase tracking-[1.5px] text-gray-400">{f.label}</span>
                  <span className="text-[11px] font-semibold text-gray-900">{f.value}</span>
                </div>
              ))}
              <div className="h-7 rounded bg-[repeating-linear-gradient(90deg,#1a1a1a_0px,#1a1a1a_2px,#fff_2px,#fff_5px)] my-1" />
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                <p className="text-[10px] font-semibold text-red-700">
                  ❌ Visible to everyone handling the package
                </p>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-1.5 px-4 z-10">
            <div className="w-10 h-10 rounded-full bg-[#E53935] flex items-center justify-center shadow-lg ring-4 ring-white">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[3px] text-[#E53935]">Upgrade</span>
          </div>

          {/* Good Card */}
          <div className="w-[300px] flex-shrink-0 rounded-2xl overflow-hidden border-[1.5px] border-green-200 bg-white">
            <div className="flex items-center justify-between px-4 py-3 bg-green-50 border-b border-green-100">
              <div>
                <p className="text-[13px] font-bold text-gray-900">RevealQR Secure Label</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Info stays encrypted</p>
              </div>
              <svg className="w-[18px] h-[18px] text-green-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div className="p-4 flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5 mb-1">
                <div className="border border-gray-200 rounded-lg p-1.5 bg-white flex-shrink-0">
                  <QRCode value="https://revealqr.vercel.app" size={52} />
                </div>
                <div className="flex-1 bg-green-50 border border-green-200 rounded-lg p-2 flex items-start gap-1.5">
                  <svg className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <div>
                    <p className="text-[11px] font-bold text-green-800">Protected</p>
                    <p className="text-[10px] text-green-700 leading-relaxed mt-0.5">Encrypted until authorized scan</p>
                  </div>
                </div>
              </div>
              {["Recipient", "Phone", "Address"].map((label) => (
                <div key={label} className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-[10px] uppercase tracking-[1.5px] text-gray-400">{label}</span>
                  <span className="text-[11px] font-semibold tracking-widest text-gray-300">••••••••••</span>
                </div>
              ))}
              <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2">
                <p className="text-[10px] font-semibold text-green-700">
                  ✅ Revealed only after secure authorization
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Features */}
        <div className="mt-12 rounded-2xl bg-[#0B0D14] px-8 py-8 grid grid-cols-3 gap-7">
          {[
            {
              icon: <EyeOff size={18} className="text-[#E53935]" />,
              title: "Hidden Customer Data",
              desc: "Personal info stays off the label — hidden throughout the entire delivery journey.",
            },
            {
              icon: <ShieldCheck size={18} className="text-[#E53935]" />,
              title: "Role-Based Access",
              desc: "Only authorized warehouse staff and delivery partners can unlock customer details.",
            },
            {
              icon: <Truck size={18} className="text-[#E53935]" />,
              title: "No Workflow Changes",
              desc: "Drops into your existing logistics stack — no retraining, no process changes.",
            },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#161B22] flex items-center justify-center flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <p className="text-[13px] font-bold text-white mb-1">{f.title}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Problem;