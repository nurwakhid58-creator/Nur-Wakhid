import { Question } from '../types/assessment';

export const QUESTIONS_DATA: Question[] = [
  // ==========================================
  // PILIHAN GANDA (15 SOAL)
  // ==========================================
  {
    id: 1,
    type: 'pg',
    difficulty: 'Mudah',
    topic: 'Bilangan Bulat',
    subtopic: 'Konsep Bilangan Bulat Positif dan Negatif',
    cognitiveLevel: 'C1 - Mengingat & Memahami',
    contextStory: 'Sebuah tim ekspedisi kelautan sedang melakukan pemetaan terumbu karang di perairan Kepulauan Karimunjawa. Permukaan air laut ditetapkan sebagai titik acuan nol (0 meter). Seekor burung pemangsa berada pada ketinggian 40 meter di atas permukaan laut, sementara seorang penyelam sedang meneliti karang pada kedalaman 15 meter di bawah permukaan laut.',
    questionText: 'Berdasarkan konvensi bilangan bulat, lambang bilangan yang tepat untuk menyatakan posisi penyelam di bawah permukaan laut adalah ...',
    visualKey: 'ocean_depth',
    visualData: { diverDepth: -15, birdHeight: 40 },
    options: [
      { key: 'A', text: '+15 meter' },
      { key: 'B', text: '-15 meter' },
      { key: 'C', text: '0 meter' },
      { key: 'D', text: '-30 meter' },
    ],
    correctAnswer: 'B',
    points: 2,
    explanation: 'Titik acuan permukaan laut bernilai 0 m. Posisi di atas permukaan laut dinyatakan dengan tanda positif (+), sedangkan posisi di bawah permukaan laut dinyatakan dengan tanda negatif (-). Karena penyelam berada 15 meter di bawah permukaan laut, maka ditulis -15 meter.',
  },
  {
    id: 2,
    type: 'pg',
    difficulty: 'Mudah',
    topic: 'Bilangan Bulat',
    subtopic: 'Membandingkan Bilangan Bulat',
    cognitiveLevel: 'C2 - Memahami',
    contextStory: 'Stasiun meteorologi mencatat suhu udara di empat kota besar dunia saat puncak musim dingin: Moskow (-8°C), Tokyo (4°C), Seoul (-12°C), dan London (2°C).',
    questionText: 'Pernyataan perbandingan nilai suhu berikut yang bernilai BENAR adalah ...',
    visualKey: 'thermometer',
    visualData: {
      cities: [
        { name: 'Seoul', temp: -12 },
        { name: 'Moskow', temp: -8 },
        { name: 'London', temp: 2 },
        { name: 'Tokyo', temp: 4 },
      ],
    },
    options: [
      { key: 'A', text: '-8°C < -12°C' },
      { key: 'B', text: '4°C < -8°C' },
      { key: 'C', text: '-12°C < -8°C' },
      { key: 'D', text: '-8°C > 2°C' },
    ],
    correctAnswer: 'C',
    points: 2,
    explanation: 'Pada garis bilangan horizontal, bilangan yang berada di sebelah kiri selalu bernilai lebih kecil daripada bilangan di sebelah kanannya. Karena -12 berada di sebelah kiri -8, maka -12 < -8 adalah pernyataan yang benar.',
  },
  {
    id: 3,
    type: 'pg',
    difficulty: 'Mudah',
    topic: 'Bilangan Bulat',
    subtopic: 'Garis Bilangan & Penjumlahan',
    cognitiveLevel: 'C2 - Memahami',
    contextStory: 'Perhatikan pergerakan robot simulasi pada garis bilangan: Mula-mula robot berada di titik 0, bergerak ke arah kiri sejauh 7 satuan, kemudian berbalik arah dan melangkah maju ke kanan sejauh 12 satuan.',
    questionText: 'Posisi akhir robot tersebut menunjukkan operasi hitung dan hasil yang tepat, yaitu ...',
    visualKey: 'number_line',
    visualData: { start: 0, move1: -7, move2: 12, end: 5 },
    options: [
      { key: 'A', text: '-7 + 12 = 5' },
      { key: 'B', text: '-7 - 12 = -19' },
      { key: 'C', text: '7 - 12 = -5' },
      { key: 'D', text: '-7 + 12 = -5' },
    ],
    correctAnswer: 'A',
    points: 2,
    explanation: 'Langkah pertama ke kiri sejauh 7 satuan mewakili bilangan -7. Langkah kedua ke kanan sejauh 12 satuan mewakili penjumlahan (+12). Posisi akhir robot berada di titik: -7 + 12 = 5.',
  },
  {
    id: 4,
    type: 'pg',
    difficulty: 'Mudah',
    topic: 'Bilangan Bulat',
    subtopic: 'Penjumlahan Bilangan Bulat',
    cognitiveLevel: 'C2 - Memahami',
    contextStory: 'Sebuah kapal riset cuaca mencatat suhu awal cairan uji adalah 18°C. Setelah dimasukkan zat pendingin, suhunya turun sebesar 25°C.',
    questionText: 'Hasil dari operasi hitung 18 + (-25) adalah ...',
    options: [
      { key: 'A', text: '43' },
      { key: 'B', text: '7' },
      { key: 'C', text: '-43' },
      { key: 'D', text: '-7' },
    ],
    correctAnswer: 'D',
    points: 2,
    explanation: 'Dalam penjumlahan dua bilangan berbeda tanda, kurangkan nilai mutlak bilangan terbesar dengan bilangan terkecil: |25| - |18| = 7. Karena tanda bilangan dengan nilai mutlak lebih besar adalah negatif (-25), maka hasilnya adalah -7.',
  },
  {
    id: 5,
    type: 'pg',
    difficulty: 'Mudah',
    topic: 'Bilangan Bulat',
    subtopic: 'Pengurangan Bilangan Bulat Negatif',
    cognitiveLevel: 'C2 - Memahami',
    contextStory: 'Dalam laboratorium sains SMPN 2 Karangbinangun, siswa menguji perubahan muatan listrik mikro: -14 mikro-coulomb dikurangi muatan sebesar -9 mikro-coulomb.',
    questionText: 'Hasil dari operasi pengurangan (-14) - (-9) adalah ...',
    options: [
      { key: 'A', text: '-23' },
      { key: 'B', text: '-5' },
      { key: 'C', text: '5' },
      { key: 'D', text: '23' },
    ],
    correctAnswer: 'B',
    points: 2,
    explanation: 'Mengurangi dengan bilangan negatif sama dengan menjumlahkan dengan lawan bilangan tersebut: (-14) - (-9) = (-14) + 9 = -5.',
  },
  {
    id: 6,
    type: 'pg',
    difficulty: 'Sedang',
    topic: 'Bilangan Bulat',
    subtopic: 'Penerapan Kontekstual Perubahan Suhu',
    cognitiveLevel: 'C3 - Menerapkan',
    contextStory: 'Pada pukul 04.00 dini hari, suhu udara di kawasan wisata Dataran Tinggi Dieng mencapai -2°C. Menjelang siang pada pukul 12.00, terik matahari menyebabkan suhu naik sebesar 15°C. Ketika malam tiba pada pukul 20.00, suhu kembali turun sebesar 7°C.',
    questionText: 'Berapakah suhu udara di Dieng pada pukul 20.00 malam tersebut?',
    visualKey: 'thermometer',
    visualData: { current: 6, min: -10, max: 25, label: 'Suhu Akhir Pukul 20.00' },
    options: [
      { key: 'A', text: '10°C' },
      { key: 'B', text: '4°C' },
      { key: 'C', text: '6°C' },
      { key: 'D', text: '-10°C' },
    ],
    correctAnswer: 'C',
    points: 2,
    explanation: 'Suhu awal = -2°C.\nNaik 15°C menjadi: -2 + 15 = 13°C.\nTurun 7°C menjadi: 13 - 7 = 6°C.\nJadi, suhu pada pukul 20.00 adalah 6°C.',
  },
  {
    id: 7,
    type: 'pg',
    difficulty: 'Sedang',
    topic: 'Bilangan Bulat',
    subtopic: 'Aplikasi Konsep Bilangan Bulat pada Lift Gedung',
    cognitiveLevel: 'C3 - Menerapkan',
    contextStory: 'Gedung perkantoran modern memiliki 15 lantai di atas tanah dan 3 lantai ruang bawah tanah (basement) yang dilambangkan dengan -1, -2, dan -3. Lantai dasar lobi dilambangkan dengan 0. Sebuah lift mula-mula berada di lantai 5, kemudian turun 7 lantai untuk mengambil barang kargo, lalu naik 9 lantai untuk mengantar karyawan.',
    questionText: 'Di lantai berapakah lift tersebut berhenti sekarang?',
    visualKey: 'elevator',
    visualData: { initial: 5, moveDown: 7, moveUp: 9, final: 7 },
    options: [
      { key: 'A', text: 'Lantai 7' },
      { key: 'B', text: 'Lantai 9' },
      { key: 'C', text: 'Lantai -2 (Basement 2)' },
      { key: 'D', text: 'Lantai 11' },
    ],
    correctAnswer: 'A',
    points: 2,
    explanation: 'Posisi awal = 5.\nTurun 7 lantai: 5 - 7 = -2 (Basement 2).\nNaik 9 lantai: -2 + 9 = 7.\nJadi, posisi lift sekarang berada di Lantai 7.',
  },
  {
    id: 8,
    type: 'pg',
    difficulty: 'Sedang',
    topic: 'Bilangan Bulat',
    subtopic: 'Perkalian Bilangan Bulat Negatif',
    cognitiveLevel: 'C3 - Menerapkan',
    contextStory: 'Sebuah wahana kapal selam tak berawak (ROV) diterjunkan dari permukaan laut untuk inspeksi kabel bawah laut. Kapal selam bergerak menyelam ke bawah secara konstan dengan kecepatan rata-rata 4 meter per menit.',
    questionText: 'Jika kapal selam menyelam secara stabil selama 18 menit tanpa henti, pada posisi kedalaman berapakah kapal selam tersebut sekarang?',
    visualKey: 'ocean_depth',
    visualData: { depthRate: -4, duration: 18, finalDepth: -72 },
    options: [
      { key: 'A', text: '+72 meter di atas permukaan air' },
      { key: 'B', text: '-22 meter dari permukaan air' },
      { key: 'C', text: '-54 meter dari permukaan air' },
      { key: 'D', text: '-72 meter dari permukaan air' },
    ],
    correctAnswer: 'D',
    points: 2,
    explanation: 'Kecepatan menyelam = -4 meter/menit (arah ke bawah).\nWaktu = 18 menit.\nPosisi akhir = 18 × (-4) = -72 meter.\nArtinya kapal selam berada pada posisi -72 meter atau 72 meter di bawah permukaan laut.',
  },
  {
    id: 9,
    type: 'pg',
    difficulty: 'Sedang',
    topic: 'Bilangan Bulat',
    subtopic: 'Operasi Pembagian dan Perkalian Bilangan Bulat',
    cognitiveLevel: 'C2 - Memahami',
    contextStory: 'Sebuah prosesor penghitung digital menjalankan serangkaian instruksi aritmetika berturut-turut pada dua register bilangan bulat.',
    questionText: 'Nilai dari ekspresi aritmetika (-96) : 8 × (-5) adalah ...',
    options: [
      { key: 'A', text: '-60' },
      { key: 'B', text: '60' },
      { key: 'C', text: '-40' },
      { key: 'D', text: '40' },
    ],
    correctAnswer: 'B',
    points: 2,
    explanation: 'Operasi perkalian dan pembagian memiliki tingkat kekuatan yang sama, sehingga dikerjakan berurutan dari kiri ke kanan:\nLangkah 1: (-96) : 8 = -12.\nLangkah 2: -12 × (-5) = 60 (karena negatif dikali negatif menghasilkan positif).',
  },
  {
    id: 10,
    type: 'pg',
    difficulty: 'Sedang',
    topic: 'Bilangan Bulat',
    subtopic: 'Mengurutkan Bilangan Bulat',
    cognitiveLevel: 'C2 - Memahami',
    contextStory: 'Seorang teknisi laboratorium mengukur suhu enam tabung penyimpanan beku: -18°C, -4°C, 0°C, -23°C, 7°C, dan -11°C.',
    questionText: 'Urutan suhu tabung penyimpanan dari yang terdingin (paling kecil) ke yang terpanas (paling besar) adalah ...',
    options: [
      { key: 'A', text: '-23°C, -18°C, -11°C, -4°C, 0°C, 7°C' },
      { key: 'B', text: '7°C, 0°C, -4°C, -11°C, -18°C, -23°C' },
      { key: 'C', text: '-4°C, -11°C, -18°C, -23°C, 0°C, 7°C' },
      { key: 'D', text: '-23°C, -11°C, -18°C, -4°C, 0°C, 7°C' },
    ],
    correctAnswer: 'A',
    points: 2,
    explanation: 'Makin besar angka negatifnya, nilainya justru makin kecil (terletak makin jauh ke kiri pada garis bilangan). Maka urutan dari terkecil ke terbesar adalah: -23, -18, -11, -4, 0, 7.',
  },
  {
    id: 11,
    type: 'pg',
    difficulty: 'Sedang',
    topic: 'Bilangan Bulat',
    subtopic: 'Hierarki Operasi Campuran (KABATAKU)',
    cognitiveLevel: 'C3 - Menerapkan',
    contextStory: 'Dalam kuis matematika cerdas cermat, peserta diminta menyelesaikan persamaan matematika dengan tanda kurung dan berbagai operasi hitung.',
    questionText: 'Hasil dari operasi hitung campuran: 24 - 4 × (-6) + [(-35) : 5] adalah ...',
    options: [
      { key: 'A', text: '-7' },
      { key: 'B', text: '35' },
      { key: 'C', text: '41' },
      { key: 'D', text: '55' },
    ],
    correctAnswer: 'C',
    points: 2,
    explanation: 'Sesuai aturan hierarki operasi (KABATAKU):\n1. Hitung perkalian: 4 × (-6) = -24.\n2. Hitung pembagian: (-35) : 5 = -7.\n3. Susun kembali: 24 - (-24) + (-7).\n4. 24 - (-24) = 24 + 24 = 48.\n5. 48 + (-7) = 41.',
  },
  {
    id: 12,
    type: 'pg',
    difficulty: 'Sedang',
    topic: 'Bilangan Bulat',
    subtopic: 'Penerapan Konsep Saldo Keuangan',
    cognitiveLevel: 'C3 - Menerapkan',
    contextStory: 'Bendahara Koperasi Siswa SMP Negeri 2 Karangbinangun mencatat aliran kas: Mula-mula saldo kas tercatat sebesar Rp150.000. Hari ini koperasi membeli persediaan buku tulis seharga Rp85.000, menerima uang pelunasan piutang anggota sebesar Rp60.000, dan membayar ongkos logistik kiriman paket sebesar Rp35.000.',
    questionText: 'Berapakah saldo akhir kas koperasi siswa tersebut saat ini?',
    visualKey: 'ledger',
    visualData: { initial: 150000, out1: -85000, in1: 60000, out2: -35000, final: 90000 },
    options: [
      { key: 'A', text: 'Rp65.000' },
      { key: 'B', text: 'Rp80.000' },
      { key: 'C', text: 'Rp125.000' },
      { key: 'D', text: 'Rp90.000' },
    ],
    correctAnswer: 'D',
    points: 2,
    explanation: 'Perhitungan arus saldo:\nSaldo awal = +150.000\nBeli persediaan = -85.000\nPelunasan diterima = +60.000\nBayar ongkos = -35.000\nSaldo akhir = 150.000 - 85.000 + 60.000 - 35.000\n= 65.000 + 60.000 - 35.000\n= 125.000 - 35.000 = Rp90.000.',
  },
  {
    id: 13,
    type: 'pg',
    difficulty: 'Sedang',
    topic: 'Bilangan Bulat',
    subtopic: 'Menentukan Selisih Dua Suhu Ekstrem',
    cognitiveLevel: 'C3 - Menerapkan',
    contextStory: 'Sebuah ruang pembekuan industri farmasi disetel pada suhu -16°C untuk menjaga stabilitas vaksin. Sementara itu, suhu lingkungan luar gedung di siang hari terukur mencapai 32°C.',
    questionText: 'Berapakah selisih suhu udara antara bagian luar gedung dan bagian dalam ruang pendingin tersebut?',
    visualKey: 'thermometer',
    visualData: { temp1: 32, temp2: -16, diff: 48 },
    options: [
      { key: 'A', text: '16°C' },
      { key: 'B', text: '48°C' },
      { key: 'C', text: '-16°C' },
      { key: 'D', text: '-48°C' },
    ],
    correctAnswer: 'B',
    points: 2,
    explanation: 'Selisih selalu dihitung dengan mengurangkan nilai tertinggi dengan nilai terendah:\nSelisih = Suhu luar - Suhu dalam\nSelisih = 32 - (-16) = 32 + 16 = 48°C.',
  },
  {
    id: 14,
    type: 'pg',
    difficulty: 'Sulit/HOTS',
    topic: 'Bilangan Bulat',
    subtopic: 'Analisis Multi-Langkah Aturan Penilaian Kompetisi',
    cognitiveLevel: 'C4 - Menganalisis',
    contextStory: 'Pada seleksi Olimpiade Matematika SMP, terdapat 50 butir soal dengan aturan skor:\n• Jawaban BENAR bernilai +4\n• Jawaban SALAH bernilai -2\n• Soal TIDAK DIJAWAB bernilai -1\nSeorang peserta bernama Ahmad berhasil menjawab benar sebanyak 38 soal, sedangkan 5 soal tidak dijawab, dan sisanya dijawab salah.',
    questionText: 'Berapakah total nilai akhir yang diperoleh Ahmad dalam kompetisi tersebut?',
    visualKey: 'scoreboard',
    visualData: { total: 50, correct: 38, blank: 5, wrong: 7, score: 133 },
    options: [
      { key: 'A', text: '133' },
      { key: 'B', text: '138' },
      { key: 'C', text: '145' },
      { key: 'D', text: '152' },
    ],
    correctAnswer: 'A',
    points: 2,
    explanation: 'Langkah analisis:\n1. Hitung banyak soal yang salah:\nSalah = Total soal - Benar - Tidak dijawab\nSalah = 50 - 38 - 5 = 7 soal.\n2. Hitung kontribusi masing-masing nilai:\n• Skor Benar = 38 × 4 = 152\n• Skor Salah = 7 × (-2) = -14\n• Skor Kosong = 5 × (-1) = -5\n3. Total skor = 152 + (-14) + (-5) = 152 - 19 = 133.',
  },
  {
    id: 15,
    type: 'pg',
    difficulty: 'Sulit/HOTS',
    topic: 'Bilangan Bulat',
    subtopic: 'Penalaran Posisi Vertikal Tiga Objek Relatif',
    cognitiveLevel: 'C4 - Menganalisis',
    contextStory: 'Sebuah kamera pemantau maritim menangkap 3 objek secara vertikal:\n1. Seekor burung elang laut terbang pada ketinggian 65 meter di atas permukaan laut (+65 m).\n2. Tepat di bawah jalur terbang elang, seekor paus bungkuk berenang pada kedalaman 180 meter di bawah permukaan laut (-180 m).\n3. Sebuah drone sensor udara berada pada posisi tepat 25 meter di bawah elang laut.',
    questionText: 'Berapakah jarak vertikal antara posisi drone sensor udara dan paus bungkuk tersebut?',
    visualKey: 'ocean_depth',
    visualData: { eagle: 65, drone: 40, whale: -180, distance: 220 },
    options: [
      { key: 'A', text: '205 meter' },
      { key: 'B', text: '245 meter' },
      { key: 'C', text: '220 meter' },
      { key: 'D', text: '195 meter' },
    ],
    correctAnswer: 'C',
    points: 2,
    explanation: 'Langkah penyelesaian:\n1. Posisi burung elang = +65 m.\n2. Posisi drone = 65 - 25 = +40 m.\n3. Posisi paus bungkuk = -180 m.\n4. Jarak vertikal antara drone dan paus = 40 - (-180) = 40 + 180 = 220 meter.',
  },

  // ==========================================
  // BENAR / SALAH (5 SOAL)
  // ==========================================
  {
    id: 16,
    type: 'bs',
    difficulty: 'Sedang',
    topic: 'Bilangan Bulat',
    subtopic: 'Konsep Urutan dan Nilai Bilangan Negatif',
    cognitiveLevel: 'C2 - Memahami',
    contextStory: 'Perhatikan pernyataan tentang sifat perbandingan dua bilangan bulat berikut.',
    questionText: 'Pernyataan: "Bilangan -35 bernilai lebih besar daripada -15 karena angka 35 lebih besar dari angka 15."',
    options: [
      { key: 'A', text: 'BENAR' },
      { key: 'B', text: 'SALAH' },
    ],
    correctAnswer: 'SALAH',
    points: 2,
    explanation: 'Pernyataan ini SALAH. Pada garis bilangan, bilangan negatif yang nilai mutlaknya lebih besar terletak semakin jauh ke kiri dari titik 0. Karena -35 terletak di sebelah kiri -15, maka nilai -35 justru lebih kecil daripada -15 (-35 < -15).',
  },
  {
    id: 17,
    type: 'bs',
    difficulty: 'Sedang',
    topic: 'Bilangan Bulat',
    subtopic: 'Sifat Perkalian Bilangan Bulat',
    cognitiveLevel: 'C2 - Memahami',
    contextStory: 'Perhatikan prinsip umum perkalian tanda pada sistem bilangan bulat.',
    questionText: 'Pernyataan: "Hasil perkalian antara dua bilangan bulat bertanda sama (keduanya positif atau keduanya negatif) selalu menghasilkan bilangan bulat bertanda positif."',
    options: [
      { key: 'A', text: 'BENAR' },
      { key: 'B', text: 'SALAH' },
    ],
    correctAnswer: 'BENAR',
    points: 2,
    explanation: 'Pernyataan ini BENAR. Berdasarkan sifat dasar aljabar aritmetika: (+) × (+) = (+) dan (-) × (-) = (+). Perkalian dua bilangan bertanda sama selalu positif.',
  },
  {
    id: 18,
    type: 'bs',
    difficulty: 'Sedang',
    topic: 'Bilangan Bulat',
    subtopic: 'Penjumlahan Bilangan Bulat pada Suhu',
    cognitiveLevel: 'C3 - Menerapkan',
    contextStory: 'Sebuah percobaan fisika mengamati pemanasan bahan uji dari kondisi beku.',
    questionText: 'Pernyataan: "Jika suhu mula-mula suatu bahan uji adalah -8°C kemudian dipanaskan sehingga suhunya naik 20°C, maka suhu akhir bahan uji tersebut terukur 12°C."',
    options: [
      { key: 'A', text: 'BENAR' },
      { key: 'B', text: 'SALAH' },
    ],
    correctAnswer: 'BENAR',
    points: 2,
    explanation: 'Pernyataan ini BENAR. Operasi matematikanya adalah -8 + 20 = 12°C. Suhu akhir memang tepat 12°C.',
  },
  {
    id: 19,
    type: 'bs',
    difficulty: 'Sedang',
    topic: 'Bilangan Bulat',
    subtopic: 'Operasi Pembagian dan Perkalian Tiga Bilangan Negatif',
    cognitiveLevel: 'C3 - Menerapkan',
    contextStory: 'Perhatikan kalkulasi aritmetika bertingkat dengan tiga bilangan bulat negatif berikut.',
    questionText: 'Pernyataan: "Hasil akhir dari operasi hitung (-72) : (-8) × (-3) adalah sama dengan 27."',
    options: [
      { key: 'A', text: 'BENAR' },
      { key: 'B', text: 'SALAH' },
    ],
    correctAnswer: 'SALAH',
    points: 2,
    explanation: 'Pernyataan ini SALAH. Mari hitung urut dari kiri:\n1. (-72) : (-8) = +9 (negatif dibagi negatif = positif).\n2. +9 × (-3) = -27 (positif dikali negatif = negatif).\nJadi hasilnya adalah -27, bukan 27.',
  },
  {
    id: 20,
    type: 'bs',
    difficulty: 'Sulit/HOTS',
    topic: 'Bilangan Bulat',
    subtopic: 'Penalaran Aljabar Selisih Dua Bilangan Negatif',
    cognitiveLevel: 'C4 - Menganalisis',
    contextStory: 'Diketahui a dan b adalah sembarang bilangan bulat negatif pada garis bilangan.',
    questionText: 'Pernyataan: "Jika a dan b adalah dua bilangan bulat negatif dengan a < b, maka nilai dari bentuk aljabar (a - b) dipastikan selalu bernilai negatif."',
    options: [
      { key: 'A', text: 'BENAR' },
      { key: 'B', text: 'SALAH' },
    ],
    correctAnswer: 'BENAR',
    points: 2,
    explanation: 'Pernyataan ini BENAR. Berdasarkan sifat ketaksamaan aljabar, jika a < b, maka dengan mengurangkan b di kedua ruas didapatkan a - b < 0. Bilangan yang kurang dari 0 pasti bernilai negatif. Contoh nyata: ambil a = -10 dan b = -3 (karena -10 < -3), maka a - b = -10 - (-3) = -10 + 3 = -7 (selalu negatif).',
  },

  // ==========================================
  // URAIAN (5 SOAL)
  // ==========================================
  {
    id: 21,
    type: 'uraian',
    difficulty: 'Sedang',
    topic: 'Bilangan Bulat',
    subtopic: 'Perubahan Suhu Bertingkat Lemari Es',
    cognitiveLevel: 'C3 - Menerapkan',
    contextStory: 'Suhu sepotong daging beku di dalam freezer lemari es mula-mula adalah -18°C. Akibat pemadaman aliran listrik selama 4 jam, suhu daging tersebut naik rata-rata sebesar 3°C setiap 30 menit. Setelah listrik menyala kembali, freezer dihidupkan dengan mode pembekuan cepat sehingga suhunya turun sebesar 8°C.',
    questionText: 'Berapakah suhu akhir daging tersebut sekarang? Tuliskan seluruh langkah pengerjaan dan penalarannya secara runtut!',
    points: 12,
    correctAnswer: '-2°C',
    rubric: {
      maxPoints: 12,
      criteria: [
        { points: 12, description: 'Konsep benar, langkah lengkap (menghitung jumlah periode 30 menit, total kenaikan suhu, suhu setelah listrik padam, dan suhu akhir), perhitungan tepat, jawaban akhir -2°C.' },
        { points: 9, description: 'Konsep dan strategi benar, langkah pengerjaan jelas namun ada kekeliruan kecil pada salah satu operasi aritmetika.' },
        { points: 6, description: 'Memahami sebagian konsep (misal berhasil menghitung kenaikan suhu 24°C) namun langkah penyelesaian belum tuntas sampai suhu akhir.' },
        { points: 3, description: 'Terdapat upaya pengerjaan dan penulisan rumus, namun logika pemadaman/kenaikan suhu kurang tepat.' },
        { points: 0, description: 'Tidak menjawab atau jawaban sama sekali tidak relevan.' },
      ],
    },
    explanation: `Langkah Penyelesaian Lengkap:
1. Menghitung frekuensi kenaikan suhu selama listrik padam:
   Lama padam = 4 jam = 4 × 60 menit = 240 menit.
   Frekuensi kenaikan tiap 30 menit = 240 : 30 = 8 kali.
2. Menghitung total kenaikan suhu:
   Kenaikan suhu = 8 × 3°C = +24°C.
3. Menghitung suhu daging saat listrik menyala:
   Suhu = -18°C + 24°C = 6°C.
4. Menghitung suhu akhir setelah freezer dihidupkan (turun 8°C):
   Suhu akhir = 6°C - 8°C = -2°C.
Kesimpulan: Suhu akhir daging tersebut adalah -2°C.`,
  },
  {
    id: 22,
    type: 'uraian',
    difficulty: 'Sedang',
    topic: 'Bilangan Bulat',
    subtopic: 'Aplikasi Kedalaman Penyelam Laut',
    cognitiveLevel: 'C3 - Menerapkan',
    contextStory: 'Seorang penyelam peneliti terumbu karang mula-mula berada pada kedalaman 12 meter di bawah permukaan laut. Untuk mengambil sampel batuan karang yang lebih dalam, ia menyelam turun lagi sejauh 8 meter. Setelah selesai, ia naik kembali setinggi 14 meter untuk menghindari arus deras.',
    questionText: 'Nyatakan posisi penyelam tersebut dalam kalimat matematika bilangan bulat dan tentukan posisi akhir penyelam terhadap permukaan laut!',
    points: 12,
    correctAnswer: '-6 meter (6 meter di bawah permukaan laut)',
    rubric: {
      maxPoints: 12,
      criteria: [
        { points: 12, description: 'Menuliskan kalimat matematika (-12 - 8 + 14 = -6) secara tepat, langkah pengerjaan sistematis, kesimpulan posisi 6 meter di bawah permukaan laut benar.' },
        { points: 9, description: 'Kalimat matematika benar, ada sedikit kesalahan kalkulasi atau lupa menuliskan kesimpulan arah terhadap permukaan laut.' },
        { points: 6, description: 'Memahami konsep bilangan negatif namun keliru menggabungkan operasi turun dan naik.' },
        { points: 3, description: 'Hanya menuliskan angka tanpa kalimat matematika atau penjelasan langkah.' },
        { points: 0, description: 'Tidak menjawab atau jawaban salah total.' },
      ],
    },
    explanation: `Langkah Penyelesaian Lengkap:
1. Kalimat matematika berdasarkan posisi terhadap permukaan laut:
   - Posisi awal: -12 meter
   - Menyelam turun 8 meter: dikurangi 8 (-8)
   - Naik setinggi 14 meter: ditambah 14 (+14)
   Kalimat matematika: -12 - 8 + 14 = ...
2. Langkah perhitungan:
   - Posisi saat mengambil sampel: -12 - 8 = -20 meter
   - Posisi setelah naik: -20 + 14 = -6 meter
3. Kesimpulan:
   Penyelam berada pada posisi -6 meter, yang berarti 6 meter di bawah permukaan air laut.`,
  },
  {
    id: 23,
    type: 'uraian',
    difficulty: 'Sulit/HOTS',
    topic: 'Bilangan Bulat',
    subtopic: 'Penalaran Sistem Skor Lomba Cerdas Cermat',
    cognitiveLevel: 'C4 - Menganalisis',
    contextStory: 'Dalam Lomba Cerdas Cermat Matematika SMP se-Kabupaten yang terdiri atas 40 butir soal, panitia memberlakukan aturan penilaian:\n• Jawaban BENAR diberi skor 5\n• Jawaban SALAH diberi skor -2\n• Soal TIDAK DIJAWAB diberi skor 0\nTim Matematika Kelas 7 SMPN 2 Karangbinangun memperoleh skor akhir 145, dan diketahui terdapat 4 butir soal yang tidak dijawab.',
    questionText: 'Berapakah banyak soal yang dijawab dengan BENAR oleh tim tersebut? Uraikan seluruh analisis pemodelan dan langkah penalarannya secara lengkap!',
    points: 12,
    correctAnswer: '31 soal benar',
    rubric: {
      maxPoints: 12,
      criteria: [
        { points: 12, description: 'Memodelkan variabel (misal b dan s), merumuskan hubungan soal b + s = 36 dan persamaan skor 5b - 2s = 145, menyelesaikannya secara aljabar dengan benar sehingga menemukan b = 31 soal.' },
        { points: 9, description: 'Pemodelan dan strategi penalaran benar, namun terjadi kesalahan hitung aritmetika saat mencari nilai variabel.' },
        { points: 6, description: 'Menemukan jumlah soal yang dijawab (36) dan mencoba metode coba-coba (trial & error) yang belum tuntas.' },
        { points: 3, description: 'Hanya menghitung skor tanpa variabel atau tidak memanfaatkan informasi 4 soal kosong.' },
        { points: 0, description: 'Tidak menjawab atau jawaban tidak relevan.' },
      ],
    },
    explanation: `Langkah Penyelesaian Lengkap:
1. Menentukan jumlah soal yang dikerjakan:
   Total soal = 40.
   Soal tidak dijawab = 4.
   Banyak soal yang dijawab (Benar + Salah) = 40 - 4 = 36 soal.
2. Pemodelan aljabar:
   Misalkan:
   b = banyak soal dijawab BENAR
   s = banyak soal dijawab SALAH
   Maka hubungan banyak soal: s = 36 - b.
3. Menyusun persamaan skor total:
   (b × 5) + (s × (-2)) + (4 × 0) = 145
   5b - 2s = 145
   Substitusi s = 36 - b:
   5b - 2(36 - b) = 145
   5b - 72 + 2b = 145
   7b - 72 = 145
   7b = 145 + 72
   7b = 217
   b = 217 / 7 = 31.
4. Uji kebenaran:
   Jika Benar = 31, maka Salah = 36 - 31 = 5.
   Skor = (31 × 5) + (5 × (-2)) = 155 - 10 = 145 (Tepat!).
Kesimpulan: Banyak soal yang dijawab dengan benar adalah 31 butir soal.`,
  },
  {
    id: 24,
    type: 'uraian',
    difficulty: 'Sedang',
    topic: 'Bilangan Bulat',
    subtopic: 'Hierarki Operasi Hitung Campuran Bersusun',
    cognitiveLevel: 'C3 - Menerapkan',
    contextStory: 'Selesaikan ekspresi hitung campuran bertingkat yang memuat operasi perkalian, pembagian, penjumlahan, dan pengurangan tanda kurung siku berikut.',
    questionText: 'Tentukan hasil akhir dari operasi hitung campuran: (-45) + [18 × (-6)] - [(-84) : 7]. Tuliskan tahapan pengerjaan berdasarkan aturan urutan operasi hitung!',
    points: 12,
    correctAnswer: '-141',
    rubric: {
      maxPoints: 12,
      criteria: [
        { points: 12, description: 'Menghitung perkalian [18 × (-6) = -108], pembagian [(-84) : 7 = -12], menyubstitusikan ke operasi utama, dan memperoleh hasil akhir -141 secara tepat.' },
        { points: 9, description: 'Urutan operasi benar, namun terdapat satu kesalahan tanda minus/plus saat menjumlahkan.' },
        { points: 6, description: 'Menghitung sebagian operasi kurung siku dengan benar namun salah pada tahap operasi penjumlahan akhir.' },
        { points: 3, description: 'Menghitung secara langsung dari kiri ke kanan tanpa mematuhi hierarki tanda kurung.' },
        { points: 0, description: 'Tidak menjawab atau jawaban salah total.' },
      ],
    },
    explanation: `Langkah Penyelesaian Lengkap:
Berdasarkan aturan urutan operasi hitung (KABATAKU - Kurung, Kali/Bagi, Tambah/Kurang):
1. Selesaikan operasi di dalam kurung siku pertama:
   18 × (-6) = -108
2. Selesaikan operasi di dalam kurung siku kedua:
   (-84) : 7 = -12
3. Tuliskan kembali bentuk persamaannya:
   (-45) + (-108) - (-12)
4. Selesaikan dari kiri ke kanan:
   (-45) + (-108) = -153
5. Lanjutkan pengurangan dengan bilangan negatif:
   -153 - (-12) = -153 + 12 = -141
Kesimpulan: Hasil akhir operasi hitung tersebut adalah -141.`,
  },
  {
    id: 25,
    type: 'uraian',
    difficulty: 'Sulit/HOTS',
    topic: 'Bilangan Bulat',
    subtopic: 'Analisis Keuangan Transaksi Arus Kas',
    cognitiveLevel: 'C4 - Menganalisis',
    contextStory: 'Pak Darmo mengelola Toko Kelontong "Karang Jaya". Pada awal pekan (Senin pagi), ia memiliki modal awal kas sebesar Rp500.000. Selama satu pekan, catatan mutasi kas tokonya tercatat sebagai berikut:\n• Hari Senin : Belanja persediaan barang dagang Rp320.000\n• Hari Selasa : Pendapatan omzet penjualan kas Rp210.000\n• Hari Rabu : Membayar rekening listrik toko Rp95.000\n• Hari Kamis : Pendapatan omzet penjualan kas Rp175.000\n• Hari Jumat : Belanja tambahan minyak dan gula Rp250.000\n• Hari Sabtu : Pendapatan omzet penjualan kas Rp280.000\n• Hari Minggu : Penarikan dana pribadi (prive) Rp100.000',
    questionText: `Jawablah pertanyaan berikut dengan langkah perhitungan lengkap:
a. Tuliskan bentuk kalimat matematika operasi bilangan bulat untuk seluruh aliran kas tersebut!
b. Berapakah sisa saldo kas Pak Darmo pada akhir pekan (Minggu malam)?
c. Bandingkan saldo akhir tersebut dengan modal awal. Apakah kas Pak Darmo mengalami penambahan (surplus) atau pengurangan (defisit), dan berapakah selisihnya?`,
    points: 12,
    correctAnswer: 'Saldo akhir Rp400.000; mengalami defisit kas sebesar Rp100.000',
    rubric: {
      maxPoints: 12,
      criteria: [
        { points: 12, description: 'Menjawab ketiga poin (a, b, c) dengan tepat: kalimat matematika runtut, saldo akhir Rp400.000, serta kesimpulan defisit Rp100.000 dibandingkan modal awal.' },
        { points: 9, description: 'Poin a dan b benar (saldo Rp400.000), namun poin c kurang lengkap atau keliru menafsirkan defisit/surplus.' },
        { points: 6, description: 'Kalimat matematika benar namun ada kesalahan hitung pada penjumlahan mutasi kas.' },
        { points: 3, description: 'Hanya menjawab sebagian kecil tanpa menyertakan kalimat matematika operasional.' },
        { points: 0, description: 'Tidak menjawab atau jawaban tidak relevan.' },
      ],
    },
    explanation: `Langkah Penyelesaian Lengkap:
a. Kalimat matematika operasi bilangan bulat:
   Saldo Akhir = 500.000 - 320.000 + 210.000 - 95.000 + 175.000 - 250.000 + 280.000 - 100.000

b. Perhitungan saldo langkah demi langkah:
   - Awal: 500.000
   - Senin: 500.000 - 320.000 = 180.000
   - Selasa: 180.000 + 210.000 = 390.000
   - Rabu: 390.000 - 95.000 = 295.000
   - Kamis: 295.000 + 175.000 = 470.000
   - Jumat: 470.000 - 250.000 = 220.000
   - Sabtu: 220.000 + 280.000 = 500.000
   - Minggu: 500.000 - 100.000 = Rp400.000.
   Sisa saldo kas Pak Darmo pada akhir pekan adalah Rp400.000.

c. Analisis perbandingan dengan modal awal:
   Modal Awal = Rp500.000
   Saldo Akhir = Rp400.000
   Selisih = Saldo Akhir - Modal Awal = 400.000 - 500.000 = -Rp100.000.
   Karena hasilnya bernilai negatif, maka kas Pak Darmo mengalami PENGURANGAN (DEFISIT KAS) sebesar Rp100.000 dibandingkan modal awal.`,
  },
];
