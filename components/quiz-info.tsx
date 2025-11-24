"use client"

import Link from "next/link"
import type { Quiz } from "@/lib/quiz-data"
import type { QuizProgress } from "@/lib/quiz-storage"

interface QuizInfoProps {
  quiz: Quiz
  progress: QuizProgress | null
  onStartQuiz: () => void
  onViewResults: () => void
}

export default function QuizInfo({ quiz, progress, onStartQuiz, onViewResults }: QuizInfoProps) {
  const hasAttempts = progress && progress.attempts.length > 0
  const lastAttempt = hasAttempts ? progress!.attempts[progress!.attempts.length - 1] : null
  const lastScore = lastAttempt ? Math.round((lastAttempt.score / lastAttempt.totalQuestions) * 100) : 0

  return (
    <main className="min-h-screen bg-background transition-smooth">
      {/* Banner */}
      <div
        className={`bg-gradient-to-r ${quiz.accentColor} min-h-48 md:min-h-56 relative overflow-hidden flex flex-col items-center justify-center transition-smooth`}
      >
        <div className="text-6xl md:text-8xl opacity-20 absolute">{quiz.icon}</div>
        <div className="relative z-10 text-center px-4">
          <p className="text-sm md:text-base text-primary-foreground/80 mb-2">Quiz</p>
          <h1 className="text-2xl md:text-4xl font-bold text-primary-foreground text-balance">{quiz.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="py-6 md:py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto transition-enter">
          {/* Description */}
          <div className="bg-card border border-border rounded-lg p-4 md:p-6 mb-6">
            <p className="text-muted-foreground md:text-lg">{quiz.description}</p>
          </div>

          {/* Quiz Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Questions</p>
              <p className="text-xl md:text-2xl font-bold">{quiz.questions.length}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Time</p>
              <p className="text-xl md:text-2xl font-bold">{quiz.estimatedTime}m</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Difficulty</p>
              <p className="text-xl md:text-2xl font-bold capitalize">{quiz.difficulty}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Category</p>
              <p className="text-xl md:text-2xl font-bold truncate">{quiz.category}</p>
            </div>
          </div>

          {/* Tags */}
          {quiz.tags && quiz.tags.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {quiz.tags.map((tag) => (
                  <span key={tag} className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Previous Attempts */}
          {hasAttempts && (
            <div className="bg-accent/10 border border-accent rounded-lg p-4 md:p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-2">Your Best Score</p>
              <p className="text-3xl md:text-4xl font-bold text-accent mb-1">{lastScore}%</p>
              <p className="text-sm text-muted-foreground">
                {progress!.attempts.length} attempt{progress!.attempts.length > 1 ? "s" : ""}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <button
              onClick={onStartQuiz}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-smooth hover:opacity-90 text-primary-foreground bg-gradient-to-r ${quiz.accentColor}`}
            >
              {hasAttempts ? "Retake Quiz" : "Start Quiz"}
            </button>
            {hasAttempts && (
              <button
                onClick={onViewResults}
                className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium transition-smooth hover:bg-secondary/80"
              >
                View Results
              </button>
            )}
          </div>

          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-smooth gap-1"
          >
            ← Back to quizzes
          </Link>
        </div>
      </div>
    </main>
  )
}
