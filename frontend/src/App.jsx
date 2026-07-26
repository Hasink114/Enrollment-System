import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentSearch from "./pages/StudentSearch";
import CameraPage from "./pages/CameraPage";
import PreviewPage from "./pages/PreviewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentSearch />} />
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;