import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import {
  Package, ShieldCheck, Truck, QrCode,
  Users, FileText, LogOut, Bell,
  TrendingUp, AlertCircle,
} from "lucide-react";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const { data } = await api.get("/shipments");
      setShipments(data.shipments);
    } catch (err) {
      setError("Failed to load shipments");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: "Total Shipments",
      value: shipments.length,
      icon: Package,
      color: "text-[#E53935]",
      bg: "bg-[#E53935]/10",
    },
    {
      label: "In Transit",
      value: shipments.filter((s) => s.status === "active").length,
      icon: Truck,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Delivered",
      value: shipments.filter((s) => s.status === "delivered").length,
      icon: ShieldCheck,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      label: "Privacy Protected",
      value: "100%",
      icon: ShieldCheck,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
  ];

  const stageColor = {
    warehouse: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    hub: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    delivery: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    delivered: "bg-green-500/10 text-green-400 border-green-500/20",
  };

  const navItems = [
    { icon: Package, label: "Shipments", path: "/admin/dashboard", active: true },
    { icon: Users, label: "Users", path: "/admin/users", active: false },
    { icon: QrCode, label: "Scan QR", path: "/scan", active: false },
    { icon: FileText, label: "Audit Logs", path: "/admin/audit", active: false },
    { icon: TrendingUp, label: "Analytics", path: "/admin/analytics", active: false },
  ];

  return (
    <div className="min-h-screen bg-[#0B0D14] text-white flex">

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-[220px] bg-[#161B22] border-r border-[#232A33] flex flex-col z-10">

        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#232A33]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#E53935] rounded-lg flex items-center justify-center">
              <ShieldCheck size={16} className="text-white" />
            </div>
            <div>
              <p className="text-[14px] font-extrabold text-white leading-none">RevealQR</p>
              <p className="text-[9px] text-gray-500 mt-0.5">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
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

        {/* User */}
        <div className="px-3 py-4 border-t border-[#232A33]">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#0F1117]">
            <div className="w-7 h-7 rounded-full bg-[#E53935]/20 flex items-center justify-center text-[11px] font-bold text-[#E53935]">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-gray-500 capitalize">{user?.role}</p>
            </div>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-red-400 transition-colors"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>

      </div>

      {/* Main */}
      <div className="ml-[220px] flex-1 p-8">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[22px] font-extrabold text-white">Dashboard</h1>
            <p className="text-[13px] text-gray-500 mt-0.5">
              Welcome back, {user?.name}
            </p>
          </div>
          <div className="flex items-center gap-3">
            
            <button
              onClick={() => navigate("/admin/shipments")}
              className="flex items-center gap-2 bg-[#E53935] hover:bg-[#C62828] text-white text-[13px] font-semibold px-4 py-2 rounded-xl transition-all"
            >
              <Package size={15} />
              New Shipment
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#161B22] border border-[#232A33] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] text-gray-500 uppercase tracking-[2px]">{s.label}</p>
                <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                  <s.icon size={16} className={s.color} />
                </div>
              </div>
              <p className="text-[28px] font-extrabold text-white">
                {loading ? "—" : s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Shipments table */}
        <div className="bg-[#161B22] border border-[#232A33] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#232A33]">
            <h2 className="text-[15px] font-bold text-white">All Shipments</h2>
            <button
              onClick={() => navigate("/admin/shipments")}
              className="text-[12px] text-[#E53935] hover:text-red-400 font-semibold"
            >
              Manage →
            </button>
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
          ) : shipments.length === 0 ? (
            <div className="text-center py-16">
              <Package size={32} className="text-gray-700 mx-auto mb-3" />
              <p className="text-[13px] text-gray-500">No shipments yet</p>
              <button
                onClick={() => navigate("/admin/shipments")}
                className="mt-4 text-[12px] text-[#E53935] hover:text-red-400 font-semibold"
              >
                Create first shipment →
              </button>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#232A33]">
                  {["Tracking", "Customer", "Destination", "Stage", "Status", "Action"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-[2px] text-gray-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shipments.slice(0, 8).map((s, i) => (
                  <tr
                    key={s._id}
                    className={`hover:bg-[#1E2530] transition-colors ${
                      i !== shipments.slice(0, 8).length - 1 ? "border-b border-[#232A33]/50" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="text-[13px] font-bold text-white">
                        {s.trackingNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px] text-white">
                        {s.customer?.name || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px] text-gray-400">{s.destination}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${stageColor[s.stage]}`}>
                        {s.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[11px] font-bold ${
                        s.status === "delivered" ? "text-green-400" : "text-blue-400"
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate("/scan")}
                        className="flex items-center gap-1.5 text-[11px] font-semibold text-[#E53935] hover:text-red-400"
                      >
                        <QrCode size={13} />
                        Scan
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

export default AdminDashboard;