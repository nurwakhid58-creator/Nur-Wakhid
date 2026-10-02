import React from 'react';

interface QuestionVisualProps {
  visualKey?: 'thermometer' | 'ocean_depth' | 'elevator' | 'number_line' | 'scoreboard' | 'ledger' | 'freezer_gauge';
  data?: Record<string, any>;
  questionId: number;
}

export const QuestionVisual: React.FC<QuestionVisualProps> = ({ visualKey, data, questionId }) => {
  if (!visualKey) return null;

  switch (visualKey) {
    case 'ocean_depth': {
      // Diver depth, bird/drone height, whale
      const isQ1 = questionId === 1;
      const isQ8 = questionId === 8;
      const isQ15 = questionId === 15;

      return (
        <div className="w-full bg-slate-900/90 border border-cyan-900/60 rounded-xl p-4 my-4 relative overflow-hidden shadow-inner">
          <div className="flex items-center justify-between text-xs text-cyan-400 font-mono-math mb-2">
            <span>DIAGRAM ELEVASI MARITIM // TITIK ACUAN: 0 METER</span>
            <span className="text-slate-400">SKALA VERTIKAL</span>
          </div>

          <svg viewBox="0 0 700 280" className="w-full h-auto max-h-64 font-sans select-none">
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#09182d" />
                <stop offset="100%" stopColor="#0f2b48" />
              </linearGradient>
              <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0369a1" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#075985" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#082f49" />
              </linearGradient>
            </defs>

            {/* Sky */}
            <rect x="0" y="0" width="700" height="110" fill="url(#skyGrad)" />
            {/* Sea */}
            <rect x="0" y="110" width="700" height="170" fill="url(#seaGrad)" />

            {/* Sea Surface Line (0 m) */}
            <line x1="50" y1="110" x2="680" y2="110" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="6 3" />
            <rect x="520" y="96" width="160" height="26" rx="4" fill="#0f172a" fillOpacity="0.8" stroke="#38bdf8" strokeWidth="1" />
            <text x="600" y="113" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
              Permukaan Laut = 0 m
            </text>

            {/* Vertical Scale Axis on Left */}
            <line x1="60" y1="20" x2="60" y2="260" stroke="#64748b" strokeWidth="1.5" />
            {/* Axis ticks */}
            <text x="48" y="45" textAnchor="end" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">+65m</text>
            <circle cx="60" cy="42" r="3" fill="#38bdf8" />

            <text x="48" y="75" textAnchor="end" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">+40m</text>
            <circle cx="60" cy="72" r="3" fill="#38bdf8" />

            <text x="48" y="114" textAnchor="end" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">0m</text>
            <circle cx="60" cy="110" r="4" fill="#38bdf8" />

            <text x="48" y="155" textAnchor="end" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">-15m</text>
            <circle cx="60" cy="150" r="3" fill="#38bdf8" />

            <text x="48" y="205" textAnchor="end" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">-72m</text>
            <circle cx="60" cy="200" r="3" fill="#38bdf8" />

            <text x="48" y="255" textAnchor="end" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">-180m</text>
            <circle cx="60" cy="250" r="3" fill="#38bdf8" />

            {/* Q1: Diver & Boat */}
            {isQ1 && (
              <g>
                {/* Surface Research Boat */}
                <path d="M 280,108 L 360,108 L 345,120 L 295,120 Z" fill="#e2e8f0" stroke="#0ea5e9" strokeWidth="1.5" />
                <rect x="310" y="90" width="30" height="18" fill="#38bdf8" />
                <text x="325" y="82" textAnchor="middle" fill="#94a3b8" fontSize="10">Kapal Riset</text>

                {/* Diver at -15m */}
                <g transform="translate(320, 145)">
                  {/* Oxygen tank & diver */}
                  <rect x="-8" y="-4" width="16" height="8" rx="3" fill="#f59e0b" />
                  <circle cx="12" cy="0" r="5" fill="#38bdf8" />
                  {/* Flippers */}
                  <line x1="-8" y1="2" x2="-18" y2="6" stroke="#f59e0b" strokeWidth="2.5" />
                  {/* Air bubbles */}
                  <circle cx="10" cy="-10" r="2" fill="#bae6fd" opacity="0.8" />
                  <circle cx="8" cy="-18" r="3" fill="#bae6fd" opacity="0.6" />
                  <circle cx="12" cy="-26" r="2" fill="#bae6fd" opacity="0.4" />
                </g>
                {/* Label badge */}
                <rect x="360" y="138" width="140" height="28" rx="6" fill="#090d16" stroke="#f59e0b" strokeWidth="1" />
                <text x="430" y="156" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
                  Penyelam: -15 meter
                </text>
              </g>
            )}

            {/* Q8: Submarine ROV descending */}
            {isQ8 && (
              <g>
                <path d="M 200,108 L 260,108 L 250,118 L 210,118 Z" fill="#cbd5e1" />
                {/* Descent path arrow */}
                <line x1="230" y1="115" x2="230" y2="195" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arrow)" />
                <text x="240" y="155" fill="#fb7185" fontSize="10" fontStyle="italic">Menyelam 4 m/menit (18 menit)</text>

                {/* Submarine at -72m */}
                <g transform="translate(320, 195)">
                  <ellipse cx="0" cy="0" rx="32" ry="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                  <rect x="-10" y="-18" width="14" height="6" fill="#0284c7" />
                  <circle cx="16" cy="0" r="4" fill="#fef08a" />
                  <path d="M 20,0 L 50,-10 L 50,10 Z" fill="#38bdf8" opacity="0.2" />
                </g>
                <rect x="380" y="185" width="160" height="28" rx="6" fill="#090d16" stroke="#38bdf8" strokeWidth="1" />
                <text x="460" y="203" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
                  Posisi: 18 × (-4) = -72 m
                </text>
              </g>
            )}

            {/* Q15: Eagle, Drone, Whale */}
            {isQ15 && (
              <g>
                {/* Eagle at +65m */}
                <g transform="translate(240, 42)">
                  <path d="M -16,4 Q 0,-10 16,4 Q 0,-2 -16,4 Z" fill="#fbbf24" />
                  <text x="30" y="5" fill="#fbbf24" fontSize="11" fontWeight="bold">Elang Laut: +65 m</text>
                </g>

                {/* Distance brackets between Eagle & Drone */}
                <line x1="200" y1="42" x2="200" y2="72" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 2" />
                <text x="175" y="60" textAnchor="end" fill="#94a3b8" fontSize="10">25 m</text>

                {/* Drone at +40m */}
                <g transform="translate(240, 72)">
                  <rect x="-10" y="-4" width="20" height="8" rx="2" fill="#38bdf8" />
                  <line x1="-16" y1="-4" x2="16" y2="-4" stroke="#e2e8f0" strokeWidth="1.5" />
                  <circle cx="-16" cy="-4" r="3" fill="#22d3ee" />
                  <circle cx="16" cy="-4" r="3" fill="#22d3ee" />
                  <text x="30" y="5" fill="#38bdf8" fontSize="11" fontWeight="bold">Drone Sensor: +40 m</text>
                </g>

                {/* Whale at -180m */}
                <g transform="translate(240, 245)">
                  <ellipse cx="0" cy="0" rx="36" ry="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <path d="M -30,-2 Q -50,-15 -45,8 Z" fill="#1e293b" />
                  <text x="45" y="4" fill="#38bdf8" fontSize="11" fontWeight="bold">Paus Bungkuk: -180 m</text>
                </g>

                {/* Vertical distance arrow between Drone and Whale */}
                <line x1="450" y1="75" x2="450" y2="240" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                <rect x="465" y="140" width="160" height="34" rx="6" fill="#090d16" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="545" y="156" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                  Jarak Vertikal:
                </text>
                <text x="545" y="169" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="JetBrains Mono">
                  40 - (-180) = 220 m
                </text>
              </g>
            )}
          </svg>
        </div>
      );
    }

    case 'thermometer': {
      // Comparison between cities (Q2) or Dieng temperature change (Q6) or Extremes (Q13)
      const isQ2 = questionId === 2;
      const isQ6 = questionId === 6;
      const isQ13 = questionId === 13;

      if (isQ2) {
        return (
          <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 my-4 shadow-inner">
            <div className="text-xs text-cyan-400 font-mono-math mb-3">DATA PENGUKURAN SUHU STASIUN METEOROLOGI (°C)</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { city: 'Seoul', temp: -12, color: 'text-cyan-300', bg: 'bg-cyan-950/40 border-cyan-800/60' },
                { city: 'Moskow', temp: -8, color: 'text-sky-300', bg: 'bg-sky-950/40 border-sky-800/60' },
                { city: 'London', temp: 2, color: 'text-emerald-300', bg: 'bg-emerald-950/40 border-emerald-800/60' },
                { city: 'Tokyo', temp: 4, color: 'text-amber-300', bg: 'bg-amber-950/40 border-amber-800/60' },
              ].map((item) => (
                <div key={item.city} className={`p-3 rounded-lg border text-center ${item.bg}`}>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{item.city}</div>
                  <div className={`text-2xl font-bold font-mono-math my-1 ${item.color}`}>
                    {item.temp > 0 ? `+${item.temp}` : item.temp}°C
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {item.temp < 0 ? 'Di bawah beku (negatif)' : 'Di atas beku (positif)'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (isQ6) {
        return (
          <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 my-4 shadow-inner">
            <div className="text-xs text-cyan-400 font-mono-math mb-2">GRAFIK PERUBAHAN SUHU DIENG (JAM KE JAM)</div>
            <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sky-950 border border-sky-500/50 flex items-center justify-center font-bold text-sky-300 font-mono-math text-sm">
                  -2°C
                </div>
                <div>
                  <div className="text-xs text-slate-400">Pukul 04.00 (Pagi)</div>
                  <div className="text-sm font-semibold text-slate-200">Suhu Awal Dingin</div>
                </div>
              </div>

              <div className="text-cyan-400 font-mono-math text-xs bg-slate-800 px-3 py-1 rounded">
                ▲ Naik +15°C
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-950 border border-amber-500/50 flex items-center justify-center font-bold text-amber-300 font-mono-math text-sm">
                  13°C
                </div>
                <div>
                  <div className="text-xs text-slate-400">Pukul 12.00 (Siang)</div>
                  <div className="text-sm font-semibold text-slate-200">-2 + 15 = 13°C</div>
                </div>
              </div>

              <div className="text-rose-400 font-mono-math text-xs bg-slate-800 px-3 py-1 rounded">
                ▼ Turun -7°C
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center font-bold text-emerald-300 font-mono-math text-sm">
                  ? °C
                </div>
                <div>
                  <div className="text-xs text-slate-400">Pukul 20.00 (Malam)</div>
                  <div className="text-sm font-semibold text-slate-200">Suhu Akhir Dicari</div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      if (isQ13) {
        return (
          <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 my-4 shadow-inner">
            <div className="text-xs text-cyan-400 font-mono-math mb-2">PERBANDINGAN DUA SUHU EKSTREM (°C)</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              <div className="p-3 bg-red-950/30 border border-red-800/40 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xs text-red-400 font-medium">Suhu Lingkungan Luar</div>
                  <div className="text-slate-300 text-xs">Kondisi hangat siang hari</div>
                </div>
                <div className="text-3xl font-bold font-mono-math text-red-400">+32°C</div>
              </div>
              <div className="p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xs text-cyan-400 font-medium">Ruang Pembekuan Vaksin</div>
                  <div className="text-slate-300 text-xs">Kondisi beku dingin ekstrem</div>
                </div>
                <div className="text-3xl font-bold font-mono-math text-cyan-400">-16°C</div>
              </div>
            </div>
          </div>
        );
      }
      return null;
    }

    case 'number_line': {
      // Q3: Robot moving -7 then +12 = 5
      return (
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 my-4 shadow-inner">
          <div className="flex justify-between items-center text-xs text-cyan-400 font-mono-math mb-2">
            <span>SIMULASI GARIS BILANGAN INTERAKTIF</span>
            <span className="text-slate-400">LANGKAH: 0 ➜ -7 ➜ +5</span>
          </div>

          <svg viewBox="0 0 650 140" className="w-full h-auto max-h-40 select-none">
            {/* Horizontal Line with arrow heads */}
            <line x1="30" y1="80" x2="620" y2="80" stroke="#0ea5e9" strokeWidth="2.5" />
            <polygon points="25,80 35,74 35,86" fill="#0ea5e9" />
            <polygon points="625,80 615,74 615,86" fill="#0ea5e9" />

            {/* Tick marks from -9 to +9 */}
            {[-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8].map((val) => {
              const x = 325 + val * 32;
              const isZero = val === 0;
              const isKey = val === -7 || val === 5;
              return (
                <g key={val}>
                  <line
                    x1={x}
                    y1={isZero ? 68 : isKey ? 70 : 74}
                    x2={x}
                    y2={isZero ? 92 : isKey ? 90 : 86}
                    stroke={isZero ? '#38bdf8' : isKey ? '#fbbf24' : '#64748b'}
                    strokeWidth={isZero || isKey ? 2.5 : 1.5}
                  />
                  <text
                    x={x}
                    y={108}
                    textAnchor="middle"
                    fill={isZero ? '#38bdf8' : isKey ? '#fbbf24' : '#94a3b8'}
                    fontSize={isZero || isKey ? '12' : '10'}
                    fontWeight={isZero || isKey ? 'bold' : 'normal'}
                    fontFamily="JetBrains Mono"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Arc 1: 0 to -7 (7 units left) */}
            <path
              d="M 325,75 Q 213,20 101,75"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            <polygon points="101,75 110,68 112,78" fill="#f43f5e" />
            <rect x="170" y="24" width="86" height="20" rx="4" fill="#090d16" stroke="#f43f5e" strokeWidth="1" />
            <text x="213" y="38" textAnchor="middle" fill="#fb7185" fontSize="10" fontWeight="bold">
              -7 (ke kiri)
            </text>

            {/* Arc 2: -7 to +5 (12 units right) */}
            <path
              d="M 101,65 Q 293,5 485,65"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
            <polygon points="485,65 475,58 474,68" fill="#10b981" />
            <rect x="250" y="8" width="94" height="20" rx="4" fill="#090d16" stroke="#10b981" strokeWidth="1" />
            <text x="297" y="22" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
              +12 (ke kanan)
            </text>
          </svg>
        </div>
      );
    }

    case 'elevator': {
      // Q7: Lift starts at 5, down 7 (-2), up 9 (7)
      return (
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 my-4 shadow-inner">
          <div className="text-xs text-cyan-400 font-mono-math mb-2">SKEMA ELEVATOR GEDUNG TINGGI & BASEMENT</div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
            <div className="flex-1 w-full space-y-2">
              <div className="flex items-center justify-between text-xs px-3 py-1.5 rounded bg-slate-800/80 border border-slate-700">
                <span className="text-slate-400">1. Posisi Awal</span>
                <span className="font-bold text-amber-400 font-mono-math">Lantai 5 (+5)</span>
              </div>
              <div className="flex items-center justify-between text-xs px-3 py-1.5 rounded bg-rose-950/40 border border-rose-900/60">
                <span className="text-rose-300">2. Turun 7 Lantai</span>
                <span className="font-bold text-rose-400 font-mono-math">5 - 7 = Lantai -2 (B2)</span>
              </div>
              <div className="flex items-center justify-between text-xs px-3 py-1.5 rounded bg-emerald-950/40 border border-emerald-900/60">
                <span className="text-emerald-300">3. Naik 9 Lantai</span>
                <span className="font-bold text-emerald-400 font-mono-math">-2 + 9 = Lantai ?</span>
              </div>
            </div>

            <div className="w-36 bg-slate-950 border border-cyan-900/80 rounded-lg p-2.5 flex flex-col items-center">
              <div className="text-[10px] text-cyan-400 font-mono-math mb-1">INDIKATOR KABIN</div>
              <div className="w-full bg-slate-900 rounded border border-cyan-500/40 py-2 text-center">
                <div className="text-2xl font-bold font-mono-math text-cyan-300">LT ?</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Status: Berhenti</div>
              </div>
              <div className="mt-2 text-[10px] text-slate-400 text-center">
                Lantai B3(-3) s/d Lt 15(+15)
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'ledger': {
      // Q12: Koperasi saldo 150.000 - 85.000 + 60.000 - 35.000 = 90.000
      return (
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 my-4 shadow-inner overflow-x-auto">
          <div className="text-xs text-cyan-400 font-mono-math mb-2">BUKU KAS KOPERASI SISWA SMPN 2 KARANGBINANGUN</div>
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-800 text-slate-400 font-mono-math text-[11px]">
              <tr>
                <th className="p-2">Transaksi</th>
                <th className="p-2">Masuk (+)</th>
                <th className="p-2">Keluar (-)</th>
                <th className="p-2">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="p-2 font-medium">Saldo Awal Kas</td>
                <td className="p-2 text-emerald-400 font-mono-math">Rp150.000</td>
                <td className="p-2 text-slate-500">-</td>
                <td className="p-2 text-slate-400">Modal kas awal</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">Beli Buku Tulis</td>
                <td className="p-2 text-slate-500">-</td>
                <td className="p-2 text-rose-400 font-mono-math">Rp85.000</td>
                <td className="p-2 text-slate-400">Pengeluaran stok</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">Pelunasan Piutang</td>
                <td className="p-2 text-emerald-400 font-mono-math">Rp60.000</td>
                <td className="p-2 text-slate-500">-</td>
                <td className="p-2 text-slate-400">Pemasukan kas</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">Ongkos Kirim Paket</td>
                <td className="p-2 text-slate-500">-</td>
                <td className="p-2 text-rose-400 font-mono-math">Rp35.000</td>
                <td className="p-2 text-slate-400">Biaya operasional</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    case 'scoreboard': {
      // Q14: Olimpiade 50 soal: Ahmad Benar 38, Kosong 5, Salah 7
      return (
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 my-4 shadow-inner">
          <div className="text-xs text-cyan-400 font-mono-math mb-2">ATURAN SKOR OLIMPIADE MATEMATIKA (TOTAL 50 SOAL)</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-lg">
              <div className="flex justify-between items-center text-xs">
                <span className="text-emerald-400 font-medium">Jawaban BENAR</span>
                <span className="px-2 py-0.5 bg-emerald-900/60 text-emerald-300 rounded font-mono-math font-bold">+4</span>
              </div>
              <div className="mt-2 text-slate-300 text-xs">Ahmad Menjawab: 38 soal</div>
            </div>

            <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-lg">
              <div className="flex justify-between items-center text-xs">
                <span className="text-rose-400 font-medium">Jawaban SALAH</span>
                <span className="px-2 py-0.5 bg-rose-900/60 text-rose-300 rounded font-mono-math font-bold">-2</span>
              </div>
              <div className="mt-2 text-slate-300 text-xs">Ahmad Menjawab: Sisanya (?)</div>
            </div>

            <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-lg">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">TIDAK DIJAWAB</span>
                <span className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded font-mono-math font-bold">-1</span>
              </div>
              <div className="mt-2 text-slate-300 text-xs">Ahmad Kosong: 5 soal</div>
            </div>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
};
