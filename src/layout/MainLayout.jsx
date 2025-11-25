import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header tanpa menu */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Laman Data Siswa</h1>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
