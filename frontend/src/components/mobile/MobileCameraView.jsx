import { useRef, useState } from "react";
import { uploadPhoto } from "../../api/photoApi";

function MobileCameraView({ sessionId }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSelect = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    console.log(file);
    alert(file.name);

    setSelectedImage(file);
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    try {

      const res = await uploadPhoto(sessionId, selectedImage);

      console.log(res);

      alert(res.message);

    } catch (err) {

      console.error(err);

      alert("Upload failed.");

    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-[95%] max-w-md">

        <h1 className="text-2xl font-bold text-center">
          APS Camera
        </h1>

        <p className="text-center mt-2 text-gray-600">
          Session
        </p>

        <p className="text-center font-mono text-3xl mt-2">
          {sessionId}
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleSelect}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current.click()}
          className="mt-8 w-full bg-slate-700 text-white rounded-xl py-4 font-semibold"
        >
          Select Photo
        </button>


        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="mt-4 rounded-xl w-full max-h-80 object-contain border"
          />
        )}

        <button
          disabled={!selectedImage || uploading}
          onClick={handleUpload}
          className="mt-8 w-full bg-slate-700 text-white rounded-xl py-4 font-semibold"
        >
          {uploading ? "Uploading..." : "Upload Photo"}
        </button>
      </div>
    </div>
  );
}

export default MobileCameraView;