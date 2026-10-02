/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { QUESTIONS_DATA } from './data/questions';
import { INITIAL_CANVA_SHEET_DATA } from './data/initialSheetData';
import {
  StudentInfo,
  StudentAnswer,
  AssessmentResult,
  AssessmentCategory,
  CanvaSheetRow,
} from './types/assessment';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { InstructionsModal } from './components/InstructionsModal';
import { AssessmentEngine } from './components/AssessmentEngine';
import { ResultScreen } from './components/ResultScreen';
import { CanvaSheet } from './components/CanvaSheet';
import { TeacherDashboard } from './components/TeacherDashboard';
import { PrintableExam } from './components/PrintableExam';
import { PrintableAnswerKey } from './components/PrintableAnswerKey';
import { PrintableStudentReport } from './components/PrintableStudentReport';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<
    'welcome' | 'exam' | 'result' | 'canva_sheet' | 'teacher' | 'print_exam' | 'print_keys' | 'print_report'
  >('welcome');

  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  // Canva Sheet state with localStorage persistence
  const [sheetData, setSheetData] = useState<CanvaSheetRow[]>(() => {
    try {
      const saved = localStorage.getItem('tka_matematika_canva_sheet');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load sheet data from localStorage', e);
    }
    return INITIAL_CANVA_SHEET_DATA;
  });

  useEffect(() => {
    try {
      localStorage.setItem('tka_matematika_canva_sheet', JSON.stringify(sheetData));
    } catch (e) {
      console.error('Failed to save sheet data to localStorage', e);
    }
  }, [sheetData]);

  // Handle Starting the Assessment
  const handleStartAssessment = (info: StudentInfo) => {
    setStudentInfo(info);
    setActiveScreen('exam');
  };

  // Automated Assessment & Rubric Scoring
  const handleFinishAssessment = (
    answers: Record<number, StudentAnswer>,
    timeSpentSeconds: number
  ) => {
    if (!studentInfo) return;

    let pgScore = 0;
    let bsScore = 0;
    let uraianScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    const uraianScores: Record<number, number> = {};

    QUESTIONS_DATA.forEach((q) => {
      const userAns = answers[q.id]?.answer?.trim() || '';

      if (q.type === 'pg') {
        if (userAns.toUpperCase() === q.correctAnswer.toUpperCase()) {
          pgScore += q.points; // 2 points each
          correctCount += 1;
        } else {
          incorrectCount += 1;
        }
      } else if (q.type === 'bs') {
        if (userAns.toUpperCase() === q.correctAnswer.toUpperCase()) {
          bsScore += q.points; // 2 points each
          correctCount += 1;
        } else {
          incorrectCount += 1;
        }
      } else if (q.type === 'uraian') {
        // Detailed rubric scoring (12, 9, 6, 3, 0 points)
        let earned = 0;
        const lower = userAns.toLowerCase();

        if (userAns.length < 4) {
          earned = 0;
        } else if (q.id === 21) {
          // Freezer temperature: -2°C
          const hasFinal = lower.includes('-2') || lower.includes('minus 2');
          const hasSteps = lower.includes('24') || lower.includes('8') || lower.includes('6');
          if (hasFinal && hasSteps) earned = 12;
          else if (hasFinal) earned = 9;
          else if (hasSteps) earned = 6;
          else if (userAns.length > 20) earned = 3;
        } else if (q.id === 22) {
          // Diver depth: -6 m
          const hasFinal = lower.includes('-6') || lower.includes('6 meter di bawah') || lower.includes('6 m di bawah');
          const hasSteps = lower.includes('-12') || lower.includes('-20') || lower.includes('14');
          if (hasFinal && hasSteps) earned = 12;
          else if (hasFinal) earned = 9;
          else if (hasSteps) earned = 6;
          else if (userAns.length > 20) earned = 3;
        } else if (q.id === 23) {
          // Olympiad: 31 questions correct
          const hasFinal = lower.includes('31');
          const hasSteps = lower.includes('36') || lower.includes('145') || lower.includes('7b') || lower.includes('217') || lower.includes('5b');
          if (hasFinal && hasSteps) earned = 12;
          else if (hasFinal) earned = 9;
          else if (hasSteps) earned = 6;
          else if (userAns.length > 20) earned = 3;
        } else if (q.id === 24) {
          // Order of operations: -141
          const hasFinal = lower.includes('-141') || lower.includes('minus 141');
          const hasSteps = lower.includes('-108') || lower.includes('-12') || lower.includes('-153');
          if (hasFinal && hasSteps) earned = 12;
          else if (hasFinal) earned = 9;
          else if (hasSteps) earned = 6;
          else if (userAns.length > 20) earned = 3;
        } else if (q.id === 25) {
          // Grocery store cash flow: 400.000 and deficit 100.000
          const hasSaldo = lower.includes('400.000') || lower.includes('400000');
          const hasDefisit = lower.includes('defisit') || lower.includes('kurang') || lower.includes('rugi') || lower.includes('100.000') || lower.includes('100000');
          if (hasSaldo && hasDefisit) earned = 12;
          else if (hasSaldo) earned = 9;
          else if (hasDefisit || lower.includes('180.000') || lower.includes('390.000')) earned = 6;
          else if (userAns.length > 20) earned = 3;
        }

        uraianScores[q.id] = earned;
        uraianScore += earned;
      }
    });

    const totalScore = pgScore + bsScore + uraianScore;
    const percentage = Math.round((totalScore / 100) * 100);

    let category: AssessmentCategory = 'PERLU BIMBINGAN';
    if (totalScore >= 86) category = 'SANGAT BAIK';
    else if (totalScore >= 71) category = 'BAIK';
    else if (totalScore >= 56) category = 'CUKUP';

    const mins = Math.floor(timeSpentSeconds / 60);
    const secs = timeSpentSeconds % 60;
    const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    const newResult: AssessmentResult = {
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
      dateSubmitted: new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      answers,
      uraianScores,
    };

    setAssessmentResult(newResult);

    // Automatically append student submission into the Canva Sheet!
    const newSheetRow: CanvaSheetRow = {
      no: sheetData.length + 1,
      id: `sub-${Date.now()}`,
      nama: studentInfo.nama,
      kelas: studentInfo.kelas,
      noAbsen: studentInfo.noAbsen,
      pg: pgScore,
      bs: bsScore,
      uraian: uraianScore,
      nilaiAkhir: totalScore,
      persentase: percentage,
      waktu: formattedTime,
      kategori: category,
      date: newResult.dateSubmitted,
    };

    setSheetData((prev) => [newSheetRow, ...prev]);
    setActiveScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setActiveScreen('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Application Header */}
      {activeScreen !== 'print_exam' && activeScreen !== 'print_keys' && activeScreen !== 'print_report' && (
        <Header
          activeScreen={activeScreen === 'canva_sheet' ? 'welcome' : activeScreen}
          onOpenTeacher={() => setActiveScreen('teacher')}
          onOpenPrint={() => setActiveScreen('print_exam')}
          onOpenCanvaSheet={() => setActiveScreen('canva_sheet')}
        />
      )}

      {/* Screen Router */}
      <main className="flex-1">
        {activeScreen === 'welcome' && (
          <WelcomeScreen
            onStart={handleStartAssessment}
            onOpenInstructions={() => setShowInstructions(true)}
            onOpenPrint={() => setActiveScreen('print_exam')}
            onOpenCanvaSheet={() => setActiveScreen('canva_sheet')}
            savedStudentInfo={studentInfo}
          />
        )}

        {activeScreen === 'exam' && studentInfo && (
          <AssessmentEngine
            questions={QUESTIONS_DATA}
            studentInfo={studentInfo}
            onFinish={handleFinishAssessment}
            onOpenInstructions={() => setShowInstructions(true)}
          />
        )}

        {activeScreen === 'result' && assessmentResult && (
          <ResultScreen
            result={assessmentResult}
            questions={QUESTIONS_DATA}
            onRestart={handleRestart}
            onOpenCanvaSheet={() => setActiveScreen('canva_sheet')}
            onPrintStudentReport={() => setActiveScreen('print_report')}
          />
        )}

        {activeScreen === 'canva_sheet' && (
          <CanvaSheet
            data={sheetData}
            onPrintRecap={() => setActiveScreen('print_report')}
            onBackToApp={() => setActiveScreen(assessmentResult ? 'result' : 'welcome')}
            onDeleteRow={(id) => setSheetData((prev) => prev.filter((r) => r.id !== id))}
          />
        )}

        {activeScreen === 'teacher' && (
          <TeacherDashboard
            questions={QUESTIONS_DATA}
            sheetData={sheetData}
            onBackToStudent={() => setActiveScreen(assessmentResult ? 'result' : 'welcome')}
            onPrintExam={() => setActiveScreen('print_exam')}
            onPrintAnswerKey={() => setActiveScreen('print_keys')}
            onPrintRecap={() => setActiveScreen('canva_sheet')}
          />
        )}

        {activeScreen === 'print_exam' && (
          <PrintableExam
            questions={QUESTIONS_DATA}
            onClose={() => setActiveScreen(assessmentResult ? 'result' : 'welcome')}
          />
        )}

        {activeScreen === 'print_keys' && (
          <PrintableAnswerKey
            questions={QUESTIONS_DATA}
            onClose={() => setActiveScreen('teacher')}
          />
        )}

        {activeScreen === 'print_report' && assessmentResult && (
          <PrintableStudentReport
            result={assessmentResult}
            onClose={() => setActiveScreen('result')}
          />
        )}
      </main>

      {/* Global Instructions Modal */}
      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        onStartExam={() => {
          if (studentInfo) {
            setActiveScreen('exam');
          }
        }}
      />
    </div>
  );
}
