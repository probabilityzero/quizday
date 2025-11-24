"use client"

import type React from "react"
import type { UserProfile } from "@/lib/profile-storage"

export interface PreQuizData {
  timestamp: number
}

interface PreQuizFormProps {
  quiz: any
  userProfile: UserProfile | null
  onSubmit: (data: PreQuizData) => void
}

export default function PreQuizForm({ quiz, userProfile, onSubmit }: PreQuizFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ timestamp: Date.now() })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary py-6 md:py-8 px-4 sm:px-6 flex items-center justify-center transition-smooth">
      <div className="max-w-md w-full transition-enter">
        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <p className="text-sm md:text-base text-muted-foreground mb-2">Get Ready</p>
            <h1 className="text-2xl md:text-3xl font-bold text-balance">
              {userProfile ? `Let's go, ${userProfile.name}!` : "Ready to begin?"}
            </h1>
          </div>

          {/* Quiz info */}
          <div className="bg-secondary/50 rounded-lg p-4 mb-8">
            <p className="text-sm text-muted-foreground mb-1">Quiz:</p>
            <p className="font-semibold text-lg">{quiz.title}</p>
            <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
              <span>{quiz.questions.length} questions</span>
              <span>•</span>
              <span>{quiz.estimatedTime}m</span>
            </div>
          </div>

          {/* Message */}
          <p className="text-muted-foreground mb-8 text-sm md:text-base">
            Answer all questions to complete this quiz. Your score will be saved automatically.
          </p>

          {/* Submit button */}
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className={`w-full px-6 py-3 bg-gradient-to-r ${quiz.accentColor} text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-smooth`}
            >
              Begin Quiz
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
