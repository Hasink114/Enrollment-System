import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BadgeIcon from "@mui/icons-material/Badge";
import ClassIcon from "@mui/icons-material/Class";
import GroupsIcon from "@mui/icons-material/Groups";
import WcIcon from "@mui/icons-material/Wc";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import colors from "../../theme/colors";

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider">
        <Icon sx={{ fontSize: 16, color: colors.textSecondary }} />
        <span>{label}</span>
      </div>
      <span className="text-sm font-bold text-slate-800 text-right truncate max-w-[60%]">
        {value || "—"}
      </span>
    </div>
  );
}

function StudentInfoPanel({ student, sessionStatus = "waiting" }) {
  const initials = student?.name ? student.name.charAt(0).toUpperCase() : "S";

  const statusMap = {
    waiting: { color: "#CA8A04", bg: "#FEF9C3", label: "Waiting", icon: HourglassEmptyIcon },
    active: { color: "#2563EB", bg: "#DBEAFE", label: "Active", icon: HourglassEmptyIcon },
    captured: { color: "#16A34A", bg: "#DCFCE7", label: "Captured", icon: CheckCircleIcon },
  };
  const status = statusMap[sessionStatus] || statusMap.waiting;
  const StatusIcon = status.icon;

  return (
    <Card
      sx={{
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Avatar + name */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 shadow-sm"
            style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-slate-900 truncate leading-tight">
              {student?.name || "No student selected"}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <BadgeIcon sx={{ fontSize: 13, color: colors.primary }} />
              <span className="text-xs font-mono font-bold text-blue-800">
                {student?.id || "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Info rows */}
        <div className="pt-1">
          <InfoRow icon={ClassIcon} label="Class" value={student?.class} />
          <InfoRow icon={BadgeIcon} label="Section" value={student?.section} />
          <InfoRow icon={GroupsIcon} label="Group" value={student?.group} />
          <InfoRow icon={WcIcon} label="Gender" value={student?.gender} />
        </div>

        {/* Session status */}
        <div
          className="mt-3 flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border"
          style={{ backgroundColor: status.bg, borderColor: `${status.color}40` }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: status.color }}>
            Session Status
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-xs font-bold"
            style={{ color: status.color }}
          >
            <StatusIcon sx={{ fontSize: 15 }} />
            {status.label}
          </span>
        </div>

        {/* Connection indicator */}
        <div className="mt-2 flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Camera Link
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default StudentInfoPanel;
