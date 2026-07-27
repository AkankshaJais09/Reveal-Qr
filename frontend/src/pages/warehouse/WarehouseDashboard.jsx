import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import {
  Package, ShieldCheck, QrCode,
  LogOut, RefreshCw, AlertCircle,
} from "lucide-react";

const WarehouseDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { fetchShipments(); }, []);

  const fetchShipments = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/shipments");
      setShipments(data.shipments);
    } catch {
      setError("Failed to load shipments");
    } finally {
      setLoading(false);
    }
  };

  const handleStageUpdate = async (id) => {
    try {
      await api.patch(`/shipments/${id}/stage`, { stage: "hub" });
      fetchShipments();
    } catch {
      alert("Failed to update stage");
    }
  };

  const warehouseShipments = shipments.filter((s) => s.stage === "warehouse");

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
              <p className="text-[9px] text-gray-500 mt-0.5">Warehouse Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { icon: Package, label: "Shipments", active: true },
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
            <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center text-[11px] font-bold text-blue-400">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-gray-500">Warehouse Staff</p>
            </div>
            <button onClick={logout} className="text-gray-600 hover:text-red-400">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="ml-[220px] flex-1 p-8">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[22px] font-extrabold">Warehouse Dashboard</h1>
            <p className="text-[13px] text-gray-500 mt-0.5">
              Customer data is hidden — package IDs only
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchShipments}
              className="w-9 h-9 rounded-xl bg-[#161B22] border border-[#232A33] flex items-center justify-center text-gray-400 hover:text-white"
            >
              <RefreshCw size={15} />
            </button>
            <button
              onClick={() => navigate("/scan")}
              className="flex items-center gap-2 bg-[#E53935] hover:bg-[#C62828] text-white text-[13px] font-semibold px-4 py-2 rounded-xl"
            >
              <QrCode size={15} />
              Scan QR
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "In Warehouse", value: warehouseShipments.length, color: "text-blue-400", bg: "bg-blue-400/10" },
            { label: "Total Assigned", value: shipments.length, color: "text-[#E53935]", bg: "bg-[#E53935]/10" },
            { label: "Customer Data", value: "Hidden", color: "text-green-400", bg: "bg-green-400/10" },
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
          <p className="text-[13px] text-blue-400">
            You can only see Package ID, Order ID and Weight. Customer details are protected by RevealQR.
          </p>
        </div>

        {/* Table */}
        <div className="bg-[#161B22] border border-[#232A33] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#232A33]">
            <h2 className="text-[15px] font-bold">
              Packages in Warehouse ({warehouseShipments.length})
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 rounded-full border-4 border-[#E53935]/20 border-t-[#E53935] animate-spin" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center gap-2 py-16 text-red-400">
              <AlertCircle size={16} />
              <p className="text-[13px]">{error}</p>
            </div>
          ) : warehouseShipments.length === 0 ? (
            <div className="text-center py-16">
              <Package size={32} className="text-gray-700 mx-auto mb-3" />
              <p className="text-[13px] text-gray-500">No packages in warehouse</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#232A33]">
                  {["Package ID", "Order ID", "Weight", "Destination", "Customer", "Action"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-[2px] text-gray-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {warehouseShipments.map((s, i) => (
                  <tr
                    key={s._id}
                    className={`hover:bg-[#1E2530] transition-colors ${
                      i !== warehouseShipments.length - 1 ? "border-b border-[#232A33]/50" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="text-[13px] font-bold text-white">{s.trackingNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px] text-gray-400">{s.orderId || "—"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px] text-gray-400">{s.weight || "—"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px] text-gray-400">{s.destination}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px] font-semibold tracking-widest text-gray-600">
                        ••••••••
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleStageUpdate(s._id)}
                        className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Send to Hub →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarehouseDashboard;