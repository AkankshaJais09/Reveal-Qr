import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import {
  CheckCircle2, XCircle, Lock, ArrowLeft,
  Clock, MapPin, Phone, User, Navigation,
  QrCode, ScanLine,
} from "lucide-react";

const ScanResult = () => {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // If ?advance=area or ?advance=door is passed, backend will advance before returning
  const advance = searchParams.get("advance");

  useEffect(() => { validateQR(); }, [token]);

  const validateQR = async () => {
    setLoading(true);
    setError("");
    try {
      // Step 1: First validate QR to get the shipment _id
      const { data: res } = await api.get(`/qr/validate/${token}`);

      // Step 2: If ?advance=area|door is set, advance the subStage in DB first
      if (advance && res?.shipment?._id) {
        const validAdvances = ["area", "door"];
        if (validAdvances.includes(advance)) {
          await api.patch(`/qr/substage/${res.shipment._id}`, { subStage: advance });
          // Step 3: Re-fetch with the new subStage applied
          const { data: refreshed } = await api.get(`/qr/validate/${token}`);
          setData(refreshed);
          return;
        }
      }

      setData(res);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired QR code");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelivery = async () => {
    try {
      await api.patch(`/shipments/${data.shipment._id}/stage`, {
        stage: "delivered",
      });
      navigate("/delivery/dashboard");
    } catch {
      alert("Failed to confirm delivery");
    }
  };

  // Go back to scanner, passing the next level to advance to on next scan
  const scanAgainToReveal = (nextLevel) => {
    navigate(`/scan?next=${nextLevel}&token=${token}`);
  };

  const stages = ["warehouse", "hub", "delivery", "delivered"];
  const stageIndex = data ? stages.indexOf(data.shipment?.stage) : 0;
  const reveal = data?.shipment?.reveal;

  const subStageSteps = [
    { key: "city", label: "City", icon: MapPin },
    { key: "area", label: "Area", icon: Navigation },
    { key: "door", label: "Door", icon: User },
  ];
  const subStageIndex = subStageSteps.findIndex(
    (s) => s.key === data?.shipment?.subStage
  );

  return (
    <div className="min-h-screen bg-[#0B0D14] flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1B222C_1px,transparent_1px),linear-gradient(to_bottom,#1B222C_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      <div className="relative w-full max-w-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[13px] text-gray-500 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={15} /> Back
        </button>

        {/* Loading */}
        {loading && (
          <div className="bg-[#161B22] border border-[#232A33] rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full border-4 border-[#E53935]/20 border-t-[#E53935] animate-spin mx-auto mb-4" />
            <p className="text-[14px] font-bold text-white">Verifying QR Code...</p>
            <p className="text-[12px] text-gray-500 mt-1">Checking authorization</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-[#161B22] border border-red-500/20 rounded-2xl p-8 text-center">
            <XCircle size={40} className="text-red-400 mx-auto mb-4" />
            <p className="text-[15px] font-bold text-white mb-2">Access Denied</p>
            <p className="text-[13px] text-red-400">{error}</p>
          </div>
        )}

        {/* Result */}
        {!loading && data && (
          <div className="space-y-4">

            {/* Header card */}
            <div className="bg-[#161B22] border border-[#232A33] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-400" />
                  <span className="text-[12px] font-bold text-green-400">Authorization Successful</span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#E53935]/10 text-[#E53935] border border-[#E53935]/20 capitalize">
                  {data.role}
                </span>
              </div>

              {/* Stage progress */}
              <div className="relative mb-5">
                <div className="absolute top-3 left-0 right-0 h-[2px] bg-gray-800" />
                <div
                  className="absolute top-3 left-0 h-[2px] bg-[#E53935] transition-all duration-700"
                  style={{ width: `${(stageIndex / 3) * 100}%` }}
                />
                <div className="relative flex justify-between">
                  {stages.map((s, i) => (
                    <div key={s} className="flex flex-col items-center gap-1.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold ${
                        i <= stageIndex ? "bg-[#E53935] text-white" : "bg-gray-800 text-gray-600"
                      }`}>
                        {i < stageIndex ? "✓" : i + 1}
                      </div>
                      <span className={`text-[9px] font-bold capitalize ${i <= stageIndex ? "text-white" : "text-gray-600"}`}>
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[2px] text-gray-500">Package</p>
                  <p className="text-[15px] font-extrabold text-white mt-0.5">{data.shipment.trackingNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-[2px] text-gray-500">Stage</p>
                  <p className="text-[13px] font-bold text-white mt-0.5 capitalize">{data.shipment.stage}</p>
                </div>
              </div>
            </div>

            {/* Delivery progressive reveal */}
            {data.role === "delivery" && reveal && (
              <>
                {/* SubStage progress */}
                <div className="bg-[#161B22] border border-[#232A33] rounded-2xl p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[2px] text-gray-500 mb-3">
                    Data Reveal Progress
                  </p>
                  <div className="relative">
                    <div className="absolute top-3 left-0 right-0 h-[2px] bg-gray-800" />
                    <div
                      className="absolute top-3 left-0 h-[2px] bg-green-500 transition-all duration-700"
                      style={{ width: `${(subStageIndex / 2) * 100}%` }}
                    />
                    <div className="relative flex justify-between">
                      {subStageSteps.map((s, i) => (
                        <div key={s.key} className="flex flex-col items-center gap-1.5">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            i <= subStageIndex ? "bg-green-500 text-white" : "bg-gray-800 text-gray-600"
                          }`}>
                            <s.icon size={11} />
                          </div>
                          <span className={`text-[9px] font-bold ${i <= subStageIndex ? "text-green-400" : "text-gray-600"}`}>
                            {s.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CITY level */}
                {reveal === "city" && (
                  <div className="bg-[#161B22] border border-[#232A33] rounded-2xl p-5 space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-[2px] text-gray-500">
                      Accessible — City Level
                    </p>
                    <div className="flex items-center justify-between rounded-lg bg-green-500/5 border border-green-500/10 px-3 py-3">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-green-400" />
                        <span className="text-[13px] text-gray-300">Delivery City</span>
                      </div>
                      <span className="text-[13px] font-bold text-white">{data.shipment.city}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-red-500/5 border border-red-500/10 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Lock size={12} className="text-red-400/50" />
                        <span className="text-[12px] text-gray-600">Area & Address</span>
                      </div>
                      <span className="text-[12px] tracking-widest text-gray-700">••••••••</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-red-500/5 border border-red-500/10 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Lock size={12} className="text-red-400/50" />
                        <span className="text-[12px] text-gray-600">Customer Details</span>
                      </div>
                      <span className="text-[12px] tracking-widest text-gray-700">••••••••</span>
                    </div>

                    {/* SCAN AGAIN — not a click button */}
                    <button
                      onClick={() => scanAgainToReveal("area")}
                      className="w-full flex items-center justify-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 font-bold py-3 rounded-xl text-[13px] transition-all"
                    >
                      <ScanLine size={15} />
                      Scan QR Again to Reveal Area
                    </button>
                    <p className="text-center text-[11px] text-gray-600">
                      You must physically scan the package QR code again to unlock the next level
                    </p>
                  </div>
                )}

                {/* AREA level */}
                {reveal === "area" && (
                  <div className="bg-[#161B22] border border-[#232A33] rounded-2xl p-5 space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-[2px] text-gray-500">
                      Accessible — Area Level
                    </p>
                    {[
                      { icon: MapPin, label: "City", value: data.shipment.city, color: "text-green-400", bg: "bg-green-500/5 border-green-500/10" },
                      { icon: Navigation, label: "Area", value: data.shipment.area, color: "text-green-400", bg: "bg-green-500/5 border-green-500/10" },
                      { icon: User, label: "Customer", value: data.shipment.customerName, color: "text-green-400", bg: "bg-green-500/5 border-green-500/10" },
                    ].map((f) => (
                      <div key={f.label} className={`flex items-center justify-between rounded-lg border px-3 py-3 ${f.bg}`}>
                        <div className="flex items-center gap-2">
                          <f.icon size={14} className={f.color} />
                          <span className="text-[13px] text-gray-300">{f.label}</span>
                        </div>
                        <span className="text-[13px] font-bold text-white">{f.value || "—"}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between rounded-lg bg-red-500/5 border border-red-500/10 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Lock size={12} className="text-red-400/50" />
                        <span className="text-[12px] text-gray-600">Full Address & Phone</span>
                      </div>
                      <span className="text-[12px] tracking-widest text-gray-700">••••••••</span>
                    </div>

                    {/* SCAN AGAIN — not a click button */}
                    <button
                      onClick={() => scanAgainToReveal("door")}
                      className="w-full flex items-center justify-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 font-bold py-3 rounded-xl text-[13px] transition-all"
                    >
                      <ScanLine size={15} />
                      Scan QR Again to Reveal Full Address
                    </button>
                    <p className="text-center text-[11px] text-gray-600">
                      You must physically scan the package QR code again to unlock full details
                    </p>
                  </div>
                )}

                {/* DOOR level — full info */}
                {reveal === "door" && (
                  <div className="bg-[#161B22] border border-[#232A33] rounded-2xl p-5 space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-[2px] text-gray-500">
                      Full Details — At Door
                    </p>
                    {[
                      { icon: User,   label: "Customer", value: data.shipment.customer?.name },
                      { icon: Phone,  label: "Phone",    value: data.shipment.customer?.phone },
                      { icon: MapPin, label: "Address",  value: data.shipment.customer?.address },
                    ].map((f) => (
                      <div key={f.label} className="flex items-center justify-between rounded-lg bg-green-500/5 border border-green-500/10 px-3 py-3">
                        <div className="flex items-center gap-2">
                          <f.icon size={14} className="text-green-400" />
                          <span className="text-[13px] text-gray-300">{f.label}</span>
                        </div>
                        <span className="text-[13px] font-bold text-white max-w-[160px] text-right truncate">
                          {f.value || "—"}
                        </span>
                      </div>
                    ))}
                    <button
                      onClick={confirmDelivery}
                      className="w-full flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#C62828] text-white font-bold py-3.5 rounded-xl text-[14px] transition-all mt-2"
                    >
                      <CheckCircle2 size={16} />
                      Confirm Delivery
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Non-delivery roles */}
            {data.role !== "delivery" && (
              <div className="bg-[#161B22] border border-[#232A33] rounded-2xl overflow-hidden">
                <div className="px-5 pt-4 pb-3">
                  <p className="text-[10px] font-bold uppercase tracking-[2px] text-gray-500 mb-3">Accessible to you</p>
                  <div className="space-y-2">
                    {Object.entries(data.shipment)
                      .filter(([key, value]) =>
                        !["_id", "__v", "qrToken", "qrExpiresAt", "reveal", "hint"].includes(key) &&
                        value !== null && value !== undefined
                      )
                      .map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between rounded-lg bg-green-500/5 border border-green-500/10 px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" />
                            <span className="text-[12px] text-gray-400 capitalize">{key}</span>
                          </div>
                          <span className="text-[12px] font-semibold text-white max-w-[160px] text-right truncate">
                            {typeof value === "object" ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="border-t border-[#232A33] mx-5 my-2" />
                <div className="px-5 pb-4">
                  <p className="text-[10px] font-bold uppercase tracking-[2px] text-gray-500 mb-3">Protected</p>
                  <div className="flex items-center justify-between rounded-lg bg-red-500/5 border border-red-500/10 px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Lock size={12} className="text-red-500/50" />
                      <span className="text-[12px] text-gray-600">Customer data</span>
                    </div>
                    <span className="text-[12px] font-semibold tracking-widest text-gray-700">••••••••</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-start gap-2.5 rounded-xl bg-[#161B22] border border-[#232A33] px-4 py-3">
              <Clock size={13} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-gray-500 leading-relaxed">
                {data.shipment.stage === "delivered"
                  ? "QR expired — delivery completed and data wiped."
                  : "Each scan of the physical QR code unlocks the next level of information."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanResult;