import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import ShipmentQR from "../../components/ShipmentQR";

import { useAuth } from "../../context/AuthContext";
import {
  Package, ShieldCheck, ArrowLeft,
  Plus, QrCode, Trash2, RefreshCw,
} from "lucide-react";

const stages = ["warehouse", "hub", "delivery", "delivered"];

const ManageShipments = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
  trackingNumber: "",
  orderId: "",
  destination: "",
  weight: "",
  customer: { name: "", phone: "", address: "", city: "", area: "" },
});

  useEffect(() => { fetchShipments(); }, []);

  const fetchShipments = async () => {
    try {
      const { data } = await api.get("/shipments");
      setShipments(data.shipments);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/shipments", form);
      setShowForm(false);
      setForm({
        trackingNumber: "", orderId: "", destination: "", weight: "",
        customer: { name: "", phone: "", address: "" },
      });
      fetchShipments();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create shipment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStageUpdate = async (id, stage) => {
    try {
      await api.patch(`/shipments/${id}/stage`, { stage });
      fetchShipments();
    } catch (err) {
      alert("Failed to update stage");
    }
  };

  const stageColor = {
    warehouse: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    hub: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    delivery: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    delivered: "bg-green-500/10 text-green-400 border-green-500/20",
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
              <p className="text-[14px] font-extrabold text-white leading-none">RevealQR</p>
              <p className="text-[9px] text-gray-500 mt-0.5">Admin Dashboard</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { icon: Package, label: "Dashboard", path: "/admin/dashboard" },
            { icon: Package, label: "Shipments", path: "/admin/shipments", active: true },
            { icon: QrCode, label: "Scan QR", path: "/scan" },
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
              <p className="text-[10px] text-gray-500">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="ml-[220px] flex-1 p-8">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-[22px] font-extrabold text-white">Manage Shipments</h1>
              <p className="text-[13px] text-gray-500 mt-0.5">Create and manage all shipments</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-[#E53935] hover:bg-[#C62828] text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl transition-all"
          >
            <Plus size={15} />
            New Shipment
          </button>
        </div>

        {/* Create form */}
        {showForm && (
          <div className="bg-[#161B22] border border-[#232A33] rounded-2xl p-6 mb-6">
            <h2 className="text-[15px] font-bold text-white mb-5">Create New Shipment</h2>
            <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4">
              {[
                { label: "Tracking Number", key: "trackingNumber", placeholder: "RQ-2026-001" },
                { label: "Order ID", key: "orderId", placeholder: "ORD-123456" },
                { label: "Destination", key: "destination", placeholder: "Mumbai" },
                { label: "Weight", key: "weight", placeholder: "2.4 kg" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-[11px] font-bold uppercase tracking-[2px] text-gray-500 mb-1.5 block">
                    {f.label}
                  </label>
                  <input
                    required
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full bg-[#0F1117] border border-[#232A33] rounded-xl px-4 py-2.5 text-[13px] text-white placeholder-gray-600 outline-none focus:border-[#E53935] transition-colors"
                  />
                </div>
              ))}
                            <div className="col-span-2">
                <p className="text-[11px] font-bold uppercase tracking-[2px] text-gray-500 mb-3">
                  Customer Info
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Name", key: "name", placeholder: "Akanksha Jaiswal", required: true },
                    { label: "Phone", key: "phone", placeholder: "+91 98765 43210", required: true },
                    { label: "City", key: "city", placeholder: "Phagwara", required: false },
                    { label: "Area", key: "area", placeholder: "Near LPU Gate 2", required: false },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="text-[10px] text-gray-500 mb-1 block">{f.label}</label>
                      <input
                        required={f.required}
                        placeholder={f.placeholder}
                        value={form.customer[f.key] || ""}
                        onChange={(e) => setForm({
                          ...form,
                          customer: { ...form.customer, [f.key]: e.target.value }
                        })}
                        className="w-full bg-[#0F1117] border border-[#232A33] rounded-xl px-3 py-2.5 text-[13px] text-white placeholder-gray-600 outline-none focus:border-[#E53935] transition-colors"
                      />
                    </div>
                  ))}
                  <div className="col-span-2">
                    <label className="text-[10px] text-gray-500 mb-1 block">Full Address</label>
                    <input
                      required
                      placeholder="Lovely Professional University, Phagwara, Punjab"
                      value={form.customer.address || ""}
                      onChange={(e) => setForm({
                        ...form,
                        customer: { ...form.customer, address: e.target.value }
                      })}
                      className="w-full bg-[#0F1117] border border-[#232A33] rounded-xl px-3 py-2.5 text-[13px] text-white placeholder-gray-600 outline-none focus:border-[#E53935] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 bg-[#E53935] hover:bg-[#C62828] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-[13px] transition-all"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : <Plus size={14} />}
                  Create Shipment
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 rounded-xl border border-[#232A33] text-gray-400 hover:text-white text-[13px] font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Shipments table */}
        <div className="bg-[#161B22] border border-[#232A33] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#232A33]">
            <h2 className="text-[15px] font-bold text-white">
              All Shipments ({shipments.length})
            </h2>
            <button onClick={fetchShipments} className="text-gray-500 hover:text-white transition-colors">
              <RefreshCw size={15} />
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 rounded-full border-4 border-[#E53935]/20 border-t-[#E53935] animate-spin" />
            </div>
          ) : shipments.length === 0 ? (
            <div className="text-center py-16">
              <Package size={32} className="text-gray-700 mx-auto mb-3" />
              <p className="text-[13px] text-gray-500">No shipments yet. Create one above.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#232A33]">
                  {["Tracking", "Customer", "Destination", "Stage", "Update Stage", "QR"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-[2px] text-gray-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shipments.map((s, i) => (
                  <tr
                    key={s._id}
                    className={`hover:bg-[#1E2530] transition-colors ${
                      i !== shipments.length - 1 ? "border-b border-[#232A33]/50" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="text-[13px] font-bold text-white">{s.trackingNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px] text-white">{s.customer?.name}</span>
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
                      <select
                        value={s.stage}
                        onChange={(e) => handleStageUpdate(s._id, e.target.value)}
                        className="bg-[#0F1117] border border-[#232A33] rounded-lg px-2 py-1.5 text-[12px] text-white outline-none focus:border-[#E53935] cursor-pointer"
                      >
                        {stages.map((stage) => (
                          <option key={stage} value={stage}>{stage}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedShipment(s)}
                      className="flex items-center gap-1.5 text-[11px] font-semibold text-[#E53935] hover:text-red-400"
                    >
                      <QrCode size={13} />
                      View QR
                    </button>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
       {selectedShipment && (
        <ShipmentQR
          shipment={selectedShipment}
          onClose={() => setSelectedShipment(null)}
        />
      )}
    </div>
  );
};

export default ManageShipments;