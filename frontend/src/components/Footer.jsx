import { ShieldCheck } from "lucide-react";

const GITHUB_URL = "https://github.com/AkankshaJais09/Reveal-Qr";

const GithubIcon = ({ size = 15, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0B0D14] border-t border-[#232A33] text-gray-500 overflow-hidden">

      {/* Subtle grid bg */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1B222C_1px,transparent_1px),linear-gradient(to_bottom,#1B222C_1px,transparent_1px)] bg-[size:60px_60px] opacity-10 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <div className="grid h-9 w-9 grid-cols-2 grid-rows-2 gap-1 rounded-lg bg-[#161B22] border border-[#E53935]/30 p-1.5">
                <div className="rounded-sm bg-[#E53935]" />
                <div className="rounded-sm bg-[#232A33]" />
                <div className="rounded-sm bg-[#232A33]" />
                <div className="rounded-sm bg-[#E53935]/40" />
              </div>
              <span className="text-[17px] font-extrabold text-white tracking-wide">RevealQR</span>
            </div>
            <p className="text-[13px] leading-relaxed text-gray-500 max-w-[200px]">
              Privacy-first logistics tracking powered by dynamic QR technology.
            </p>
            <div className="flex items-center gap-1.5 mt-4">
              <ShieldCheck size={13} className="text-[#E53935]" />
              <span className="text-[11px] font-semibold text-[#E53935] uppercase tracking-[1.5px]">Privacy First</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[2px] text-gray-400 mb-4">Product</h4>
            <ul className="space-y-3">
              {[
                { label: "Features",   id: "features" },
                { label: "How it Works", id: "how it works" },
                { label: "Privacy",    id: "privacy" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="text-[13px] text-gray-500 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[2px] text-gray-400 mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollTo("contact")}
                  className="text-[13px] text-gray-500 hover:text-white transition-colors duration-200"
                >
                  Contact
                </button>
              </li>
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-gray-500 hover:text-white transition-colors duration-200"
                >
                  Open Source
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[2px] text-gray-400 mb-4">Legal</h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <span className="text-[13px] text-gray-500 hover:text-white transition-colors duration-200 cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#232A33] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-gray-600">
            © {new Date().getFullYear()} RevealQR. All rights reserved.
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[12px] text-gray-600 hover:text-white transition-colors duration-200"
          >
            <GithubIcon size={14} />
            AkankshaJais09/Reveal-Qr
          </a>
        </div>

      </div>
    </footer>
  );
}