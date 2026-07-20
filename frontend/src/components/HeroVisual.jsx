import QRCode from "react-qr-code";
import {
  Package,
  Truck,
  MapPin,
  ShieldCheck,
  Lock,
} from "lucide-react";

const HeroVisual = () => {
  return (
    <div className="mt-6 flex justify-center lg:justify-end">

      <div className="relative">

        {/* Privacy Ribbon */}

        <div className="absolute -top-4 left-6 z-30 rounded-md bg-[#E53935] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-xl">
          Privacy Protected
        </div>

        {/* Shipping Label */}

        <div className="relative w-[400px] -rotate-[2deg] rounded-xl bg-white p-6 shadow-[0_30px_70px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-rotate-1 hover:scale-[1.02]">

          {/* Header */}

          <div className="flex items-center justify-between border-b border-gray-200 pb-4">

            <div className="flex items-center gap-3">

              <Package
                size={22}
                className="text-[#E53935]"
              />

              <div>

                <h2 className="text-base font-bold text-gray-900">
                  RevealQR
                </h2>

                <p className="text-[11px] uppercase tracking-[3px] text-gray-500">
                  Secure Shipping Label
                </p>

              </div>

            </div>

            <Truck
              size={20}
              className="text-gray-500"
            />

          </div>

          {/* Tracking */}

          <div className="mt-5">

            <p className="text-xs font-semibold uppercase tracking-[3px] text-gray-400">
              Tracking Number
            </p>

            <h3 className="mt-1 text-2xl font-extrabold text-gray-900">
              RQ-2026-001
            </h3>

          </div>

          {/* Barcode */}

          <div className="mt-5">

            <div className="h-10 rounded bg-[repeating-linear-gradient(90deg,#111_0px,#111_2px,#fff_2px,#fff_4px)]"></div>

            <p className="mt-2 text-center text-xs text-gray-500">
              5482 3948 1290
            </p>

          </div>

          {/* Recipient */}

          <div className="mt-5 space-y-3">

            <div className="flex justify-between">

              <span className="text-sm text-gray-500">
                Recipient
              </span>

              <span className="font-semibold tracking-widest">
                **************
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-sm text-gray-500">
                Destination
              </span>

              <div className="flex items-center gap-2">

                <MapPin
                  size={14}
                  className="text-[#E53935]"
                />

                <span className="font-semibold tracking-widest">
                  **************
                </span>

              </div>

            </div>

          </div>

          {/* QR + Security */}

          <div className="mt-6 flex items-center justify-between gap-4">

            <div className="rounded-lg border border-gray-300 bg-white p-3">

              <QRCode
                value="https://revealqr.vercel.app"
                size={115}
              />

            </div>

            <div className="flex flex-1 flex-col gap-3">

              <div className="rounded-lg border border-green-200 bg-green-50 p-3">

                <div className="flex items-center gap-3">

                  <Lock
                    size={20}
                    className="text-green-600"
                  />

                  <div>

                    <h4 className="text-sm font-semibold text-gray-800">
                      Protected
                    </h4>

                    <p className="text-[11px] text-gray-500">
                      Visible after authorization
                    </p>

                  </div>

                </div>

              </div>

              <div className="rounded-lg border border-red-100 bg-red-50 p-3">

                <div className="flex items-center gap-3">

                  <ShieldCheck
                    size={20}
                    className="text-[#E53935]"
                  />

                  <div>

                    <h4 className="text-sm font-semibold text-gray-800">
                      Role-Based Access
                    </h4>

                    <p className="text-[11px] text-gray-500">
                      Warehouse • Hub • Delivery
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>
                    {/* Footer */}

          <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-5">

            <div>

              <p className="text-xs uppercase tracking-[3px] text-gray-400">
                Status
              </p>

              <span className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                In Transit
              </span>

            </div>

            <div className="flex items-center gap-2">

              <ShieldCheck
                size={18}
                className="text-[#E53935]"
              />

              <span className="text-sm font-semibold text-gray-700">
                Customer Data Hidden
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default HeroVisual;