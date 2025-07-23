"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

interface SuccessStateProps {
  title?: string
  message?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  autoHide?: boolean
  autoHideDelay?: number
  onAutoHide?: () => void
  showConfetti?: boolean
  className?: string
}

export default function SuccessState({
  title = "Success!",
  message = "Your Vault was successfully created 🎉",
  description,
  actionLabel,
  onAction,
  autoHide = false,
  autoHideDelay = 3000,
  onAutoHide,
  showConfetti = true,
  className = "",
}: SuccessStateProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    setShowAnimation(true)

    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onAutoHide?.()
      }, autoHideDelay)

      return () => clearTimeout(timer)
    }
  }, [autoHide, autoHideDelay, onAutoHide])

  if (!isVisible) return null

  return (
    <Card
      className={`bg-[#1F2E45] border-savings-green/30 relative overflow-hidden ${
        showAnimation ? "animate-in slide-in-from-bottom-4 duration-500" : ""
      } ${className}`}
    >
      {/* Confetti Background Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Sparkles
                className={`h-3 w-3 ${
                  i % 3 === 0 ? "text-savings-green" : i % 3 === 1 ? "text-bitcoin-orange" : "text-soft-white/60"
                }`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Success Border Glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-savings-green via-savings-green to-savings-green/60"></div>

      <CardContent className="p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Success Icon with Animation */}
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-savings-green/10 flex items-center justify-center relative overflow-hidden">
              <CheckCircle className="h-8 w-8 text-savings-green animate-in zoom-in-50 duration-300" />

              {/* Ripple Effect */}
              <div className="absolute inset-0 bg-savings-green/20 rounded-2xl animate-ping"></div>
            </div>

            {/* Success Ring Animation */}
            <div className="absolute inset-0 rounded-2xl border-2 border-savings-green/30 animate-pulse"></div>
          </div>

          {/* Success Content */}
          <div className="space-y-3 max-w-md">
            <h3 className="text-xl font-bold font-sora text-soft-white">{title}</h3>
            <p className="text-savings-green font-inter font-medium text-lg">{message}</p>
            {description && <p className="text-soft-white/70 font-inter text-sm leading-relaxed">{description}</p>}
          </div>

          {/* Success Metrics or Additional Info */}
          <div className="flex items-center justify-center space-x-6 py-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-savings-green animate-pulse"></div>
              <span className="text-xs text-soft-white/60 font-inter">Vault Created</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-bitcoin-orange animate-pulse"></div>
              <span className="text-xs text-soft-white/60 font-inter">DCA Activated</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-soft-white/40 animate-pulse"></div>
              <span className="text-xs text-soft-white/60 font-inter">Ready to Use</span>
            </div>
          </div>

          {/* Action Button */}
          {actionLabel && onAction && (
            <Button
              onClick={onAction}
              className="bg-savings-green hover:bg-savings-green/90 text-white font-medium font-inter group"
            >
              <span>{actionLabel}</span>
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}

          {/* Celebration Message */}
          <div className="pt-2">
            <p className="text-xs text-soft-white/40 font-inter">🚀 Your Bitcoin savings journey begins now!</p>
          </div>
        </div>
      </CardContent>

      {/* Gradient Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-savings-green/5 via-transparent to-bitcoin-orange/5 pointer-events-none"></div>
    </Card>
  )
}
