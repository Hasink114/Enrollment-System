import CircularProgress from "@mui/material/CircularProgress";
import colors from "../../theme/colors";

function PrimaryButton({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false,
  fullWidth = false,
  size = "md",
  variant = "primary",
  startIcon = null,
  endIcon = null,
  type = "button",
  className = "",
  ...props 
}) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs font-semibold rounded-lg gap-1.5",
    md: "px-4 py-2 text-sm font-semibold rounded-xl gap-2",
    lg: "px-6 py-2.5 text-base font-semibold rounded-xl gap-2.5",
  };

  const getVariantStyles = () => {
    if (disabled || loading) {
      return {
        backgroundColor: "#E2E8F0",
        color: "#94A3B8",
        border: "1px solid #CBD5E1",
        cursor: "not-allowed",
      };
    }

    switch (variant) {
      case "secondary":
        return {
          backgroundColor: `${colors.primary}10`,
          color: colors.primary,
          border: `1px solid ${colors.primary}30`,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          color: colors.textPrimary,
          border: `1px solid ${colors.border}`,
        };
      case "danger":
        return {
          backgroundColor: colors.error,
          color: "#FFFFFF",
          border: "none",
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: colors.textSecondary,
          border: "none",
        };
      case "primary":
      default:
        return {
          backgroundColor: colors.primary,
          color: "#FFFFFF",
          border: "none",
        };
    }
  };

  const isInteractive = !disabled && !loading;

  return (
    <button
      type={type}
      onClick={isInteractive ? onClick : undefined}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center transition-all duration-200 select-none
        ${sizeClasses[size] || sizeClasses.md}
        ${fullWidth ? "w-full" : ""}
        ${isInteractive ? "hover:opacity-90 active:scale-[0.98] cursor-pointer shadow-xs hover:shadow-sm" : ""}
        ${className}
      `}
      style={{
        ...getVariantStyles(),
        ...props.style,
      }}
      {...props}
    >
      {loading ? (
        <CircularProgress
          size={size === "sm" ? 14 : size === "lg" ? 22 : 18}
          sx={{ color: variant === "primary" || variant === "danger" ? "#FFFFFF" : colors.primary }}
        />
      ) : (
        <>
          {startIcon && <span className="inline-flex shrink-0">{startIcon}</span>}
          <span>{children}</span>
          {endIcon && <span className="inline-flex shrink-0">{endIcon}</span>}
        </>
      )}
    </button>
  );
}

export default PrimaryButton;

