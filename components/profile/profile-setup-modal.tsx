"use client"

import type React from "react"

import { useState } from "react"
import { saveUserProfile } from "@/lib/profile-storage"
import type { UserProfile } from "@/lib/profile-storage"

interface ProfileSetupModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (profile: UserProfile) => void
}

export default function ProfileSetupModal({ isOpen, onClose, onComplete }: ProfileSetupModalProps) {
  const [name, setName] = useState("")
  const [year, setYear] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!name.trim()) newErrors.name = "Name is required"
    if (!year.trim()) newErrors.year = "Year is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const profile: UserProfile = {
      name,
      year,
      createdAt: Date.now(),
    }

    saveUserProfile(profile)
    onComplete(profile)
    setName("")
    setYear("")
    setErrors({})
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 transition-enter">
      <div className="bg-card border border-border rounded-lg max-w-md w-full p-6 scale-in">
        <h2 className="text-2xl font-bold mb-2">Create Your Profile</h2>
        <p className="text-muted-foreground mb-6">Let's get started with your info</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors({ ...errors, name: "" })
              }}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Age</label>
            <input
              type="text"
              value={year}
              onChange={(e) => {
                setYear(e.target.value)
                if (errors.year) setErrors({ ...errors, year: "" })
              }}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
            />
            {errors.year && <p className="text-xs text-destructive mt-1">{errors.year}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth font-medium"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
