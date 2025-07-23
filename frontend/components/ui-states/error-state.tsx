"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw, ArrowLeft, Bug } from "lucide-react"
import { useState } from "react"

interface ErrorStateProps {
  title?: string
  message?: string
  description?: string
  errorCode?: string
  retryLabel?: string
  onRetry?: () => void
  backLabel?: string
  onBack?: () => void
  reportLabel?: string
  onReport?: () => void
  showErrorCode?: boolean
  className?: string
}

export default function ErrorState({
  title = "Oops! Something went wrong",
  message = "There was a problem generating your strategy",
  description = "Don't worry, this happens sometimes. Please try again or contact support if the problem persists.",
  errorCode,
  retryLabel = "Try Again",
  onRetry,
  backLabel = "Go Back",
  onBack,
  reportLabel = "Report Issue",
  onReport,
  showErrorCode = false,
  className = "",
}: ErrorStateProps) {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = async () => {
    if (onRetry) {
      setIsRetrying(true)
      try {
        await onRetry()
      } finally {
        setIsRetrying(false)
      }
    }
  }

  return (
    <Card className={`bg-[#1F2E45] border-red-500/30 relative overflow-hidden ${className}`}>
      {/* Error Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-500 to-red-500/60"></div>

      <CardContent className="p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Error Icon with Animation */}
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center relative overflow-hidden">
              <AlertCircle className="h-8 w-8 text-red-500 animate-in zoom-in-50 duration-300" />

              {/* Subtle pulse effect */}
              <div className="absolute inset-0 bg-red-500/10 rounded-2xl animate-pulse"></div>
            </div>

            {/* Error Ring */}
            <div className="absolute inset-0 rounded-2xl border-2 border-red-500/20"></div>
          </div>

          {/* Error Content */}
          <div className="space-y-3 max-w-md">
            <h3 className="text-xl font-bold font-sora text-soft-white">{title}</h3>
            <p className="text-red-500 font-inter font-medium">{message}</p>
            {description && <p className="text-soft-white/70 font-inter text-sm leading-relaxed">{description}</p>}
          </div>

          {/* Error Code */}
          {showErrorCode && errorCode && (
            <div className="p-3 rounded-lg bg-background/30 border border-red-500/20">
              <div className="flex items-center space-x-2">
                <Bug className="h-4 w-4 text-red-500/60" />
                <span className="text-xs text-soft-white/60 font-inter font-mono">Error Code: {errorCode}</span>
              </div>
            </div>
          )}

          {/* Error Suggestions */}
          <div className="w-full max-w-sm space-y-2">
            <p className="text-xs text-soft-white/50 font-inter mb-3">Common solutions:</p>
            <div className="space-y-2 text-left">
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/60 mt-2 flex-shrink-0"></div>
                <p className="text-xs text-soft-white/60 font-inter">Check your internet connection</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/60 mt-2 flex-shrink-0"></div>
                <p className="text-xs text-soft-white/60 font-inter">Refresh the page and try again</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/60 mt-2 flex-shrink-0"></div>
                <p className="text-xs text-soft-white/60 font-inter">Contact support if the issue persists</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
            {onRetry && (
              <Button
                onClick={handleRetry}
                disabled={isRetrying}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium font-inter"
              >
                {isRetrying ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Retrying...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {retryLabel}
                  </>
                )}
              </Button>
            )}

            {onBack && (
              <Button
                onClick={onBack}
                variant="outline"
                className="flex-1 bg-transparent border-border/40 text-soft-white hover:bg-background/50 font-inter"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {backLabel}
              </Button>
            )}
          </div>

          {/* Report Issue Link */}
          {onReport && (
            <button
              onClick={onReport}
              className="text-xs text-soft-white/40 hover:text-soft-white/60 font-inter underline underline-offset-2 transition-colors"
            >
              {reportLabel}
            </button>
          )}

          {/* Support Message */}
          <div className="pt-2">
            <p className="text-xs text-soft-white/40 font-inter">
              Need help? Contact our support team at support@canistash.app
            </p>
          </div>
        </div>
      </CardContent>

      {/* Subtle error background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-500/5 pointer-events-none"></div>
    </Card>
  )
}
