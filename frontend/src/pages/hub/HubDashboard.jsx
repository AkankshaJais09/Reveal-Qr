import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  Building2, Package, QrCode, LogOut, RefreshCw,
  ShieldCheck, ArrowRightLeft,
} from "lucide-react";
import ShipmentQR from "../../components/ShipmentQR";

const stageColor = {
  warehouse: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  hub:       "text-amber-400 bg-amber-500/10 border-amber-500/20",
  delivery:  "text-purple-400 bg-purple-500/10 border-purple-500/20",
  delivered: "text-green-400 bg-green-500/10 border-green-500/20",
};

export default function HubDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrShipment, setQrShipment] = useState(null);
  const [stats, setStats] = useState({
    total: 0, inHub: 0, delivered: 0, pending: 0,
  });

  useEffect(() => { fetchShipments(); }, []);

  const fetchShipments = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/shipments");
      const list = data.shipments || data;
      setShipments(list);
      setStats({
        total:     list.length,
        inHub:     list.filter(s => s.stage === "hub").length,
        delivered: list.filter(s => s.stage === "delivered").length,
        pending:   list.filter(s => s.stage === "warehouse").length,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStage = async (id, stage) => {
    try {
      await api.patch(`/shipments/${id}/stage`, { stage });
      fetchShipments();
    } catch (err) {
      console.error("Failed to update stage:", err);
    }
  };

  const hubShipments = shipments.filter(s => s.stage === "hub");

  return (
    <div className="min-h-screen bg-[#0B0D14] flex">

      {/* Sidebar */}
      <div className="w-56 bg-[#161B22] border-r border-[#232A33] flex flex-col fixed h-full">

        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#232A33]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <Building2 size={16} className="text-amber-400" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-white">RevealQR</p>
              <p className="text-[10px] text-amber-400">Hub Portal</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <ArrowRightLeft size={15} className="text-amber-400" />
            <span className="text-[13px] font-bold text-amber-400">Routing Queue</span>
          </div>
          <button
            onClick={() => navigate("/scan")}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#1C2128] transition-colors"
          >
            <QrCode size={15} className="text-gray-500" />
            <span className="text-[13px] text-gray-400">Scan QR</span>
          </button>
        </nav>

        {/* Privacy note */}
        <div className="mx-3 mb-3 px-3 py-2.5 rounded-xl bg-[#0F1117] border border-[#232A33]">
          <div className="flex items-start gap-2">
            <ShieldCheck size={12} className="text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="text-[10px] text-gray-500 leading-relaxed">
              Routing data only. Customer identity is protected.
            </p>
          </div>
        </div>

        {/* User */}
        <div className="px-4 py-4 border-t border-[#232A33] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <span className="text-[11px] font-bold text-amber-400">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-[12px] font-bold text-white truncate max-w-[80px]">
                {user?.name}
              </p>
              <p className="text-[10px] text-gray-500">Hub Staff</p>
            </div>
          </div>
          <button onClick={logout} className="text-gray-600 hover:text-red-400 transition-colors">
            <LogOut size={14} />
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="ml-56 flex-1 p-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-white">Hub Dashboard</h1>
            <p className="text-[13px] text-gray-500 mt-0.5">
              Routing and sorting data — customer identity stays protected
            </p>
          </div>
          <button
            onClick={fetchShipments}
            className="flex items-center gap-2 bg-[#161B22] border border-[#232A33] hover:border-gray-600 text-gray-400 hover:text-white text-[13px] font-semibold px-4 py-2 rounded-xl transition-all"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        {/* Privacy banner */}
        <div className="flex items-center gap-2.5 bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3">
          <ShieldCheck size={14} className="text-amber-400 flex-shrink-0" />
          <p className="text-[12px] text-amber-400/80">
            You can only see Package ID, Route and Weight. Customer details are protected by RevealQR.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Shipments", value: stats.total,     color: "text-blue-400"  },
            { label: "In Hub",          value: stats.inHub,     color: "text-amber-400" },
            { label: "Delivered",       value: stats.delivered, color: "text-green-400" },
            { label: "Pending",         value: stats.pending,   color: "text-red-400"   },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-[#161B22] border border-[#232A33] rounded-2xl p-5">
              <p className="text-[11px] font-bold uppercase tracking-[1.5px] text-gray-500 mb-3">
                {label}
              </p>
              <p className={`text-3xl font-bold ${color}`}>{loading ? "—" : value}</p>
            </div>
          ))}
        </div>

        {/* Shipments */}
        <div className="bg-[#161B22] border border-[#232A33] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#232A33]">
            <h2 className="text-[15px] font-bold text-white">
              Packages in Routing Queue ({hubShipments.length})
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            </div>
          ) : hubShipments.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <Package size={32} className="mx-auto mb-3 opacity-20" />
              <p className="text-[14px]">No packages in routing queue</p>
              <p className="text-[12px] mt-1 text-gray-600">
                Packages appear here when admin sets stage to "hub"
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#232A33]">
              {hubShipments.map((s) => (
                <div
                  key={s._id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-[#1C2128] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-[#0F1117] border border-[#232A33] rounded-xl flex items-center justify-center">
                      <QrCode size={15} className="text-amber-400" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-white font-mono">
                        {s.trackingNumber || s._id?.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        → {s.destination || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-[11px] font-bold ${stageColor[s.stage] || stageColor.hub}`}>
                      {s.stage?.toUpperCase()}
                    </span>

                    <button
                      onClick={() => setQrShipment(s)}
                      className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 text-[12px] font-bold px-3 py-1.5 rounded-lg transition-all"
                    >
                      <QrCode size={12} />
                      QR
                    </button>

                    <select
                      value={s.stage}
                      onChange={(e) => updateStage(s._id, e.target.value)}
                      className="bg-[#0F1117] border border-[#232A33] text-[12px] text-gray-300 rounded-lg px-2 py-1.5 outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="warehouse">Warehouse</option>
                      <option value="hub">Hub</option>
                      <option value="delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* QR Modal */}
      {qrShipment && (
        <ShipmentQR shipment={qrShipment} onClose={() => setQrShipment(null)} />
      )}
    </div>
  );
}