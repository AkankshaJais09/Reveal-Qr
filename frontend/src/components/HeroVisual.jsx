import QRCode from "react-qr-code";
import {
  Package,
  Truck,
  MapPin,
  ShieldCheck,
} from "lucide-react";

const HeroVisual = () => {
  return (
    <div className="relative flex justify-center lg:justify-end">

      {/* Background Glow */}
      <div className="absolute top-12 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl"></div>

      <div className="relative animate-float">

        {/* Privacy Badge */}
        <div className="absolute -top-5 left-4 sm:-left-10 sm:top-8 z-20 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-xl">
          🔒 Privacy Protected
        </div>

        {/* Live Badge */}
        <div className="absolute  -bottom-5 right-4 sm:right-0 z-20 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-xl">
          🚚 Live Shipment
        </div>

        {/* Parcel */}
        <div className="relative rounded-3xl bg-[#C69258] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(0,0,0,0.45)]">

          {/* Tape */}
          <div className="absolute left-1/2 top-0 h-full w-10 -translate-x-1/2 bg-[#EED49A]"></div>

          {/* Label */}
          <div className="relative w-[300px] sm:w-[340px] rounded-2xl bg-white p-5 sm:p-6 shadow-2xl">

            {/* Fold Corner */}
            <div className="absolute right-0 top-0 h-8 w-8 rounded-bl-xl bg-slate-100"></div>

            {/* Header */}
            <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-3">

              <div className="flex items-center gap-2">

                <Package className="text-cyan-600" size={22} />

                <div>

                  <h2 className="font-bold text-slate-800">
                    RevealQR
                  </h2>

                  <p className="text-xs text-gray-500">
                    Secure Shipping Label
                  </p>

                </div>

              </div>

              <Truck className="text-slate-500" size={22} />

            </div>

            {/* Tracking */}
            <div className="mb-5">

              <p className="text-xs uppercase tracking-widest text-gray-400">
                Tracking ID
              </p>

              <h3 className="text-2xl font-bold text-slate-900">
                RQ-2026-001
              </h3>

            </div>

            {/* Barcode */}
            <div className="mb-5">

              <div className="h-14 rounded bg-[repeating-linear-gradient(90deg,#111_0px,#111_2px,#fff_2px,#fff_4px)]"></div>

              <p className="mt-1 text-center text-xs text-gray-500">
                5482 3948 1290
              </p>

            </div>

            {/* QR */}
            <div className="mb-6 flex justify-center">

              <div className="rounded-xl border-2 border-dashed border-slate-300 p-3 transition-transform duration-300 hover:scale-105">

                <QRCode
                  value="https://revealqr.vercel.app"
                  size={120}
                />

              </div>

            </div>

            {/* Details */}
            <div className="space-y-4">

              <div className="flex justify-between text-sm">

                <span className="text-gray-500">
                  Destination
                </span>

                <div className="flex items-center gap-1">

                  <MapPin
                    size={15}
                    className="text-red-500"
                  />

                  <span className="font-medium">
                    ************
                  </span>

                </div>

              </div>

              <div className="flex justify-between text-sm">

                <span className="text-gray-500">
                  Courier
                </span>

                <span className="font-medium">
                  Reveal Express
                </span>

              </div>

              <div className="flex justify-between text-sm">

                <span className="text-gray-500">
                  Status
                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  In Transit
                </span>

              </div>

            </div>

            {/* Privacy Strip */}
            <div className="mt-6 flex items-center gap-2 rounded-xl bg-cyan-50 p-3">

              <ShieldCheck
                size={18}
                className="text-cyan-600"
              />

              <span className="text-sm font-medium text-cyan-700">
                Customer information stays hidden until authorized.
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default HeroVisual;