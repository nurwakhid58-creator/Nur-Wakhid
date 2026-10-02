import React from 'react';
import { AssessmentResult } from '../types/assessment';
import { Printer, ArrowLeft } from 'lucide-react';

interface PrintableStudentReportProps {
  result: AssessmentResult;
  onClose: () => void;
}

export const PrintableStudentReport: React.FC<PrintableStudentReportProps> = ({
  result,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const { studentInfo, totalScore, pgScore, bsScore, uraianScore, correctCount, incorrectCount, percentage, category } = result;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-900 print:bg-white print:text-black py-6 px-4 sm:px-6">
      {/* Top Action Bar */}
      <div className="max-w-3xl mx-auto mb-6 bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between no-print">
        <button
          onClick={onClose}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Hasil</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow flex items-center space-x-1.5 cursor-pointer font-mono-math"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Lembar Hasil (Ctrl + P)</span>
        </button>
      </div>

      {/* Report Card Sheet */}
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 shadow-2xl print:shadow-none print:p-0 rounded-xl print:rounded-none text-black font-sans leading-relaxed">
        {/* Header */}
        <div className="border-b-2 border-black pb-4 mb-6 text-center">
          <h2 className="text-xs font-semibold tracking-wider uppercase">
            PEMERINTAH KABUPATEN LAMONGAN · DINAS PENDIDIKAN
          </h2>
          <h1 className="text-xl font-bold uppercase tracking-tight mt-0.5">
            SMP NEGERI 2 KARANGBINANGUN
          </h1>
          <h3 className="text-sm font-bold uppercase mt-1">
            LEMBAR HASIL ASESMEN TENGAH SEMESTER GANJIL
          </h3>
          <div className="text-xs font-semibold text-gray-800">
            MATA PELAJARAN: MATEMATIKA · MATERI: BILANGAN BULAT · KELAS 7
          </div>
        </div>

        {/* Student Data */}
        <div className="border border-black p-4 rounded mb-6 text-xs grid grid-cols-2 gap-3">
          <div>
            <div className="flex">
              <span className="w-28 font-semibold">Nama Siswa</span>
              <span>: <strong>{studentInfo.nama}</strong></span>
            </div>
            <div className="flex mt-1">
              <span className="w-28 font-semibold">Kelas</span>
              <span>: {studentInfo.kelas}</span>
            </div>
          </div>
          <div>
            <div className="flex">
              <span className="w-28 font-semibold">Nomor Absen</span>
              <span>: {studentInfo.noAbsen}</span>
            </div>
            <div className="flex mt-1">
              <span className="w-28 font-semibold">Tanggal Tes</span>
              <span>: {result.dateSubmitted}</span>
            </div>
          </div>
        </div>

        {/* Big Score Box */}
        <div className="border-2 border-black p-6 rounded-lg text-center mb-6 bg-gray-50">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-700">
            NILAI AKHIR ASESMEN
          </div>
          <div className="text-6xl font-extrabold my-2 text-black font-mono">
            {totalScore}
          </div>
          <div className="text-xs text-gray-600">Skala 0 s.d. 100 Poin</div>
          <div className="mt-2 inline-block px-3 py-1 bg-black text-white font-bold text-xs rounded uppercase">
            Kategori: {category}
          </div>
        </div>

        {/* Breakdown Table */}
        <div className="mb-6">
          <div className="font-bold text-xs uppercase mb-2">RINCIAN CAPAIAN KOMPETENSI:</div>
          <table className="w-full text-xs border border-black border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-left">Komponen Asesmen</th>
                <th className="border border-black p-2 text-center w-24">Jumlah Soal</th>
                <th className="border border-black p-2 text-center w-28">Skor Perolehan</th>
                <th className="border border-black p-2 text-center w-28">Skor Maksimal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2 font-medium">Pilihan Ganda (PG)</td>
                <td className="border border-black p-2 text-center">15 Butir</td>
                <td className="border border-black p-2 text-center font-bold">{pgScore}</td>
                <td className="border border-black p-2 text-center">30</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-medium">Benar / Salah</td>
                <td className="border border-black p-2 text-center">5 Butir</td>
                <td className="border border-black p-2 text-center font-bold">{bsScore}</td>
                <td className="border border-black p-2 text-center">10</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-medium">Soal Uraian</td>
                <td className="border border-black p-2 text-center">5 Butir</td>
                <td className="border border-black p-2 text-center font-bold">{uraianScore}</td>
                <td className="border border-black p-2 text-center">60</td>
              </tr>
              <tr className="bg-gray-100 font-bold">
                <td className="border border-black p-2 uppercase">TOTAL SKOR AKHIR</td>
                <td className="border border-black p-2 text-center">25 Butir</td>
                <td className="border border-black p-2 text-center text-sm">{totalScore}</td>
                <td className="border border-black p-2 text-center">100</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Note / Deskripsi Belajar */}
        <div className="border border-gray-300 p-3 rounded text-xs bg-gray-50 mb-8">
          <div className="font-bold text-gray-800">Catatan Perkembangan Belajar:</div>
          <p className="mt-1 text-gray-700">
            {category === 'SANGAT BAIK' && 'Siswa telah menunjukkan penguasaan yang sangat matang dalam menyelesaikan operasi hitung bilangan bulat, hierarki operasi, dan penalaran kontekstual.'}
            {category === 'BAIK' && 'Siswa telah mencapai ketuntasan belajar dengan pemahaman yang baik pada konsep bilangan bulat dan operasi dasarnya.'}
            {category === 'CUKUP' && 'Siswa telah memahami konsep dasar operasi bilangan bulat, namun dianjurkan memperbanyak latihan pemecahan masalah kontekstual bertingkat.'}
            {category === 'PERLU BIMBINGAN' && 'Siswa memerlukan pengulangan konsep dasar bilangan bulat positif dan negatif serta bimbingan intensif pada operasi campuran.'}
          </p>
        </div>

        {/* Footer Signature */}
        <div className="pt-6 border-t-2 border-black flex justify-between text-xs">
          <div>
            <div>Mengetahui Orang Tua / Wali Siswa,</div>
            <div className="mt-12 font-bold">( .................................................... )</div>
          </div>
          <div className="text-right">
            <div>Karangbinangun, {new Date().toLocaleDateString('id-ID')}</div>
            <div>Guru Pengembang / Pengampu,</div>
            <div className="mt-8 font-bold">NUR WAKHID, S.Pd</div>
            <div className="text-gray-600">NIP. 19850412 201101 1 008</div>
          </div>
        </div>
      </div>
    </div>
  );
};
