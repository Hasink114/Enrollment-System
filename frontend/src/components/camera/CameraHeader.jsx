import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import WifiIcon from "@mui/icons-material/Wifi";
import colors from "../../theme/colors";

function CameraHeader({ student, sessionId, connectionStatus = "online" }) {
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const statusMap = {
    online: { color: "#16A34A", label: "Connected", pulse: true },
    offline: { color: "#DC2626", label: "Offline", pulse: false },
    waiting: { color: "#CA8A04", label: "Waiting", pulse: true },
  };
  const status = statusMap[connectionStatus] || statusMap.online;

  return (
    <header
      className="bg-white border-b border-slate-200 px-5 py-3 shadow-xs sticky top-0 z-30"
      style={{ borderTop: `4px solid ${colors.primary}` }}
    >
      <div className="max-w-[1600px] mx-auto flex flex-col gap-3">
        {/* Top row: brand + meta */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0"
              style={{ backgroundColor: colors.primary }}
            >
              <SchoolIcon sx={{ fontSize: 22 }} />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-slate-900 leading-none">
                APS Student Enrollment System
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
                <PhotoCameraIcon sx={{ fontSize: 13, color: colors.primary }} />
                Passport Photo Capture
              </p>
            </div>
          </div>

          {/* Meta chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {student && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="text-slate-400 font-semibold uppercase tracking-wider">Student</span>
                <span className="font-bold text-slate-800 truncate max-w-[160px]">
                  {student.name}
                </span>
              </div>
            )}
            {sessionId && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs">
                <span className="text-blue-400 font-semibold uppercase tracking-wider">Session</span>
                <span className="font-mono font-bold text-blue-900">{sessionId}</span>
              </div>
            )}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold"
              style={{
                backgroundColor: `${status.color}10`,
                borderColor: `${status.color}40`,
                color: status.color,
              }}
            >
              <span
                className={`w-2 h-2 rounded-full ${status.pulse ? "animate-pulse" : ""}`}
                style={{ backgroundColor: status.color }}
              />
              <span>{status.label}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
              <WifiIcon sx={{ fontSize: 14, color: colors.primary }} />
              <span className="font-mono tabular-nums">{timeStr}</span>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-slate-500 font-medium">
          <button
            onClick={() => navigate("/")}
            className="hover:text-blue-700 transition-colors cursor-pointer font-semibold"
          >
            Students
          </button>
          <ChevronRightIcon sx={{ fontSize: 14, color: "#94A3B8" }} />
          <span className="text-slate-900 font-bold">Camera</span>
        </nav>
      </div>
    </header>
  );
}

export default CameraHeader;
