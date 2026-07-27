import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import { QrCode, Camera, AlertCircle, ScanLine } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Scan() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const scannerRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [manualId, setManualId] = useState("");

  // If coming from ScanResult "Scan Again" button
  const nextLevel = searchParams.get("next");   // "area" | "door"
  const prevToken = searchParams.get("token");  // original qrToken

  const isDelivery = user?.role === "delivery";

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const handleScannedValue = (decodedText) => {
    // Extract token from URL or use raw value
    let token = decodedText;
    try {
      const url = new URL(decodedText);
      const parts = url.pathname.split("/");
      token = parts[parts.length - 1];
    } catch {}

    // If delivery agent scanning again to advance level
    if (nextLevel && prevToken) {
      // Must be same QR token
      if (token !== prevToken) {
        setStatus("error");
        setError("Wrong QR code. Please scan the same package QR code to advance.");
        return;
      }
      navigate(`/scan/result/${token}?advance=${nextLevel}`);
    } else {
      navigate(`/scan/result/${token}`);
    }
  };

  const startScanner = async () => {
    setError("");
    setStatus("scanning");
    try {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0 },
        (decodedText) => {
          scanner.stop().catch(() => {});
          setStatus("success");
          handleScannedValue(decodedText);
        },
        () => {}
      );
    } catch (err) {
      setStatus("error");
      if (err.toString().includes("Permission")) {
        setError("Camera permission denied. Please allow camera access and try again.");
      } else {
        setError("Could not start camera. Make sure no other app is using it.");
      }
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      await scannerRef.current.stop().catch(() => {});
      scannerRef.current = null;
    }
    setStatus("idle");
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualId.trim()) {
      navigate(`/scan/result/${manualId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D14] flex flex-col items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1B222C_1px,transparent_1px),linear-gradient(to_bottom,#1B222C_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      <div className="relative w-full max-w-sm space-y-6">

        {/* Header */}
        <div className="text-center">
          <div className="w-14 h-14 bg-[#E53935]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            {nextLevel ? <ScanLine size={28} className="text-[#E53935]" /> : <QrCode size={28} className="text-[#E53935]" />}
          </div>
          <h1 className="text-[22px] font-bold text-white">
            {nextLevel ? "Scan Again to Reveal" : "Scan QR Code"}
          </h1>
          <p className="text-[13px] text-gray-500 mt-1">
            {nextLevel
              ? `Point your camera at the same package QR to unlock ${nextLevel} details`
              : "Point your camera at a shipment QR code"}
          </p>
        </div>

        {/* Next level badge */}
        {nextLevel && (
          <div className="flex items-center justify-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3">
            <ScanLine size={14} className="text-blue-400" />
            <p className="text-[12px] text-blue-400 font-bold">
              Unlocking: {nextLevel === "area" ? "Area & Customer Name" : "Full Address & Phone"}
            </p>
          </div>
        )}

        {/* Scanner Box */}
        <div className="bg-[#161B22] border border-[#232A33] rounded-2xl overflow-hidden">
          <div className="relative bg-[#0F1117]" style={{ minHeight: 300 }}>
            <div id="qr-reader" className="w-full" />

            {status === "idle" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-48 h-48 border-2 border-dashed border-[#232A33] rounded-2xl flex items-center justify-center">
                  <Camera size={40} className="text-gray-700" />
                </div>
                <p className="text-[12px] text-gray-600">Camera preview will appear here</p>
              </div>
            )}

            {status === "scanning" && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="relative w-56 h-56">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#E53935] rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#E53935] rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#E53935] rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#E53935] rounded-br-lg" />
                  <div
                    className="absolute left-2 right-2 h-0.5 bg-[#E53935] opacity-70 animate-[scan_2s_ease-in-out_infinite]"
                    style={{ top: "50%", boxShadow: "0 0 8px #E53935" }}
                  />
                </div>
              </div>
            )}
          </div>

          {status === "error" && (
            <div className="mx-4 my-3 flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <AlertCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-[12px] text-red-400">{error}</p>
            </div>
          )}

          <div className="p-4">
            {status !== "scanning" ? (
              <button
                onClick={startScanner}
                className="w-full flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#C62828] text-white font-bold py-3 rounded-xl text-[14px] transition-all"
              >
                <Camera size={16} />
                {nextLevel ? "Scan Package QR" : "Start Camera"}
              </button>
            ) : (
              <button
                onClick={stopScanner}
                className="w-full flex items-center justify-center gap-2 bg-[#232A33] hover:bg-[#2C3440] text-white font-bold py-3 rounded-xl text-[14px] transition-all"
              >
                Stop Camera
              </button>
            )}
          </div>
        </div>

        {/* Manual entry — hidden for delivery role */}
        {!isDelivery && (
          <>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#232A33]" />
              <span className="text-[11px] text-gray-600 font-bold uppercase tracking-wider">or enter manually</span>
              <div className="flex-1 h-px bg-[#232A33]" />
            </div>
            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <input
                type="text"
                value={manualId}
                onChange={(e) => setManualId(e.target.value)}
                placeholder="Enter tracking ID..."
                className="flex-1 bg-[#161B22] border border-[#232A33] rounded-xl px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none focus:border-[#E53935] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#E53935] hover:bg-[#C62828] text-white font-bold px-5 rounded-xl text-[14px] transition-all"
              >
                Go
              </button>
            </form>
          </>
        )}

        {/* Security note for delivery */}
        {isDelivery && (
          <div className="flex items-start gap-2.5 bg-[#161B22] border border-[#232A33] rounded-xl px-4 py-3">
            <QrCode size={13} className="text-[#E53935] mt-0.5 flex-shrink-0" />
            <p className="text-[11px] text-gray-500 leading-relaxed">
              For security, delivery agents must physically scan the package QR code. Manual entry is disabled.
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 10%; }
          50% { top: 90%; }
        }
      `}</style>
    </div>
  );
}