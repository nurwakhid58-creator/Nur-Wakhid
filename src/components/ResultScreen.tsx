import React, { useState } from 'react';
import { AssessmentResult, Question } from '../types/assessment';
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Printer,
  Table,
  RotateCcw,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BarChart3,
} from 'lucide-react';

interface ResultScreenProps {
  result: AssessmentResult;
  questions: Question[];
  onRestart: () => void;
  onOpenCanvaSheet: () => void;
  onPrintStudentReport: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  questions,
  onRestart,
  onOpenCanvaSheet,
  onPrintStudentReport,
}) => {
  const [showSolutions, setShowSolutions] = useState(false);
  const [activeQuestionTab, setActiveQuestionTab] = useState<'all' | 'pg' | 'bs' | 'uraian'>('all');

  const {
    studentInfo,
    totalScore,
    pgScore,
    bsScore,
    uraianScore,
    correctCount,
    incorrectCount,
    percentage,
    timeSpentSeconds,
    category,
    answers,
    uraianScores,
  } = result;

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins} menit ${secs} detik`;
  };

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'SANGAT BAIK':
        return {
          color: 'text-emerald-400',
          bg: 'bg-emerald-950/70 border-emerald-700/80',
          badge: 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/50',
          desc: 'Penguasaan konsep dan kemampuan penalaran matematika Anda sangat luar biasa!',
        };
      case 'BAIK':
        return {
          color: 'text-cyan-400',
          bg: 'bg-cyan-950/70 border-cyan-700/80',
          badge: 'bg-cyan-900/60 text-cyan-300 border border-cyan-500/50',
          desc: 'Pemahaman konsep bilangan bulat Anda sudah baik dan tuntas.',
        };
      case 'CUKUP':
        return {
          color: 'text-amber-400',
          bg: 'bg-amber-950/70 border-amber-700/80',
          badge: 'bg-amber-900/60 text-amber-300 border border-amber-500/50',
          desc: 'Cukup memahami operasi dasar, perlu latihan tambahan pada soal kontekstual.',
        };
      default:
        return {
          color: 'text-rose-400',
          bg: 'bg-rose-950/70 border-rose-700/80',
          badge: 'bg-rose-900/60 text-rose-300 border border-rose-500/50',
          desc: 'Perlu bimbingan dan pengulangan konsep dasar bilangan bulat positif dan negatif.',
        };
    }
  };

  const theme = getCategoryTheme(category);

  // Competency Analysis Breakdown
  const easyQuestions = questions.filter((q) => q.difficulty === 'Mudah');
  const mediumQuestions = questions.filter((q) => q.difficulty === 'Sedang');
  const hardQuestions = questions.filter((q) => q.difficulty === 'Sulit/HOTS');

  const calcCompetencyScore = (subset: Question[]) => {
    let earned = 0;
    let max = 0;
    subset.forEach((q) => {
      max += q.points;
      if (q.type === 'pg' || q.type === 'bs') {
        if (answers[q.id]?.answer === q.correctAnswer) earned += q.points;
      } else if (q.type === 'uraian') {
        earned += uraianScores[q.id] || 0;
      }
    });
    return max > 0 ? Math.round((earned / max) * 100) : 0;
  };

  const easyPercent = calcCompetencyScore(easyQuestions);
  const mediumPercent = calcCompetencyScore(mediumQuestions);
  const hardPercent = calcCompetencyScore(hardQuestions);

  const filteredQuestions = questions.filter((q) => {
    if (activeQuestionTab === 'all') return true;
    return q.type === activeQuestionTab;
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8 bg-radial-gradient">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono-math text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ASESMEN SELESAI · TKA MATEMATIKA KELAS 7</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-classic font-bold text-white tracking-wide">
            LEMBAR HASIL ASESMEN SISWA
          </h1>
          <p className="text-sm text-slate-400">
            SMP Negeri 2 Karangbinangun · Materi Pokok: Bilangan Bulat
          </p>
        </div>

        {/* Big Futuristic Score Card */}
        <div className="bg-slate-900/90 backdrop-blur-md border border-cyan-900/70 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Student Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-3">
            <div>
              <div className="text-xs uppercase font-mono-math text-slate-400">Peserta Didik</div>
              <h2 className="text-xl font-bold text-white mt-0.5">{studentInfo.nama}</h2>
              <div className="text-xs text-slate-400 mt-0.5">
                Kelas: <span className="text-cyan-300 font-mono-math">{studentInfo.kelas}</span> · Absen: <span className="text-cyan-300 font-mono-math">{studentInfo.noAbsen}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1.5 rounded-xl text-xs font-mono-math font-bold ${theme.badge}`}>
                {category}
              </span>
            </div>
          </div>

          {/* Score Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6 items-center">
            {/* Main Score Box (Prompt spec: Box NILAI AKHIR) */}
            <div className="md:col-span-5 bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 text-center shadow-[0_0_25px_rgba(6,182,212,0.15)] relative">
              <div className="text-xs uppercase font-mono-math text-cyan-400 tracking-wider">
                NILAI AKHIR
              </div>
              <div className="text-6xl sm:text-7xl font-classic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-200 my-2">
                {totalScore}
              </div>
              <div className="text-xs text-slate-400">
                Skala 0 - 100 Poin
              </div>
              <div className="mt-3 text-xs text-slate-300 font-medium">
                {theme.desc}
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-[11px] text-slate-400">Jawaban Benar</div>
                <div className="text-xl font-bold text-emerald-400 font-mono-math mt-1">
                  {correctCount} <span className="text-xs text-slate-500 font-sans">/ 20</span>
                </div>
                <div className="text-[10px] text-slate-400">PG + Benar/Salah</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-[11px] text-slate-400">Jawaban Salah</div>
                <div className="text-xl font-bold text-rose-400 font-mono-math mt-1">
                  {incorrectCount} <span className="text-xs text-slate-500 font-sans">/ 20</span>
                </div>
                <div className="text-[10px] text-slate-400">PG + Benar/Salah</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-[11px] text-slate-400">Nilai Uraian</div>
                <div className="text-xl font-bold text-amber-400 font-mono-math mt-1">
                  {uraianScore} <span className="text-xs text-slate-500 font-sans">/ 60</span>
                </div>
                <div className="text-[10px] text-slate-400">Rubrik 5 Soal</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-[11px] text-slate-400">Persentase</div>
                <div className="text-xl font-bold text-cyan-400 font-mono-math mt-1">
                  {percentage}%
                </div>
                <div className="text-[10px] text-slate-400">Ketuntasan Ujian</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 col-span-2 sm:col-span-2">
                <div className="text-[11px] text-slate-400">Waktu Pengerjaan</div>
                <div className="text-base font-bold text-white font-mono-math mt-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  {formatTime(timeSpentSeconds)}
                </div>
                <div className="text-[10px] text-slate-400">Kecepatan & Ketelitian</div>
              </div>
            </div>
          </div>

          {/* Simple Performance Chart / Competency Levels */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
              <span className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                Grafik Capaian Berdasarkan Tingkat Kesulitan
              </span>
              <span className="text-[11px] font-mono-math text-slate-400">Distribusi Kognitif</span>
            </div>

            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Tingkat Mudah (Operasi Dasar & Konsep)</span>
                  <span className="font-mono-math text-emerald-400 font-bold">{easyPercent}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${easyPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Tingkat Sedang (Kontekstual Suhu, Lift, Kas, Urutan)</span>
                  <span className="font-mono-math text-sky-400 font-bold">{mediumPercent}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-sky-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${mediumPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Tingkat Sulit / HOTS (Multi-langkah, Pemodelan, Penalaran)</span>
                  <span className="font-mono-math text-amber-400 font-bold">{hardPercent}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${hardPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-5 border-t border-slate-800">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSolutions(!showSolutions)}
                className="px-4 py-2 text-xs font-semibold text-cyan-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-cyan-800/60 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>{showSolutions ? 'Sembunyikan Pembahasan' : '📖 Lihat Pembahasan Soal'}</span>
                {showSolutions ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
              </button>

              <button
                onClick={onPrintStudentReport}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-400" />
                <span>🖨️ Cetak Rapor Hasil</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenCanvaSheet}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-xl shadow-md transition-all font-mono-math flex items-center space-x-1.5 cursor-pointer"
              >
                <Table className="w-4 h-4" />
                <span>📊 Rekap Canva Sheet</span>
              </button>

              <button
                onClick={onRestart}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                title="Mulai asesmen baru"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Solutions Section (Accessible now after assessment is completed!) */}
        {showSolutions && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-classic font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  KUNCI JAWABAN & PEMBAHASAN LENGKAP
                </h3>
                <p className="text-xs text-slate-400">
                  Pelajari langkah penyelesaian dan analisis matematis dari setiap nomor soal
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center space-x-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                {(['all', 'pg', 'bs', 'uraian'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveQuestionTab(tab)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      activeQuestionTab === tab
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab === 'all' && 'Semua (25)'}
                    {tab === 'pg' && 'PG (15)'}
                    {tab === 'bs' && 'B/S (5)'}
                    {tab === 'uraian' && 'Uraian (5)'}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Questions with Solutions */}
            <div className="space-y-5">
              {filteredQuestions.map((q) => {
                const userAns = answers[q.id]?.answer || 'Tidak dijawab';
                const isCorrect =
                  (q.type === 'pg' || q.type === 'bs') &&
                  userAns.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase();

                const uraianEarned = q.type === 'uraian' ? (uraianScores[q.id] || 0) : null;

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-classic font-bold text-cyan-400 text-sm">
                          Soal {String(q.id).padStart(2, '0')}
                        </span>
                        <span className="text-xs text-slate-400">· {q.subtopic}</span>
                        <span className="text-[10px] font-mono-math px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                          {q.difficulty}
                        </span>
                      </div>

                      <div>
                        {q.type === 'uraian' ? (
                          <span className="text-xs font-mono-math px-2.5 py-1 rounded bg-amber-950/70 border border-amber-800/70 text-amber-300 font-semibold">
                            Skor Uraian: {uraianEarned} / {q.points} Poin
                          </span>
                        ) : isCorrect ? (
                          <span className="text-xs font-mono-math px-2.5 py-1 rounded bg-emerald-950/70 border border-emerald-800/70 text-emerald-300 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Benar (+{q.points})
                          </span>
                        ) : (
                          <span className="text-xs font-mono-math px-2.5 py-1 rounded bg-rose-950/70 border border-rose-800/70 text-rose-300 font-semibold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Salah (+0)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-sm text-slate-200 font-medium">
                      {q.questionText}
                    </div>

                    {/* Answer Comparison */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="text-slate-400 text-[11px] mb-0.5">Jawaban Anda:</div>
                        <div className={`font-mono-math font-semibold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {userAns}
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="text-slate-400 text-[11px] mb-0.5">Kunci / Target Jawaban:</div>
                        <div className="font-mono-math font-semibold text-cyan-300">
                          {q.correctAnswer}
                        </div>
                      </div>
                    </div>

                    {/* Mathematical Step-by-Step Explanation */}
                    <div className="p-3.5 rounded-lg bg-cyan-950/30 border border-cyan-900/50 text-xs text-slate-300 space-y-1">
                      <div className="font-semibold text-cyan-400 text-[11px] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Pembahasan Matematis:
                      </div>
                      <p className="whitespace-pre-line leading-relaxed font-sans text-slate-200">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
