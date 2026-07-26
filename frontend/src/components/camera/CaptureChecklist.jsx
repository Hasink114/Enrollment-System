import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import colors from "../../theme/colors";

const ITEMS = [
  "Face visible",
  "Looking straight",
  "Neutral expression",
  "No glasses glare",
  "White background",
  "Proper lighting",
];

function CaptureChecklist() {
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
        <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-1">
          Capture Checklist
        </h3>
        <p className="text-xs text-slate-500 font-medium mb-3">
          Verify each item before capturing
        </p>

        <ul className="space-y-2.5">
          {ITEMS.map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <CheckCircleIcon sx={{ fontSize: 18, color: colors.success }} />
              <span className="text-sm font-medium text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default CaptureChecklist;
