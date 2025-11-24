"use client"

import Link from "next/link"
import { getAllCategories, quizzes } from "@/lib/quiz-data"
import { useEffect, useState } from "react"
import { getAllProgress } from "@/lib/quiz-storage"
import { getUserProfile } from "@/lib/profile-storage"
import type { QuizProgress } from "@/lib/quiz-storage"
import type { UserProfile } from "@/lib/profile-storage"

export default function Home() {
  const [progress, setProgress] = useState<Record<string, QuizProgress>>({})
  const [mounted, setMounted] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    setProgress(getAllProgress())
    const savedProfile = getUserProfile()
    if (savedProfile) {
      setProfile(savedProfile)
    }
    setMounted(true)
  }, [])

  const categories = getAllCategories()

  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-background transition-smooth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 lg:py-12">
        {/* Hero section */}
        <div className="mb-8 md:mb-12 transition-enter">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance mb-3 md:mb-4">
            Quiz <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">by Han</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Choose from our collection of quizzes and test your expertise across different categories.
            {profile && (
              <span className="block mt-2">
                Welcome back, <span className="text-primary font-semibold">{profile.name}</span>!
              </span>
            )}
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-8 md:space-y-12">
          {categories.map((category) => {
            const categoryQuizzes = quizzes.filter((q) => q.category === category)
            return (
              <div key={category}>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {categoryQuizzes.map((quiz) => {
                    const quizProgress = progress[quiz.id]
                    const hasAttempts = quizProgress && quizProgress.attempts.length > 0
                    const lastAttempt = hasAttempts ? quizProgress!.attempts[quizProgress!.attempts.length - 1] : null
                    const percentage = lastAttempt
                      ? Math.round((lastAttempt.score / lastAttempt.totalQuestions) * 100)
                      : 0

                    return (
                      <Link key={quiz.id} href={`/quiz/${quiz.slug}`}>
                        <div className="group h-full bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-primary transition-smooth cursor-pointer flex flex-col scale-in">
                          {/* Banner image */}
                          <div
                            className={`h-24 sm:h-28 md:h-32 bg-gradient-to-br ${quiz.accentColor} relative overflow-hidden flex items-center justify-center transition-smooth`}
                          >
                            <div className="text-4xl sm:text-5xl md:text-6xl opacity-50">{quiz.icon}</div>
                            {hasAttempts && (
                              <div className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
                                ✓ Done
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-smooth line-clamp-2">
                              {quiz.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
                              {quiz.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                              {quiz.tags?.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Metadata */}
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 sm:mb-4 border-t border-border pt-3 sm:pt-4">
                              <span>{quiz.questions.length}Q</span>
                              <span>•</span>
                              <span>{quiz.estimatedTime}m</span>
                              <span>•</span>
                              <span className="capitalize">{quiz.difficulty[0]}</span>
                            </div>

                            {/* Progress */}
                            {hasAttempts && (
                              <div className="space-y-2">
                                <div className="w-full bg-muted rounded-full h-1.5 sm:h-2">
                                  <div
                                    className="bg-accent h-1.5 sm:h-2 rounded-full transition-smooth"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <p className="text-xs font-semibold">
                                  Score: <span className="text-accent">{percentage}%</span>
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
