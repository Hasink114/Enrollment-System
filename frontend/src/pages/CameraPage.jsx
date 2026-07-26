import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckIcon from "@mui/icons-material/Check";

import CameraHeader from "../components/camera/CameraHeader";
import StudentInfoPanel from "../components/camera/StudentInfoPanel";
import CaptureChecklist from "../components/camera/CaptureChecklist";
import CameraStage from "../components/camera/CameraStage";
import QualityPanel from "../components/camera/QualityPanel";
import colors from "../theme/colors";

function CameraPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Session + student passed in from StudentSearch via router state (fallback to demo)
  const passed = location.state || {};
  const student = passed.student || null;
  const sessionId = passed.sessionId || null;

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [facingMode, setFacingMode] = useState("user");
  const [cameraError, setCameraError] = useState("");

  const cleanupStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const startCamera = async (mode = facingMode) => {
    setCameraError("");
    try {
      cleanupStream();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraError("Unable to access camera. Please check permissions and try again.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    cleanupStream();
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      // un-mirror for the saved image
      context.translate(canvasRef.current.width, 0);
      context.scale(-1, 1);
      context.drawImage(videoRef.current, 0, 0);
      const imageData = canvasRef.current.toDataURL("image/jpeg", 0.92);
      setCapturedImage(imageData);
      stopCamera();
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const switchCamera = () => {
    const next = facingMode === "user" ? "environment" : "user";
    setFacingMode(next);
    if (isCameraActive) startCamera(next);
  };

  const handleContinue = () => {
    if (!capturedImage) return;
    navigate("/preview", { state: { capturedImage, student, sessionId } });
  };

  useEffect(() => {
    return () => cleanupStream();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <CameraHeader
        student={student}
        sessionId={sessionId}
        connectionStatus={isCameraActive ? "online" : "waiting"}
      />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* LEFT PANEL */}
          <aside className="lg:col-span-3 space-y-4 order-2 lg:order-1">
            <StudentInfoPanel student={student} sessionStatus={capturedImage ? "captured" : isCameraActive ? "active" : "waiting"} />
            <CaptureChecklist />
          </aside>

          {/* CENTER PANEL */}
          <section className="lg:col-span-6 order-1 lg:order-2">
            <CameraStage ref={videoRef} isCameraActive={isCameraActive} capturedImage={capturedImage} />
            <canvas ref={canvasRef} style={{ display: "none" }} />

            {cameraError && (
              <div className="mt-3 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-sm font-medium text-red-700">
                {cameraError}
              </div>
            )}

            {/* Camera controls */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {!capturedImage ? (
                !isCameraActive ? (
                  <button
                    onClick={() => startCamera()}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <PhotoCameraIcon sx={{ fontSize: 20 }} />
                    Start Camera
                  </button>
                ) : (
                  <>
                  <button
                    onClick={capturePhoto}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ backgroundColor: colors.success }}
                  >
                    <PhotoCameraIcon sx={{ fontSize: 20 }} />
                    Capture Photo
                  </button>
                  <button
                    onClick={stopCamera}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold border transition-all hover:bg-slate-100 active:scale-[0.98]"
                    style={{ borderColor: colors.error, color: colors.error }}
                  >
                    Cancel
                  </button>
                  </>
                )
              ) : (
                <>
                  <button
                    onClick={retakePhoto}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold border transition-all hover:bg-slate-100 active:scale-[0.98]"
                    style={{ borderColor: colors.primary, color: colors.primary }}
                  >
                    <RefreshIcon sx={{ fontSize: 18 }} />
                    Retake
                  </button>
                </>
              )}

              {/* Switch camera (mobile) */}
              <button
                onClick={switchCamera}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold border border-slate-200 text-slate-600 bg-white transition-all hover:bg-slate-50 active:scale-[0.98] sm:hidden"
                aria-label="Switch camera"
              >
                <FlipCameraIosIcon sx={{ fontSize: 18 }} />
              </button>
            </div>

            {/* Camera status text */}
            <p className="mt-3 text-center text-xs font-medium text-slate-500">
              {cameraError
                ? "Camera unavailable"
                : capturedImage
                ? "Photo captured. Review and continue."
                : isCameraActive
                ? "Camera is live — align face within the oval guide."
                : "Camera is off. Press Start Camera to begin."}
            </p>
          </section>

          {/* RIGHT PANEL */}
          <aside className="lg:col-span-3 order-3">
            <QualityPanel />
          </aside>
        </div>
      </main>

      {/* BOTTOM ACTION BAR */}
      <footer className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.08)] z-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold border border-slate-200 text-slate-700 bg-white transition-all hover:bg-slate-50 active:scale-[0.98] w-full sm:w-auto"
          >
            <ArrowBackIcon sx={{ fontSize: 18 }} />
            Back to Students
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={capturePhoto}
              disabled={!isCameraActive || !!capturedImage}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white shadow-sm transition-all flex-1 sm:flex-none disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: colors.success }}
            >
              <PhotoCameraIcon sx={{ fontSize: 18 }} />
              Capture Photo
            </button>

            <button
              onClick={handleContinue}
              disabled={!capturedImage}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white shadow-sm transition-all flex-1 sm:flex-none disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: colors.primary }}
            >
              <CheckIcon sx={{ fontSize: 18 }} />
              Continue
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CameraPage;
