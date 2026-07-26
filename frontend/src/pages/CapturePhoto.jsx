import { useState, useRef } from "react";
import { Box, Button, Card, CardContent, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import colors from "../theme/colors";
import shadows from "../theme/shadows";

function CapturePhoto() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      const imageData = canvasRef.current.toDataURL("image/jpeg");
      setCapturedImage(imageData);
      stopCamera();
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const submitPhoto = async () => {
    if (capturedImage) {
      // TODO: Submit photo to backend
      console.log("Submitting photo...");
      navigate("/students");
    }
  };

  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Box display="flex" alignItems="center" mb={4} gap={2}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/students")}
            sx={{
              color: colors.primary,
              textTransform: "capitalize",
            }}
          >
            Back
          </Button>
          <Typography variant="h4" fontWeight="bold" m={0}>
            Capture Student Photo
          </Typography>
        </Box>

        <Card
          sx={{
            boxShadow: shadows.card,
            borderRadius: "12px",
          }}
        >
          <CardContent>
            <Box mb={3}>
              {!capturedImage ? (
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "3/4",
                    backgroundColor: colors.background,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {isCameraActive ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Box textAlign="center">
                      <PhotoCameraIcon
                        sx={{
                          fontSize: 60,
                          color: colors.textSecondary,
                          mb: 2,
                        }}
                      />
                      <Typography color={colors.textSecondary}>
                        Camera will appear here
                      </Typography>
                    </Box>
                  )}
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "3/4",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={capturedImage}
                    alt="Captured"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </Box>

            <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
              {!capturedImage ? (
                <>
                  {!isCameraActive ? (
                    <Button
                      variant="contained"
                      startIcon={<PhotoCameraIcon />}
                      onClick={startCamera}
                      sx={{
                        backgroundColor: colors.primary,
                        color: "#fff",
                        textTransform: "capitalize",
                        fontSize: "16px",
                        fontWeight: 600,
                        padding: "10px 24px",
                        "&:hover": {
                          backgroundColor: colors.primaryDark,
                        },
                      }}
                    >
                      Start Camera
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        onClick={capturePhoto}
                        sx={{
                          backgroundColor: colors.success,
                          color: "#fff",
                          textTransform: "capitalize",
                          fontSize: "16px",
                          fontWeight: 600,
                          padding: "10px 24px",
                          "&:hover": {
                            backgroundColor: "#1b5e20",
                          },
                        }}
                      >
                        Capture Photo
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={stopCamera}
                        sx={{
                          borderColor: colors.error,
                          color: colors.error,
                          textTransform: "capitalize",
                          fontSize: "16px",
                          fontWeight: 600,
                          padding: "10px 24px",
                          "&:hover": {
                            borderColor: colors.error,
                            backgroundColor: "rgba(211, 47, 47, 0.08)",
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    onClick={submitPhoto}
                    sx={{
                      backgroundColor: colors.success,
                      color: "#fff",
                      textTransform: "capitalize",
                      fontSize: "16px",
                      fontWeight: 600,
                      padding: "10px 24px",
                      "&:hover": {
                        backgroundColor: "#1b5e20",
                      },
                    }}
                  >
                    Submit Photo
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={retakePhoto}
                    sx={{
                      borderColor: colors.primary,
                      color: colors.primary,
                      textTransform: "capitalize",
                      fontSize: "16px",
                      fontWeight: 600,
                      padding: "10px 24px",
                      "&:hover": {
                        borderColor: colors.primary,
                        backgroundColor: "rgba(21, 101, 192, 0.08)",
                      },
                    }}
                  >
                    Retake Photo
                  </Button>
                </>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default CapturePhoto;
