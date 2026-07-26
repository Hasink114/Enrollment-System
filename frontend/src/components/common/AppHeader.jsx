import SchoolIcon from "@mui/icons-material/School";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import VerifiedIcon from "@mui/icons-material/Verified";
import colors from "../../theme/colors";

function AppHeader({ firebaseConnected = true }) {
  return (
    <header
      className="bg-white border-b border-slate-200 px-6 py-4 shadow-xs"
      style={{ borderTop: `4px solid ${colors.primary}` }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Brand & App Title */}
        <div className="flex items-center gap-3.5">
          <div 
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0"
            style={{ backgroundColor: colors.primary }}
          >
            <SchoolIcon sx={{ fontSize: 26 }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                APS Student Enrollment System
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                <PhotoCameraIcon sx={{ fontSize: 12 }} /> BSEK
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Automated Student Passport Photo Processing & Submission Portal
            </p>
          </div>
        </div>

        {/* Status Indicators & Metadata */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Connection Status Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
            <span className={`w-2 h-2 rounded-full ${firebaseConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span>{firebaseConnected ? 'Firebase Active' : 'Offline Mode'}</span>
          </div>

          {/* Institution Badge */}
          <div 
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ backgroundColor: `${colors.primary}0A`, color: colors.primary }}
          >
            <VerifiedIcon sx={{ fontSize: 16 }} />
            <span>Aims Public School</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
