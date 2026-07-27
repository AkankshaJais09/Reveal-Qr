import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import {
  Package, ShieldCheck, TrendingUp, Users,
  QrCode, FileText, LogOut, BarChart2,
  CheckCircle2, Truck, AlertCircle, MapPin,
  Clock, ArrowUpRight,
} from "lucide-react";

const Analytics = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/shipments");
      setShipments(data.shipments || []);
    } catch {
      setError("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  // ── Computed stats ──────────────────────────────────────
  const total = shipments.length;
  const byStage = {
    warehouse: shipments.filter((s) => s.stage === "warehouse").length,
    hub:       shipments.filter((s) => s.stage === "hub").length,
    delivery:  shipments.filter((s) => s.stage === "delivery").length,
    delivered: shipments.filter((s) => s.stage === "delivered").length,
  };
  const deliveryRate = total > 0
    ? Math.round((byStage.delivered / total) * 100)
    : 0;
  const activeCount = shipments.filter((s) => s.status === "active").length;

  // Top 5 destinations
  const destMap = {};
  shipments.forEach((s) => {
    if (s.destination) destMap[s.destination] = (destMap[s.destination] || 0) + 1;
  });
  const topDest = Object.entries(destMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxDestCount = topDest[0]?.[1] || 1;

  // Stage bar chart data
  const stageData = [
    { label: "Warehouse", count: byStage.warehouse, color: "#3B82F6", bg: "bg-blue-500" },
    { label: "Hub",       count: byStage.hub,       color: "#F59E0B", bg: "bg-amber-400" },
    { label: "Delivery",  count: byStage.delivery,  color: "#A855F7", bg: "bg-purple-500" },
    { label: "Delivered", count: byStage.delivered, color: "#22C55E", bg: "bg-green-500" },
  ];
  const maxStageCount = Math.max(...stageData.map((d) => d.count), 1);

  const navItems = [
    { icon: Package,    label: "Shipments", path: "/admin/dashboard" },
    { icon: Users,      label: "Users",     path: "/admin/users" },
    { icon: QrCode,     label: "Scan QR",   path: "/scan" },
    { icon: FileText,   label: "Audit Logs",path: "/admin/audit" },
    { icon: TrendingUp, label: "Analytics", path: "/admin/analytics", active: true },
  ];

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
              <p className="text-[14px] font-extrabold text-white leading-none">RevealQR</p>
              <p className="text-[9px] text-gray-500 mt-0.5">Admin Dashboard</p>
            </div>
          </div>
        </div>
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
        <div className="px-3 py-4 border-t border-[#232A33]">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#0F1117]">
            <div className="w-7 h-7 rounded-full bg-[#E53935]/20 flex items-center justify-center text-[11px] font-bold text-[#E53935]">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-gray-500 capitalize">{user?.role}</p>
            </div>
            <button onClick={logout} className="text-gray-600 hover:text-red-400 transition-colors">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="ml-[220px] flex-1 p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[22px] font-extrabold text-white flex items-center gap-2">
              <BarChart2 size={22} className="text-[#E53935]" />
              Analytics
            </h1>
            <p className="text-[13px] text-gray-500 mt-0.5">Shipment performance & delivery insights</p>
          </div>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 bg-[#161B22] border border-[#232A33] hover:border-[#E53935]/40 text-gray-400 hover:text-white text-[12px] font-semibold px-4 py-2 rounded-xl transition-all"
          >
            <ArrowUpRight size={13} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-10 h-10 rounded-full border-4 border-[#E53935]/20 border-t-[#E53935] animate-spin" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center gap-2 py-32 text-red-400">
            <AlertCircle size={18} />
            <p className="text-[14px]">{error}</p>
          </div>
        ) : (
          <>
            {/* KPI cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "Total Shipments",
                  value: total,
                  icon: Package,
                  color: "text-[#E53935]",
                  bg: "bg-[#E53935]/10",
                  border: "border-[#E53935]/20",
                  sub: "All time",
                },
                {
                  label: "Active",
                  value: activeCount,
                  icon: Truck,
                  color: "text-blue-400",
                  bg: "bg-blue-500/10",
                  border: "border-blue-500/20",
                  sub: "In transit",
                },
                {
                  label: "Delivered",
                  value: byStage.delivered,
                  icon: CheckCircle2,
                  color: "text-green-400",
                  bg: "bg-green-500/10",
                  border: "border-green-500/20",
                  sub: "Completed",
                },
                {
                  label: "Delivery Rate",
                  value: `${deliveryRate}%`,
                  icon: TrendingUp,
                  color: "text-amber-400",
                  bg: "bg-amber-400/10",
                  border: "border-amber-500/20",
                  sub: "Success rate",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`bg-[#161B22] border ${s.border} rounded-2xl p-5 relative overflow-hidden`}
                >
                  <div className={`absolute -right-3 -top-3 w-16 h-16 rounded-full ${s.bg} opacity-40`} />
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[11px] text-gray-500 uppercase tracking-[2px]">{s.label}</p>
                    <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                      <s.icon size={15} className={s.color} />
                    </div>
                  </div>
                  <p className={`text-[30px] font-extrabold ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] text-gray-600 mt-1">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">

              {/* Stage Distribution Bar Chart */}
              <div className="bg-[#161B22] border border-[#232A33] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-[14px] font-bold text-white">Stage Distribution</h2>
                    <p className="text-[11px] text-gray-500 mt-0.5">Shipments per pipeline stage</p>
                  </div>
                  <BarChart2 size={16} className="text-gray-600" />
                </div>
                <div className="space-y-4">
                  {stageData.map((d) => (
                    <div key={d.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[12px] text-gray-400 font-semibold">{d.label}</span>
                        <span className="text-[12px] font-bold text-white">{d.count}</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: total > 0 ? `${(d.count / maxStageCount) * 100}%` : "0%",
                            backgroundColor: d.color,
                          }}
                        />
                      </div>
                      <p className="text-[10px] text-gray-600 mt-1">
                        {total > 0 ? Math.round((d.count / total) * 100) : 0}% of total
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Rate Gauge */}
              <div className="bg-[#161B22] border border-[#232A33] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-[14px] font-bold text-white">Delivery Rate</h2>
                    <p className="text-[11px] text-gray-500 mt-0.5">Overall success breakdown</p>
                  </div>
                  <TrendingUp size={16} className="text-gray-600" />
                </div>

                {/* Donut chart via SVG */}
                <div className="flex items-center gap-6">
                  <div className="relative flex-shrink-0">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      {/* Background circle */}
                      <circle cx="60" cy="60" r="48" fill="none" stroke="#1E2530" strokeWidth="14" />
                      {/* Delivered arc */}
                      <circle
                        cx="60" cy="60" r="48"
                        fill="none"
                        stroke="#22C55E"
                        strokeWidth="14"
                        strokeDasharray={`${(deliveryRate / 100) * 301.59} 301.59`}
                        strokeLinecap="round"
                        transform="rotate(-90 60 60)"
                        style={{ transition: "stroke-dasharray 0.8s ease" }}
                      />
                      {/* Active arc */}
                      <circle
                        cx="60" cy="60" r="48"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="14"
                        strokeDasharray={`${(activeCount / Math.max(total, 1)) * 301.59} 301.59`}
                        strokeLinecap="round"
                        strokeDashoffset={`-${(deliveryRate / 100) * 301.59}`}
                        transform="rotate(-90 60 60)"
                        style={{ transition: "stroke-dasharray 0.8s ease" }}
                      />
                      <text x="60" y="55" textAnchor="middle" fill="white" fontSize="18" fontWeight="800">
                        {deliveryRate}%
                      </text>
                      <text x="60" y="70" textAnchor="middle" fill="#6B7280" fontSize="9">
                        delivered
                      </text>
                    </svg>
                  </div>

                  <div className="flex-1 space-y-3">
                    {[
                      { label: "Delivered", count: byStage.delivered, color: "bg-green-500", textColor: "text-green-400" },
                      { label: "Active",    count: activeCount,       color: "bg-blue-500",  textColor: "text-blue-400" },
                      { label: "At Hub",    count: byStage.hub,       color: "bg-amber-400", textColor: "text-amber-400" },
                      { label: "Warehouse", count: byStage.warehouse, color: "bg-purple-500",textColor: "text-purple-400" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${item.color}`} />
                          <span className="text-[12px] text-gray-400">{item.label}</span>
                        </div>
                        <span className={`text-[12px] font-bold ${item.textColor}`}>{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">

              {/* Top Destinations */}
              <div className="bg-[#161B22] border border-[#232A33] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-[14px] font-bold text-white">Top Destinations</h2>
                    <p className="text-[11px] text-gray-500 mt-0.5">Most frequent delivery cities</p>
                  </div>
                  <MapPin size={16} className="text-gray-600" />
                </div>
                {topDest.length === 0 ? (
                  <p className="text-[13px] text-gray-600 text-center py-8">No data yet</p>
                ) : (
                  <div className="space-y-3">
                    {topDest.map(([dest, count], idx) => (
                      <div key={dest} className="flex items-center gap-3">
                        <span className="text-[11px] font-bold text-gray-600 w-4">{idx + 1}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[12px] text-white font-semibold">{dest}</span>
                            <span className="text-[11px] text-gray-500">{count} pkg{count > 1 ? "s" : ""}</span>
                          </div>
                          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#E53935] to-[#FF7043] rounded-full"
                              style={{ width: `${(count / maxDestCount) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pipeline Health */}
              <div className="bg-[#161B22] border border-[#232A33] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-[14px] font-bold text-white">Pipeline Health</h2>
                    <p className="text-[11px] text-gray-500 mt-0.5">Current shipment flow status</p>
                  </div>
                  <Clock size={16} className="text-gray-600" />
                </div>
                <div className="space-y-3">
                  {[
                    {
                      label: "Warehouse → Hub pending",
                      value: byStage.warehouse,
                      status: byStage.warehouse > 5 ? "High" : byStage.warehouse > 2 ? "Medium" : "Low",
                      statusColor: byStage.warehouse > 5 ? "text-red-400" : byStage.warehouse > 2 ? "text-amber-400" : "text-green-400",
                    },
                    {
                      label: "Hub → Delivery pending",
                      value: byStage.hub,
                      status: byStage.hub > 5 ? "High" : byStage.hub > 2 ? "Medium" : "Low",
                      statusColor: byStage.hub > 5 ? "text-red-400" : byStage.hub > 2 ? "text-amber-400" : "text-green-400",
                    },
                    {
                      label: "Out for delivery",
                      value: byStage.delivery,
                      status: "Active",
                      statusColor: "text-purple-400",
                    },
                    {
                      label: "Successfully delivered",
                      value: byStage.delivered,
                      status: "Complete",
                      statusColor: "text-green-400",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-xl bg-[#0F1117] border border-[#232A33] px-4 py-3">
                      <div className="flex-1">
                        <p className="text-[12px] text-gray-400">{item.label}</p>
                        <p className={`text-[10px] font-bold mt-0.5 ${item.statusColor}`}>{item.status}</p>
                      </div>
                      <span className="text-[20px] font-extrabold text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;
