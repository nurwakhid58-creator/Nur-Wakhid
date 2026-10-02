import React from 'react';
import { Question } from '../types/assessment';
import { Printer, ArrowLeft } from 'lucide-react';

interface PrintableExamProps {
  questions: Question[];
  onClose: () => void;
}

export const PrintableExam: React.FC<PrintableExamProps> = ({ questions, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const pgQuestions = questions.filter((q) => q.type === 'pg');
  const bsQuestions = questions.filter((q) => q.type === 'bs');
  const uraianQuestions = questions.filter((q) => q.type === 'uraian');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-900 print:bg-white print:text-black py-6 px-4 sm:px-6">
      {/* Non-print Top Action Bar */}
      <div className="max-w-4xl mx-auto mb-6 bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between no-print">
        <button
          onClick={onClose}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Aplikasi</span>
        </button>

        <div className="flex items-center space-x-3">
          <span className="text-xs text-slate-400">
            Format Siap Cetak (Hemat Tinta / Paper-Ready)
          </span>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow flex items-center space-x-1.5 cursor-pointer font-mono-math"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Naskah Ujian (Ctrl + P)</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet Canvas */}
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-2xl print:shadow-none print:p-0 rounded-xl print:rounded-none text-black font-sans leading-relaxed">
        {/* Official Header (KOP UJIAN) */}
        <div className="border-b-2 border-black pb-4 mb-6 text-center">
          <h2 className="text-sm font-semibold tracking-wider uppercase">
            PEMERINTAH KABUPATEN LAMONGAN · DINAS PENDIDIKAN
          </h2>
          <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight mt-0.5">
            SMP NEGERI 2 KARANGBINANGUN
          </h1>
          <div className="text-xs text-gray-700 mt-0.5">
            Jl. Raya Karangbinangun, Kec. Karangbinangun, Kabupaten Lamongan, Jawa Timur
          </div>
          <div className="border-t border-black my-2" />
          <h3 className="text-base font-bold uppercase tracking-wider text-black">
            ASESMEN TENGAH SEMESTER GANJIL — TAHUN AJARAN 2026/2027
          </h3>
          <div className="text-xs font-semibold uppercase text-gray-800">
            MATA PELAJARAN: MATEMATIKA · KELAS: 7 (TUJUH) · MATERI: BILANGAN BULAT
          </div>
        </div>

        {/* Student Identity Box */}
        <div className="grid grid-cols-2 gap-4 border border-black p-3.5 mb-6 text-xs">
          <div className="space-y-1.5">
            <div className="flex">
              <span className="w-28 font-semibold">Nama Siswa</span>
              <span>: ..........................................................................</span>
            </div>
            <div className="flex">
              <span className="w-28 font-semibold">Nomor Absen</span>
              <span>: ..........................................................................</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex">
              <span className="w-28 font-semibold">Kelas</span>
              <span>: 7-.......</span>
            </div>
            <div className="flex">
              <span className="w-28 font-semibold">Hari / Tanggal</span>
              <span>: ..........................................................................</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-xs text-gray-800 bg-gray-50 border border-gray-300 p-3 rounded mb-6 space-y-1">
          <div className="font-bold uppercase tracking-wider text-black">PETUNJUK UMUM:</div>
          <ol className="list-decimal list-inside space-y-0.5 pl-1">
            <li>Tulislah nama, kelas, dan nomor absen Anda pada kolom identitas yang telah disediakan.</li>
            <li>Bacalah dengan teliti setiap stimulus dan pertanyaan sebelum menentukan jawaban.</li>
            <li>Kerjakan terlebih dahulu soal-soal yang Anda anggap mudah.</li>
            <li>Untuk soal Uraian, tuliskan tahapan rumus dan cara perhitungannya secara runtut.</li>
            <li>Periksa kembali pekerjaan Anda sebelum diserahkan kepada pengawas ujian.</li>
          </ol>
        </div>

        {/* ======================================================== */}
        {/* BAGIAN I: PILIHAN GANDA (15 SOAL) */}
        {/* ======================================================== */}
        <div className="mb-8">
          <div className="font-bold text-sm uppercase border-b border-black pb-1 mb-4 flex justify-between">
            <span>BAGIAN I : PILIHAN GANDA (15 BUTIR SOAL)</span>
            <span className="font-normal text-xs text-gray-700">Bobot: 15 × 2 = 30 Poin</span>
          </div>
          <p className="text-xs text-gray-700 mb-4 italic">
            Petunjuk: Pilihlah satu jawaban yang paling tepat dengan memberi tanda silang (X) pada huruf A, B, C, atau D!
          </p>

          <div className="space-y-6 text-xs">
            {pgQuestions.map((q) => (
              <div key={q.id} className="space-y-1.5 break-inside-avoid">
                <div className="flex items-start space-x-2">
                  <span className="font-bold">{q.id}.</span>
                  <div className="space-y-1">
                    {q.contextStory && (
                      <p className="text-gray-800 italic bg-gray-50 p-2 rounded border border-gray-200">
                        {q.contextStory}
                      </p>
                    )}
                    <p className="font-medium text-black">{q.questionText}</p>
                  </div>
                </div>

                {q.options && (
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 pl-6 pt-1">
                    {q.options.map((opt) => (
                      <div key={opt.key} className="flex items-start space-x-2">
                        <span className="font-bold">{opt.key}.</span>
                        <span>{opt.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* BAGIAN II: BENAR / SALAH (5 SOAL) */}
        {/* ======================================================== */}
        <div className="mb-8 print-page-break">
          <div className="font-bold text-sm uppercase border-b border-black pb-1 mb-4 flex justify-between">
            <span>BAGIAN II : BENAR / SALAH (5 BUTIR SOAL)</span>
            <span className="font-normal text-xs text-gray-700">Bobot: 5 × 2 = 10 Poin</span>
          </div>
          <p className="text-xs text-gray-700 mb-4 italic">
            Petunjuk: Berilah tanda centang (✓) pada kolom BENAR jika pernyataan tepat, atau pada kolom SALAH jika tidak tepat!
          </p>

          <table className="w-full text-xs border-collapse border border-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-center w-10">No</th>
                <th className="border border-black p-2 text-left">Pernyataan Matematika</th>
                <th className="border border-black p-2 text-center w-20">BENAR</th>
                <th className="border border-black p-2 text-center w-20">SALAH</th>
              </tr>
            </thead>
            <tbody>
              {bsQuestions.map((q) => (
                <tr key={q.id}>
                  <td className="border border-black p-2 text-center font-bold">{q.id}</td>
                  <td className="border border-black p-2 font-medium">{q.questionText}</td>
                  <td className="border border-black p-2 text-center">[   ]</td>
                  <td className="border border-black p-2 text-center">[   ]</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ======================================================== */}
        {/* BAGIAN III: URAIAN (5 SOAL) */}
        {/* ======================================================== */}
        <div className="mb-8">
          <div className="font-bold text-sm uppercase border-b border-black pb-1 mb-4 flex justify-between">
            <span>BAGIAN III : SOAL URAIAN (5 BUTIR SOAL)</span>
            <span className="font-normal text-xs text-gray-700">Bobot: 5 × 12 = 60 Poin</span>
          </div>
          <p className="text-xs text-gray-700 mb-4 italic">
            Petunjuk: Jawablah pertanyaan berikut dengan menuliskan model matematika, urutan langkah perhitungan secara terstruktur, dan kesimpulan akhir secara lengkap!
          </p>

          <div className="space-y-6 text-xs">
            {uraianQuestions.map((q) => (
              <div key={q.id} className="space-y-2 break-inside-avoid">
                <div className="flex items-start space-x-2">
                  <span className="font-bold text-sm">{q.id}.</span>
                  <div className="space-y-1">
                    {q.contextStory && (
                      <p className="text-gray-800 italic bg-gray-50 p-2 rounded border border-gray-200">
                        {q.contextStory}
                      </p>
                    )}
                    <p className="font-medium text-black">{q.questionText}</p>
                  </div>
                </div>

                {/* Empty Answer Workspace Box */}
                <div className="border border-dashed border-gray-400 rounded p-3 h-28 text-gray-400 text-[11px]">
                  Ruang Penyelesaian Soal Nomor {q.id}:
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Signature */}
        <div className="pt-6 border-t-2 border-black flex justify-between text-xs">
          <div>
            <div className="text-gray-600">Dikembangkan oleh:</div>
            <div className="font-bold">NUR WAKHID, S.Pd</div>
            <div>Guru Matematika SMP Negeri 2 Karangbinangun</div>
          </div>
          <div className="text-right">
            <div>Mengetahui,</div>
            <div className="mt-8 font-bold">( .................................................... )</div>
            <div className="text-gray-600">Guru Mata Pelajaran</div>
          </div>
        </div>
      </div>
    </div>
  );
};
