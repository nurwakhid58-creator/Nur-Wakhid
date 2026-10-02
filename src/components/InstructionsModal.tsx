import React from 'react';
import { X, CheckCircle2, Clock, AlertTriangle, FileText, Award } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartExam?: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose,
  onStartExam,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-cyan-800/60 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Modal Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-classic text-lg font-bold text-slate-100">
                PETUNJUK PENGERJAAN ASESMEN
              </h2>
              <div className="text-xs text-slate-400">
                Model TKA (Tes Kemampuan Akademik) · Matematika Kelas 7
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 text-sm text-slate-300">
          {/* Main Rules */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-mono-math tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              Tata Cara Mengerjakan
            </h3>
            <ul className="space-y-2.5 pl-2">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono-math">
                  1
                </span>
                <span>
                  <strong>Bacalah setiap stimulus soal dengan teliti.</strong> Soal TKA memuat informasi berupa tabel, grafik, diagram maritim, elevator gedung, dan garis bilangan.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono-math">
                  2
                </span>
                <span>
                  <strong>Pilihan Ganda (15 Soal):</strong> Pilih satu jawaban yang paling tepat (A, B, C, atau D).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono-math">
                  3
                </span>
                <span>
                  <strong>Benar / Salah (5 Soal):</strong> Tentukan kebenaran pernyataan matematika dengan memilih tombol <span className="text-emerald-400 font-semibold">🟢 BENAR</span> atau <span className="text-rose-400 font-semibold">🔴 SALAH</span>.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono-math">
                  4
                </span>
                <span>
                  <strong>Uraian (5 Soal):</strong> Tuliskan model matematika, langkah-langkah perhitungan secara terstruktur, dan kesimpulan akhir pada kotak yang disediakan.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono-math">
                  5
                </span>
                <span>
                  <strong>Integritas & Kejujuran:</strong> Kerjakan asesmen secara mandiri dan jujur untuk mengukur kemampuan akademik secara akurat.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono-math">
                  6
                </span>
                <span>
                  <strong>Gunakan Fitur Review:</strong> Sebelum menekan <span className="text-cyan-400 font-semibold">Selesai Asesmen</span>, pastikan seluruh 25 nomor telah terisi dengan menekan tombol <em>Review Jawaban</em>.
                </span>
              </li>
            </ul>
          </div>

          {/* Scoring Composition */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <h3 className="text-xs uppercase font-mono-math tracking-wider text-amber-400 font-semibold flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Sistem Pembobotan Nilai (Total 100 Poin)
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-400">Pilihan Ganda</div>
                <div className="text-lg font-bold text-cyan-400 font-mono-math">15 × 2 = 30</div>
                <div className="text-[11px] text-slate-400">Maks. 30 Poin</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-400">Benar / Salah</div>
                <div className="text-lg font-bold text-emerald-400 font-mono-math">5 × 2 = 10</div>
                <div className="text-[11px] text-slate-400">Maks. 10 Poin</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-400">Soal Uraian</div>
                <div className="text-lg font-bold text-amber-400 font-mono-math">5 × 12 = 60</div>
                <div className="text-[11px] text-slate-400">Maks. 60 Poin</div>
              </div>
            </div>
          </div>

          {/* Rubrik Uraian */}
          <div className="space-y-2.5">
            <h3 className="text-xs uppercase font-mono-math tracking-wider text-slate-300 font-semibold">
              Rubrik Penilaian Soal Uraian (12 Poin Tiap Soal)
            </h3>
            <div className="space-y-1.5 text-xs">
              <div className="p-2 rounded bg-slate-950 border-l-2 border-emerald-500 flex justify-between">
                <span><strong>12 Poin:</strong> Konsep benar, langkah lengkap, perhitungan benar, jawaban tepat.</span>
                <span className="font-mono-math text-emerald-400 font-bold ml-2">12</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border-l-2 border-cyan-500 flex justify-between">
                <span><strong>9 Poin:</strong> Konsep dan strategi benar, terdapat kesalahan kecil pada aritmetika.</span>
                <span className="font-mono-math text-cyan-400 font-bold ml-2">9</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border-l-2 border-amber-500 flex justify-between">
                <span><strong>6 Poin:</strong> Memahami sebagian konsep namun langkah belum lengkap/tuntas.</span>
                <span className="font-mono-math text-amber-400 font-bold ml-2">6</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border-l-2 border-orange-500 flex justify-between">
                <span><strong>3 Poin:</strong> Terdapat usaha penyelesaian namun konsep kurang tepat.</span>
                <span className="font-mono-math text-orange-400 font-bold ml-2">3</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border-l-2 border-slate-600 flex justify-between">
                <span><strong>0 Poin:</strong> Tidak menjawab atau jawaban tidak relevan.</span>
                <span className="font-mono-math text-slate-400 font-bold ml-2">0</span>
              </div>
            </div>
          </div>

          {/* Difficulty Info */}
          <div className="flex items-center gap-3 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Distribusi Tingkat Kesulitan: <strong>5 Mudah</strong>, <strong>15 Sedang</strong>, <strong>5 Sulit/HOTS</strong>. Waktu pengerjaan disarankan 60 - 90 menit.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Tutup
          </button>
          {onStartExam && (
            <button
              onClick={() => {
                onClose();
                onStartExam();
              }}
              className="px-5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-lg shadow-md transition-all font-mono-math tracking-wide"
            >
              Mulai Mengerjakan ▶
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
