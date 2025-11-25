export default function SiswaTable({ siswas, onView, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 text-left">
          <tr>
            <th className="px-4 py-2 border-b">Kode</th>
            <th className="px-4 py-2 border-b">Nama</th>
            <th className="px-4 py-2 border-b">Alamat</th>
            <th className="px-4 py-2 border-b">Tgl Lahir</th>
            <th className="px-4 py-2 border-b">Jurusan</th>
            <th className="px-4 py-2 border-b text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {siswas.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-4 text-center text-slate-500"
              >
                Belum ada data siswa.
              </td>
            </tr>
          ) : (
            siswas.map((siswa) => (
              <tr key={siswa.id} className="hover:bg-slate-50">
                <td className="px-4 py-2 border-b">{siswa.kode_siswa}</td>
                <td className="px-4 py-2 border-b">{siswa.nama_siswa}</td>
                <td className="px-4 py-2 border-b">{siswa.alamat_siswa}</td>
                <td className="px-4 py-2 border-b">
                  {siswa.tgl_lahir
                    ? new Date(siswa.tgl_lahir).toLocaleDateString("id-ID")
                    : "-"}
                </td>
                <td className="px-4 py-2 border-b">{siswa.jurusan}</td>
                <td className="px-4 py-2 border-b text-center space-x-2">
                  <button
                    onClick={() => onView(siswa)}
                    className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(siswa)}
                    className="inline-flex items-center rounded-md border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 hover:bg-amber-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(siswa)}
                    className="inline-flex items-center rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-100"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
