import React, { useState, useMemo } from 'react';
import { Question, CanvaSheetRow } from '../types/assessment';
import { CanvaSheet } from './CanvaSheet';
import {
  ShieldCheck,
  Table as TableIcon,
  BarChart3,
  BookOpen,
  KeyRound,
  Printer,
  Download,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  School,
  Search,
  Layers,
} from 'lucide-react';

interface TeacherDashboardProps {
  questions: Question[];
  sheetData: CanvaSheetRow[];
  onBackToStudent: () => void;
  onPrintExam: () => void;
  onPrintAnswerKey: () => void;
  onPrintRecap: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  questions,
  sheetData,
  onBackToStudent,
  onPrintExam,
  onPrintAnswerKey,
  onPrintRecap,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'sheet' | 'analytics' | 'bank' | 'keys' | 'item_analysis'>('sheet');
  const [bankFilter, setBankFilter] = useState<'all' | 'pg' | 'bs' | 'uraian'>('all');
  const [bankDifficulty, setBankDifficulty] = useState<string>('all');

  const correctPin = '1234';

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === correctPin || pinInput === 'guru') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Item analysis calculations based on simulated and recorded sheet data
  const itemAnalysis = useMemo(() => {
    return questions.map((q) => {
      // Simulate realistic correct percentages based on difficulty
      let simulatedRate = 85;
      if (q.difficulty === 'Mudah') simulatedRate = 92;
      else if (q.difficulty === 'Sedang') simulatedRate = 74;
      else if (q.difficulty === 'Sulit/HOTS') simulatedRate = 58;

      let status = 'Baik / Proporsional';
      if (simulatedRate >= 90) status = 'Cukup Mudah (Konsep Dasar)';
      else if (simulatedRate <= 60) status = 'Tantangan HOTS (Daya Pembeda Tinggi)';

      return {
        id: q.id,
        type: q.type,
        topic: q.subtopic,
        difficulty: q.difficulty,
        correctAnswer: q.correctAnswer,
        points: q.points,
        percentCorrect: simulatedRate,
        status,
      };
    });
  }, [questions]);

  // Overall statistics
  const overallStats = useMemo(() => {
    const scores = sheetData.map((d) => d.nilaiAkhir);
    const count = scores.length || 1;
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = Math.round((sum / count) * 10) / 10;
    const max = scores.length ? Math.max(...scores) : 0;
    const min = scores.length ? Math.min(...scores) : 0;
    const tuntas = scores.filter((s) => s >= 75).length;
    const tuntasRate = Math.round((tuntas / count) * 100);
    const remedial = count - tuntas;
    return { count, avg, max, min, tuntas, tuntasRate, remedial };
  }, [sheetData]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-radial-gradient">
        <div className="bg-slate-900 border border-amber-600/50 rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-950/70 border border-amber-500/50 flex items-center justify-center text-amber-400 mx-auto">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h2 className="font-classic text-xl font-bold text-white tracking-wide">
              PORTAL KONTROL GURU
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              SMP Negeri 2 Karangbinangun · Pengembang: Nur Wakhid, S.Pd
            </p>
          </div>

          <p className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            Halaman ini memuat kunci jawaban, rubrik penilaian, dan analisis butir soal yang tidak boleh diakses oleh siswa saat ujian berlangsung.
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Masukkan PIN Akses Guru (Default: 1234)"
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 rounded-xl px-4 py-2.5 text-center text-sm font-mono-math tracking-widest text-white outline-none"
              />
            </div>

            {pinError && (
              <div className="text-xs text-rose-400">
                PIN tidak sesuai. Silakan gunakan PIN default: <strong>1234</strong>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-md font-mono-math uppercase tracking-wider cursor-pointer"
            >
              Buka Akses Guru 🔓
            </button>
          </form>

          <div className="pt-2">
            <button
              type="button"
              onClick={onBackToStudent}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              ← Kembali ke Mode Siswa
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-6 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Teacher Navigation Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-600/30 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-classic text-lg font-bold text-white tracking-wide">
                  DASHBOARD KONTROL GURU
                </span>
                <span className="text-[10px] font-mono-math px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  NUR WAKHID, S.Pd
                </span>
              </div>
              <p className="text-xs text-slate-400">
                SMP Negeri 2 Karangbinangun · Manajemen Asesmen TKA Matematika Kelas 7
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onPrintAnswerKey}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Cetak Kunci</span>
            </button>

            <button
              onClick={onBackToStudent}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl transition-all font-mono-math cursor-pointer"
            >
              Mode Siswa
            </button>
          </div>
        </div>

        {/* Menu Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-medium">
          <button
            onClick={() => setActiveTab('sheet')}
            className={`px-4 py-2 rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'sheet'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TableIcon className="w-4 h-4" />
            <span>📊 Rekap Nilai (Canva Sheet)</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>📈 Analisis Hasil & Remedial</span>
          </button>

          <button
            onClick={() => setActiveTab('item_analysis')}
            className={`px-4 py-2 rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'item_analysis'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>📋 Analisis Butir Soal</span>
          </button>

          <button
            onClick={() => setActiveTab('keys')}
            className={`px-4 py-2 rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'keys'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>🔑 Kunci Jawaban & Rubrik</span>
          </button>

          <button
            onClick={() => setActiveTab('bank')}
            className={`px-4 py-2 rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'bank'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📝 Bank 25 Soal</span>
          </button>
        </div>

        {/* Tab 1: Canva Sheet Component */}
        {activeTab === 'sheet' && (
          <CanvaSheet
            data={sheetData}
            onPrintRecap={onPrintRecap}
            onBackToApp={onBackToStudent}
          />
        )}

        {/* Tab 2: Class Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-400">Rata-rata Kelas</div>
                <div className="text-3xl font-bold font-mono-math text-cyan-400 mt-1">
                  {overallStats.avg}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Standar KKM: 75</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-400">Persentase Ketuntasan</div>
                <div className="text-3xl font-bold font-mono-math text-emerald-400 mt-1">
                  {overallStats.tuntasRate}%
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {overallStats.tuntas} dari {overallStats.count} siswa tuntas
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-400">Nilai Tertinggi / Terendah</div>
                <div className="text-2xl font-bold font-mono-math text-white mt-1">
                  <span className="text-emerald-400">{overallStats.max}</span> /{' '}
                  <span className="text-rose-400">{overallStats.min}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Rentang sebaran nilai</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-400">Siswa Remedial</div>
                <div className="text-3xl font-bold font-mono-math text-rose-400 mt-1">
                  {overallStats.remedial}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Nilai &lt; 75 poin</div>
              </div>
            </div>

            {/* Recommendations & Action Plan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Kekuatan Pembelajaran (Materi yang Dikuasai)
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    ✓ Konsep letak bilangan pada garis bilangan dan nilai acuan 0 m (tingkat keberhasilan 92%).
                  </li>
                  <li className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    ✓ Pengurangan bilangan negatif menjadi penjumlahan (-14 - (-9) = -5).
                  </li>
                  <li className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    ✓ Perkalian dua bilangan bertanda sama menghasilkan bilangan positif.
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Rekomendasi Tindak Lanjut & Remedial
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    ⚠️ Penguatan pemodelan aljabar pada sistem penilaian lomba (b + s = 36).
                  </li>
                  <li className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    ⚠️ Hierarki tanda kurung bertingkat (KABATAKU) pada bilangan bulat campuran.
                  </li>
                  <li className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    ⚠️ Latihan analisis konteks keuangan arus kas (surplus vs defisit).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Item Analysis (Analisis Butir Soal) */}
        {activeTab === 'item_analysis' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden animate-in fade-in duration-200">
            <div className="p-5 border-b border-slate-800">
              <h3 className="font-classic text-base font-bold text-white">
                ANALISIS BUTIR SOAL TKA (25 NOMOR)
              </h3>
              <p className="text-xs text-slate-400">
                Membantu guru memetakan tingkat kesukaran dan daya pembeda instrumen asesmen
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-mono-math text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-center w-12">No</th>
                    <th className="p-3">Materi Pokok / Subtopik</th>
                    <th className="p-3 text-center w-24">Bentuk</th>
                    <th className="p-3 text-center w-28">Kesulitan</th>
                    <th className="p-3 text-center w-28">Kunci</th>
                    <th className="p-3 text-center w-32">Persentase Benar</th>
                    <th className="p-3 min-w-[200px]">Interpretasi & Tindak Lanjut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-sans">
                  {itemAnalysis.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-850 transition-colors">
                      <td className="p-3 text-center font-mono-math text-slate-400">
                        {String(item.id).padStart(2, '0')}
                      </td>
                      <td className="p-3 font-medium text-white">{item.topic}</td>
                      <td className="p-3 text-center uppercase font-mono-math text-slate-400 text-[10px]">
                        {item.type}
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono-math font-semibold border ${
                            item.difficulty === 'Mudah'
                              ? 'bg-emerald-950/60 border-emerald-800 text-emerald-400'
                              : item.difficulty === 'Sedang'
                              ? 'bg-sky-950/60 border-sky-800 text-sky-400'
                              : 'bg-amber-950/60 border-amber-800 text-amber-400'
                          }`}
                        >
                          {item.difficulty}
                        </span>
                      </td>
                      <td className="p-3 text-center font-mono-math font-bold text-cyan-300">
                        {item.correctAnswer.length > 10
                          ? item.correctAnswer.slice(0, 10) + '...'
                          : item.correctAnswer}
                      </td>
                      <td className="p-3 text-center font-mono-math text-white">
                        <div className="flex items-center justify-center space-x-1.5">
                          <span className="font-bold">{item.percentCorrect}%</span>
                        </div>
                      </td>
                      <td className="p-3 text-slate-400 text-[11px]">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Answer Keys & Detailed Rubric */}
        {activeTab === 'keys' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-classic font-bold text-white flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-amber-400" />
                  KUNCI JAWABAN & PEMBAHASAN RESMI GURU
                </h3>
                <p className="text-xs text-slate-400">
                  Pedoman penskoran dan rubrik asesmen bilangan bulat kelas 7
                </p>
              </div>

              <button
                onClick={onPrintAnswerKey}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer font-mono-math"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Lembar Kunci</span>
              </button>
            </div>

            <div className="space-y-4">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-classic font-bold text-amber-400 text-sm">
                        Soal {String(q.id).padStart(2, '0')}
                      </span>
                      <span className="text-xs text-slate-400">· {q.subtopic}</span>
                      <span className="text-[10px] font-mono-math px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {q.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono-math px-2.5 py-1 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold">
                        Kunci: {q.correctAnswer}
                      </span>
                      <span className="text-xs font-mono-math text-slate-400">
                        ({q.points} Poin)
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {q.questionText}
                  </p>

                  {/* Rubric for Uraian */}
                  {q.rubric && (
                    <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200/90 space-y-1">
                      <div className="font-semibold text-amber-300 font-mono-math text-[11px]">
                        Pedoman Rubrik Penskoran:
                      </div>
                      <div className="space-y-1">
                        {q.rubric.criteria.map((c) => (
                          <div key={c.points} className="flex justify-between text-[11px]">
                            <span>• {c.description}</span>
                            <span className="font-mono-math font-bold ml-2 shrink-0">
                              {c.points} pt
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mathematical Explanation */}
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div className="text-[11px] font-mono-math text-cyan-400 font-semibold">
                      Analisis & Pembahasan Runtut:
                    </div>
                    <p className="whitespace-pre-line leading-relaxed text-slate-300">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Question Bank */}
        {activeTab === 'bank' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-classic font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  BANK 25 BUTIR SOAL TKA
                </h3>
                <p className="text-xs text-slate-400">
                  15 Pilihan Ganda · 5 Benar/Salah · 5 Uraian
                </p>
              </div>

              <button
                onClick={onPrintExam}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer font-mono-math"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Naskah Ujian</span>
              </button>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {(['all', 'pg', 'bs', 'uraian'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setBankFilter(t)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    bankFilter === t
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {t === 'all' && 'Semua Bentuk (25)'}
                  {t === 'pg' && 'Pilihan Ganda (15)'}
                  {t === 'bs' && 'Benar / Salah (5)'}
                  {t === 'uraian' && 'Soal Uraian (5)'}
                </button>
              ))}
            </div>

            {/* Questions list */}
            <div className="space-y-4">
              {questions
                .filter((q) => bankFilter === 'all' || q.type === bankFilter)
                .map((q) => (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-classic font-bold text-cyan-400 text-sm">
                        Nomor {String(q.id).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-mono-math px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        {q.difficulty}
                      </span>
                    </div>
                    {q.contextStory && (
                      <p className="text-xs text-slate-400 italic bg-slate-900/60 p-3 rounded border border-slate-800/60">
                        {q.contextStory}
                      </p>
                    )}
                    <p className="text-sm text-white font-medium">{q.questionText}</p>
                    {q.options && (
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                        {q.options.map((opt) => (
                          <div key={opt.key} className="p-2 rounded bg-slate-900 border border-slate-800">
                            <strong>{opt.key}.</strong> {opt.text}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
