import { useEffect, useState } from "react";
import SiswaTable from "../component/SiswaTable";
import SiswaFormModal from "../component/SiswaFormModal";
import {
  fetchSiswas,
  createSiswa,
  updateSiswa,
  deleteSiswa,
} from "../api/siswaApi";

export default function SiswaPage() {
  const [siswas, setSiswas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchSiswas();
      setSiswas(data || []);
    } catch (err) {
      console.error(err);
      setError("Gagal mengambil data siswa");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (siswa) => {
    if (!window.confirm(`Hapus ${siswa.nama_siswa}?`)) return;
    try {
      await deleteSiswa(siswa.id);
      setSiswas((prev) => prev.filter((x) => x.id !== siswa.id));
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus siswa.");
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editing) {
        const updated = await updateSiswa(editing.id, formData);
        setSiswas((prev) =>
          prev.map((x) => (x.id === updated.id ? updated : x))
        );
      } else {
        const created = await createSiswa(formData);
        setSiswas((prev) => [created, ...prev]);
      }

      setModalOpen(false);
      setEditing(null);
      setViewing(null);
      setError("");
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Gagal menyimpan data siswa.";
      setError(msg);
      alert(msg); // ALERT kalau kode_siswa sama / error lain
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="mx-auto max-w-5xl px-4">
        {/* SEMUA KONTEN DIBUNGKUS DI SINI */}
        <div className="rounded-xl bg-white p-6 shadow">

          <header className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-slate-800">
              CRUD Data Siswa
            </h1>
          </header>

          {/* Tombol tambah di dalam container */}
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => {
                setEditing(null);
                setViewing(null);
                setModalOpen(true);
              }}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              + Tambah Siswa
            </button>
          </div>

          {/* Pesan error di dalam container */}
          {error && (
            <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Tabel di dalam container */}
          {loading ? (
            <div className="py-8 text-center text-slate-500">
              Memuat data…
            </div>
          ) : (
            <SiswaTable
              siswas={siswas}
              onView={(s) => {
                setViewing(s);
                setEditing(null);
                setModalOpen(true);
              }}
              onEdit={(s) => {
                setEditing(s);
                setViewing(null);
                setModalOpen(true);
              }}
              onDelete={handleDelete}
            />
          )}
        </div>

        {/* Modal tetap, tapi dipanggil dari dalam container */}
        <SiswaFormModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
            setViewing(null);
          }}
          onSubmit={handleSave}
          initialData={editing || viewing}
          viewMode={!!viewing}
        />
      </div>
    </div>
  );
}
