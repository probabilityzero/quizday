"use client"

import { useState } from "react"
import Link from "next/link"
import { MdPushPin } from "react-icons/md"
import type { Quiz } from "@/lib/quiz-data"
import type { UserProfile } from "@/lib/profile-storage"

interface QuizFlowProps {
  quiz: Quiz
  userProfile?: UserProfile | null
  onComplete: (answers: number[]) => void
}

export default function QuizFlow({ quiz, userProfile, onComplete }: QuizFlowProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>(Array(quiz.questions.length).fill(-1))
  const [showExplanation, setShowExplanation] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [questionTransition, setQuestionTransition] = useState<"none" | "exit-left" | "exit-right" | "enter-left" | "enter-right">("none")

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const currentAnswer = answers[currentQuestionIndex]
  const isAnswered = currentAnswer !== -1
  const isCorrect = isAnswered && currentAnswer === currentQuestion.correctAnswer
  const answeredCount = answers.filter((a) => a !== -1).length
  const allAnswered = answers.every((a) => a !== -1)

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = optionIndex
    setAnswers(newAnswers)
    setShowExplanation(false)
  }

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setQuestionTransition("exit-left")
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setShowExplanation(false)
        setQuestionTransition("enter-right")
        setTimeout(() => setQuestionTransition("none"), 200)
      }, 200)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setQuestionTransition("exit-right")
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
        setShowExplanation(false)
        setQuestionTransition("enter-left")
        setTimeout(() => setQuestionTransition("none"), 200)
      }, 200)
    }
  }

  const handleSubmit = () => {
    if (allAnswered) {
      onComplete(answers)
    }
  }

  const handleQuestionJump = (index: number) => {
    const direction = index > currentQuestionIndex ? "left" : "right"
    setQuestionTransition(`exit-${direction}` as any)
    setTimeout(() => {
      setCurrentQuestionIndex(index)
      setShowExplanation(false)
      setIsMenuOpen(false)
      setQuestionTransition(`enter-${direction === "left" ? "right" : "left"}` as any)
      setTimeout(() => setQuestionTransition("none"), 200)
    }, 200)
  }

  const QuestionGrid = () => (
    <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 gap-1.5">
      {quiz.questions.map((_, index) => {
        const questionAnswered = answers[index] !== -1
        const isCurrent = index === currentQuestionIndex

        return (
          <button
            key={index}
            onClick={() => handleQuestionJump(index)}
            className={`aspect-square rounded-md font-bold text-[10px] transition-all ${
              isCurrent
                ? `bg-linear-to-r ${quiz.accentColor} text-white shadow-lg ring-2 ring-offset-1 ring-primary scale-105`
                : questionAnswered
                  ? "bg-green-500/90 text-white hover:bg-green-600 hover:scale-105"
                  : "bg-muted text-muted-foreground hover:bg-muted/60 hover:scale-105"
            }`}
          >
            {index + 1}
          </button>
        )
      })}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className={`relative bg-linear-to-br ${quiz.accentColor} overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 md:gap-4">
              {/* Icon */}
              <div className="text-3xl md:text-5xl drop-shadow-lg">{quiz.icon}</div>
              
              <div>
                <h1 className="text-lg md:text-2xl lg:text-3xl font-black text-white drop-shadow-lg">{quiz.title}</h1>
                <div className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full mt-1">
                  <span className="text-[10px] md:text-xs font-semibold text-white/90">In Progress</span>
                </div>
              </div>
            </div>

            {/* User Profile Badge */}
            {userProfile && (
              <div className="flex items-center gap-2 p-1.5 md:pr-4 md:p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-linear-to-br from-primary to-accent rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold text-primary-foreground">
                  {userProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <span className="text-xs md:text-sm font-medium text-gray-900 hidden sm:inline">{userProfile.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-4 md:h-6 lg:h-8" viewBox="0 0 1200 120" preserveAspectRatio="none">
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
      <div className="max-w-5xl mx-auto p-3 sm:p-4 md:p-6">
        <div className="space-y-3 md:space-y-6">
          {/* Progress Bar */}
          <div className="bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-6">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Progress</p>
                <p className="text-lg md:text-2xl font-bold text-foreground">
                  {currentQuestionIndex + 1} <span className="text-muted-foreground text-sm md:text-lg">/ {quiz.questions.length}</span>
                </p>
              </div>
              <div className="text-right">
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="py-1.5 md:py-2 px-3 md:px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-xs md:text-sm"
                >
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="hidden sm:inline">View All</span>
                  <span className="sm:hidden">{answeredCount}/{quiz.questions.length}</span>
                </button>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2 md:h-3 overflow-hidden mb-3 md:mb-4">
              <div
                className={`h-2 md:h-3 rounded-full bg-linear-to-r ${quiz.accentColor} transition-all duration-500`}
                style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>
            
            {/* Pinned Question Grid in Progress */}
            {isPinned && (
              <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs md:text-sm font-medium text-foreground">Quick Navigation</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Answered: {answeredCount}
                    </span>
                  </p>
                </div>
                <QuestionGrid />
              </div>
            )}
          </div>

          {/* Question Card */}
          <div className={`bg-card border border-border rounded-lg md:rounded-xl p-4 md:p-6 lg:p-8 transition-all duration-200 ease-out ${
            questionTransition === "exit-left" ? "opacity-0 -translate-x-12" :
            questionTransition === "exit-right" ? "opacity-0 translate-x-12" :
            questionTransition === "enter-left" ? "opacity-0 -translate-x-12" :
            questionTransition === "enter-right" ? "opacity-0 translate-x-12" :
            "opacity-100 translate-x-0"
          }`}>
            <div className="flex items-start gap-2 md:gap-4 mb-4 md:mb-6">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-linear-to-r ${quiz.accentColor} flex items-center justify-center text-white font-bold shrink-0 text-sm md:text-base`}>
                {currentQuestionIndex + 1}
              </div>
              <div className="flex-1">
                <h2 className="text-base md:text-xl lg:text-2xl font-bold text-foreground leading-relaxed">
                  {currentQuestion.text}
                </h2>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-2 md:space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = currentAnswer === index
                const isCorrectOption = index === currentQuestion.correctAnswer
                const showCorrect = isAnswered && isCorrectOption
                const showIncorrect = isAnswered && isSelected && !isCorrect

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    disabled={isAnswered}
                    className={`group w-full p-3 md:p-4 text-left rounded-lg md:rounded-xl border-2 transition-all duration-200 ${
                      showCorrect
                        ? "border-green-500 bg-green-500/10"
                        : showIncorrect
                          ? "border-red-500 bg-red-500/10"
                          : isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 hover:bg-secondary/50"
                    } ${isAnswered ? "cursor-default" : "cursor-pointer hover:scale-[1.01] md:hover:scale-[1.02]"}`}
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div
                        className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          showCorrect
                            ? "border-green-500 bg-green-500"
                            : showIncorrect
                              ? "border-red-500 bg-red-500"
                              : isSelected
                                ? "border-primary bg-primary"
                                : "border-muted-foreground group-hover:border-primary"
                        }`}
                      >
                        {showCorrect && (
                          <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        {showIncorrect && (
                          <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                        {isSelected && !isAnswered && (
                          <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className={`flex-1 text-sm md:text-base ${
                        showCorrect ? "text-green-600 font-semibold" :
                        showIncorrect ? "text-red-600 font-semibold" :
                        "text-foreground"
                      }`}>
                        {option}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {isAnswered && currentQuestion.explanation && (
              <div className={`mt-4 md:mt-6 p-3 md:p-4 rounded-lg md:rounded-xl border-2 ${
                isCorrect
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-orange-500/10 border-orange-500/30"
              }`}>
                <div className="flex items-start gap-2 md:gap-3">
                  <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isCorrect ? "bg-green-500" : "bg-orange-500"
                  }`}>
                    {isCorrect ? (
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold mb-0.5 md:mb-1 text-sm md:text-base ${isCorrect ? "text-green-600" : "text-orange-600"}`}>
                      {isCorrect ? "Correct!" : "Not quite right"}
                    </p>
                    <p className="text-xs md:text-sm text-foreground leading-relaxed">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2 md:gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-4 md:px-6 py-2 md:py-3 bg-card border-2 border-border hover:border-primary/30 text-foreground rounded-lg md:rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg active:scale-95 flex items-center gap-1.5 md:gap-2 text-sm md:text-base"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex-1"></div>

            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className={`px-5 md:px-8 py-2 md:py-3 bg-linear-to-r ${quiz.accentColor} text-white rounded-lg md:rounded-xl font-bold transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-1.5 md:gap-2 text-sm md:text-base`}
              >
                Submit
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className={`px-4 md:px-6 py-2 md:py-3 ${isAnswered ? `bg-linear-to-r ${quiz.accentColor} text-white` : 'bg-card border-2 border-border text-foreground'} rounded-lg md:rounded-xl font-semibold transition-all hover:shadow-lg active:scale-95 flex items-center gap-1.5 md:gap-2 text-sm md:text-base`}
              >
                {isAnswered ? 'Next' : 'Skip'}
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Back Link */}
          <div className="pt-2 md:pt-0">
            <Link
              href={`/quiz/${quiz.slug}`}
              className="inline-flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-smooth"
            >
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Leave for Now
            </Link>
          </div>
        </div>
      </div>

      {/* Slide-out Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-card border-l border-border shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
            <h3 className="text-base md:text-lg font-bold flex items-center gap-2">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              All Questions
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsPinned(!isPinned)
                  if (!isPinned) {
                    setIsMenuOpen(false)
                  }
                }}
                className={`p-2 hover:bg-muted rounded-lg transition-all ${isPinned ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                title={isPinned ? "Unpin from page" : "Pin to page"}
              >
                <MdPushPin className={`w-5 h-5 transition-transform ${isPinned ? 'rotate-45' : ''}`} />
              </button>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1.5 md:p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Question Grid */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="grid grid-cols-5 gap-2 md:gap-3">
              {quiz.questions.map((_, index) => {
                const questionAnswered = answers[index] !== -1
                const isCurrent = index === currentQuestionIndex

                return (
                  <button
                    key={index}
                    onClick={() => handleQuestionJump(index)}
                    className={`aspect-square rounded-md md:rounded-lg font-bold text-xs md:text-sm transition-all ${
                      isCurrent
                        ? `bg-linear-to-r ${quiz.accentColor} text-white shadow-lg ring-2 ring-offset-2 ring-primary scale-105`
                        : questionAnswered
                          ? "bg-green-500/90 text-white hover:bg-green-600 hover:scale-105"
                          : "bg-muted text-muted-foreground hover:bg-muted/60 hover:scale-105"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border space-y-2 md:space-y-3 text-xs md:text-sm">
              <div className="flex items-center gap-2 md:gap-3">
                <div className={`w-7 h-7 md:w-8 md:h-8 rounded-md md:rounded-lg bg-linear-to-r ${quiz.accentColor} ring-2 ring-offset-2 ring-primary`}></div>
                <span className="text-muted-foreground">Current Question</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-md md:rounded-lg bg-green-500/90"></div>
                <span className="text-muted-foreground">Answered</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-md md:rounded-lg bg-muted"></div>
                <span className="text-muted-foreground">Not Answered</span>
              </div>
            </div>

            {/* Progress Stats */}
            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm md:text-base font-bold text-foreground">{answeredCount} / {quiz.questions.length}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full bg-green-500 transition-all duration-500`}
                    style={{ width: `${(answeredCount / quiz.questions.length) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  {allAnswered ? "All questions answered! 🎉" : `${quiz.questions.length - answeredCount} question${quiz.questions.length - answeredCount !== 1 ? 's' : ''} left`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}