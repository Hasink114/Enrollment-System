import { CircularProgress } from "@mui/material";
import colors from "../../theme/colors";

function LoadingSpinner({ 
  size = 40, 
  message = "Loading student records...", 
  fullPage = false,
  className = ""
}) {
  const content = (
    <div
      className={`flex flex-col items-center justify-center ${fullPage ? 'py-12' : 'py-6'} px-4 gap-3 ${className}`}
    >
      <CircularProgress
        size={size}
        thickness={4}
        sx={{
          color: colors.primary,
        }}
      />
      {message && (
        <p className="text-sm font-medium text-slate-500 m-0 text-center animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-[400px] w-full flex items-center justify-center bg-white/80 rounded-2xl border border-slate-200">
        {content}
      </div>
    );
  }

  return content;
}

export default LoadingSpinner;

