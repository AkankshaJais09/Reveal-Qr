import QRCode from "react-qr-code";
import { Package, Truck, MapPin } from "lucide-react";

const HeroVisual = () => {
  return (
    <div className="flex justify-center lg:justify-end">

      {/* Parcel */}
      <div className="relative rounded-3xl bg-[#C69258] p-6 shadow-2xl">

        {/* Parcel Tape */}
        <div className="absolute left-1/2 top-0 h-full w-10 -translate-x-1/2 bg-[#EED49A]" />

        {/* Shipping Label */}
        <div className="relative w-[340px] rounded-2xl bg-white p-6 shadow-xl">

          {/* Header */}
          <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-3">

            <div className="flex items-center gap-2">

              <Package size={22} className="text-cyan-600" />

              <div>
                <h2 className="font-bold text-slate-800">
                  RevealQR
                </h2>

                <p className="text-xs text-gray-500">
                  Secure Shipping Label
                </p>
              </div>

            </div>

            <Truck size={22} className="text-slate-500" />

          </div>

          {/* Tracking */}

          <div className="mb-5">

            <p className="text-xs uppercase tracking-widest text-gray-400">
              Tracking ID
            </p>

            <h3 className="text-xl font-bold text-slate-900">
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

            <div className="rounded-xl border border-gray-300 p-3">

              <QRCode
                value="https://revealqr.vercel.app"
                size={120}
              />

            </div>

          </div>

          {/* Details */}

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">

              <span className="text-gray-500">
                Destination
              </span>

              <div className="flex items-center gap-1">

                <MapPin size={15} className="text-red-500" />

                <span className="font-medium text-slate-700">
                  ************
                </span>

              </div>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Courier
              </span>

              <span className="font-medium text-slate-700">
                Reveal Express
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Status
              </span>

              <span className="font-semibold text-green-600">
                In Transit
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default HeroVisual;