"use client"

import { useState } from "react"
import Link from "next/link"
import type { Quiz } from "@/lib/quiz-data"
import type { UserProfile } from "@/lib/profile-storage"
import type { PreQuizData } from "./pre-quiz-form"

interface QuizFlowProps {
  quiz: Quiz
  preQuizData?: PreQuizData | null
  userProfile?: UserProfile | null
  onComplete: (answers: number[]) => void
}

export default function QuizFlow({ quiz, preQuizData, userProfile, onComplete }: QuizFlowProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>(Array(quiz.questions.length).fill(-1))
  const [showExplanation, setShowExplanation] = useState(false)

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

  return (
    <main className="min-h-screen bg-background transition-smooth">
      {/* Banner */}
      <div
        className={`bg-gradient-to-r ${quiz.accentColor} h-32 md:h-40 relative overflow-hidden flex items-center justify-center transition-smooth`}
      >
        <div className="text-5xl md:text-6xl opacity-20 absolute">{quiz.icon}</div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-xl md:text-3xl font-bold text-primary-foreground text-balance">{quiz.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="py-6 md:py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto transition-enter">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </p>
                <h2 className="text-lg md:text-xl font-semibold mt-1">Progress</h2>
              </div>
              <div className="text-right">
                <p className="text-xs md:text-sm text-muted-foreground">
                  Answered: {answeredCount}/{quiz.questions.length}
                </p>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${quiz.accentColor} h-2 rounded-full transition-smooth`}
                style={{
                  width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question card */}
          <div className="bg-card border border-border rounded-lg p-4 md:p-6 mb-6 scale-in">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-6">{currentQuestion.text}</h3>

            {/* Options */}
            <div className="space-y-2 md:space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => {
                const isSelected = currentAnswer === index
                const isCorrectOption = index === currentQuestion.correctAnswer
                const showCorrect = isAnswered && isCorrectOption && isCorrect
                const showIncorrect = isAnswered && isSelected && !isCorrect

                return (
                  <button
                    key={index}
                    onClick={() => !isAnswered && handleSelectOption(index)}
                    disabled={isAnswered}
                    className={`w-full p-3 md:p-4 text-left rounded-lg border-2 transition-smooth text-sm md:text-base ${
                      showCorrect
                        ? `border-accent bg-accent/10 text-accent font-semibold`
                        : showIncorrect
                          ? "border-destructive bg-destructive/10 text-destructive"
                          : isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 hover:bg-secondary"
                    } ${isAnswered ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          showCorrect
                            ? "border-accent bg-accent"
                            : showIncorrect
                              ? "border-destructive bg-destructive"
                              : isSelected
                                ? "border-primary bg-primary"
                                : "border-muted-foreground"
                        }`}
                      >
                        {isSelected && !isAnswered && <div className="w-2 h-2 bg-current rounded-full" />}
                        {showCorrect && <span className="text-white text-xs">✓</span>}
                        {showIncorrect && <span className="text-white text-xs">✕</span>}
                      </div>
                      <span className="text-balance">{option}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {isAnswered && currentQuestion.explanation && (
              <div
                className={`p-4 rounded-lg mb-6 text-sm transition-smooth ${
                  isCorrect
                    ? "bg-accent/10 border border-accent text-accent"
                    : "bg-destructive/10 border border-destructive text-destructive"
                }`}
              >
                <p className="font-semibold mb-1">{isCorrect ? "✓ Correct!" : "✕ Incorrect"}</p>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm md:text-base"
            >
              ← Previous
            </button>

            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className={`flex-1 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r ${quiz.accentColor} text-primary-foreground rounded-lg hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm md:text-base`}
              >
                Submit Quiz
              </button>
            ) : (
              <>
                {!isAnswered ? (
                  <button
                    onClick={handleNext}
                    className={`flex-1 px-4 md:px-6 py-2 md:py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-smooth font-medium text-sm md:text-base`}
                  >
                    Skip →
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className={`flex-1 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r ${quiz.accentColor} text-primary-foreground rounded-lg hover:opacity-90 transition-smooth font-medium text-sm md:text-base`}
                  >
                    Next →
                  </button>
                )}
              </>
            )}
          </div>

          {/* Back to home */}
          <div className="mt-6 md:mt-8">
            <Link
              href={`/quiz/${quiz.slug}`}
              className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-smooth inline-flex items-center gap-1"
            >
              ← Back to quiz info
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
