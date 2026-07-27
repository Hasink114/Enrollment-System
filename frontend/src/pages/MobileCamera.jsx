import { useState } from "react";
import SessionCodeForm from "../components/mobile/SessionCodeForm";
import MobileCameraView from "../components/mobile/MobileCameraView";

function MobileCamera() {
  const [sessionId, setSessionId] = useState(null);

  return (
    <>
      {!sessionId ? (
        <SessionCodeForm
          onConnected={(id) => setSessionId(id)}
        />
      ) : (
        <MobileCameraView
          sessionId={sessionId}
        />
      )}
    </>
  );
}

export default MobileCamera;