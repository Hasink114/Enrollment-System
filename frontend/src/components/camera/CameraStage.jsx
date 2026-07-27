import api from "../../api/api";

function CameraStage({
  sessionId,
  mobileConnected,
  photoUploaded,
  processing,
  processed,
  capturedImage,
}) {

  const handleDownload = () => {
    window.open(
      `${api.defaults.baseURL}/photo/final/${sessionId}`,
      "_blank"
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8">

      <div className="text-center">

        {!capturedImage ? (

          <>
            <h2 className="text-2xl font-bold">
              Waiting for Mobile
            </h2>

            <p className="mt-4 text-gray-500">
              Open the mobile page and enter this Session ID
            </p>

            <div className="mt-8 text-5xl font-bold tracking-[12px]">
              {sessionId}
            </div>
          </>

        ) : (

          <>
            <img
              src={capturedImage}
              alt="Captured"
              className="mx-auto rounded-xl max-h-[500px]"
            />

            <div className="mt-6">

              {!processing && !processed && (
                <p className="text-blue-600 font-semibold">
                  Photo uploaded successfully.
                </p>
              )}

              {processing && (
                <p className="text-orange-600 font-semibold">
                  Processing passport photo...
                </p>
              )}

              {processed && (
                <>
                  <p className="text-green-600 font-semibold mb-4">
                    Passport photo ready.
                  </p>

                  <button
                    onClick={handleDownload}
                    className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Download Passport Photo
                  </button>
                </>
              )}

            </div>
          </>

        )}

      </div>

    </div>
  );
}

export default CameraStage;