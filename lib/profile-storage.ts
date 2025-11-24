export interface UserProfile {
  name: string
  year: string
  createdAt: number
}

const PROFILE_STORAGE_KEY = "user-profile"

export function getUserProfile(): UserProfile | null {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem(PROFILE_STORAGE_KEY)
  return data ? JSON.parse(data) : null
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
}

export function hasUserProfile(): boolean {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem(PROFILE_STORAGE_KEY)
}

export function clearUserProfile(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(PROFILE_STORAGE_KEY)
}
