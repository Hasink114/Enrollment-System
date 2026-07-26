import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import SchoolIcon from "@mui/icons-material/School";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import PrimaryButton from "../common/PrimaryButton";
import colors from "../../theme/colors";

function SessionConfirmModal({
  open,
  student,
  onClose,
  onConfirm,
  loading = false,
}) {
  if (!student) return null;

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          padding: "4px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, pb: 1 }} className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div 
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
            style={{ backgroundColor: colors.primary }}
          >
            <PhotoCameraIcon sx={{ fontSize: 20 }} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">
              Initiate Photo Session
            </h3>
            <p className="text-xs text-slate-500 font-medium">BSEK Passport Submission</p>
          </div>
        </div>

        {!loading && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            size="small"
            sx={{ color: colors.textSecondary }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent sx={{ p: 2, pt: 1 }}>
        <div className="space-y-4">
          {/* Student Profile Summary Box */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0 text-sm">
                {student.name ? student.name.charAt(0).toUpperCase() : "S"}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-slate-900 truncate">{student.name}</h4>
                <div className="flex items-center gap-1.5 text-xs text-blue-700 font-semibold mt-0.5">
                  <BadgeIcon sx={{ fontSize: 14 }} />
                  <span>{student.id}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Class</span>
                <span className="font-semibold text-slate-800">{student.class}</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Section</span>
                <span className="font-semibold text-slate-800">{student.section}</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Group</span>
                <span className="font-semibold text-slate-800 truncate block">{student.group}</span>
              </div>
            </div>
          </div>

          {/* Workflow Note */}
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start gap-2 text-xs text-blue-900">
            <InfoOutlinedIcon sx={{ fontSize: 18 }} className="text-blue-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Creating a session generates a unique Session ID. You can scan the QR code using mobile for high-quality camera capture.
            </p>
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 1, gap: 1 }}>
        <PrimaryButton
          variant="outline"
          onClick={onClose}
          disabled={loading}
          size="md"
          className="flex-1"
        >
          Cancel
        </PrimaryButton>
        <PrimaryButton
          variant="primary"
          onClick={onConfirm}
          loading={loading}
          size="md"
          startIcon={<PhotoCameraIcon sx={{ fontSize: 18 }} />}
          className="flex-1"
        >
          Create Session
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}

export default SessionConfirmModal;
