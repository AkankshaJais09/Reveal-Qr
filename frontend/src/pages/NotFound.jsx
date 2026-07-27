import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0B0D14] flex items-center justify-center text-white">
      <div className="text-center">
        <p className="text-[80px] font-extrabold text-[#E53935] leading-none">404</p>
        <p className="text-[20px] font-bold text-white mt-4">Page not found</p>
        <p className="text-[14px] text-gray-500 mt-2">This page doesn't exist or you don't have access.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-8 flex items-center gap-2 bg-[#E53935] hover:bg-[#C62828] text-white font-bold px-6 py-3 rounded-xl text-[14px] transition-all mx-auto"
        >
          <ShieldCheck size={16} />
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;