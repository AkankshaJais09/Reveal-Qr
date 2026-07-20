function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 text-slate-950 font-bold">
            QR
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              RevealQR
            </h1>

            <p className="text-xs text-slate-400">
              Privacy First Logistics
            </p>
          </div>
        </div>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-slate-300">
          <li className="cursor-pointer transition hover:text-cyan-400">
            Features
          </li>

          <li className="cursor-pointer transition hover:text-cyan-400">
            How It Works
          </li>

          <li className="cursor-pointer transition hover:text-cyan-400">
            Login
          </li>
        </ul>

        {/* Button */}
        <button className="rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400">
          Get Started
        </button>

      </div>
    </nav>
  );
}

export default Navbar;