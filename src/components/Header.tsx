import React from 'react';
import { BookOpen, Printer, Table, ShieldCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenTeacher: () => void;
  onOpenPrint: () => void;
  onOpenCanvaSheet: () => void;
  activeScreen: 'welcome' | 'exam' | 'result' | 'teacher';
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTeacher,
  onOpenPrint,
  onOpenCanvaSheet,
  activeScreen,
}) => {
  return (
    <header className="w-full bg-slate-950/80 backdrop-blur-md border-b border-cyan-950/80 sticky top-0 z-40 no-print transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand & Developer Info */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Sparkles className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-classic text-sm sm:text-base font-bold text-slate-100 tracking-wide">
                TKA MATEMATIKA 7
              </span>
              <span className="text-[10px] uppercase font-mono-math px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/80 hidden sm:inline-block">
                BILANGAN BULAT
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center space-x-1.5">
              <span className="text-amber-300/90 font-medium">NUR WAKHID, S.Pd</span>
              <span>·</span>
              <span className="text-slate-400">SMPN 2 Karangbinangun</span>
            </div>
          </div>
        </div>

        {/* Global Action Nav */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onOpenCanvaSheet}
            className="px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-700/60 rounded-lg transition-colors flex items-center space-x-1.5"
            title="Lihat Rekap Nilai Canva Sheet"
          >
            <Table className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Canva Sheet</span>
          </button>

          <button
            onClick={onOpenPrint}
            className="px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-700/60 rounded-lg transition-colors flex items-center space-x-1.5"
            title="Cetak Naskah Soal Ujian"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">Cetak Soal</span>
          </button>

          <button
            onClick={onOpenTeacher}
            className="px-2.5 sm:px-3 py-1.5 text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-950/30 hover:bg-amber-950/60 border border-amber-800/50 hover:border-amber-600 rounded-lg transition-colors flex items-center space-x-1.5"
            title="Dashboard Khusus Guru"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">Guru</span>
          </button>
        </div>
      </div>
    </header>
  );
};
