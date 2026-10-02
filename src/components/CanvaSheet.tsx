import React, { useState, useMemo } from 'react';
import { CanvaSheetRow } from '../types/assessment';
import {
  Download,
  Printer,
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  Trash2,
  Table as TableIcon,
  Sparkles,
  School,
  FileSpreadsheet,
  CheckCircle2,
  Copy,
} from 'lucide-react';

interface CanvaSheetProps {
  data: CanvaSheetRow[];
  onAddRow?: (row: CanvaSheetRow) => void;
  onDeleteRow?: (id: string) => void;
  onPrintRecap: () => void;
  onBackToApp: () => void;
}

export const CanvaSheet: React.FC<CanvaSheetProps> = ({
  data,
  onAddRow,
  onDeleteRow,
  onPrintRecap,
  onBackToApp,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'no' | 'nilaiDesc' | 'nilaiAsc' | 'nama'>('no');
  const [copySuccess, setCopySuccess] = useState(false);

  // Filter & Sort
  const filteredData = useMemo(() => {
    return data
      .filter((row) => {
        const matchClass = selectedClass === 'all' || row.kelas === selectedClass;
        const matchSearch =
          row.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.noAbsen.includes(searchQuery) ||
          row.kategori.toLowerCase().includes(searchQuery.toLowerCase());
        return matchClass && matchSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'nilaiDesc') return b.nilaiAkhir - a.nilaiAkhir;
        if (sortBy === 'nilaiAsc') return a.nilaiAkhir - b.nilaiAkhir;
        if (sortBy === 'nama') return a.nama.localeCompare(b.nama);
        return a.no - b.no;
      });
  }, [data, searchQuery, selectedClass, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    if (filteredData.length === 0) {
      return { count: 0, avg: 0, max: 0, min: 0, passed: 0, passRate: 0 };
    }
    const scores = filteredData.map((d) => d.nilaiAkhir);
    const sum = scores.reduce((acc, curr) => acc + curr, 0);
    const avg = Math.round((sum / scores.length) * 10) / 10;
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    const passed = scores.filter((s) => s >= 75).length;
    const passRate = Math.round((passed / scores.length) * 100);
    return { count: scores.length, avg, max, min, passed, passRate };
  }, [filteredData]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'No',
      'Nama Siswa',
      'Kelas',
      'No Absen',
      'PG (Maks 30)',
      'Benar/Salah (Maks 10)',
      'Uraian (Maks 60)',
      'Nilai Akhir',
      'Persentase (%)',
      'Waktu Pengerjaan',
      'Kategori Hasil',
      'Tanggal Input',
    ];

    const rows = filteredData.map((r, idx) => [
      idx + 1,
      `"${r.nama}"`,
      r.kelas,
      r.noAbsen,
      r.pg,
      r.bs,
      r.uraian,
      r.nilaiAkhir,
      `${r.persentase}%`,
      r.waktu,
      `"${r.kategori}"`,
      r.date,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Rekap_Nilai_TKA_Matematika_Kelas7_${selectedClass}_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyClipboard = () => {
    const text = filteredData
      .map(
        (r, idx) =>
          `${idx + 1}\t${r.nama}\t${r.kelas}\t${r.noAbsen}\t${r.pg}\t${r.bs}\t${r.uraian}\t${r.nilaiAkhir}\t${r.persentase}%\t${r.waktu}\t${r.kategori}`
      )
      .join('\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-6 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Spreadsheet App Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-classic text-lg font-bold text-white tracking-wide">
                  CANVA SHEET · REKAP ASESMEN
                </span>
                <span className="text-[10px] font-mono-math px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/80">
                  LIVE DATABASE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                SMP Negeri 2 Karangbinangun · Pengembang: Nur Wakhid, S.Pd
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyClipboard}
              className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer"
              title="Salin Data ke Clipboard"
            >
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>{copySuccess ? 'Tersalin! ✓' : 'Salin Tabel'}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3 py-2 text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/70 rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer font-mono-math"
              title="Unduh Spreadsheet CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>📥 Ekspor Data</span>
            </button>

            <button
              onClick={onPrintRecap}
              className="px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer"
              title="Cetak format cetak bersih"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>🖨️ Cetak Hasil</span>
            </button>

            <button
              onClick={onBackToApp}
              className="px-3 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl transition-all cursor-pointer font-mono-math"
            >
              Kembali
            </button>
          </div>
        </div>

        {/* Quick Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] text-slate-400">Total Siswa</div>
            <div className="text-xl font-bold text-white font-mono-math mt-0.5">
              {stats.count}
            </div>
            <div className="text-[10px] text-slate-400">Peserta tercatat</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] text-slate-400">Rata-rata Nilai</div>
            <div className="text-xl font-bold text-cyan-400 font-mono-math mt-0.5">
              {stats.avg}
            </div>
            <div className="text-[10px] text-slate-400">Skala 100 poin</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] text-slate-400">Nilai Tertinggi</div>
            <div className="text-xl font-bold text-emerald-400 font-mono-math mt-0.5">
              {stats.max}
            </div>
            <div className="text-[10px] text-slate-400">Skor maksimum</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] text-slate-400">Nilai Terendah</div>
            <div className="text-xl font-bold text-rose-400 font-mono-math mt-0.5">
              {stats.min}
            </div>
            <div className="text-[10px] text-slate-400">Skor minimum</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] text-slate-400">Ketuntasan (≥75)</div>
            <div className="text-xl font-bold text-amber-400 font-mono-math mt-0.5">
              {stats.passRate}%
            </div>
            <div className="text-[10px] text-slate-400">{stats.passed} dari {stats.count} tuntas</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] text-slate-400">Remedial (&lt;75)</div>
            <div className="text-xl font-bold text-rose-400 font-mono-math mt-0.5">
              {stats.count - stats.passed}
            </div>
            <div className="text-[10px] text-slate-400">Perlu pendampingan</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, absen, kategori..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>

          {/* Class Filter & Sort Selector */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <div className="flex items-center space-x-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 px-2 flex items-center gap-1 text-[11px]">
                <Filter className="w-3 h-3" /> Kelas:
              </span>
              {(['all', '7-A', '7-B'] as const).map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    selectedClass === cls
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cls === 'all' ? 'Semua' : cls}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <ArrowUpDown className="w-3 h-3 text-slate-500 ml-2" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent text-xs text-slate-300 py-1 pr-3 outline-none cursor-pointer"
              >
                <option value="no">Urut: No Urut</option>
                <option value="nilaiDesc">Nilai: Tertinggi</option>
                <option value="nilaiAsc">Nilai: Terendah</option>
                <option value="nama">Nama: A - Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* The Spreadsheet Canvas Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 font-mono-math text-[11px] border-b border-slate-800">
                  <th className="p-3 text-center w-12 border-r border-slate-800/80">No</th>
                  <th className="p-3 border-r border-slate-800/80 min-w-[200px]">Nama Siswa</th>
                  <th className="p-3 text-center border-r border-slate-800/80 w-20">Kelas</th>
                  <th className="p-3 text-center border-r border-slate-800/80 w-20">No Absen</th>
                  <th className="p-3 text-center border-r border-slate-800/80 text-cyan-400 w-20">PG (30)</th>
                  <th className="p-3 text-center border-r border-slate-800/80 text-emerald-400 w-24">B/S (10)</th>
                  <th className="p-3 text-center border-r border-slate-800/80 text-amber-400 w-24">Uraian (60)</th>
                  <th className="p-3 text-center border-r border-slate-800/80 text-white font-bold bg-slate-900/90 w-24">
                    Nilai Akhir
                  </th>
                  <th className="p-3 text-center border-r border-slate-800/80 w-24">Persentase</th>
                  <th className="p-3 text-center border-r border-slate-800/80 w-24">Waktu</th>
                  <th className="p-3 border-r border-slate-800/80 min-w-[140px]">Kategori</th>
                  {onDeleteRow && <th className="p-3 text-center w-12">Aksi</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-sans">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="p-8 text-center text-slate-500">
                      Tidak ada data siswa yang cocok dengan filter atau pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((row, idx) => (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-850/60 transition-colors group"
                    >
                      <td className="p-3 text-center font-mono-math text-slate-400 border-r border-slate-800/60">
                        {idx + 1}
                      </td>
                      <td className="p-3 font-semibold text-white border-r border-slate-800/60">
                        {row.nama}
                      </td>
                      <td className="p-3 text-center font-mono-math text-slate-300 border-r border-slate-800/60">
                        {row.kelas}
                      </td>
                      <td className="p-3 text-center font-mono-math text-slate-300 border-r border-slate-800/60">
                        {row.noAbsen}
                      </td>
                      <td className="p-3 text-center font-mono-math text-cyan-300 border-r border-slate-800/60">
                        {row.pg}
                      </td>
                      <td className="p-3 text-center font-mono-math text-emerald-300 border-r border-slate-800/60">
                        {row.bs}
                      </td>
                      <td className="p-3 text-center font-mono-math text-amber-300 border-r border-slate-800/60">
                        {row.uraian}
                      </td>
                      <td className="p-3 text-center font-mono-math font-bold text-base text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-200 bg-slate-950/40 border-r border-slate-800/60">
                        {row.nilaiAkhir}
                      </td>
                      <td className="p-3 text-center font-mono-math text-slate-300 border-r border-slate-800/60">
                        {row.persentase}%
                      </td>
                      <td className="p-3 text-center font-mono-math text-slate-400 text-[11px] border-r border-slate-800/60">
                        {row.waktu}
                      </td>
                      <td className="p-3 border-r border-slate-800/60">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono-math font-semibold ${
                            row.kategori === 'SANGAT BAIK'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : row.kategori === 'BAIK'
                              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                              : row.kategori === 'CUKUP'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-rose-950 text-rose-300 border border-rose-800'
                          }`}
                        >
                          {row.kategori}
                        </span>
                      </td>
                      {onDeleteRow && (
                        <td className="p-3 text-center">
                          <button
                            onClick={() => onDeleteRow(row.id)}
                            className="p-1 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                            title="Hapus baris ini"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Info */}
          <div className="p-3.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <span>
              Menampilkan {filteredData.length} baris data · Seluruh data tersimpan otomatis di Canva Sheet
            </span>
            <span className="font-mono-math text-slate-400">
              Formula Bobot: Nilai Akhir = PG + B/S + Uraian (Maks 100)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
