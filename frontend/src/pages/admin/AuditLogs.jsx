import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import {
  ShieldCheck, FileText,
  ArrowLeft, RefreshCw, AlertCircle,
} from "lucide-react";

const AuditLogs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { fetchLogs(); }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/audit");
      setLogs(data.logs);
    } catch {
      setError("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  const roleColor = {
    admin: "text-[#E53935] bg-[#E53935]/10 border-[#E53935]/20",
    warehouse: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    hub: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    delivery: "text-green-400 bg-green-400/10 border-green-400/20",
  };

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
              <p className="text-[9px] text-gray-500 mt-0.5">Admin Dashboard</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { icon: ShieldCheck, label: "Dashboard", path: "/admin/dashboard" },
            { icon: FileText, label: "Audit Logs", path: "/admin/audit", active: true },
          ].map((item) => (
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
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="ml-[220px] flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/admin/dashboard")} className="text-gray-500 hover:text-white">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-[22px] font-extrabold">Audit Logs</h1>
              <p className="text-[13px] text-gray-500 mt-0.5">Every QR scan recorded</p>
            </div>
          </div>
          <button onClick={fetchLogs} className="w-9 h-9 rounded-xl bg-[#161B22] border border-[#232A33] flex items-center justify-center text-gray-400 hover:text-white">
            <RefreshCw size={15} />
          </button>
        </div>

        <div className="bg-[#161B22] border border-[#232A33] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#232A33]">
            <h2 className="text-[15px] font-bold">All Scan Events ({logs.length})</h2>
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
          ) : logs.length === 0 ? (
            <div className="text-center py-16">
              <FileText size={32} className="text-gray-700 mx-auto mb-3" />
              <p className="text-[13px] text-gray-500">No scan events yet</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#232A33]">
                  {["Package", "Scanned By", "Role", "Action", "Data Revealed", "Time"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-[2px] text-gray-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr
                    key={log._id}
                    className={`hover:bg-[#1E2530] transition-colors ${
                      i !== logs.length - 1 ? "border-b border-[#232A33]/50" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="text-[13px] font-bold text-white">
                        {log.shipment?.trackingNumber || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px] text-gray-300">
                        {log.scannedBy?.name || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border capitalize ${roleColor[log.role]}`}>
                        {log.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px] text-gray-400">{log.action}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[12px] text-gray-500">
                        {log.dataRevealed?.join(", ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[12px] text-gray-500">
                        {new Date(log.createdAt).toLocaleString()}
                      </span>
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

export default AuditLogs;