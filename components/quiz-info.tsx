"use client"

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
  const percentage = lastAttempt ? Math.round((lastAttempt.score / lastAttempt.totalQuestions) * 100) : 0
  const bestAttempt = hasAttempts
    ? progress!.attempts.reduce((best, current) => (current.score > best.score ? current : best))
    : null
  const bestPercentage = bestAttempt ? Math.round((bestAttempt.score / bestAttempt.totalQuestions) * 100) : 0

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
          {/* App Name - Top Left */}
          {/* <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-bold tracking-wide text-gray-900">
                QUIZDAY <span className="text-gray-500 font-normal">by Han</span>
              </span>
            </div>
          </div> */}

          <div className="text-center space-y-4 md:space-y-6">
            {/* Icon */}
            <div className="text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl">
              {quiz.icon}
            </div>

            {/* Category Badge */}
            <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="text-sm font-semibold text-white/90">{quiz.category}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-lg tracking-tight px-4">
              {quiz.title}
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed px-4">
              {quiz.description}
            </p>

            {/* Tags */}
            {quiz.tags && quiz.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {quiz.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-medium rounded-lg capitalize shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
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
        {/* Status Banner */}
        {hasAttempts && (
          <div className="mb-8 p-6 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/20 rounded-2xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Quiz Completed!</h3>
                  <p className="text-sm text-muted-foreground">You've attempted this quiz {progress!.attempts.length} {progress!.attempts.length === 1 ? 'time' : 'times'}</p>
                </div>
              </div>
              <button
                onClick={onViewResults}
                className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all hover:shadow-lg active:scale-95"
              >
                View Results
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6 z-10">
              {/* Last Attempt */}
              <div className="bg-gradient-to-br from-white/50 to-white/80 border border-accent/20 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Latest Score</h3>
                <div className="flex items-end gap-3 mb-4">
                  <span className={`text-5xl font-black ${
                    percentage >= 80 ? 'text-green-500' :
                    percentage >= 60 ? 'text-yellow-500' :
                    'text-red-500'
                  }`}>
                    {percentage}%
                  </span>
                  <span className="text-lg text-muted-foreground mb-2">
                    {lastAttempt!.score}/{lastAttempt!.totalQuestions}
                  </span>
                </div>
                <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      percentage >= 80 ? 'bg-green-500' :
                      percentage >= 60 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Completed {new Date(lastAttempt!.completedAt).toLocaleDateString()}
                </p>
              </div>

              {/* Best Attempt */}
              <div className="bg-gradient-to-br from-blue-50/95 to-blue-50/90 border border-primary/20 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Best Score
                </h3>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-5xl font-black text-primary">
                    {bestPercentage}%
                  </span>
                  <span className="text-lg text-muted-foreground mb-2">
                    {bestAttempt!.score}/{bestAttempt!.totalQuestions}
                  </span>
                </div>
                <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${bestPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Achieved {new Date(bestAttempt!.completedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Questions</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{quiz.questions.length}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 hover:border-accent/30 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Difficulty</span>
            </div>
            <p className={`text-2xl md:text-3xl font-bold capitalize ${
              quiz.difficulty === 'easy' ? 'text-green-500' :
              quiz.difficulty === 'medium' ? 'text-yellow-500' :
              'text-red-500'
            }`}>
              {quiz.difficulty}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 hover:border-blue-500/30 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Est. Time</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{Math.ceil(quiz.questions.length * 1.5)}m</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 hover:border-purple-500/30 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Attempts</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{hasAttempts ? progress!.attempts.length : 0}</p>
          </div>
        </div>

        {/* Quiz Overview */}
        <div className="mb-12 bg-gradient-to-br from-card to-accent/5 border border-border rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Quiz Overview
          </h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="leading-relaxed">
              This quiz contains <strong className="text-foreground">{quiz.questions.length} carefully crafted questions</strong> designed to test your knowledge of {quiz.title.toLowerCase()}. 
              Each question is multiple choice with one correct answer. Take your time and read each question carefully.
            </p>
            {quiz.tags && quiz.tags.length > 0 && (
              <p className="leading-relaxed mt-4">
                Topics covered: <strong className="text-foreground">{quiz.tags.join(', ')}</strong>
              </p>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={onStartQuiz}
            className="group relative px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground text-lg font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-100 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {hasAttempts ? 'Retake Quiz' : 'Start Quiz'}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <p className="text-sm text-muted-foreground mt-4">
            {hasAttempts ? 'Challenge yourself to beat your best score!' : 'No time limit • You can review your answers at the end'}
          </p>
        </div>
      </div>
    </div>
  )
}
