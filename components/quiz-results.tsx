"use client"

import Link from "next/link"
import { useState } from "react"
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
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-smooth hover:bg-primary/90">
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
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className={`relative bg-gradient-to-br ${quiz.accentColor} overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16">

          <div className="text-center space-y-4 md:space-y-6">
            {/* Icon */}
            <div className="text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl">
              {quiz.icon}
            </div>

            {/* Results Badge */}
            <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="text-sm font-semibold text-white/90">Quiz Results</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-lg tracking-tight px-4">
              {quiz.title}
            </h1>

            {/* Score Display */}
            <div className="flex items-center justify-center gap-6 flex-wrap px-4">
              <div className="text-center">
                <div className={`text-5xl md:text-6xl font-black ${
                  percentage >= 80 ? 'text-green-400' :
                  percentage >= 60 ? 'text-yellow-400' :
                  'text-red-400'
                } drop-shadow-lg`}>
                  {percentage}%
                </div>
                <p className="text-sm text-white/80 mt-2">Latest Score</p>
              </div>
              {progress.attempts.length > 1 && (
                <>
                  <div className="w-px h-12 bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-black text-white drop-shadow-lg flex items-center gap-2">
                      <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {bestPercentage}%
                    </div>
                    <p className="text-sm text-white/80 mt-2">Best Score</p>
                  </div>
                </>
              )}
            </div>

            {/* Completion Message */}
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed px-4">
              {passed ? "🎉 Congratulations! You passed the quiz!" : "Keep practicing! You can retake this quiz anytime."}
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-8 md:h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              className="fill-background"
              opacity=".25"
              transform="scale(1,-1) translate(0,-120)"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39 116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-card border border-border rounded-xl p-5 hover:border-green-500/30 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-4a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Correct</span>
            </div>
            <p className="text-3xl font-bold text-green-500">{attempt.score}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 hover:border-red-500/30 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Incorrect</span>
            </div>
            <p className="text-3xl font-bold text-red-500">{attempt.totalQuestions - attempt.score}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Accuracy</span>
            </div>
            <p className="text-3xl font-bold text-primary">{percentage}%</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 hover:border-purple-500/30 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Attempts</span>
            </div>
            <p className="text-3xl font-bold text-purple-500">{progress.attempts.length}</p>
          </div>
        </div>

        {/* Performance Overview */}
        {progress.attempts.length > 1 && (
          <div className="mb-12 bg-card border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              All Attempts
            </h2>
            <div className="space-y-3">
              {progress.attempts.map((att, idx) => {
                const pct = Math.round((att.score / att.totalQuestions) * 100)
                const isCurrent = idx === progress.attempts.length - 1
                return (
                  <div key={idx} className={`flex items-center gap-4 p-4 rounded-lg ${isCurrent ? 'bg-primary/10 border border-primary/30' : 'bg-secondary/50'}`}>
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isCurrent ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} font-bold`}>
                        {idx + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold">
                          {isCurrent && <span className="text-primary mr-2">●</span>}
                          Attempt {idx + 1}
                        </span>
                        <span className={`font-bold ${
                          pct >= 80 ? 'text-green-500' :
                          pct >= 60 ? 'text-yellow-500' :
                          'text-red-500'
                        }`}>
                          {pct}%
                        </span>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            pct >= 80 ? 'bg-green-500' :
                            pct >= 60 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
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
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Answer Review
          </h2>
          <div className="space-y-3">
            {quiz.questions.map((question, index) => {
              const userAnswer = attempt.answers[index]
              const isCorrect = userAnswer === question.correctAnswer
              const isSkipped = userAnswer === -1

              return (
                <div key={index} className="border border-border rounded-xl overflow-hidden bg-card">
                  <button
                    onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
                    className="w-full p-4 md:p-5 flex items-start justify-between hover:bg-secondary/50 transition-all text-left"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold ${
                          isSkipped ? "bg-gray-400" : isCorrect ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {isSkipped ? "—" : isCorrect ? "✓" : "✕"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-foreground mb-1">
                          Question {index + 1}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{question.text}</p>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <svg
                        className={`w-5 h-5 transition-transform ${
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
                    <div className="border-t border-border bg-secondary/30 p-4 md:p-5 space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Question:</p>
                        <p className="text-base text-foreground">{question.text}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Your Answer:</p>
                        {isSkipped ? (
                          <p className="text-sm text-muted-foreground italic">Skipped</p>
                        ) : (
                          <p className={`text-base font-medium ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                            {question.options[userAnswer]}
                          </p>
                        )}
                      </div>

                      {!isCorrect && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Correct Answer:</p>
                          <p className="text-base font-medium text-green-500">
                            {question.options[question.correctAnswer]}
                          </p>
                        </div>
                      )}

                      {question.explanation && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Explanation:</p>
                          <p className="text-sm text-foreground leading-relaxed bg-accent/5 p-3 rounded-lg">
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
          <div className="mb-12 bg-gradient-to-br from-card to-accent/5 border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Participant Information
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground">
                {progress.userProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{progress.userProfile.name}</p>
                <p className="text-sm text-muted-foreground">Class of {progress.userProfile.year}</p>
                <p className="text-xs text-muted-foreground mt-1">
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
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={handleRetake}
            className="group relative flex-1 px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground text-lg font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-100 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Retake Quiz
              <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <Link href={`/quiz/${quiz.slug}`} className="flex-1">
            <button className="w-full px-8 py-4 bg-card border-2 border-border hover:border-primary/30 text-foreground rounded-xl font-bold transition-all hover:shadow-lg active:scale-95 text-lg">
              Back to Quiz Info
            </button>
          </Link>
        </div>

        {/* Home Link */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all quizzes
          </Link>
        </div>
        
      </div>
    </div>
  )
}
