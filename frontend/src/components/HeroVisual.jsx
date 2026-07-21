import QRCode from "react-qr-code";
import { Package, Truck, MapPin, ShieldCheck, Lock } from "lucide-react";

const HeroVisual = () => {
  return (
    <div className="relative w-[360px]">

      {/* Privacy Ribbon */}
      <div className="absolute -top-4 left-6 z-30 rounded-md bg-[#E53935] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white shadow-xl">
        Privacy Protected
      </div>

      {/* Card */}
      <div className="relative -rotate-[2deg] rounded-2xl bg-white px-6 pt-8 pb-6 shadow-[0_30px_70px_rgba(0,0,0,0.5)] transition-all duration-500 hover:rotate-0 hover:scale-[1.01]">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <Package size={18} className="text-[#E53935]" />
            <div>
              <h2 className="text-[13px] font-bold text-gray-900">RevealQR</h2>
              <p className="text-[9px] uppercase tracking-[3px] text-gray-400">Secure Shipping Label</p>
            </div>
          </div>
          <Truck size={16} className="text-gray-300" />
        </div>

        {/* Tracking */}
        <div className="mt-4">
          <p className="text-[9px] font-semibold uppercase tracking-[3px] text-gray-400">Tracking Number</p>
          <h3 className="mt-1 text-[20px] font-extrabold text-gray-900">RQ-2026-001</h3>
        </div>

        {/* Barcode */}
        <div className="mt-4">
          <div className="h-9 rounded bg-[repeating-linear-gradient(90deg,#111_0px,#111_2px,#fff_2px,#fff_4px)]" />
          <p className="mt-1 text-center text-[9px] text-gray-400">5482 3948 1290</p>
        </div>

        {/* Recipient / Destination */}
        <div className="mt-4 space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-gray-500">Recipient</span>
            <span className="text-[12px] font-semibold tracking-widest text-gray-300">••••••••••••</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-gray-500">Destination</span>
            <div className="flex items-center gap-1.5">
              <MapPin size={11} className="text-[#E53935]" />
              <span className="text-[12px] font-semibold tracking-widest text-gray-300">••••••••••••</span>
            </div>
          </div>
        </div>

        {/* QR + Badges */}
        <div className="mt-5 flex items-start gap-3">
          <div className="rounded-xl border border-gray-200 bg-white p-2.5 flex-shrink-0">
            <QRCode value="https://revealqr.vercel.app" size={95} />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2.5">
              <div className="flex items-center gap-2">
                <Lock size={13} className="text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="text-[12px] font-semibold text-gray-800">Protected</h4>
                  <p className="text-[10px] text-gray-500">Visible after authorization</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2.5">
              <div className="flex items-center gap-2">
                <ShieldCheck size={13} className="text-[#E53935] flex-shrink-0" />
                <div>
                  <h4 className="text-[12px] font-semibold text-gray-800">Role-Based Access</h4>
                  <p className="text-[10px] text-gray-500">Warehouse • Hub • Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-[9px] uppercase tracking-[3px] text-gray-400">Status</p>
            <span className="mt-1.5 inline-flex rounded-full bg-green-100 px-3 py-1 text-[10px] font-semibold text-green-700">
              In Transit
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-[#E53935]" />
            <span className="text-[11px] font-semibold text-gray-600">Customer Data Hidden</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroVisual;