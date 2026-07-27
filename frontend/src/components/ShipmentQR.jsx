import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, Download, X, Copy, Check } from "lucide-react";

export default function ShipmentQR({ shipment, onClose }) {
  const [copied, setCopied] = useState(false);

  // The QR encodes a URL that the delivery scanner will hit
  const qrValue = `${window.location.origin}/scan/result/${shipment.qrToken}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(qrValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const svg = document.getElementById(`qr-${shipment._id}`);
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 300, 300);
      ctx.drawImage(img, 0, 0, 300, 300);
      const a = document.createElement("a");
      a.download = `QR-${shipment.trackingId || shipment._id}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-[#161B22] border border-[#232A33] rounded-2xl w-full max-w-sm overflow-hidden">

        {/* Header */}
        <div className="px-5 py-4 border-b border-[#232A33] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#E53935]/10 rounded-lg flex items-center justify-center">
              <QrCode size={14} className="text-[#E53935]" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-white">Shipment QR Code</p>
              <p className="text-[11px] text-gray-500 font-mono">
                {shipment.trackingId || shipment._id?.slice(-8).toUpperCase()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* QR Code */}
        <div className="p-8 flex flex-col items-center gap-6">
          <div className="bg-white p-4 rounded-2xl shadow-lg shadow-black/40">
            <QRCodeSVG
            id={`qr-${shipment._id}`}
            value={qrValue}
            size={200}
            level="M"
            includeMargin={true}
          />
          </div>

          {/* Shipment info */}
          <div className="w-full space-y-2">
            <div className="flex justify-between text-[12px]">
              <span className="text-gray-500">Tracking ID</span>
              <span className="text-white font-mono font-bold">
                {shipment.trackingId || shipment._id?.slice(-8).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between text-[12px]">
              <span className="text-gray-500">Route</span>
              <span className="text-white">{shipment.origin} → {shipment.destination}</span>
            </div>
            <div className="flex justify-between text-[12px]">
              <span className="text-gray-500">Status</span>
              <span className="text-amber-400 font-bold capitalize">
                {shipment.status?.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* URL */}
          <div className="w-full bg-[#0F1117] border border-[#232A33] rounded-xl px-3 py-2.5 flex items-center gap-2">
            <p className="text-[10px] text-gray-500 truncate flex-1 font-mono">{qrValue}</p>
            <button
              onClick={handleCopy}
              className="text-gray-500 hover:text-white transition-colors flex-shrink-0"
            >
              {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
            </button>
          </div>

          {/* Actions */}
          <div className="w-full grid grid-cols-2 gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 bg-[#0F1117] border border-[#232A33] hover:border-gray-600 text-white text-[13px] font-semibold py-2.5 rounded-xl transition-all"
            >
              <Download size={14} />
              Download
            </button>
            <button
              onClick={onClose}
              className="flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#C62828] text-white text-[13px] font-semibold py-2.5 rounded-xl transition-all"
            >
              <Check size={14} />
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}