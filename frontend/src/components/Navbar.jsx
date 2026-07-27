import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);

      return;
    }

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#242A33] bg-[#0B0D14]/90 shadow-2xl backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}

        <div
          onClick={() => navigate("/")}
          className="flex cursor-pointer items-center gap-4"
        >
          <div className="relative grid h-11 w-11 grid-cols-2 grid-rows-2 gap-1 rounded-lg bg-[#161B22] border border-[#E53935]/30 p-1.5 shadow-lg shadow-red-900/20">
            <div className="rounded-sm bg-[#E53935]" />
            <div className="rounded-sm bg-[#232A33]" />
            <div className="rounded-sm bg-[#232A33]" />
            <div className="rounded-sm bg-[#E53935]/40" />
          </div>

          <div>

            <h1 className="text-2xl font-extrabold tracking-wide text-white">
              RevealQR
            </h1>

            <p className="text-[11px] uppercase tracking-[3px] text-gray-400">
              Privacy First Logistics
            </p>

          </div>

        </div>

        {/* Navigation */}

        <ul className="hidden items-center gap-10 text-[15px] font-medium lg:flex">

          <li
            onClick={() => scrollToSection("features")}
            className="group relative cursor-pointer text-gray-300 transition duration-300 hover:text-white"
          >
            Features

            <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#E53935] transition-all duration-300 group-hover:w-full" />
          </li>

          <li
            onClick={() => scrollToSection("how it works")}
            className="group relative cursor-pointer text-gray-300 transition duration-300 hover:text-white"
          >
            How it Works

            <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#E53935] transition-all duration-300 group-hover:w-full" />
          </li>

          <li
            onClick={() => scrollToSection("privacy")}
            className="group relative cursor-pointer text-gray-300 transition duration-300 hover:text-white"
          >
            Privacy

            <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#E53935] transition-all duration-300 group-hover:w-full" />
          </li>

          <li
            onClick={() => scrollToSection("contact")}
            className="group relative cursor-pointer text-gray-300 transition duration-300 hover:text-white"
          >
            Contact

            <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#E53935] transition-all duration-300 group-hover:w-full" />
          </li>

        </ul>

        {/* Buttons */}

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/login")}
            className="rounded-md border border-[#343B45] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#0B0D14]"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="rounded-md bg-[#E53935] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C62828] hover:shadow-red-600/40"
          >
            Request Demo
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;