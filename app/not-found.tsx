import Link from "next/link"
import { HiHome, HiArrowRight } from "react-icons/hi"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Animation */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          </div>
          
          <div className="relative">
            <h1 className="text-9xl md:text-[12rem] font-black bg-linear-to-br from-primary via-accent to-primary bg-clip-text text-transparent">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl md:text-7xl animate-bounce">
                🤔
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Oops! Page Not Found
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
            Looks like you've stumbled into uncharted territory. The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-linear-to-r from-transparent via-border to-transparent"></div>
          <div className="w-2 h-2 rounded-full bg-primary/50 animate-pulse"></div>
          <div className="h-px w-16 bg-linear-to-r from-transparent via-border to-transparent"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
          <Link href="/">
            <button className="group w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg active:scale-95 flex items-center justify-center gap-2">
              <HiHome className="w-5 h-5" />
              Back to Home
              <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Fun Stats */}
        <div className="pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full">
            <span className="text-xs text-muted-foreground">
              Error Code: <span className="font-mono font-bold text-foreground">404</span>
            </span>
            <div className="w-1 h-1 rounded-full bg-border"></div>
            <span className="text-xs text-muted-foreground">
              Page Not Found
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}