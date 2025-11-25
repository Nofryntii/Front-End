import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import SiswaPage from "./pages/SiswaPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<SiswaPage />} />
        <Route path="/siswa" element={<SiswaPage />} />
      </Route>
    </Routes>
  );
}
