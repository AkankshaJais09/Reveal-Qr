import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Send, CheckCircle2, ShieldCheck, MessageSquare, XCircle } from "lucide-react";

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const GithubIcon = ({ size = 17, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function Contact() {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setSendError("");
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "ed438582-15bf-480f-8e7f-776c8f5b52a8", 
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setSent(true);
    } else {
      setSendError("Failed to send. Please email us at anjyo0922@gmail.com");
    }
  } catch {
    setSendError("Failed to send. Please email us at anjyo0922@gmail.com");
  } finally {
    setLoading(false);
  }
};

  const contactInfo = [
    {
      icon: Mail,
      label: "Email Us",
      value: "anjyo0922@gmail.com",
      sub: "We reply within 24 hours",
    },
  ];

  const GITHUB_URL = "https://github.com/AkankshaJais09/Reveal-Qr";

  return (
    <section id="contact" className="relative bg-[#0B0D14] text-white py-24 px-6 overflow-hidden">

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1B222C_1px,transparent_1px),linear-gradient(to_bottom,#1B222C_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E53935]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E53935]/30 bg-[#E53935]/10 px-4 py-1.5 text-[12px] font-semibold text-[#E53935] mb-5">
            <MessageSquare size={13} />
            Get In Touch
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            We'd love to <span className="text-[#E53935]">hear</span> from you
          </h2>
          <p className="mt-4 text-[15px] text-gray-400 max-w-xl mx-auto leading-relaxed">
            Have questions about RevealQR? Reach out and we'll respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          <div className="lg:col-span-2 space-y-4">

            {contactInfo.map((c) => (
              <div
                key={c.label}
                className="flex items-start gap-4 bg-[#161B22] border border-[#232A33] rounded-2xl px-6 py-5 hover:border-[#E53935]/30 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E53935]/10 border border-[#E53935]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <c.icon size={17} className="text-[#E53935]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[2px] text-gray-500 mb-0.5">{c.label}</p>
                  <p className="text-[14px] font-bold text-white">{c.value}</p>
                  <p className="text-[12px] text-gray-500 mt-0.5">{c.sub}</p>
                </div>
              </div>
            ))}

            <div className="bg-[#161B22] border border-[#232A33] rounded-2xl px-6 py-5 hover:border-[#E53935]/30 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#E53935]/10 border border-[#E53935]/20 flex items-center justify-center flex-shrink-0">
                  <GithubIcon size={17} className="text-[#E53935]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[2px] text-gray-500 mb-0.5">Open Source</p>
                  <p className="text-[14px] font-bold text-white">RevealQR on GitHub</p>
                </div>
              </div>
              <div className="space-y-2.5">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full bg-[#0F1117] border border-[#232A33] hover:border-[#E53935]/40 rounded-xl px-4 py-2.5 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon size={14} className="text-gray-400 group-hover:text-white transition-colors" />
                    <span className="text-[13px] font-semibold text-gray-300 group-hover:text-white transition-colors">View on GitHub</span>
                  </div>
                  <span className="text-[11px] text-[#E53935] font-bold">→</span>
                </a>
                <a
                  href={`${GITHUB_URL}/stargazers`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full bg-[#0F1117] border border-[#232A33] hover:border-yellow-500/40 rounded-xl px-4 py-2.5 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-yellow-500 text-[15px] leading-none">★</span>
                    <span className="text-[13px] font-semibold text-gray-300 group-hover:text-white transition-colors">Star the project</span>
                  </div>
                  <span className="text-[11px] text-yellow-500 font-bold">★</span>
                </a>
              </div>

            </div>

            <div className="flex items-center gap-3 bg-[#161B22] border border-[#232A33] rounded-2xl px-6 py-4">
              <ShieldCheck size={17} className="text-green-400 flex-shrink-0" />
              <p className="text-[12px] text-gray-400 leading-relaxed">
                Your data is <span className="text-white font-semibold">never shared</span>. We only use it to respond to your inquiry.
              </p>
            </div>

          </div>

          <div className="lg:col-span-3 bg-[#161B22] border border-[#232A33] rounded-2xl p-7">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <CheckCircle2 size={30} className="text-green-400" />
                </div>
                <h3 className="text-[18px] font-bold text-white">Message Sent!</h3>
                <p className="text-[13px] text-gray-400 max-w-xs">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-2 text-[13px] font-bold text-[#E53935] hover:underline"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[2px] text-gray-500 mb-2">
                    Your Name
                  </label>
                  <input
                    required
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#0F1117] border border-[#232A33] rounded-xl px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none focus:border-[#E53935] transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[2px] text-gray-500 mb-2">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#0F1117] border border-[#232A33] rounded-xl px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none focus:border-[#E53935] transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[2px] text-gray-500 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#0F1117] border border-[#232A33] rounded-xl px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none focus:border-[#E53935] transition-colors duration-200 resize-none"
                  />
                </div>
                <div className="flex flex-col items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2.5 bg-[#E53935] hover:bg-[#C62828] disabled:opacity-60 text-white font-bold px-8 py-3.5 rounded-xl text-[14px] transition-all duration-200 shadow-lg shadow-red-900/20 hover:-translate-y-0.5"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                  {sendError && (
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 w-full">
                      <XCircle size={14} className="text-red-400 flex-shrink-0" />
                      <p className="text-[12px] text-red-400">{sendError}</p>
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}