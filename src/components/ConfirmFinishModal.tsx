import React from 'react';
import { AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';
import { StudentInfo } from '../types/assessment';

interface ConfirmFinishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  unansweredCount: number;
  flaggedCount: number;
  studentInfo: StudentInfo;
}

export const ConfirmFinishModal: React.FC<ConfirmFinishModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  unansweredCount,
  flaggedCount,
  studentInfo,
}) => {
  if (!isOpen) return null;

  const hasUnanswered = unansweredCount > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-md p-6 shadow-2xl relative text-slate-200">
        <div className="flex items-center space-x-3 mb-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              hasUnanswered
                ? 'bg-amber-950/70 border border-amber-600/60 text-amber-400'
                : 'bg-emerald-950/70 border border-emerald-600/60 text-emerald-400'
            }`}
          >
            {hasUnanswered ? (
              <AlertTriangle className="w-6 h-6" />
            ) : (
              <CheckCircle className="w-6 h-6" />
            )}
          </div>
          <div>
            <h3 className="font-classic text-base font-bold text-white">
              {hasUnanswered ? 'Konfirmasi Pengumpulan' : 'Selesaikan Asesmen?'}
            </h3>
            <p className="text-xs text-slate-400">
              {studentInfo.nama} · {studentInfo.kelas} (#{studentInfo.noAbsen})
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs my-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
          {hasUnanswered ? (
            <div className="text-amber-300 font-medium space-y-1">
              <p>⚠️ Peringatan: Masih terdapat <strong>{unansweredCount} soal</strong> yang belum Anda jawab!</p>
              {flaggedCount > 0 && (
                <p className="text-slate-400">
                  Dan terdapat <strong>{flaggedCount} soal</strong> yang ditandai ragu-ragu.
                </p>
              )}
              <p className="text-slate-400 font-normal pt-1">
                Apakah Anda yakin ingin menyelesaikan sekarang? Jawaban yang belum diisi akan dinilai 0 poin.
              </p>
            </div>
          ) : (
            <div className="text-slate-300 space-y-1">
              <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> Seluruh 25 soal telah terisi lengkap.
              </p>
              {flaggedCount > 0 && (
                <p className="text-amber-400">
                  Perhatian: Masih ada {flaggedCount} soal ditandai ragu-ragu.
                </p>
              )}
              <p className="text-slate-400">
                Setelah selesai, Anda tidak dapat mengubah jawaban lagi dan sistem akan langsung menghitung hasil asesmen.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Periksa Lagi
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-xs font-semibold rounded-lg shadow-md transition-all font-mono-math cursor-pointer ${
              hasUnanswered
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                : 'bg-emerald-400 hover:bg-emerald-300 text-slate-950'
            }`}
          >
            Ya, Kumpulkan Jawaban
          </button>
        </div>
      </div>
    </div>
  );
};
