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

  const handleRetake = () => {
    clearProgress(quiz.id)
    onRetake()
  }

  return (
    <main className="min-h-screen bg-background transition-smooth">
      {/* Banner */}
      <div
        className={`bg-gradient-to-r ${quiz.accentColor} min-h-40 md:min-h-48 relative overflow-hidden flex items-center justify-center transition-smooth`}
      >
        <div className="text-6xl md:text-8xl opacity-20 absolute">{quiz.icon}</div>
        <div className="relative z-10 text-center px-4">
          <p className="text-xs md:text-sm text-primary-foreground/80 mb-2">Results</p>
          <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground text-balance">{quiz.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="py-6 md:py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto transition-enter">
          {/* Results card */}
          <div className="bg-card border border-border rounded-lg p-4 md:p-8 mb-6">
            {/* Score circle */}
            <div className="flex justify-center mb-8">
              <div
                className={`relative w-28 md:w-32 h-28 md:h-32 rounded-full flex items-center justify-center scale-in ${
                  passed
                    ? "bg-gradient-to-br from-accent/20 to-accent/10"
                    : "bg-gradient-to-br from-destructive/20 to-destructive/10"
                }`}
              >
                <div className="text-center">
                  <p className={`text-4xl md:text-5xl font-bold ${passed ? "text-accent" : "text-destructive"}`}>
                    {percentage}%
                  </p>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-3xl font-bold mb-2">{passed ? "Congratulations!" : "Keep Practicing!"}</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                {passed ? "You passed the quiz! Great job!" : "You can retake this quiz to improve your score."}
              </p>
            </div>

            {/* Stats */}
            <div className="bg-secondary/50 rounded-lg p-4 md:p-6 space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-muted-foreground">Total Score:</span>
                <span className="font-bold text-lg md:text-xl">
                  {attempt.score}/{attempt.totalQuestions}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${quiz.accentColor}`} style={{ width: `${percentage}%` }} />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Correct</p>
                  <p className="text-2xl md:text-3xl font-bold text-accent">{attempt.score}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Incorrect</p>
                  <p className="text-2xl md:text-3xl font-bold text-destructive">
                    {attempt.totalQuestions - attempt.score}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile info */}
            {progress.userProfile && (
              <div className="bg-muted/50 rounded-lg p-3 md:p-4 mb-8 text-xs md:text-sm">
                <p className="text-muted-foreground mb-1">Completed by</p>
                <p className="font-semibold">{progress.userProfile.name}</p>
                <p className="text-muted-foreground">Class of {progress.userProfile.year}</p>
              </div>
            )}

            {/* All attempts */}
            {progress.attempts.length > 1 && (
              <div className="bg-secondary/50 rounded-lg p-4 mb-8">
                <p className="text-xs text-muted-foreground mb-3">All Attempts</p>
                <div className="space-y-2">
                  {progress.attempts.map((att, idx) => {
                    const pct = Math.round((att.score / att.totalQuestions) * 100)
                    return (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Attempt {idx + 1}</span>
                        <span className="font-semibold text-accent">{pct}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="space-y-3 mb-8">
              <p className="text-sm font-semibold text-foreground mb-4">Answer Breakdown</p>
              {quiz.questions.map((question, index) => {
                const userAnswer = attempt.answers[index]
                const isCorrect = userAnswer === question.correctAnswer
                const isSkipped = userAnswer === -1

                return (
                  <div key={index} className="border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
                      className="w-full p-3 md:p-4 flex items-start justify-between hover:bg-secondary/50 transition-smooth text-left"
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div
                          className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs md:text-sm font-semibold ${
                            isSkipped ? "bg-muted" : isCorrect ? "bg-accent" : "bg-destructive"
                          }`}
                        >
                          {isSkipped ? "—" : isCorrect ? "✓" : "✕"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm md:text-base font-medium text-foreground break-words">
                            Question {index + 1}
                          </p>
                          <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">{question.text}</p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0">
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
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* Expanded content */}
                    {expandedQuestion === index && (
                      <div className="border-t border-border bg-secondary/30 p-3 md:p-4 space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Your Answer:</p>
                          {isSkipped ? (
                            <p className="text-sm text-muted-foreground italic">Skipped</p>
                          ) : (
                            <p
                              className={`text-sm md:text-base font-medium ${isCorrect ? "text-accent" : "text-destructive"}`}
                            >
                              {question.options[userAnswer]}
                            </p>
                          )}
                        </div>

                        {!isCorrect && !isSkipped && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Correct Answer:</p>
                            <p className="text-sm md:text-base font-medium text-accent">
                              {question.options[question.correctAnswer]}
                            </p>
                          </div>
                        )}

                        {isSkipped && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Correct Answer:</p>
                            <p className="text-sm md:text-base font-medium text-accent">
                              {question.options[question.correctAnswer]}
                            </p>
                          </div>
                        )}

                        {question.explanation && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Explanation:</p>
                            <p className="text-sm text-foreground">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <button
              onClick={handleRetake}
              className={`flex-1 px-6 py-3 bg-gradient-to-r ${quiz.accentColor} text-primary-foreground rounded-lg font-medium transition-smooth hover:opacity-90 text-sm md:text-base`}
            >
              Retake Quiz
            </button>
            <Link href={`/quiz/${quiz.slug}`} className="flex-1">
              <button className="w-full px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium transition-smooth hover:bg-secondary/80 text-sm md:text-base">
                Back to Quiz Info
              </button>
            </Link>
          </div>

          {/* Home link */}
          <Link
            href="/"
            className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-smooth inline-flex items-center gap-1"
          >
            ← Back to quizzes
          </Link>
        </div>
      </div>
    </main>
  )
}
