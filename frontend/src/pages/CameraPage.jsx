import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { getUploadedPhoto } from "../api/photoApi";
import { getSession } from "../api/sessionApi";
import api from "../api/api";

import CameraHeader from "../components/camera/CameraHeader";
import StudentInfoPanel from "../components/camera/StudentInfoPanel";
import CaptureChecklist from "../components/camera/CaptureChecklist";
import CameraStage from "../components/camera/CameraStage";
import QualityPanel from "../components/camera/QualityPanel";
import colors from "../theme/colors";

function CameraPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [capturedImage, setCapturedImage] = useState(null);

  // Session + student passed in from StudentSearch via router state (fallback to demo)
  const passed = location.state || {};
  const student = passed.student || null;
  const sessionId = passed.sessionId || null;

  const [mobileConnected, setMobileConnected] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);

  const handleContinue = () => {
    navigate("/preview", {
      state: {
        student,
        sessionId,
      },
    });
  };

  useEffect(() => {

    if (!sessionId || processed) return;

    const interval = setInterval(async () => {

      try {

        const session = await getSession(sessionId);

        if (session.data.status === "processing") {
          setProcessing(true);
          return;
        }

        if (session.data.status !== "uploaded") {
          return;
        }

        const imageUrl =
          getUploadedPhoto(sessionId) + "?t=" + Date.now();

        setCapturedImage(imageUrl);
        setPhotoUploaded(true);
        setMobileConnected(true);

        clearInterval(interval);

        setProcessing(true);

        await api.post(`/process/${sessionId}`);

        setProcessing(false);
        setProcessed(true);

      } catch (err) {

        console.log(err);
        setProcessing(false);

      }

    }, 2000);

    return () => clearInterval(interval);

  }, [sessionId, processed]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <CameraHeader
        student={student}
        sessionId={sessionId}
        connectionStatus={mobileConnected ? "online" : "waiting"}
      />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* LEFT PANEL */}
          <aside className="lg:col-span-3 space-y-4 order-2 lg:order-1">
            <StudentInfoPanel student={student} sessionStatus={
              photoUploaded
                ? "captured"
                : mobileConnected
                  ? "active"
                  : "waiting"
            } />
            <CaptureChecklist />
          </aside>

          {/* CENTER PANEL */}
          <section className="lg:col-span-6 order-1 lg:order-2">
            <CameraStage
              sessionId={sessionId}
              mobileConnected={mobileConnected}
              photoUploaded={photoUploaded}
              processing={processing}
              processed={processed}
              capturedImage={capturedImage}
            />
          </section>

          <div className="mt-6 flex justify-center">
            <p className="text-slate-600 font-medium">
              {
                processing
                  ? "Processing passport photo..."
                  : photoUploaded
                    ? "Photo received successfully."
                    : "Waiting for mobile device..."
              }
            </p>
          </div>

          {/* RIGHT PANEL */}
          <aside className="lg:col-span-3 order-3">
            <QualityPanel
              mobileConnected={mobileConnected}
              photoUploaded={photoUploaded}
            />
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

        </div>
      </footer>
    </div>
  );
}

export default CameraPage;
