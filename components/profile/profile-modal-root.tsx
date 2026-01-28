"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import ProfileSetupModal from "./profile-setup-modal"
import type { UserProfile } from "@/lib/profile-storage"

export default function ProfileModalRoot() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname() || "/"
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const setup = searchParams.get("setup-profile")
    const edit = searchParams.get("edit-profile")
    setIsOpen(Boolean(setup) || Boolean(edit))
  }, [searchParams])

  const close = () => {
    setIsOpen(false)
    // remove query params by replacing to same pathname
    router.replace(pathname)
  }

  const handleComplete = (profile: UserProfile) => {
    setIsOpen(false)
    router.replace(pathname)
  }

  return (
    <ProfileSetupModal isOpen={isOpen} onClose={close} onComplete={handleComplete} />
  )
}
