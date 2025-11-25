import { useEffect, useState } from "react";

const emptyForm = {
  kode_siswa: "",
  nama_siswa: "",
  alamat_siswa: "",
  tgl_lahir: "",
  jurusan: "",
};

export default function SiswaFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  viewMode = false, 
}) {
  const [form, setForm] = useState(emptyForm);

  const isEditMode = initialData && !viewMode; 

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        kode_siswa: initialData.kode_siswa || "",
        nama_siswa: initialData.nama_siswa || "",
        alamat_siswa: initialData.alamat_siswa || "",
        tgl_lahir: initialData.tgl_lahir
          ? new Date(initialData.tgl_lahir).toISOString().slice(0, 10)
          : "",
        jurusan: initialData.jurusan || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    if (viewMode) return; // kalau view, tidak bisa diubah
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (viewMode) return; // viewMode tidak kirim apa-apa
    onSubmit(form);       
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">
            {viewMode
              ? "Detail Siswa"
              : isEditMode
              ? "Edit Siswa"
              : "Tambah Siswa"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Kode Siswa
            </label>
            <input
              type="text"
              name="kode_siswa"
              value={form.kode_siswa}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              readOnly={viewMode}
              disabled={viewMode}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Nama Siswa
            </label>
            <input
              type="text"
              name="nama_siswa"
              value={form.nama_siswa}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              readOnly={viewMode}
              disabled={viewMode}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Alamat
            </label>
            <textarea
              name="alamat_siswa"
              value={form.alamat_siswa}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={2}
              required
              readOnly={viewMode}
              disabled={viewMode}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Tanggal Lahir
              </label>
              <input
                type="date"
                name="tgl_lahir"
                value={form.tgl_lahir}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                readOnly={viewMode}
                disabled={viewMode}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Jurusan
              </label>
              <input
                type="text"
                name="jurusan"
                value={form.jurusan}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                readOnly={viewMode}
                disabled={viewMode}
              />
            </div>
          </div>

          {/* FOOTER BUTTONS */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              {viewMode ? "Tutup" : "Batal"}
            </button>

            {/* TOMBOL SIMPAN: ADA di TAMBAH & EDIT, HILANG di VIEW */}
            {!viewMode && (
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Simpan
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
