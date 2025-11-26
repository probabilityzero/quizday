"use client"

import Link from "next/link"
import { getAllCategories, quizzes } from "@/lib/quiz-data"
import { useEffect, useState } from "react"
import { getAllProgress } from "@/lib/quiz-storage"
import { getUserProfile } from "@/lib/profile-storage"
import { HiQuestionMarkCircle, HiLightningBolt, HiCheckCircle, HiArrowRight } from "react-icons/hi"
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

  const totalQuizzes = quizzes.length
  const completedQuizzes = Object.values(progress).filter(p => p.attempts.length > 0).length
  const totalQuestions = quizzes.reduce((sum, q) => sum + q.questions.length, 0)

  return (
    <main className="min-h-screen bg-background transition-smooth">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-10 lg:py-12">
        {/* Hero Section */}
        <div className="mb-8 md:mb-12 transition-enter">
          <div className="text-center mb-4 md:mb-6">
            <div className="relative inline-block">
              <div className="absolute -top-4 -left-4 w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 md:w-24 md:h-24 bg-accent/10 rounded-full blur-2xl"></div>
              
              <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-2 md:mb-3">
                <span className="block bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                  QUIZDAY
                </span>
              </h1>
              
              <div className="relative flex items-center justify-center gap-2 md:gap-3">
                <div className="h-px w-6 md:w-10 bg-linear-to-r from-transparent via-primary to-transparent"></div>
                <p className="text-base md:text-lg lg:text-xl font-light tracking-[0.3em] text-muted-foreground">
                  BY <span className="font-semibold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">HAN</span>
                </p>
                <div className="h-px w-6 md:w-10 bg-linear-to-r from-transparent via-accent to-transparent"></div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed px-4">
              Participate every Tuesday to win exciting prizes! Test your knowledge across various topics and challenge yourself with our weekly quizzes.
            </p>

            {profile && (
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 border border-primary/20 rounded-full">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-linear-to-br from-primary to-accent rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <span className="text-xs md:text-sm">
                  Welcome back, <span className="font-semibold text-primary">{profile.name}!</span>
                </span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto pt-4 md:pt-6">
              <div className="bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-5 hover:border-primary/30 transition-all">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold bg-linear-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                  {totalQuizzes}
                </div>
                <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Total Quizzes</div>
              </div>
              <div className="bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-5 hover:border-accent/30 transition-all">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold bg-linear-to-br from-accent to-accent/70 bg-clip-text text-transparent">
                  {totalQuestions}
                </div>
                <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Questions</div>
              </div>
              <div className="bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-5 hover:border-green-500/30 transition-all">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-500">
                  {completedQuizzes}
                </div>
                <div className="text-[10px] md:text-xs text-muted-foreground mt-1">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-6 md:space-y-10">
          {categories.map((category) => {
            const categoryQuizzes = quizzes.filter((q) => q.category === category)
            return (
              <div key={category}>
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{category}</h2>
                  <div className="flex-1 h-px bg-linear-to-r from-border to-transparent"></div>
                  <span className="text-xs md:text-sm text-muted-foreground">{categoryQuizzes.length} quizzes</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                  {categoryQuizzes.map((quiz) => {
                    const quizProgress = progress[quiz.id]
                    const hasAttempts = quizProgress && quizProgress.attempts.length > 0
                    const lastAttempt = hasAttempts ? quizProgress!.attempts[quizProgress!.attempts.length - 1] : null
                    const percentage = lastAttempt
                      ? Math.round((lastAttempt.score / lastAttempt.totalQuestions) * 100)
                      : 0

                    return (
                      <Link key={quiz.id} href={`/quiz/${quiz.slug}`}>
                        <div className="group h-full bg-card border border-border rounded-lg md:rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer flex flex-col active:scale-[0.98]">
                          <div className="relative">
                            <div
                              className={`h-32 md:h-36 bg-linear-to-br ${quiz.accentColor} relative overflow-hidden flex items-center justify-center`}
                            >
                              <div className="text-5xl md:text-6xl opacity-20 absolute">
                                {quiz.icon}
                              </div>
                              
                              {hasAttempts && (
                                <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-white/95 text-green-600 text-[10px] md:text-xs font-semibold px-2 md:px-2.5 py-1 md:py-1.5 rounded-full shadow-sm flex items-center gap-1">
                                  <HiCheckCircle className="w-3 h-3" />
                                  Completed
                                </div>
                              )}

                              {quiz.tags && quiz.tags.length > 0 && (
                                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 via-black/30 to-transparent pt-6 md:pt-8 pb-2 md:pb-3 px-2 md:px-3">
                                  <div className="flex flex-wrap gap-1 md:gap-1.5">
                                    {quiz.tags.slice(0, 3).map((tag) => (
                                      <span
                                        key={tag}
                                        className="bg-white/90 backdrop-blur-sm text-gray-800 capitalize text-[10px] md:text-xs font-medium px-2 py-0.5 md:py-1 rounded"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="p-3 md:p-4 flex flex-col grow">
                            <h3 className="text-base md:text-lg font-bold mb-1 line-clamp-2">
                              {quiz.title}
                            </h3>
                            <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2">
                              {quiz.description}
                            </p>

                            <div className="grid grid-cols-2 gap-3 mb-3 pt-3 border-t border-border/50">
                              <div className="flex items-start gap-1.5 md:gap-2">
                                <HiQuestionMarkCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground mt-0.5 shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <div className="text-[10px] md:text-xs text-muted-foreground">Questions</div>
                                  <div className="text-xs md:text-sm font-semibold">{quiz.questions.length}</div>
                                </div>
                              </div>
                              <div className="flex items-start gap-1.5 md:gap-2">
                                <HiLightningBolt className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground mt-0.5 shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <div className="text-[10px] md:text-xs text-muted-foreground">Difficulty</div>
                                  <div className={`text-xs md:text-sm font-semibold capitalize ${
                                    quiz.difficulty === 'easy' ? 'text-green-500' :
                                    quiz.difficulty === 'medium' ? 'text-yellow-500' :
                                    'text-red-500'
                                  }`}>
                                    {quiz.difficulty}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {hasAttempts ? (
                              <div className="space-y-1.5 md:space-y-2 bg-accent/10 rounded-lg p-2.5 md:p-3 mt-auto">
                                <div className="flex items-center justify-between text-[10px] md:text-xs font-medium">
                                  <span className="text-muted-foreground">Your Score</span>
                                  <span className={`font-bold ${
                                    percentage >= 80 ? 'text-green-500' :
                                    percentage >= 60 ? 'text-yellow-500' :
                                    'text-red-500'
                                  }`}>
                                    {percentage}%
                                  </span>
                                </div>
                                <div className="w-full bg-muted/50 rounded-full h-1.5 md:h-2 overflow-hidden">
                                  <div
                                    className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
                                      percentage >= 80 ? 'bg-green-500' :
                                      percentage >= 60 ? 'bg-yellow-500' :
                                      'bg-red-500'
                                    }`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <button className="group/btn bg-primary hover:bg-primary/90 active:bg-primary/80 text-primary-foreground rounded-lg p-2.5 md:p-3 text-center mt-auto transition-all duration-200 hover:shadow-md active:scale-95">
                                <span className="text-xs md:text-sm font-semibold inline-flex items-center gap-1.5 md:gap-2 group-hover/btn:gap-2.5 transition-all">
                                  Start Quiz
                                  <HiArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                                </span>
                              </button>
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
