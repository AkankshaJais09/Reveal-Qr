import {
  Package,
  Building2,
  Truck,
  House,
} from "lucide-react";

const Workflow = () => {
  return (
    <section className="bg-[#0B0D14] py-28 text-white">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full border border-[#E53935]/30 bg-[#E53935]/10 px-4 py-2 text-sm font-semibold text-[#E53935]">

            Workflow

          </span>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">

            Privacy at Every Step
            <br />
            of the Delivery Journey

          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">

            RevealQR intelligently reveals only the information
            required at each stage of delivery, protecting customer
            privacy without changing your logistics workflow.

          </p>

        </div>

        {/* Timeline */}

        <div className="relative mt-24">

          {/* Gray Line */}

          <div className="absolute left-0 top-7 h-1 w-full rounded-full bg-gray-800"></div>

          {/* Active Line */}

          <div className="absolute left-0 top-7 h-1 w-1/4 rounded-full bg-[#E53935] transition-all duration-700"></div>

          <div className="relative grid grid-cols-4">

            {/* Warehouse */}

            <div className="flex flex-col items-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E53935] shadow-lg shadow-red-600/30">

                <Package size={24} />

              </div>

              <h3 className="mt-5 font-semibold">

                Warehouse

              </h3>

              <p className="mt-2 text-sm text-gray-400">

                Package Registered

              </p>

            </div>

            {/* Hub */}

            <div className="flex flex-col items-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-700 bg-[#161B22]">

                <Building2 size={24} />

              </div>

              <h3 className="mt-5 font-semibold">

                Hub

              </h3>

              <p className="mt-2 text-sm text-gray-400">

                Transit Sorting

              </p>

            </div>

            {/* Delivery */}

            <div className="flex flex-col items-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-700 bg-[#161B22]">

                <Truck size={24} />

              </div>

              <h3 className="mt-5 font-semibold">

                Delivery

              </h3>

              <p className="mt-2 text-sm text-gray-400">

                Assigned Rider

              </p>

            </div>

            {/* Delivered */}

            <div className="flex flex-col items-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-700 bg-[#161B22]">

                <House size={24} />

              </div>

              <h3 className="mt-5 font-semibold">

                Delivered

              </h3>

              <p className="mt-2 text-sm text-gray-400">

                QR Revoked

              </p>

            </div>

          </div>

        </div>