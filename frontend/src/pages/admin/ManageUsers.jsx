import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import {
  ShieldCheck, Users, ArrowLeft,
  Plus, RefreshCw, AlertCircle,
  Package, Building2, Truck,
} from "lucide-react";

const roleIcon = {
  admin: ShieldCheck,
  warehouse: Package,
  hub: Building2,
  delivery: Truck,
};

const roleColor = {
  admin: "text-[#E53935] bg-[#E53935]/10 border-[#E53935]/20",
  warehouse: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  hub: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  delivery: "text-green-400 bg-green-400/10 border-green-400/20",
};

const ManageUsers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", password: "", role: "warehouse",
  });

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/auth/users");
      setUsers(data.users);
    } catch {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/auth/register", form);
      setShowForm(false);
      setForm({ name: "", email: "", password: "", role: "warehouse" });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create user");
    } finally {
      setSubmitting(false);
    }
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
            { icon: Users, label: "Users", path: "/admin/users", active: true },
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
              <h1 className="text-[22px] font-extrabold">Manage Users</h1>
              <p className="text-[13px] text-gray-500 mt-0.5">Create and manage team accounts</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchUsers} className="w-9 h-9 rounded-xl bg-[#161B22] border border-[#232A33] flex items-center justify-center text-gray-400 hover:text-white">
              <RefreshCw size={15} />
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-[#E53935] hover:bg-[#C62828] text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl"
            >
              <Plus size={15} />
              Add User
            </button>
          </div>
        </div>

        {/* Create form */}
        {showForm && (
          <div className="bg-[#161B22] border border-[#232A33] rounded-2xl p-6 mb-6">
            <h2 className="text-[15px] font-bold mb-5">Create New User</h2>
            <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4">
              {[
                { label: "Full Name", key: "name", type: "text", placeholder: "Rahul Sharma" },
                { label: "Email", key: "email", type: "email", placeholder: "rahul@company.com" },
                { label: "Password", key: "password", type: "password", placeholder: "••••••••" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-[11px] font-bold uppercase tracking-[2px] text-gray-500 mb-1.5 block">
                    {f.label}
                  </label>
                  <input
                    required
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full bg-[#0F1117] border border-[#232A33] rounded-xl px-4 py-2.5 text-[13px] text-white placeholder-gray-600 outline-none focus:border-[#E53935] transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-[2px] text-gray-500 mb-1.5 block">
                  Role
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full bg-[#0F1117] border border-[#232A33] rounded-xl px-4 py-2.5 text-[13px] text-white outline-none focus:border-[#E53935] cursor-pointer"
                >
                  <option value="warehouse">Warehouse</option>
                  <option value="hub">Hub Operator</option>
                  <option value="delivery">Delivery Partner</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 bg-[#E53935] hover:bg-[#C62828] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-[13px]"
                >
                  {submitting
                    ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    : <Plus size={14} />
                  }
                  Create User
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 rounded-xl border border-[#232A33] text-gray-400 hover:text-white text-[13px] font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Users table */}
        <div className="bg-[#161B22] border border-[#232A33] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#232A33]">
            <h2 className="text-[15px] font-bold">All Users ({users.length})</h2>
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
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#232A33]">
                  {["Name", "Email", "Role", "Status", "Created"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-[2px] text-gray-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => {
                  const RoleIcon = roleIcon[u.role] || ShieldCheck;
                  return (
                    <tr
                      key={u._id}
                      className={`hover:bg-[#1E2530] transition-colors ${
                        i !== users.length - 1 ? "border-b border-[#232A33]/50" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${roleColor[u.role]}`}>
                            {u.name?.charAt(0)}
                          </div>
                          <span className="text-[13px] font-semibold text-white">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[13px] text-gray-400">{u.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <RoleIcon size={13} className={roleColor[u.role].split(" ")[0]} />
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border capitalize ${roleColor[u.role]}`}>
                            {u.role}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[11px] font-bold ${u.isActive ? "text-green-400" : "text-red-400"}`}>
                          {u.isActive ? "Active" : "Disabled"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[12px] text-gray-500">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;