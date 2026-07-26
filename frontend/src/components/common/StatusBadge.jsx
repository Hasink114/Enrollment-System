import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import colors from "../../theme/colors";

function StatusBadge({ status = "pending" }) {
  const normalized = (status || "pending").toLowerCase();

  let badgeStyle = {
    bg: "#F1F5F9",
    text: "#475569",
    border: "#CBD5E1",
    label: "Pending",
    icon: HourglassEmptyIcon,
  };

  if (normalized === "captured" || normalized === "accepted" || normalized === "uploaded" || normalized === "completed") {
    badgeStyle = {
      bg: "#DCFCE7",
      text: "#15803D",
      border: "#86EFAC",
      label: "Captured",
      icon: CheckCircleOutlineIcon,
    };
  } else if (normalized === "processing") {
    badgeStyle = {
      bg: "#DBEAFE",
      text: "#1D4ED8",
      border: "#93C5FD",
      label: "Processing",
      icon: AutorenewIcon,
    };
  } else if (normalized === "pending") {
    badgeStyle = {
      bg: "#FEF9C3",
      text: "#A16207",
      border: "#FDE047",
      label: "Pending",
      icon: HourglassEmptyIcon,
    };
  }

  const IconComponent = badgeStyle.icon;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors duration-150"
      style={{
        backgroundColor: badgeStyle.bg,
        color: badgeStyle.text,
        borderColor: badgeStyle.border,
      }}
    >
      <IconComponent sx={{ fontSize: 14 }} className={normalized === "processing" ? "animate-spin" : ""} />
      <span>{badgeStyle.label}</span>
    </span>
  );
}

export default StatusBadge;
