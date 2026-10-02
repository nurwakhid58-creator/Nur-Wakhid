import React, { useState, useEffect } from 'react';
import { Question, StudentAnswer, StudentInfo } from '../types/assessment';
import { QuestionVisual } from './QuestionVisual';
import { ReviewModal } from './ReviewModal';
import { ConfirmFinishModal } from './ConfirmFinishModal';
import {
  Clock,
  Bookmark,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ListOrdered,
  Sparkles,
  HelpCircle,
  FileCheck2,
} from 'lucide-react';

interface AssessmentEngineProps {
  questions: Question[];
  studentInfo: StudentInfo;
  onFinish: (answers: Record<number, StudentAnswer>, timeSpentSeconds: number) => void;
  onOpenInstructions: () => void;
}

export const AssessmentEngine: React.FC<AssessmentEngineProps> = ({
  questions,
  studentInfo,
  onFinish,
  onOpenInstructions,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, StudentAnswer>>({});
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Timer counter
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpentSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];
  const currentAnswer = answers[currentQ.id]?.answer || '';
  const isCurrentFlagged = !!answers[currentQ.id]?.isFlagged;

  const handleSelectAnswer = (ans: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        questionId: currentQ.id,
        answer: ans,
        isFlagged: prev[currentQ.id]?.isFlagged || false,
      },
    }));
  };

  const handleToggleFlag = () => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        questionId: currentQ.id,
        answer: prev[currentQ.id]?.answer || '',
        isFlagged: !prev[currentQ.id]?.isFlagged,
      },
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowReviewModal(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calculations for progress
  const answeredCount = questions.filter(
    (q) => answers[q.id]?.answer && answers[q.id].answer.trim() !== ''
  ).length;
  const flaggedCount = questions.filter((q) => answers[q.id]?.isFlagged).length;
  const unansweredCount = questions.length - answeredCount;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  const handleConfirmFinish = () => {
    setShowConfirmModal(false);
    onFinish(answers, timeSpentSeconds);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-slate-950 text-slate-100">
      {/* Top Floating Control Bar */}
      <div className="bg-slate-900/90 backdrop-blur-md border-b border-cyan-950/80 sticky top-16 z-30 py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Question Index & Type indicator */}
          <div className="flex items-center space-x-3">
            <div className="px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-mono-math font-bold text-sm">
              Soal {currentIndex + 1} <span className="text-slate-500 font-normal">/ {questions.length}</span>
            </div>
            <div className="text-xs text-slate-400 hidden sm:block">
              {currentQ.type === 'pg' && 'Pilihan Ganda (2 Poin)'}
              {currentQ.type === 'bs' && 'Benar / Salah (2 Poin)'}
              {currentQ.type === 'uraian' && 'Soal Uraian (12 Poin)'}
            </div>
          </div>

          {/* Progress Bar & Counter */}
          <div className="flex-1 max-w-xs mx-2 hidden md:block">
            <div className="flex justify-between text-[11px] font-mono-math text-slate-400 mb-1">
              <span>Progres Pengerjaan</span>
              <span className="text-cyan-400 font-semibold">{progressPercent}% ({answeredCount}/25)</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Timer & Nav Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono-math text-xs text-amber-300">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{formatTime(timeSpentSeconds)}</span>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <ListOrdered className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Daftar Soal</span>
            </button>

            <button
              onClick={onOpenInstructions}
              className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
              title="Buka Petunjuk Pengerjaan"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Assessment Body Grid */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Left Column: Active Question Workspace */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            {/* Question Header & Taxonomy */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800/80 mb-5">
              <div className="flex items-center space-x-2 text-xs">
                <span className="font-classic font-bold text-cyan-400 tracking-wider">
                  SOAL {String(currentQ.id).padStart(2, '0')}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">{currentQ.subtopic}</span>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono-math font-semibold border ${
                    currentQ.difficulty === 'Mudah'
                      ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-400'
                      : currentQ.difficulty === 'Sedang'
                      ? 'bg-sky-950/60 border-sky-800/80 text-sky-400'
                      : 'bg-amber-950/60 border-amber-800/80 text-amber-400'
                  }`}
                >
                  {currentQ.difficulty.toUpperCase()}
                </span>
                <span className="text-slate-400 font-mono-math text-[11px]">
                  Bobot: {currentQ.points} Poin
                </span>
              </div>
            </div>

            {/* Stimulus Context Story (TKA Core) */}
            {currentQ.contextStory && (
              <div className="chalkboard-texture border border-cyan-900/40 rounded-xl p-4 sm:p-5 mb-5 text-sm text-slate-200 leading-relaxed relative">
                <div className="text-[10px] uppercase font-mono-math text-cyan-400 mb-1 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Stimulus Soal (Model TKA)
                </div>
                <p className="whitespace-pre-line">{currentQ.contextStory}</p>
              </div>
            )}

            {/* Interactive Visual Graphic */}
            {currentQ.visualKey && (
              <QuestionVisual
                visualKey={currentQ.visualKey}
                data={currentQ.visualData}
                questionId={currentQ.id}
              />
            )}

            {/* Question Text */}
            <div className="text-base sm:text-lg font-medium text-white my-5 leading-snug">
              {currentQ.questionText}
            </div>

            {/* Answering Area Based on Type */}
            <div className="mt-6 space-y-4">
              {/* Type 1: Pilihan Ganda (15 Soal) */}
              {currentQ.type === 'pg' && currentQ.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQ.options.map((opt) => {
                    const isSelected = currentAnswer === opt.key;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectAnswer(opt.key)}
                        className={`p-4 rounded-xl border text-left transition-all flex items-start space-x-3 cursor-pointer group ${
                          isSelected
                            ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] text-white ring-1 ring-cyan-400/50'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono-math font-bold text-xs shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-cyan-400 text-slate-950'
                              : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                          }`}
                        >
                          {opt.key}
                        </div>
                        <div className="text-sm font-medium pt-0.5 leading-relaxed">
                          {opt.text}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Type 2: Benar / Salah (5 Soal) */}
              {currentQ.type === 'bs' && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-400">
                    Tentukan kebenaran pernyataan matematika di atas:
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleSelectAnswer('BENAR')}
                      className={`p-4 rounded-xl border text-center font-bold text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                        currentAnswer === 'BENAR'
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-emerald-700/60 hover:text-emerald-400'
                      }`}
                    >
                      <span>🟢 BENAR</span>
                    </button>
                    <button
                      onClick={() => handleSelectAnswer('SALAH')}
                      className={`p-4 rounded-xl border text-center font-bold text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                        currentAnswer === 'SALAH'
                          ? 'bg-rose-950 border-rose-400 text-rose-300 ring-2 ring-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                          : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-rose-700/60 hover:text-rose-400'
                      }`}
                    >
                      <span>🔴 SALAH</span>
                    </button>
                  </div>
                  {currentAnswer && (
                    <div className="text-xs text-cyan-400 flex items-center gap-1.5 pt-1">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Jawaban Anda telah tersimpan: <strong>{currentAnswer}</strong>.</span>
                    </div>
                  )}
                </div>
              )}

              {/* Type 3: Uraian (5 Soal) */}
              {currentQ.type === 'uraian' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-amber-400" />
                      Instruksi Pengerjaan Uraian:
                    </span>
                    <span className="text-[11px] font-mono-math text-slate-500">
                      Maksimal 12 Poin
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                    Tuliskan langkah-langkah penyelesaian secara runtut (pemodelan variabel, rumus operasi bilangan bulat, perhitungan bersusun) dan tuliskan kesimpulan jawaban akhir secara jelas.
                  </p>
                  <textarea
                    rows={7}
                    value={currentAnswer}
                    onChange={(e) => handleSelectAnswer(e.target.value)}
                    placeholder="Tuliskan langkah penyelesaian dan jawaban akhir Anda di sini..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all font-sans leading-relaxed resize-y"
                  />
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>
                      {currentAnswer.trim() ? (
                        <span className="text-emerald-400">✓ Sudah tersimpan ({currentAnswer.length} karakter)</span>
                      ) : (
                        <span>Belum diisi</span>
                      )}
                    </span>
                    <span className="text-[11px]">Gunakan tanda matematika standar (+, -, ×, :, =)</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action Control Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                currentIndex === 0
                  ? 'border-slate-800 text-slate-600 bg-slate-950 cursor-not-allowed'
                  : 'border-slate-700 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleToggleFlag}
                className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  isCurrentFlagged
                    ? 'border-amber-500 bg-amber-950 text-amber-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-amber-300 hover:border-amber-700/60'
                }`}
                title="Tandai ragu-ragu untuk diperiksa kembali nanti"
              >
                <Bookmark className={`w-3.5 h-3.5 ${isCurrentFlagged ? 'fill-amber-400' : ''}`} />
                <span>{isCurrentFlagged ? 'Ragu-ragu (Ditandai)' : 'Ragu-ragu'}</span>
              </button>

              <button
                onClick={() => setShowReviewModal(true)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
              >
                Review Jawaban
              </button>
            </div>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-md transition-all flex items-center space-x-1.5 cursor-pointer font-mono-math tracking-wide"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md transition-all flex items-center space-x-1.5 cursor-pointer font-mono-math tracking-wide"
              >
                <span>SELESAI ASESMEN</span>
                <CheckCircle className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Navigation Matrix Drawer */}
        <div className="lg:col-span-4 space-y-4">
          {/* Student Profile Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-xs">
            <div className="text-[10px] font-mono-math uppercase text-slate-400 mb-2">
              Peserta Ujian Aktif
            </div>
            <div className="font-semibold text-white truncate text-sm">
              {studentInfo.nama}
            </div>
            <div className="text-slate-400 mt-0.5">
              Kelas: <span className="text-cyan-300 font-mono-math">{studentInfo.kelas}</span> · Absen: <span className="text-cyan-300 font-mono-math">{studentInfo.noAbsen}</span>
            </div>
          </div>

          {/* Quick Matrix 1-25 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">
                Navigasi 25 Nomor Soal
              </span>
              <span className="text-[11px] font-mono-math text-cyan-400">
                {answeredCount}/25 Terisi
              </span>
            </div>

            {/* Matrix buttons */}
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const hasAnswer = answers[q.id]?.answer && answers[q.id].answer.trim() !== '';
                const isFlagged = answers[q.id]?.isFlagged;
                const isCurrent = idx === currentIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`h-10 rounded-lg text-xs font-mono-math font-bold transition-all relative flex flex-col items-center justify-center cursor-pointer border ${
                      isCurrent
                        ? 'border-cyan-400 bg-cyan-950 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400'
                        : isFlagged
                        ? 'border-amber-500 bg-amber-950/60 text-amber-300'
                        : hasAnswer
                        ? 'border-emerald-600/70 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50'
                        : 'border-slate-800 bg-slate-950 text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{String(q.id).padStart(2, '0')}</span>
                    {isFlagged && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded bg-slate-950 border border-slate-700" />
                <span>Belum dijawab</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded bg-emerald-950 border border-emerald-600" />
                <span>Sudah dijawab</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded bg-cyan-950 border border-cyan-400" />
                <span>Soal aktif</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded bg-amber-950 border border-amber-500" />
                <span>Ragu-ragu</span>
              </div>
            </div>

            {/* Finish Button at bottom of sidebar */}
            <div className="pt-2">
              <button
                onClick={() => setShowConfirmModal(true)}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md transition-all font-mono-math tracking-wide flex items-center justify-center space-x-2 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Selesaikan Ujian</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        questions={questions}
        answers={answers}
        currentIndex={currentIndex}
        onSelectQuestion={(idx) => setCurrentIndex(idx)}
        onFinishExam={() => {
          setShowReviewModal(false);
          setShowConfirmModal(true);
        }}
      />

      <ConfirmFinishModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmFinish}
        unansweredCount={unansweredCount}
        flaggedCount={flaggedCount}
        studentInfo={studentInfo}
      />
    </div>
  );
};
