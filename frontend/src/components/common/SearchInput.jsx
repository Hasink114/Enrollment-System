import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import colors from "../../theme/colors";

function SearchInput({ 
  value = "", 
  onChange, 
  placeholder = "Search by Student ID or Student Name...",
  autoFocus = false,
  className = ""
}) {
  return (
    <TextField
      fullWidth
      autoFocus={autoFocus}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: colors.primary, fontSize: 22 }} />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => onChange("")}
                aria-label="clear search"
                edge="end"
                sx={{ color: colors.textSecondary }}
              >
                <ClearIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: colors.surface,
          borderRadius: "12px",
          transition: "all 0.2s ease-in-out",
          boxShadow: "0 1px 2px 0 rgba(0,0,0,0.03)",
          "& fieldset": {
            borderColor: colors.border,
            borderWidth: "1px",
          },
          "&:hover fieldset": {
            borderColor: colors.secondary,
          },
          "&.Mui-focused": {
            boxShadow: `0 0 0 3px ${colors.primary}1A`,
          },
          "&.Mui-focused fieldset": {
            borderColor: colors.primary,
            borderWidth: "1.5px",
          },
        },
        "& .MuiOutlinedInput-input": {
          color: colors.textPrimary,
          fontSize: "15px",
          fontWeight: "500",
          py: "12px",
          "&::placeholder": {
            color: colors.textSecondary,
            opacity: 0.8,
            fontWeight: "400",
          },
        },
      }}
      className={className}
    />
  );
}

export default SearchInput;

