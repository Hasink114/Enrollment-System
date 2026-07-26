import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

const INDICATORS = [
  { key: "lighting", label: "Lighting" },
  { key: "face", label: "Face Position" },
  { key: "distance", label: "Distance" },
  { key: "tilt", label: "Head Tilt" },
  { key: "eyes", label: "Eyes Open" },
  { key: "background", label: "Background" },
];

const TIPS = [
  "Stand 1 metre away from the camera",
  "Remove cap, hat, or sunglasses",
  "Look straight at the lens",
  "Use a plain white wall behind",
  "Avoid shadows on the face",
  "Keep shoulders relaxed and square",
];

function QualityPanel() {
  return (
    <div className="space-y-4">
      {/* Live Quality */}
      <Card
        sx={{
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <div className="flex items-center gap-2 mb-1">
            <LightbulbIcon sx={{ fontSize: 18, color: "#CA8A04" }} />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Live Quality Panel
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-medium mb-3">
            Real-time checks appear here once camera starts
          </p>

          <div className="space-y-2">
            {INDICATORS.map((ind) => (
              <div
                key={ind.key}
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100"
              >
                <span className="text-xs font-semibold text-slate-600">{ind.label}</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                  <span className="text-[11px] font-medium text-slate-400">Waiting…</span>
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card
        sx={{
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <div className="flex items-center gap-2 mb-1">
            <TipsAndUpdatesIcon sx={{ fontSize: 18, color: "#2563EB" }} />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Photo Tips</h3>
          </div>
          <p className="text-xs text-slate-500 font-medium mb-3">
            Follow these for a compliant passport photo
          </p>

          <ul className="space-y-2">
            {TIPS.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-slate-700">
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: "#2563EB" }}
                />
                <span className="leading-snug">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default QualityPanel;
