import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Eye, EyeOff,
  Package, Building2, Truck, UserPlus,
} from "lucide-react";
const roles = [
  {
    id: "warehouse",
    label: "Warehouse",
    icon: Package,
    desc: "Package processing",
    activeColor: "border-blue-500 bg-blue-500/10",
    iconColor: "bg-blue-500/10 text-blue-400",
  },
  {
    id: "hub",
    label: "Hub Operator",
    icon: Building2,
    desc: "Sorting & routing",
    activeColor: "border-amber-500 bg-amber-500/10",
    iconColor: "bg-amber-500/10 text-amber-400",
  },
  {
    id: "delivery",
    label: "Delivery Partner",
    icon: Truck,
    desc: "Last mile delivery",
    activeColor: "border-green-500 bg-green-500/10",
    iconColor: "bg-green-500/10 text-green-400",
  },
];

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("warehouse");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const activeRole = roles.find((r) => r.id === selectedRole);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      // Register the user
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: selectedRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      // Auto-login after register
      const user = await login(email, password);
      const redirect = {
        admin: "/admin/dashboard",
        warehouse: "/warehouse/dashboard",
        hub: "/hub/dashboard",
        delivery: "/delivery/dashboard",
      };
      navigate(redirect[user.role] || "/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D14] flex items-center justify-center px-4 py-16">

      {/* Grid bg */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1B222C_1px,transparent_1px),linear-gradient(to_bottom,#1B222C_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-[#E53935] rounded-lg flex items-center justify-center">
              <ShieldCheck size={20} className="text-white" />
            </div>
            <span className="text-xl font-extrabold text-white">RevealQR</span>
          </div>
          <p className="text-[13px] text-gray-500">Privacy-First Logistics Platform</p>
        </div>

        {/* Card */}
        <div className="bg-[#161B22] rounded-2xl border border-[#232A33] overflow-hidden">

          {/* Header */}
          <div className="px-6 pt-6 pb-5 border-b border-[#232A33]">
            <h1 className="text-[18px] font-bold text-white">Create your account</h1>
            <p className="text-[13px] text-gray-500 mt-1">Select your role to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">

            {/* Role selector */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[2px] text-gray-500 mb-3">
                Your Role
              </p>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isActive = selectedRole === role.id;
                  return (
                    <button
                      type="button"
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all ${
                        isActive
                          ? role.activeColor
                          : "border-[#232A33] bg-[#0F1117] hover:border-gray-600"
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isActive ? role.iconColor : "bg-gray-800 text-gray-500"
                      }`}>
                        <Icon size={14} />
                      </div>
                      <div>
                        <p className={`text-[12px] font-bold leading-none ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}>
                          {role.label}
                        </p>
                        <p className="text-[10px] text-gray-600 mt-0.5">{role.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[2px] text-gray-500 mb-2 block">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
                className="w-full bg-[#0F1117] border border-[#232A33] rounded-xl px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none focus:border-[#E53935] transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[2px] text-gray-500 mb-2 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full bg-[#0F1117] border border-[#232A33] rounded-xl px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none focus:border-[#E53935] transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[2px] text-gray-500 mb-2 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                  className="w-full bg-[#0F1117] border border-[#232A33] rounded-xl px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none focus:border-[#E53935] transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[2px] text-gray-500 mb-2 block">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  className="w-full bg-[#0F1117] border border-[#232A33] rounded-xl px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none focus:border-[#E53935] transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
                <p className="text-[12px] text-red-400">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#C62828] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl text-[14px] transition-all hover:-translate-y-0.5 shadow-lg shadow-red-900/30"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus size={15} />
                  Create Account as {activeRole.label}
                </>
              )}
            </button>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[12px] text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#E53935] hover:text-red-400 font-semibold">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;