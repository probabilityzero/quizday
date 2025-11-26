"use client"

import { HiCheckCircle, HiQuestionMarkCircle, HiLightningBolt, HiClock, HiBookOpen, HiArrowRight, HiStar, HiArrowLeft } from "react-icons/hi"
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
  const percentage = lastAttempt ? Math.round((lastAttempt.score / lastAttempt.totalQuestions) * 100) : 0
  const bestAttempt = hasAttempts
    ? progress!.attempts.reduce((best, current) => (current.score > best.score ? current : best))
    : null
  const bestPercentage = bestAttempt ? Math.round((bestAttempt.score / bestAttempt.totalQuestions) * 100) : 0

  return (
    <div className="min-h-screen bg-background">
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
              <span className="text-xs md:text-sm font-semibold text-white/90">{quiz.category}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-lg tracking-tight px-4">
              {quiz.title}
            </h1>

            <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto leading-relaxed px-4">
              {quiz.description}
            </p>

            {quiz.tags && quiz.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {quiz.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs md:text-sm font-medium rounded-lg capitalize shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
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
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-5 hover:border-primary/30 transition-all">
            <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
              <HiQuestionMarkCircle className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
              <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">Questions</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-foreground">{quiz.questions.length}</p>
          </div>

          <div className="bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-5 hover:border-accent/30 transition-all">
            <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
              <HiLightningBolt className="w-4 h-4 md:w-5 md:h-5 text-accent shrink-0" />
              <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">Difficulty</span>
            </div>
            <p className={`text-xl md:text-3xl font-bold capitalize ${
              quiz.difficulty === 'easy' ? 'text-green-500' :
              quiz.difficulty === 'medium' ? 'text-yellow-500' :
              'text-red-500'
            }`}>
              {quiz.difficulty}
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-5 hover:border-blue-500/30 transition-all">
            <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
              <HiClock className="w-4 h-4 md:w-5 md:h-5 text-blue-500 shrink-0" />
              <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">Est. Time</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-foreground">{Math.ceil(quiz.questions.length * 1.5)}m</p>
          </div>
        </div>

        
        {/* Quiz Overview */}
        <div className="mb-4 md:mb-6 bg-linear-to-br from-card to-accent/5 border border-border rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
          <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <HiBookOpen className="w-5 h-5 md:w-6 md:h-6 text-accent" />
            Quiz Overview
          </h2>
          <div className="text-xs md:text-sm text-muted-foreground space-y-3 md:space-y-4">
            <p className="leading-relaxed">
              This quiz contains <strong className="text-foreground">{quiz.questions.length} carefully crafted questions</strong> designed to test your knowledge of {quiz.title.toLowerCase()}. 
              Each question is multiple choice with one correct answer. Take your time and read each question carefully.
            </p>
            {quiz.tags && quiz.tags.length > 0 && (
              <p className="leading-relaxed">
                Topics covered: <strong className="text-foreground">{quiz.tags.join(', ')}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Status Banner */}
        {hasAttempts && (
          <div className="mb-6 md:mb-8 p-3 md:p-4 bg-card border border-border rounded-lg md:rounded-xl">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                  <HiCheckCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold text-foreground">Quiz Completed!</h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground">Attempted {progress!.attempts.length} {progress!.attempts.length === 1 ? 'time' : 'times'}</p>
                </div>
              </div>
              <button
                onClick={onViewResults}
                className="px-3 md:px-4 py-1.5 md:py-2 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-xs md:text-sm font-semibold rounded-lg transition-all hover:shadow-lg active:scale-95"
              >
                View Results
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
              <div className="bg-muted/50 border border-border rounded-lg md:rounded-xl p-3 md:p-4">
                <h3 className="text-[10px] md:text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Latest Score</h3>
                <div className="flex items-end gap-2 mb-2">
                  <span className={`text-2xl md:text-3xl font-black ${
                    percentage >= 80 ? 'text-green-500' :
                    percentage >= 60 ? 'text-yellow-500' :
                    'text-red-500'
                  }`}>
                    {percentage}%
                  </span>
                  <span className="text-sm md:text-base text-muted-foreground mb-0.5 md:mb-1">
                    {lastAttempt!.score}/{lastAttempt!.totalQuestions}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 md:h-2 overflow-hidden">
                  <div
                    className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
                      percentage >= 80 ? 'bg-green-500' :
                      percentage >= 60 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-[9px] md:text-[10px] text-muted-foreground mt-1.5 md:mt-2">
                  {new Date(lastAttempt!.completedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg md:rounded-xl p-3 md:p-4">
                <h3 className="text-[10px] md:text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider flex items-center gap-1.5">
                  <HiStar className="w-3 h-3 md:w-3.5 md:h-3.5 text-yellow-500" />
                  Best Score
                </h3>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-2xl md:text-3xl font-black text-primary">
                    {bestPercentage}%
                  </span>
                  <span className="text-sm md:text-base text-muted-foreground mb-0.5 md:mb-1">
                    {bestAttempt!.score}/{bestAttempt!.totalQuestions}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 md:h-2 overflow-hidden">
                  <div
                    className="h-1.5 md:h-2 rounded-full bg-linear-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${bestPercentage}%` }}
                  />
                </div>
                <p className="text-[9px] md:text-[10px] text-muted-foreground mt-1.5 md:mt-2">
                  {new Date(bestAttempt!.completedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-3">
          <p className="text-xs md:text-sm text-muted-foreground">
            {hasAttempts ? 'Challenge yourself to beat your best score!' : 'No time limit • You can review your answers at the end'}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
          <Link href={`/`} className="flex-1">
            <button className="w-full px-6 md:px-8 py-3 md:py-4 bg-card border-2 border-border hover:border-primary/30 text-foreground rounded-lg md:rounded-xl font-bold transition-all hover:shadow-lg active:scale-95 text-base md:text-lg">
              Back to Home
            </button>
          </Link>
        
          <button
            onClick={onStartQuiz}
            className="group relative flex-1 px-6 md:px-8 py-3 md:py-4 bg-linear-to-r from-primary to-accent text-primary-foreground text-base md:text-lg font-bold rounded-lg md:rounded-xl transition-all duration-300 hover:shadow-2xl active:scale-95 overflow-hidden"
>
            <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
              {hasAttempts ? 'Retake Quiz' : 'Start Quiz'}
              <HiArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  )
}