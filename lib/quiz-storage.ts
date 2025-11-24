export interface QuizAttempt {
  completedAt: number
  score: number
  totalQuestions: number
  answers: number[]
}

export interface QuizProgress {
  quizId: string
  attempts: QuizAttempt[]
  userProfile?: {
    name: string
    year: string
  }
}

const STORAGE_KEY = "quiz-progress"

export function getProgress(quizId: string): QuizProgress | null {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return null
  const progress = JSON.parse(data) as Record<string, QuizProgress>
  return progress[quizId] || null
}

export function getAllProgress(): Record<string, QuizProgress> {
  if (typeof window === "undefined") return {}
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : {}
}

export function saveProgress(quizId: string, attempt: QuizAttempt, userProfile?: { name: string; year: string }): void {
  if (typeof window === "undefined") return
  const allProgress = getAllProgress()
  if (!allProgress[quizId]) {
    allProgress[quizId] = { quizId, attempts: [], userProfile }
  }
  allProgress[quizId].attempts.push(attempt)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress))
}

export function hasCompletedQuiz(quizId: string): boolean {
  const progress = getProgress(quizId)
  return !!progress && progress.attempts.length > 0
}

export function clearProgress(quizId: string): void {
  if (typeof window === "undefined") return
  const allProgress = getAllProgress()
  delete allProgress[quizId]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress))
}
