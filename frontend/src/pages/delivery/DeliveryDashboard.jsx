import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import {
  Truck, ShieldCheck, QrCode,
  LogOut, MapPin, Navigation, User,
  CheckCircle2, AlertCircle, Package,
  Clock,
} from "lucide-react";

const subStageConfig = {
  city: { label: "City Only", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  area: { label: "City + Area", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  door: { label: "Full Details", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
};

const DeliveryDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { fetchShipments(); }, []);

  const fetchShipments = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/shipments");
      setShipments(data.shipments || []);
    } catch {
      setError("Failed to load deliveries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Only show shipments in 'delivery' stage assigned to this rider
  const myDeliveries = shipments.filter(
    (s) => s.stage === "delivery"
  );
  const delivered = shipments.filter((s) => s.stage === "delivered" || s.status === "delivered");

  return (
    <div className="min-h-screen bg-[#0B0D14] text-white flex">

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-[220px] bg-[#161B22] border-r border-[#232A33] flex flex-col z-10">
        <div className="px-5 py-5 border-b border-[#232A33]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#E53935] rounded-lg flex items-center justify-center">
              <ShieldCheck size={16} className="text-white" />
            </div>
            <div>
              <p className="text-[14px] font-extrabold leading-none">RevealQR</p>
              <p className="text-[9px] text-gray-500 mt-0.5">Delivery Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { icon: Truck, label: "My Deliveries", active: true },
            { icon: QrCode, label: "Scan QR", path: "/scan" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => item.path && navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                item.active
                  ? "bg-[#E53935]/10 text-[#E53935] border border-[#E53935]/20"
                  : "text-gray-500 hover:text-white hover:bg-[#1E2530]"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-[#232A33]">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#0F1117]">
            <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-[11px] font-bold text-green-400">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-gray-500">Delivery Partner</p>
            </div>
            <button onClick={logout} className="text-gray-600 hover:text-red-400 transition-colors">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="ml-[220px] flex-1 p-8">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[22px] font-extrabold">My Deliveries</h1>
            <p className="text-[13px] text-gray-500 mt-0.5">
              Scan the QR code to progressively reveal customer info
            </p>
          </div>
          <button
            onClick={() => navigate("/scan")}
            className="flex items-center gap-2 bg-[#E53935] hover:bg-[#C62828] text-white text-[13px] font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            <QrCode size={15} />
            Scan QR
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "To Deliver", value: myDeliveries.length, color: "text-[#E53935]" },
            { label: "Delivered", value: delivered.length, color: "text-green-400" },
            { label: "Access Level", value: "Delivery", color: "text-purple-400" },
          ].map((s) => (
            <div key={s.label} className="bg-[#161B22] border border-[#232A33] rounded-2xl p-5">
              <p className="text-[11px] text-gray-500 uppercase tracking-[2px] mb-2">{s.label}</p>
              <p className={`text-[28px] font-extrabold ${s.color}`}>
                {loading ? "—" : s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Privacy notice */}
        <div className="flex items-center gap-3 rounded-xl bg-blue-500/5 border border-blue-500/10 px-4 py-3 mb-6">
          <ShieldCheck size={16} className="text-blue-400 flex-shrink-0" />
          <p className="text-[13px] text-blue-300">
            Customer details are revealed progressively via QR scan. Scan the package QR to see city → area → full address.
          </p>
        </div>

        {/* Deliveries */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 rounded-full border-4 border-[#E53935]/20 border-t-[#E53935] animate-spin" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center gap-2 py-16 text-red-400">
            <AlertCircle size={16} />
            <p className="text-[13px]">{error}</p>
          </div>
        ) : myDeliveries.length === 0 ? (
          <div className="text-center py-16 bg-[#161B22] border border-[#232A33] rounded-2xl">
            <Truck size={32} className="text-gray-700 mx-auto mb-3" />
            <p className="text-[15px] font-bold text-gray-400 mb-1">No Active Deliveries</p>
            <p className="text-[13px] text-gray-600">
              No shipments are currently assigned for delivery.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {myDeliveries.map((s) => {
              const sub = s.subStage || "city";
              const subCfg = subStageConfig[sub] || subStageConfig.city;
              return (
                <div key={s._id} className="bg-[#161B22] border border-[#232A33] rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#E53935]">
                        Out for Delivery
                      </span>
                      <h3 className="text-[15px] font-bold text-white mt-1">
                        {s.trackingNumber}
                      </h3>
                      <p className="text-[12px] text-gray-500 mt-0.5">{s.destination}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${subCfg.bg} ${subCfg.color}`}>
                        {subCfg.label}
                      </span>
                    </div>
                  </div>

                  {/* SubStage progress bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[9px] uppercase tracking-[1.5px] text-gray-600">Reveal Progress</p>
                      <p className={`text-[9px] font-bold uppercase ${subCfg.color}`}>{sub}</p>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 via-amber-400 to-green-400 rounded-full transition-all duration-700"
                        style={{ width: sub === "city" ? "33%" : sub === "area" ? "66%" : "100%" }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      {["city", "area", "door"].map((step) => (
                        <span
                          key={step}
                          className={`text-[9px] font-bold capitalize ${
                            ["city", "area", "door"].indexOf(step) <= ["city", "area", "door"].indexOf(sub)
                              ? "text-white"
                              : "text-gray-700"
                          }`}
                        >
                          {step}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Info row — only show what's allowed by subStage */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {/* City always visible */}
                    <div className="rounded-lg bg-green-500/5 border border-green-500/10 px-3 py-2.5">
                      <div className="flex items-center gap-1.5 mb-1">
                        <MapPin size={11} className="text-green-400" />
                        <span className="text-[9px] uppercase tracking-[1.5px] text-gray-500">City</span>
                      </div>
                      <p className="text-[12px] font-semibold text-white truncate">
                        {s.customer?.city || s.destination || "—"}
                      </p>
                    </div>

                    {/* Area — visible at 'area' or 'door' substage */}
                    <div className={`rounded-lg px-3 py-2.5 ${
                      sub === "area" || sub === "door"
                        ? "bg-amber-500/5 border border-amber-500/10"
                        : "bg-gray-800/30 border border-gray-800"
                    }`}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Navigation size={11} className={sub === "area" || sub === "door" ? "text-amber-400" : "text-gray-700"} />
                        <span className="text-[9px] uppercase tracking-[1.5px] text-gray-500">Area</span>
                      </div>
                      <p className={`text-[12px] font-semibold truncate ${
                        sub === "area" || sub === "door" ? "text-white" : "text-gray-700 tracking-widest"
                      }`}>
                        {sub === "area" || sub === "door" ? (s.customer?.area || "—") : "••••"}
                      </p>
                    </div>

                    {/* Customer name — visible at 'area' or 'door' substage */}
                    <div className={`rounded-lg px-3 py-2.5 ${
                      sub === "area" || sub === "door"
                        ? "bg-green-500/5 border border-green-500/10"
                        : "bg-gray-800/30 border border-gray-800"
                    }`}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <User size={11} className={sub === "area" || sub === "door" ? "text-green-400" : "text-gray-700"} />
                        <span className="text-[9px] uppercase tracking-[1.5px] text-gray-500">Customer</span>
                      </div>
                      <p className={`text-[12px] font-semibold truncate ${
                        sub === "area" || sub === "door" ? "text-white" : "text-gray-700 tracking-widest"
                      }`}>
                        {sub === "area" || sub === "door" ? (s.customer?.name || "—") : "••••"}
                      </p>
                    </div>
                  </div>

                  {/* Full address — only at 'door' stage */}
                  {sub === "door" && s.customer?.address && (
                    <div className="rounded-lg bg-green-500/5 border border-green-500/10 px-3 py-2.5 mb-4">
                      <div className="flex items-center gap-1.5 mb-1">
                        <MapPin size={11} className="text-green-400" />
                        <span className="text-[9px] uppercase tracking-[1.5px] text-gray-500">Full Address</span>
                      </div>
                      <p className="text-[12px] font-semibold text-white">{s.customer.address}</p>
                      {s.customer?.phone && (
                        <p className="text-[11px] text-gray-400 mt-0.5">📞 {s.customer.phone}</p>
                      )}
                    </div>
                  )}

                  {/* Scan QR button */}
                  <button
                    onClick={() => navigate(`/scan/result/${s.qrToken}`)}
                    disabled={!s.qrToken}
                    className="w-full flex items-center justify-center gap-2 bg-[#E53935]/10 hover:bg-[#E53935]/20 border border-[#E53935]/20 text-[#E53935] font-bold py-2.5 rounded-xl text-[13px] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <QrCode size={15} />
                    {sub === "door" ? "Confirm Delivery via QR" : "Scan QR to Reveal More"}
                  </button>

                  {/* Status message */}
                  {!s.qrToken && (
                    <div className="flex items-center gap-2 mt-2 justify-center">
                      <Clock size={12} className="text-gray-600" />
                      <p className="text-[11px] text-gray-600">QR token not available</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Delivered section */}
        {delivered.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 size={16} className="text-green-400" />
              <h2 className="text-[15px] font-bold text-white">Completed Deliveries ({delivered.length})</h2>
            </div>
            <div className="grid gap-3">
              {delivered.map((s) => (
                <div key={s._id} className="bg-[#161B22] border border-green-500/10 rounded-xl px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-bold text-white">{s.trackingNumber}</p>
                    <p className="text-[11px] text-gray-500">{s.destination}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                    Delivered
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryDashboard;