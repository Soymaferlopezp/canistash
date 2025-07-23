"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Brain, Sparkles, Loader2 } from "lucide-react"

interface LoadingStateProps {
  title?: string
  message?: string
  type?: "default" | "ai" | "vault" | "strategy"
  showSkeleton?: boolean
  className?: string
}

export default function LoadingState({
  title = "Loading",
  message = "Please wait while we process your request...",
  type = "default",
  showSkeleton = false,
  className = "",
}: LoadingStateProps) {
  const getIcon = () => {
    switch (type) {
      case "ai":
        return <Brain className="h-8 w-8 text-savings-green" />
      case "strategy":
        return <Sparkles className="h-8 w-8 text-bitcoin-orange" />
      case "vault":
        return <Loader2 className="h-8 w-8 text-bitcoin-orange animate-spin" />
      default:
        return <Loader2 className="h-8 w-8 text-savings-green animate-spin" />
    }
  }

  const getAccentColor = () => {
    switch (type) {
      case "ai":
        return "savings-green"
      case "strategy":
        return "bitcoin-orange"
      case "vault":
        return "bitcoin-orange"
      default:
        return "savings-green"
    }
  }

  const accentColor = getAccentColor()

  if (showSkeleton) {
    return (
      <Card className={`bg-[#1F2E45] border-border/30 ${className}`}>
        <CardContent className="p-6 space-y-6">
          {/* Header Skeleton */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-soft-white/10 animate-pulse"></div>
            <div className="space-y-2 flex-1">
              <div className="h-6 bg-soft-white/10 rounded animate-pulse w-1/3"></div>
              <div className="h-4 bg-soft-white/5 rounded animate-pulse w-2/3"></div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-xl bg-background/30 border border-border/20 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-soft-white/10 animate-pulse"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-3 bg-soft-white/10 rounded animate-pulse w-1/2"></div>
                    <div className="h-3 bg-soft-white/5 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
                <div className="h-8 bg-soft-white/10 rounded animate-pulse w-2/3"></div>
                <div className="h-3 bg-soft-white/5 rounded animate-pulse w-1/2"></div>
              </div>
            ))}
          </div>

          {/* Text Skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-soft-white/10 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-soft-white/5 rounded animate-pulse w-4/5"></div>
            <div className="h-4 bg-soft-white/5 rounded animate-pulse w-3/5"></div>
          </div>

          {/* Button Skeleton */}
          <div className="h-12 bg-soft-white/10 rounded-xl animate-pulse w-full"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`bg-[#1F2E45] border-border/30 ${className}`}>
      <CardContent className="p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Animated Icon Container */}
          <div className="relative">
            <div
              className={`w-16 h-16 rounded-2xl bg-${accentColor}/10 flex items-center justify-center relative overflow-hidden`}
            >
              {getIcon()}

              {/* Animated background pulse */}
              <div
                className={`absolute inset-0 bg-${accentColor}/20 rounded-2xl animate-pulse`}
                style={{
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              ></div>
            </div>

            {/* Orbiting dots */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
              <div
                className={`absolute top-0 left-1/2 w-2 h-2 bg-${accentColor} rounded-full transform -translate-x-1/2 -translate-y-1`}
              ></div>
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s", animationDelay: "1s" }}>
              <div
                className={`absolute top-0 left-1/2 w-1.5 h-1.5 bg-${accentColor}/60 rounded-full transform -translate-x-1/2 -translate-y-1`}
              ></div>
            </div>
          </div>

          {/* Loading Content */}
          <div className="space-y-3 max-w-md">
            <h3 className="text-xl font-bold font-sora text-soft-white">{title}</h3>
            <p className="text-soft-white/70 font-inter leading-relaxed">{message}</p>
          </div>

          {/* Progress Indicator */}
          <div className="w-full max-w-xs">
            <div className="h-1 bg-soft-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r from-${accentColor} to-${accentColor}/60 rounded-full animate-pulse`}
                style={{
                  animation: "loading-bar 2s ease-in-out infinite",
                }}
              ></div>
            </div>
          </div>

          {/* Subtle hint text */}
          <p className="text-xs text-soft-white/40 font-inter">
            {type === "ai" && "AI is analyzing your request..."}
            {type === "strategy" && "Generating personalized strategy..."}
            {type === "vault" && "Creating your vault..."}
            {type === "default" && "Processing..."}
          </p>
        </div>
      </CardContent>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </Card>
  )
}
