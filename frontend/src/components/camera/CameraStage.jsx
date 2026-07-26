import { forwardRef } from "react";
import Box from "@mui/material/Box";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import colors from "../../theme/colors";

/**
 * Live camera stage with passport safe-area overlay guides.
 * Visual guides only — no cropping or AI processing.
 */
const CameraStage = forwardRef(function CameraStage(
  { isCameraActive, capturedImage },
  videoRef
) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "3 / 4",
        maxHeight: "70vh",
        backgroundColor: "#0B1220",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid #1E293B",
        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.45)",
      }}
    >
      {/* Live video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scaleX(-1)", // mirror for natural selfie view
          opacity: isCameraActive && !capturedImage ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Captured image */}
      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured passport preview"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            animation: "cameraFlash 0.4s ease-out",
          }}
        />
      )}

      {/* Idle placeholder */}
      {!isCameraActive && !capturedImage && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748B",
            gap: 1.5,
          }}
        >
          <PhotoCameraIcon sx={{ fontSize: 56, color: "#475569" }} />
          <p className="text-sm font-medium text-slate-400 m-0">
            Camera preview will appear here
          </p>
          <p className="text-xs text-slate-500 m-0">Press “Start Camera” to begin</p>
        </Box>
      )}

      {/* Passport guide overlay (visual only) */}
      {isCameraActive && !capturedImage && (
        <svg
          viewBox="0 0 300 400"
          preserveAspectRatio="xMidYMid meet"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {/* Safe area rectangle */}
          <rect
            x="40"
            y="40"
            width="220"
            height="320"
            rx="10"
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.5"
            strokeDasharray="6 5"
          />

          {/* Oval face guide */}
          <ellipse
            cx="150"
            cy="175"
            rx="72"
            ry="92"
            fill="none"
            stroke="rgba(96,165,250,0.9)"
            strokeWidth="2"
          />

          {/* Eye horizontal guide */}
          <line
            x1="40"
            y1="150"
            x2="260"
            y2="150"
            stroke="rgba(96,165,250,0.55)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Head top margin guide */}
          <line
            x1="40"
            y1="75"
            x2="260"
            y2="75"
            stroke="rgba(250,204,21,0.6)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <text x="44" y="70" fill="rgba(250,204,21,0.9)" fontSize="9" fontWeight="bold">
            TOP
          </text>

          {/* Chin guide */}
          <line
            x1="40"
            y1="270"
            x2="260"
            y2="270"
            stroke="rgba(250,204,21,0.6)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <text x="44" y="284" fill="rgba(250,204,21,0.9)" fontSize="9" fontWeight="bold">
            CHIN
          </text>

          {/* Corner brackets */}
          {[
            { x: 40, y: 40, dx: 1, dy: 1 },
            { x: 260, y: 40, dx: -1, dy: 1 },
            { x: 40, y: 360, dx: 1, dy: -1 },
            { x: 260, y: 360, dx: -1, dy: -1 },
          ].map((c, i) => (
            <path
              key={i}
              d={`M ${c.x + c.dx * 18} ${c.y} L ${c.x} ${c.y} L ${c.x} ${c.y + c.dy * 18}`}
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="2.5"
            />
          ))}
        </svg>
      )}

      {/* Live badge */}
      {isCameraActive && !capturedImage && (
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[11px] font-bold text-white tracking-wider">LIVE</span>
        </div>
      )}

      {/* Captured badge */}
      {capturedImage && (
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-white" />
          <span className="text-[11px] font-bold text-white tracking-wider">CAPTURED</span>
        </div>
      )}
    </Box>
  );
});

export default CameraStage;
