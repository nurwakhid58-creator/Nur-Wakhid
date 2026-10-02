import React, { useState } from 'react';
import { StudentInfo } from '../types/assessment';
import { Play, BookOpen, Printer, Table, Award, Sparkles, School, User, Layers, Hash, Check } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (info: StudentInfo) => void;
  onOpenInstructions: () => void;
  onOpenPrint: () => void;
  onOpenCanvaSheet: () => void;
  savedStudentInfo?: StudentInfo | null;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  onOpenInstructions,
  onOpenPrint,
  onOpenCanvaSheet,
  savedStudentInfo,
}) => {
  const [nama, setNama] = useState(savedStudentInfo?.nama || '');
  const [kelas, setKelas] = useState(savedStudentInfo?.kelas || '7-A');
  const [noAbsen, setNoAbsen] = useState(savedStudentInfo?.noAbsen || '');
  const [errorMsg, setErrorMsg] = useState('');

  const handleStartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      setErrorMsg('Silakan masukkan Nama Lengkap siswa terlebih dahulu.');
      return;
    }
    if (!kelas.trim()) {
      setErrorMsg('Silakan pilih atau isi Kelas.');
      return;
    }
    if (!noAbsen.trim()) {
      setErrorMsg('Silakan masukkan Nomor Absen siswa.');
      return;
    }

    setErrorMsg('');
    onStart({
      nama: nama.trim(),
      kelas: kelas.trim(),
      noAbsen: noAbsen.trim(),
    });
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 bg-radial-gradient">
      {/* Background Classic & Futuristic Visual Motifs */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-grid-pattern overflow-hidden">
        {/* Subtle decorative mathematical symbols floating */}
        <div className="absolute top-12 left-10 text-cyan-500/30 text-7xl font-classic font-bold select-none">
          ∑
        </div>
        <div className="absolute top-1/4 right-16 text-cyan-400/20 text-8xl font-classic select-none">
          π
        </div>
        <div className="absolute bottom-20 left-1/4 text-amber-500/20 text-6xl font-mono-math select-none">
          ±
        </div>
        <div className="absolute bottom-32 right-1/3 text-blue-500/20 text-7xl font-classic select-none">
          √x
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full z-10 space-y-8">
        {/* Main Title Section */}
        <div className="text-center space-y-3 pt-2">
          {/* Classic meets Future Eyebrow */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-cyan-800/60 shadow-[0_0_20px_rgba(6,182,212,0.15)] text-xs font-mono-math text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-widest">MEDIA ASESMEN INTERAKTIF MODEL TKA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-classic font-extrabold text-white tracking-tight leading-tight">
            ASESMEN TENGAH SEMESTER GANJIL
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-200 mt-1">
              MATEMATIKA KELAS 7
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-mono-math tracking-wide">
            BAB: <span className="text-cyan-400 font-bold">BILANGAN BULAT</span>
          </p>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Tes Kemampuan Akademik terstandar berbasis stimulus kontekstual: penalaran logis, pemecahan masalah, dan hierarki aritmetika bilangan bulat.
          </p>
        </div>

        {/* Central Card Grid: Student Identity + Curriculum Credentials */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Student Identity Form */}
          <div className="md:col-span-7 bg-slate-900/90 backdrop-blur-md border border-cyan-900/60 rounded-2xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white tracking-wide">
                    Identitas Peserta Didik
                  </h2>
                  <p className="text-xs text-slate-400">
                    Lengkapi data diri sebelum memulai asesmen
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono-math text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                TA 2026/2027
              </span>
            </div>

            <form onSubmit={handleStartSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  Nama Lengkap Siswa <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: Muhammad Aditya Pratama"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    Kelas <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 rounded-xl px-3 py-2.5 text-sm text-white transition-all outline-none cursor-pointer"
                  >
                    <option value="7-A">Kelas 7-A</option>
                    <option value="7-B">Kelas 7-B</option>
                    <option value="7-C">Kelas 7-C</option>
                    <option value="7-D">Kelas 7-D</option>
                    <option value="7-E">Kelas 7-E</option>
                    <option value="7-F">Kelas 7-F</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-cyan-400" />
                    No. Absen <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="45"
                    value={noAbsen}
                    onChange={(e) => setNoAbsen(e.target.value)}
                    placeholder="Contoh: 14"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none font-mono-math"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-800/80 text-xs text-rose-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  {errorMsg}
                </div>
              )}

              {/* Start Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center space-x-2 text-sm uppercase tracking-wider group cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-slate-950 transition-transform group-hover:scale-110" />
                  <span>▶ MULAI ASESMEN</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Developer & Subject Specs */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-4">
            {/* Developer Card */}
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-lg relative">
              <div className="text-[11px] font-mono-math uppercase text-cyan-400 tracking-wider mb-2 flex items-center gap-1.5">
                <School className="w-3.5 h-3.5" />
                Informasi Pengembang
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span className="text-slate-400">Pengembang</span>
                  <span className="font-semibold text-amber-300 font-classic tracking-wide">
                    NUR WAKHID, S.Pd
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span className="text-slate-400">Asal Sekolah</span>
                  <span className="font-medium text-slate-200">
                    SMP Negeri 2 Karangbinangun
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span className="text-slate-400">Mata Pelajaran</span>
                  <span className="font-semibold text-cyan-300">MATEMATIKA</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span className="text-slate-400">Kelas</span>
                  <span className="font-mono-math text-slate-200">7 (Fase D)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Materi Pokok</span>
                  <span className="font-medium text-slate-200">BILANGAN BULAT</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={onOpenInstructions}
                className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-600/60 text-slate-200 transition-all flex flex-col items-center justify-center text-center group cursor-pointer shadow-sm"
              >
                <BookOpen className="w-5 h-5 text-cyan-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">📖 Petunjuk</span>
                <span className="text-[10px] text-slate-400">Tata cara</span>
              </button>

              <button
                type="button"
                onClick={onOpenPrint}
                className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-600/60 text-slate-200 transition-all flex flex-col items-center justify-center text-center group cursor-pointer shadow-sm"
              >
                <Printer className="w-5 h-5 text-slate-300 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">🖨️ Cetak Soal</span>
                <span className="text-[10px] text-slate-400">Naskah ujian</span>
              </button>

              <button
                type="button"
                onClick={onOpenCanvaSheet}
                className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-600/60 text-slate-200 transition-all flex flex-col items-center justify-center text-center group cursor-pointer shadow-sm"
              >
                <Table className="w-5 h-5 text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">📊 Lihat Nilai</span>
                <span className="text-[10px] text-slate-400">Canva Sheet</span>
              </button>
            </div>

            {/* Test Structure Pill-free specs */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
              <div className="flex items-center justify-between text-slate-300 font-medium">
                <span>Struktur Instrumen Asesmen</span>
                <span className="font-mono-math text-cyan-400">Tepat 25 Soal</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>15 PG · 5 Benar/Salah · 5 Uraian</span>
                <span className="text-amber-400 font-mono-math">Bobot 100 Poin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Developer Footer */}
        <div className="pt-4 text-center border-t border-slate-900/90 text-xs text-slate-500">
          <p>
            Dikembangkan oleh{' '}
            <span className="text-slate-300 font-semibold font-classic">
              NUR WAKHID, S.Pd
            </span>{' '}
            — Guru Matematika SMP Negeri 2 Karangbinangun
          </p>
          <p className="text-[11px] text-slate-600 mt-0.5 font-mono-math">
            Classic Mathematics Meets Future Technology · TKA Bilangan Bulat Kelas 7
          </p>
        </div>
      </div>
    </div>
  );
};
