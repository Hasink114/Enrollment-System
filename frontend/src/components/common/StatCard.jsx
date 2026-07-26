import colors from "../../theme/colors";

function StatCard({ 
  title, 
  value, 
  subtext, 
  icon: Icon, 
  iconBgColor = colors.primary,
  iconColor = "#FFFFFF",
  accentColor = colors.primary,
  className = ""
}) {
  return (
    <div 
      className={`bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between gap-4 transition-all duration-200 hover:shadow-sm hover:border-slate-300 ${className}`}
      style={{ borderLeft: `4px solid ${accentColor}` }}
    >
      <div className="space-y-1">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </p>
        <p className="text-2xl font-bold text-slate-900 tracking-tight">
          {value !== undefined && value !== null ? value : "0"}
        </p>
        {subtext && (
          <p className="text-[11px] font-medium text-slate-500">
            {subtext}
          </p>
        )}
      </div>

      {Icon && (
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
          style={{ backgroundColor: `${iconBgColor}15`, color: iconBgColor }}
        >
          <Icon sx={{ fontSize: 26 }} />
        </div>
      )}
    </div>
  );
}

export default StatCard;
