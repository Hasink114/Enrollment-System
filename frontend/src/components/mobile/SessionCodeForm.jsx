import { useState } from "react";
import { getSession } from "../../api/sessionApi";

function SessionCodeForm({ onConnected }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const connect = async () => {
    if (code.length !== 6) {
      setError("Enter a valid 6-digit session code.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await getSession(code.toUpperCase());

      onConnected(code.toUpperCase());
    } catch {
      setError("Session not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-[95%] max-w-md">

        <h1 className="text-2xl font-bold text-center mb-2">
          APS Camera
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Enter the 6-digit Session Code
        </p>

        <input
          value={code}
          onChange={(e)=>setCode(e.target.value.toUpperCase())}
          maxLength={6}
          className="w-full border rounded-xl p-4 text-center text-3xl tracking-[12px] uppercase"
        />

        {error && (
          <p className="text-red-600 mt-4 text-center">
            {error}
          </p>
        )}

        <button
          onClick={connect}
          disabled={loading}
          className="mt-6 w-full bg-blue-700 text-white rounded-xl py-4 font-semibold"
        >
          {loading ? "Connecting..." : "Connect"}
        </button>

      </div>
    </div>
  );
}

export default SessionCodeForm;