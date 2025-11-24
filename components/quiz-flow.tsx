"use client"

import { useState } from "react"
import Link from "next/link"
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
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setShowExplanation(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setShowExplanation(false)
    }
  }

  const handleSubmit = () => {
    if (allAnswered) {
      onComplete(answers)
    }
  }

  const handleQuestionJump = (index: number) => {
    setCurrentQuestionIndex(index)
    setShowExplanation(false)
    setIsMenuOpen(false)
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="flex items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="text-5xl md:text-6xl drop-shadow-lg">{quiz.icon}</div>
              
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white drop-shadow-lg">{quiz.title}</h1>
                <div className="inline-block px-3 py-0.5 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-semibold text-white/90">In Progress</span>
                </div>
              </div>
            </div>

            {/* User Profile Badge */}
            {userProfile && (
              <div className="flex items-center gap-2 px-2 sm:px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {userProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <span className="text-sm font-medium text-gray-900 hidden sm:inline">{userProfile.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-6 md:h-8" viewBox="0 0 1200 120" preserveAspectRatio="none">
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">Question Progress</p>
                <p className="text-2xl font-bold text-foreground">
                  {currentQuestionIndex + 1} <span className="text-muted-foreground text-lg">/ {quiz.questions.length}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Answered</p>
                <p className="text-2xl font-bold text-primary">
                  {answeredCount} <span className="text-muted-foreground text-lg">/ {quiz.questions.length}</span>
                </p>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden mb-4">
              <div
                className={`h-3 rounded-full bg-gradient-to-r ${quiz.accentColor} transition-all duration-500`}
                style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>
            
            {/* View All Questions Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="w-full py-2.5 px-4 bg-muted hover:bg-muted/80 rounded-lg font-medium text-foreground transition-all flex items-center justify-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              View All Questions
            </button>
          </div>

          {/* Question Card */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${quiz.accentColor} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                {currentQuestionIndex + 1}
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-foreground leading-relaxed">
                  {currentQuestion.text}
                </h2>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
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
                    className={`group w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                      showCorrect
                        ? "border-green-500 bg-green-500/10"
                        : showIncorrect
                          ? "border-red-500 bg-red-500/10"
                          : isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 hover:bg-secondary/50"
                    } ${isAnswered ? "cursor-default" : "cursor-pointer hover:scale-[1.02]"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
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
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        {showIncorrect && (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                        {isSelected && !isAnswered && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className={`flex-1 ${
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
              <div className={`mt-6 p-4 rounded-xl border-2 ${
                isCorrect
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-orange-500/10 border-orange-500/30"
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCorrect ? "bg-green-500" : "bg-orange-500"
                  }`}>
                    {isCorrect ? (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold mb-1 ${isCorrect ? "text-green-600" : "text-orange-600"}`}>
                      {isCorrect ? "Correct!" : "Not quite right"}
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 bg-card border-2 border-border hover:border-primary/30 text-foreground rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg active:scale-95 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <div className="flex-1"></div>

            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className={`px-8 py-3 bg-gradient-to-r ${quiz.accentColor} text-white rounded-xl font-bold transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2`}
              >
                Submit Quiz
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className={`px-6 py-3 ${isAnswered ? `bg-gradient-to-r ${quiz.accentColor} text-white` : 'bg-card border-2 border-border text-foreground'} rounded-xl font-semibold transition-all hover:shadow-lg active:scale-95 flex items-center gap-2`}
              >
                {isAnswered ? 'Next' : 'Skip'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Back Link */}
          <div>
            <Link
              href={`/quiz/${quiz.slug}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Exit Quiz
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
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              All Questions
            </h3>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Question Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-5 gap-3">
              {quiz.questions.map((_, index) => {
                const questionAnswered = answers[index] !== -1
                const isCurrent = index === currentQuestionIndex

                return (
                  <button
                    key={index}
                    onClick={() => handleQuestionJump(index)}
                    className={`aspect-square rounded-lg font-bold text-sm transition-all ${
                      isCurrent
                        ? `bg-gradient-to-r ${quiz.accentColor} text-white shadow-lg scale-110`
                        : questionAnswered
                          ? "bg-primary/20 text-primary hover:bg-primary/30"
                          : "bg-muted text-muted-foreground hover:bg-muted/60"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${quiz.accentColor}`}></div>
                <span className="text-muted-foreground">Current Question</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20"></div>
                <span className="text-muted-foreground">Answered</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted"></div>
                <span className="text-muted-foreground">Not Answered</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <span className="text-lg font-bold text-foreground">{answeredCount}/{quiz.questions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Remaining</span>
                  <span className="text-lg font-bold text-foreground">{quiz.questions.length - answeredCount}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${quiz.accentColor} transition-all duration-500`}
                    style={{ width: `${(answeredCount / quiz.questions.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
