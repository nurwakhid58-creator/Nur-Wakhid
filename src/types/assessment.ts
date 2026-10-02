export type Difficulty = 'Mudah' | 'Sedang' | 'Sulit/HOTS';

export type QuestionType = 'pg' | 'bs' | 'uraian';

export interface RubricCriterion {
  points: number;
  description: string;
}

export interface QuestionRubric {
  maxPoints: number;
  criteria: RubricCriterion[];
}

export interface Question {
  id: number;
  type: QuestionType;
  difficulty: Difficulty;
  topic: string;
  subtopic: string;
  cognitiveLevel: string;
  contextStory?: string;
  questionText: string;
  visualKey?: 'thermometer' | 'ocean_depth' | 'elevator' | 'number_line' | 'scoreboard' | 'ledger' | 'freezer_gauge';
  visualData?: Record<string, any>;
  options?: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: string;
  points: number;
  rubric?: QuestionRubric;
  explanation: string;
}

export interface StudentInfo {
  nama: string;
  kelas: string;
  noAbsen: string;
}

export interface StudentAnswer {
  questionId: number;
  answer: string;
  isFlagged?: boolean;
  score?: number;
}

export type AssessmentCategory = 'SANGAT BAIK' | 'BAIK' | 'CUKUP' | 'PERLU BIMBINGAN';

export interface AssessmentResult {
  studentInfo: StudentInfo;
  totalScore: number;
  pgScore: number;
  bsScore: number;
  uraianScore: number;
  correctCount: number;
  incorrectCount: number;
  percentage: number;
  timeSpentSeconds: number;
  category: AssessmentCategory;
  dateSubmitted: string;
  answers: Record<number, StudentAnswer>;
  uraianScores: Record<number, number>;
}

export interface CanvaSheetRow {
  no: number;
  id: string;
  nama: string;
  kelas: string;
  noAbsen: string;
  pg: number;
  bs: number;
  uraian: number;
  nilaiAkhir: number;
  persentase: number;
  waktu: string;
  kategori: AssessmentCategory;
  date: string;
}
