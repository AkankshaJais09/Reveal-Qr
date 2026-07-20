import { AlertTriangle, ShieldCheck } from "lucide-react";
import QRCode from "react-qr-code";

function Problem() {
  const labelFields = [
    "Customer Name",
    "Phone Number",
    "Home Address",
  ];

  return (
    <section className="bg-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400">
            The Problem
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white">
            Shipping Labels Reveal
            <br />
            Sensitive Customer Information
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            Anyone handling a package can view the customer's personal details
            printed on the shipping label.
          </p>
        </div>

        {/* Comparison */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2">

          {/* Traditional */}
          <div className="rounded-3xl border border-red-500/20 bg-slate-950 p-8">

            <div className="mb-6 flex items-center gap-3">
              <AlertTriangle className="text-red-400" />
              <h3 className="text-xl font-semibold text-white">
                Traditional Label
              </h3>
            </div>

            <div className="space-y-4">

              {labelFields.map((field) => (
                <div
                  key={field}
                  className="rounded-xl bg-slate-800 p-4"
                >
                  <p className="text-sm text-slate-300">{field}</p>
                </div>
              ))}

            </div>

            <p className="mt-6 font-medium text-red-400">
              ❌ Visible to everyone handling the shipment
            </p>

          </div>

          {/* RevealQR */}
          <div className="rounded-3xl border border-cyan-500/20 bg-slate-950 p-8">

            <div className="mb-6 flex items-center gap-3">
              <ShieldCheck className="text-cyan-400" />
              <h3 className="text-xl font-semibold text-white">
                RevealQR
              </h3>
            </div>

            <div className="flex justify-center rounded-2xl bg-white p-6">

              <QRCode
                value="RevealQR Demo"
                size={180}
              />

            </div>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between rounded-xl bg-slate-800 p-4">
                <span className="text-slate-400">
                  Customer
                </span>

                <span className="text-red-400">
                  Hidden 🔒
                </span>
              </div>

              <div className="flex justify-between rounded-xl bg-slate-800 p-4">
                <span className="text-slate-400">
                  Access
                </span>

                <span className="text-cyan-400">
                  Authorized Only
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Problem;