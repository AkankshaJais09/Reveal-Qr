import { useState } from "react";
import {
  Package,
  Building2,
  Truck,
  House,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Lock,
} from "lucide-react";
import QRCode from "react-qr-code";

const workflowStages = [
  {
    title: "Warehouse Processing",
    subtitle: "Package Registered",
    access: "Warehouse Staff",
    status: "Active",
    progress: 25,
    icon: Package,
    visible: [
      { label: "Package ID", value: "PKG-284938" },
      { label: "Order ID", value: "ORD-592834" },
      { label: "Shipment Status", value: "Registered" },
    ],
    hidden: ["Customer Name", "Phone Number", "Delivery Address"],
    description:
      "Warehouse staff access only operational data needed for sorting — customer identity stays hidden.",
  },
  {
    title: "Sorting Hub",
    subtitle: "Transit Sorting",
    access: "Hub Operator",
    status: "Active",
    progress: 50,
    icon: Building2,
    visible: [
      { label: "Package ID", value: "PKG-284938" },
      { label: "Route", value: "North Zone" },
      { label: "Hub Status", value: "Sorted" },
    ],
    hidden: ["Customer Name", "Phone Number", "Delivery Address"],
    description:
      "Sorting hubs get routing data only. Customer identity remains fully encrypted in transit.",
  },
  {
    title: "Out For Delivery",
    subtitle: "Assigned Rider",
    access: "Delivery Partner",
    status: "Active",
    progress: 85,
    icon: Truck,
    visible: [
      { label: "Customer", value: "Akanksha J." },
      { label: "Phone", value: "+91 XXXXX XXXXX" },
      { label: "Address", value: "Unlocked" },
    ],
    hidden: ["Payment Information"],
    description:
      "Only the assigned delivery partner receives customer contact info — revealed at the final stage only.",
  },
  {
    title: "Delivery Completed",
    subtitle: "QR Revoked",
    access: "Expired",
    status: "Expired",
    progress: 0,
    icon: House,
    visible: [
      { label: "Delivery", value: "Completed" },
      { label: "Audit Log", value: "Stored" },
    ],
    hidden: ["Customer Name", "Phone Number", "Address Removed"],
    description:
      "Once delivered, all customer data is automatically revoked and the QR code becomes permanently invalid.",
  },
];

const Workflow = () => {
  const [activeStage, setActiveStage] = useState(0);
  const stage = workflowStages[activeStage];
  const Icon = stage.icon;

  return (
    <section id="privacy" className="bg-[#0B0D14] py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block rounded-full border border-[#E53935]/30 bg-[#E53935]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[3px] text-[#E53935] mb-5">
            Workflow
          </span>
          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            Privacy at Every Step
          </h2>
          <p className="text-[15px] text-gray-400 leading-relaxed">
            RevealQR reveals only what's needed at each stage — nothing more,
            nothing less.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-12">
          <div className="absolute left-0 top-6 h-[2px] w-full bg-gray-800 rounded-full" />
          <div
            className="absolute left-0 top-6 h-[2px] bg-[#E53935] rounded-full transition-all duration-500"
            style={{
              width:
                activeStage === 0 ? "12%" :
                activeStage === 1 ? "38%" :
                activeStage === 2 ? "66%" : "100%",
            }}
          />
          <div className="relative grid grid-cols-4">
            {workflowStages.map((item, index) => {
              const StepIcon = item.icon;
              const isActive = activeStage >= index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveStage(index)}
                  className="flex flex-col items-center gap-3 cursor-pointer group"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-[#E53935] shadow-lg shadow-red-900/50"
                      : "bg-[#161B22] border border-gray-700"
                  }`}>
                    <StepIcon size={20} />
                  </div>
                  <div className="text-center">
                    <p className={`text-[12px] font-bold transition-colors ${isActive ? "text-white" : "text-gray-500"}`}>
                      {item.access}
                    </p>
                    <p className="text-[11px] text-gray-600 mt-0.5">{item.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl overflow-hidden bg-white shadow-2xl">
          <div className="grid lg:grid-cols-[1fr_280px]">

            {/* Left Panel */}
            <div className="p-7">

              {/* Stage Header */}
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[#E53935]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#E53935]">
                      Stage {activeStage + 1} of 4
                    </span>
                    <h3 className="text-[17px] font-bold text-gray-900 leading-tight">
                      {stage.title}
                    </h3>
                  </div>
                </div>
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                  stage.status === "Expired"
                    ? "bg-red-50 text-red-500 border border-red-200"
                    : "bg-green-50 text-green-600 border border-green-200"
                }`}>
                  {stage.status}
                </span>
              </div>

              {/* Two column layout for info */}
              <div className="grid grid-cols-2 gap-5">

                {/* Visible Info */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[2px] text-gray-400 mb-3">
                    Accessible
                  </p>
                  <div className="space-y-2">
                    {stage.visible.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg border border-green-100 bg-green-50 px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" />
                          <span className="text-[12px] text-gray-600">{item.label}</span>
                        </div>
                        <span className="text-[12px] font-semibold text-green-700 ml-2 truncate max-w-[80px] text-right">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hidden Info */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[2px] text-gray-400 mb-3">
                    Protected
                  </p>
                  <div className="space-y-2">
                    {stage.hidden.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50 px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <XCircle size={13} className="text-red-400 flex-shrink-0" />
                          <span className="text-[12px] text-gray-600">{item}</span>
                        </div>
                        <span className="text-[11px] font-bold text-red-400">Hidden</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Description */}
              <div className="mt-5 flex items-start gap-3 rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
                <ShieldCheck size={15} className="text-[#E53935] mt-0.5 flex-shrink-0" />
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  {stage.description}
                </p>
              </div>

            </div>

            {/* Right Panel */}
            <div className="bg-[#0F1117] p-6 flex flex-col gap-5">

              <p className="text-[11px] font-bold uppercase tracking-[3px] text-gray-500">
                Live QR Status
              </p>

              {/* QR Code */}
              <div className="rounded-xl bg-white p-4 flex items-center justify-center">
                <QRCode
                  value={`https://revealqr.vercel.app/scan?stage=${activeStage}`}
                  size={130}
                />
              </div>

              {/* Access Level */}
              <div className="rounded-xl bg-[#161B22] border border-gray-800 px-4 py-3">
                <p className="text-[10px] text-gray-500 uppercase tracking-[2px] mb-1">Access Level</p>
                <p className="text-[14px] font-bold text-[#E53935]">{stage.access}</p>
              </div>

              {/* Data Visibility bar */}
              <div className="rounded-xl bg-[#161B22] border border-gray-800 px-4 py-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-[2px]">Data Visibility</p>
                  <p className="text-[11px] font-bold text-white">{stage.progress}%</p>
                </div>
                <div className="h-1.5 rounded-full bg-gray-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#E53935] transition-all duration-500"
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
              </div>

              {/* Lock status */}
              <div className={`rounded-xl border px-4 py-3 flex items-center gap-3 ${
                stage.status === "Expired"
                  ? "bg-red-500/10 border-red-500/20"
                  : "bg-green-500/10 border-green-500/20"
              }`}>
                <Lock size={14} className={stage.status === "Expired" ? "text-red-400" : "text-green-400"} />
                <div>
                  <p className="text-[11px] font-bold text-white">
                    {stage.status === "Expired" ? "QR Revoked" : "QR Active"}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    {stage.status === "Expired"
                      ? "Access permanently disabled"
                      : "Authorized scan required"}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Workflow;