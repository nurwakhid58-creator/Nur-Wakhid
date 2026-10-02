import React from 'react';
import { Question } from '../types/assessment';
import { Printer, ArrowLeft } from 'lucide-react';

interface PrintableAnswerKeyProps {
  questions: Question[];
  onClose: () => void;
}

export const PrintableAnswerKey: React.FC<PrintableAnswerKeyProps> = ({
  questions,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-900 print:bg-white print:text-black py-6 px-4 sm:px-6">
      {/* Non-print Top Action Bar */}
      <div className="max-w-4xl mx-auto mb-6 bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between no-print">
        <button
          onClick={onClose}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow flex items-center space-x-1.5 cursor-pointer font-mono-math"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Kunci Jawaban (Ctrl + P)</span>
        </button>
      </div>

      {/* Document Sheet */}
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-2xl print:shadow-none print:p-0 rounded-xl print:rounded-none text-black font-sans leading-relaxed">
        {/* Header */}
        <div className="border-b-2 border-black pb-4 mb-6 text-center">
          <h2 className="text-sm font-semibold tracking-wider uppercase">
            SMP NEGERI 2 KARANGBINANGUN
          </h2>
          <h1 className="text-xl font-bold uppercase tracking-tight mt-0.5">
            KUNCI JAWABAN & PEDOMAN PENSKORAN RESMI
          </h1>
          <div className="text-xs text-gray-800 font-semibold uppercase mt-0.5">
            ASESMEN TENGAH SEMESTER GANJIL · MATEMATIKA KELAS 7 · MATERI: BILANGAN BULAT
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Penyusun: NUR WAKHID, S.Pd · Tahun Pelajaran 2026/2027
          </div>
        </div>

        {/* Quick Answer Key Matrix for PG & BS (1 - 20) */}
        <div className="mb-6 border border-black p-4 rounded text-xs">
          <div className="font-bold uppercase border-b border-black pb-1 mb-2">
            TABEL REKAP KUNCI JAWABAN PILIHAN GANDA (1-15) & BENAR/SALAH (16-20)
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 text-center font-mono-math">
            {questions.slice(0, 20).map((q) => (
              <div key={q.id} className="border border-gray-300 p-1.5 rounded">
                <div className="text-[10px] text-gray-500 font-sans">No. {q.id}</div>
                <div className="font-bold text-sm text-black">{q.correctAnswer}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Solutions and Rubrics (All 25 Questions) */}
        <div className="space-y-6 text-xs">
          <div className="font-bold text-sm uppercase border-b border-black pb-1">
            PEMBAHASAN RUNTUT DAN RUBRIK PENSKORAN
          </div>

          {questions.map((q) => (
            <div key={q.id} className="border-b border-gray-300 pb-4 break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold mb-1">
                <span>
                  No. {q.id} ({q.subtopic}) — Tingkat: {q.difficulty}
                </span>
                <span>Bobot: {q.points} Poin</span>
              </div>
              <p className="text-gray-900 mb-1 font-medium">{q.questionText}</p>
              <div className="bg-gray-50 p-2.5 rounded border border-gray-200 space-y-1">
                <div>
                  <span className="font-semibold text-gray-700">Kunci Jawaban: </span>
                  <span className="font-mono font-bold text-black">{q.correctAnswer}</span>
                </div>
                {q.rubric && (
                  <div className="pt-1 border-t border-gray-200">
                    <span className="font-semibold text-gray-700">Rubrik Skor:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] text-gray-800 pl-1">
                      {q.rubric.criteria.map((c) => (
                        <li key={c.points}>
                          <strong>{c.points} Poin:</strong> {c.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="pt-1">
                  <span className="font-semibold text-gray-700">Langkah Penyelesaian:</span>
                  <p className="whitespace-pre-line text-gray-800 text-[11px] mt-0.5 font-sans">
                    {q.explanation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Signature */}
        <div className="pt-6 border-t-2 border-black flex justify-between text-xs mt-6">
          <div>
            <div>Penyusun / Guru Pengampu:</div>
            <div className="mt-8 font-bold">NUR WAKHID, S.Pd</div>
            <div className="text-gray-600">NIP. 19850412 201101 1 008</div>
          </div>
          <div className="text-right">
            <div>Mengetahui,</div>
            <div>Kepala SMP Negeri 2 Karangbinangun</div>
            <div className="mt-6 font-bold">( .................................................... )</div>
            <div className="text-gray-600">NIP. ....................................................</div>
          </div>
        </div>
      </div>
    </div>
  );
};
