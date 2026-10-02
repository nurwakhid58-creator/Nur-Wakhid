import React from 'react';
import { X, CheckCircle2, AlertCircle, Bookmark, ArrowRight } from 'lucide-react';
import { Question, StudentAnswer } from '../types/assessment';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  answers: Record<number, StudentAnswer>;
  currentIndex: number;
  onSelectQuestion: (index: number) => void;
  onFinishExam: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  questions,
  answers,
  currentIndex,
  onSelectQuestion,
  onFinishExam,
}) => {
  if (!isOpen) return null;

  const answeredCount = questions.filter(
    (q) => answers[q.id]?.answer && answers[q.id].answer.trim() !== ''
  ).length;
  const flaggedCount = questions.filter((q) => answers[q.id]?.isFlagged).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-cyan-800/60 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between z-10">
          <div>
            <h2 className="font-classic text-lg font-bold text-white tracking-wide">
              REVIEW DAFTAR JAWABAN (25 SOAL)
            </h2>
            <p className="text-xs text-slate-400">
              Periksa status pengisian seluruh soal sebelum mengakhiri asesmen
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Summary Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400">Sudah Dijawab</div>
              <div className="text-xl font-bold text-emerald-400 font-mono-math">
                {answeredCount} <span className="text-xs text-slate-500 font-sans">/ 25</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400">Belum Dijawab</div>
              <div className="text-xl font-bold text-rose-400 font-mono-math">
                {unansweredCount} <span className="text-xs text-slate-500 font-sans">/ 25</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400">Ragu-ragu</div>
              <div className="text-xl font-bold text-amber-400 font-mono-math">
                {flaggedCount}
              </div>
            </div>
          </div>

          {/* Matrix of Questions 1 to 25 */}
          <div className="space-y-4">
            {/* Section 1: PG (1 - 15) */}
            <div>
              <div className="text-xs uppercase font-mono-math tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span>PILIHAN GANDA (NO. 01 - 15)</span>
                <span className="text-[10px] text-cyan-400">15 SOAL</span>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                {questions.slice(0, 15).map((q, idx) => {
                  const hasAnswer = answers[q.id]?.answer && answers[q.id].answer.trim() !== '';
                  const isFlagged = answers[q.id]?.isFlagged;
                  const isCurrent = idx === currentIndex;

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        onSelectQuestion(idx);
                        onClose();
                      }}
                      className={`relative p-2.5 rounded-lg border text-xs font-mono-math font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                        isCurrent
                          ? 'border-cyan-400 bg-cyan-950/80 text-cyan-300 ring-2 ring-cyan-500/30'
                          : isFlagged
                          ? 'border-amber-500 bg-amber-950/50 text-amber-300'
                          : hasAnswer
                          ? 'border-emerald-600/70 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <span>{String(q.id).padStart(2, '0')}</span>
                      <span className="text-[10px] font-sans font-normal mt-0.5 opacity-90">
                        {hasAnswer ? answers[q.id]?.answer : '-'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Benar / Salah (16 - 20) */}
            <div>
              <div className="text-xs uppercase font-mono-math tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span>BENAR / SALAH (NO. 16 - 20)</span>
                <span className="text-[10px] text-emerald-400">5 SOAL</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {questions.slice(15, 20).map((q, sliceIdx) => {
                  const idx = 15 + sliceIdx;
                  const hasAnswer = answers[q.id]?.answer && answers[q.id].answer.trim() !== '';
                  const isFlagged = answers[q.id]?.isFlagged;
                  const isCurrent = idx === currentIndex;

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        onSelectQuestion(idx);
                        onClose();
                      }}
                      className={`p-2.5 rounded-lg border text-xs font-mono-math font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                        isCurrent
                          ? 'border-cyan-400 bg-cyan-950/80 text-cyan-300 ring-2 ring-cyan-500/30'
                          : isFlagged
                          ? 'border-amber-500 bg-amber-950/50 text-amber-300'
                          : hasAnswer
                          ? 'border-emerald-600/70 bg-emerald-950/40 text-emerald-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <span>{String(q.id).padStart(2, '0')}</span>
                      <span className="text-[9px] font-sans font-normal mt-0.5 opacity-90 truncate max-w-full">
                        {hasAnswer ? answers[q.id]?.answer : '-'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Uraian (21 - 25) */}
            <div>
              <div className="text-xs uppercase font-mono-math tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span>SOAL URAIAN (NO. 21 - 25)</span>
                <span className="text-[10px] text-amber-400">5 SOAL</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {questions.slice(20, 25).map((q, sliceIdx) => {
                  const idx = 20 + sliceIdx;
                  const hasAnswer = answers[q.id]?.answer && answers[q.id].answer.trim().length > 3;
                  const isFlagged = answers[q.id]?.isFlagged;
                  const isCurrent = idx === currentIndex;

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        onSelectQuestion(idx);
                        onClose();
                      }}
                      className={`p-2.5 rounded-lg border text-xs font-mono-math font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                        isCurrent
                          ? 'border-cyan-400 bg-cyan-950/80 text-cyan-300 ring-2 ring-cyan-500/30'
                          : isFlagged
                          ? 'border-amber-500 bg-amber-950/50 text-amber-300'
                          : hasAnswer
                          ? 'border-emerald-600/70 bg-emerald-950/40 text-emerald-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <span>{String(q.id).padStart(2, '0')}</span>
                      <span className="text-[9px] font-sans font-normal mt-0.5 opacity-90">
                        {hasAnswer ? 'Terisi' : 'Kosong'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Lanjut Mengerjakan
          </button>

          <button
            onClick={() => {
              onClose();
              onFinishExam();
            }}
            className="px-5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-lg shadow-md transition-all font-mono-math tracking-wide flex items-center space-x-1.5 cursor-pointer"
          >
            <span>SELESAI ASESMEN</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
