"use client"

import Link from "next/link"
import { useState } from "react"
import { HiCheckCircle, HiXCircle, HiRefresh, HiArrowLeft, HiChartBar, HiClipboardList, HiUser, HiStar } from "react-icons/hi"
import type { Quiz } from "@/lib/quiz-data"
import type { QuizProgress } from "@/lib/quiz-storage"
import { clearProgress } from "@/lib/quiz-storage"

interface QuizResultsProps {
  quiz: Quiz
  progress: QuizProgress | null
  attemptIndex?: number
  onRetake: () => void
}

export default function QuizResults({ quiz, progress, attemptIndex = -1, onRetake }: QuizResultsProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)

  if (!progress || progress.attempts.length === 0) {
    return (
      <main className="min-h-screen bg-background transition-smooth flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">No Results Yet</h1>
          <p className="text-muted-foreground mb-6">Complete a quiz to see your results here.</p>
          <Link href="/">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-smooth hover:bg-primary/90 active:scale-95">
              Back to Quizzes
            </button>
          </Link>
        </div>
      </main>
    )
  }

  const attempt = attemptIndex >= 0 ? progress.attempts[attemptIndex] : progress.attempts[progress.attempts.length - 1]
  const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100)
  const passed = percentage >= 70
  const bestAttempt = progress.attempts.reduce((best, current) => (current.score > best.score ? current : best))
  const bestPercentage = Math.round((bestAttempt.score / bestAttempt.totalQuestions) * 100)

  const handleRetake = () => {
    clearProgress(quiz.id)
    onRetake()
  }

  return (
    <div className="min-h-screen bg-background animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className={`relative bg-linear-to-br ${quiz.accentColor} overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 lg:py-12">
          <div className="text-center space-y-3 md:space-y-4">
            <div className="text-4xl md:text-5xl lg:text-6xl drop-shadow-2xl">
              {quiz.icon}
            </div>

            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="text-xs md:text-sm font-semibold text-white/90">Quiz Results</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-lg tracking-tight px-4">
              {quiz.title}
            </h1>

            <div className="flex items-center justify-center gap-6 flex-wrap px-4">
              <div className="text-center">
                <div className={`text-4xl md:text-5xl font-black ${
                  percentage >= 80 ? 'text-green-400' :
                  percentage >= 60 ? 'text-yellow-400' :
                  'text-red-400'
                } drop-shadow-lg`}>
                  {percentage}%
                </div>
                <p className="text-xs md:text-sm text-white/80 mt-1.5 md:mt-2">Latest Score</p>
              </div>
              {progress.attempts.length > 1 && (
                <>
                  <div className="w-px h-10 md:h-12 bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-black text-white drop-shadow-lg flex items-center gap-2">
                      <HiStar className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                      {bestPercentage}%
                    </div>
                    <p className="text-xs md:text-sm text-white/80 mt-1.5 md:mt-2">Best Score</p>
                  </div>
                </>
              )}
            </div>

            <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto leading-relaxed px-4">
              {passed ? "🎉 Congratulations! You passed the quiz!" : "Keep practicing! You can retake this quiz anytime."}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-6 md:h-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              className="fill-background"
              opacity=".25"
              transform="scale(1,-1) translate(0,-120)"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              className="fill-background"
              opacity=".5"
              transform="scale(1,-1) translate(0,-120)"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-background"
              transform="scale(1,-1) translate(0,-120)"
            ></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-12">
          <div className="bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-5 hover:border-green-500/30 transition-all">
            <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
              <HiCheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0" />
              <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">Correct</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-green-500">{attempt.score}</p>
          </div>

          <div className="bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-5 hover:border-red-500/30 transition-all">
            <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
              <HiXCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500 shrink-0" />
              <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">Incorrect</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-red-500">{attempt.totalQuestions - attempt.score}</p>
          </div>

          <div className="bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-5 hover:border-purple-500/30 transition-all">
            <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
              <HiRefresh className="w-4 h-4 md:w-5 md:h-5 text-purple-500 shrink-0" />
              <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">Attempts</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-purple-500">{progress.attempts.length}</p>
          </div>
        </div>

        {/* Performance Overview */}
        {progress.attempts.length > 1 && (
          <div className="mb-8 md:mb-12 bg-card border border-border rounded-lg md:rounded-xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
              <HiChartBar className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              All Attempts
            </h2>
            <div className="space-y-2.5 md:space-y-3">
              {progress.attempts.map((att, idx) => {
                const pct = Math.round((att.score / att.totalQuestions) * 100)
                const isCurrent = idx === progress.attempts.length - 1
                return (
                  <div key={idx} className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg ${isCurrent ? 'bg-primary/10 border border-primary/30' : 'bg-secondary/50'}`}>
                    <div className="shrink-0">
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${isCurrent ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} font-bold text-xs md:text-sm`}>
                        {idx + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5 md:mb-2">
                        <span className="text-xs md:text-sm font-semibold">
                          {isCurrent && <span className="text-primary mr-1.5 md:mr-2">●</span>}
                          Attempt {idx + 1}
                        </span>
                        <span className={`font-bold text-xs md:text-sm ${
                          pct >= 80 ? 'text-green-500' :
                          pct >= 60 ? 'text-yellow-500' :
                          'text-red-500'
                        }`}>
                          {pct}%
                        </span>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-1.5 md:h-2 overflow-hidden">
                        <div
                          className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
                            pct >= 80 ? 'bg-green-500' :
                            pct >= 60 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="text-[10px] md:text-xs text-muted-foreground mt-1.5 md:mt-2">
                        {att.score}/{att.totalQuestions} correct • {new Date(att.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Answer Breakdown */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <HiClipboardList className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            Answer Review
          </h2>
          <div className="space-y-2.5 md:space-y-3">
            {quiz.questions.map((question, index) => {
              const userAnswer = attempt.answers[index]
              const isCorrect = userAnswer === question.correctAnswer
              const isSkipped = userAnswer === -1

              return (
                <div key={index} className="border border-border rounded-lg md:rounded-xl overflow-hidden bg-card">
                  <button
                    onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
                    className="w-full p-3 md:p-4 flex items-start justify-between hover:bg-secondary/50 transition-all text-left active:bg-secondary/70"
                  >
                    <div className="flex items-start gap-2 md:gap-3 flex-1 min-w-0">
                      <div
                        className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs md:text-sm ${
                          isSkipped ? "bg-gray-400" : isCorrect ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {isSkipped ? "—" : isCorrect ? "✓" : "✕"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm md:text-base font-semibold text-foreground mb-0.5 md:mb-1">
                          Question {index + 1}
                        </p>
                        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{question.text}</p>
                      </div>
                    </div>
                    <div className="ml-2 shrink-0">
                      <svg
                        className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${
                          expandedQuestion === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {expandedQuestion === index && (
                    <div className="border-t border-border bg-secondary/30 p-3 md:p-4 space-y-3 md:space-y-4">
                      <div>
                        <p className="text-[10px] md:text-xs font-semibold text-muted-foreground mb-1.5 md:mb-2 uppercase tracking-wider">Question:</p>
                        <p className="text-sm md:text-base text-foreground">{question.text}</p>
                      </div>

                      <div>
                        <p className="text-[10px] md:text-xs font-semibold text-muted-foreground mb-1.5 md:mb-2 uppercase tracking-wider">Your Answer:</p>
                        {isSkipped ? (
                          <p className="text-xs md:text-sm text-muted-foreground italic">Skipped</p>
                        ) : (
                          <p className={`text-sm md:text-base font-medium ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                            {question.options[userAnswer]}
                          </p>
                        )}
                      </div>

                      {!isCorrect && (
                        <div>
                          <p className="text-[10px] md:text-xs font-semibold text-muted-foreground mb-1.5 md:mb-2 uppercase tracking-wider">Correct Answer:</p>
                          <p className="text-sm md:text-base font-medium text-green-500">
                            {question.options[question.correctAnswer]}
                          </p>
                        </div>
                      )}

                      {question.explanation && (
                        <div>
                          <p className="text-[10px] md:text-xs font-semibold text-muted-foreground mb-1.5 md:mb-2 uppercase tracking-wider">Explanation:</p>
                          <p className="text-xs md:text-sm text-foreground leading-relaxed bg-accent/5 p-2.5 md:p-3 rounded-lg">
                            {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Profile Info */}
        {progress.userProfile && (
          <div className="mb-8 md:mb-12 bg-linear-to-br from-card to-accent/5 border border-border rounded-lg md:rounded-xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
              <HiUser className="w-5 h-5 md:w-6 md:h-6 text-accent" />
              Participant Information
            </h2>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-primary to-accent rounded-full flex items-center justify-center text-lg md:text-2xl font-bold text-primary-foreground shrink-0">
                {progress.userProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-base md:text-lg font-bold text-foreground">{progress.userProfile.name}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Class of {progress.userProfile.year}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1">
                  Completed on {new Date(attempt.completedAt).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
          <Link href={`/`} className="flex-1">
            <button className="w-full px-6 md:px-8 py-3 md:py-4 bg-card border-2 border-border hover:border-primary/30 text-foreground rounded-lg md:rounded-xl font-bold transition-all hover:shadow-lg active:scale-95 text-base md:text-lg">
              Back to Home
            </button>
          </Link>
          <button
            onClick={handleRetake}
            className="group relative flex-1 px-6 md:px-8 py-3 md:py-4 bg-linear-to-r from-primary to-accent text-primary-foreground text-base md:text-lg font-bold rounded-lg md:rounded-xl transition-all duration-300 hover:shadow-2xl active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
              Retake Quiz
              <HiRefresh className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-180 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  )
}
