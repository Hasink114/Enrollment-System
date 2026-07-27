import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentSearch from "./pages/StudentSearch";
import CameraPage from "./pages/CameraPage";
import MobileCamera from "./pages/MobileCamera";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentSearch />} />
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/mobile" element={<MobileCamera />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;