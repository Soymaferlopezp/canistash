"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, Calendar, TrendingUp, Clock, Target, Sparkles } from "lucide-react"

interface AIStrategyCardProps {
  strategy: {
    goalName: string
    recommendedAmount: number
    frequency: string
    estimatedTime: string
    riskLevel: string
    reasoning: string
    currency: string
  }
  onApply?: () => void
  showApplyButton?: boolean
  className?: string
}

export default function AIStrategyCard({
  strategy,
  onApply,
  showApplyButton = true,
  className = "",
}: AIStrategyCardProps) {
  const formatAmount = (amount: number, curr: string) => {
    switch (curr) {
      case "btc":
        return `₿ ${amount.toFixed(8)}`
      case "sats":
        return `${amount.toLocaleString()} sats`
      case "usd":
        return `$${amount.toLocaleString()}`
      default:
        return amount.toString()
    }
  }

  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "conservative":
        return "bg-savings-green/10 text-savings-green border-savings-green/20"
      case "balanced":
        return "bg-bitcoin-orange/10 text-bitcoin-orange border-bitcoin-orange/20"
      case "aggressive":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-soft-white/10 text-soft-white border-soft-white/20"
    }
  }

  const getRiskLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "conservative":
        return <div className="w-3 h-3 rounded-full bg-savings-green"></div>
      case "balanced":
        return <div className="w-3 h-3 rounded-full bg-bitcoin-orange"></div>
      case "aggressive":
        return <div className="w-3 h-3 rounded-full bg-red-500"></div>
      default:
        return <div className="w-3 h-3 rounded-full bg-soft-white/50"></div>
    }
  }

  return (
    <Card className={`bg-[#1F2E45] border-border/30 ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-sora text-xl text-soft-white flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-bitcoin-orange to-savings-green flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span>AI Strategy</span>
          </CardTitle>

          <Badge variant="outline" className={getRiskLevelColor(strategy.riskLevel)}>
            <div className="flex items-center space-x-1">
              {getRiskLevelIcon(strategy.riskLevel)}
              <span className="capitalize">{strategy.riskLevel}</span>
            </div>
          </Badge>
        </div>

        <p className="text-soft-white/60 text-sm">Personalized strategy for "{strategy.goalName}"</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* DCA Amount */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-bitcoin-orange/5 to-bitcoin-orange/10 border border-bitcoin-orange/20 p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-bitcoin-orange/10 flex items-center justify-center">
                <Bitcoin className="h-5 w-5 text-bitcoin-orange" />
              </div>
              <div>
                <p className="text-xs font-medium text-soft-white/60 uppercase tracking-wide">DCA Amount</p>
                <p className="text-sm text-soft-white/80">{strategy.frequency}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-soft-white font-sora">
                {formatAmount(strategy.recommendedAmount, strategy.currency)}
              </p>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-3 w-3 text-bitcoin-orange" />
                <span className="text-xs text-bitcoin-orange font-medium">Recommended</span>
              </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-bitcoin-orange/20 to-transparent rounded-full blur-xl"></div>
          </div>

          {/* Frequency */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-savings-green/5 to-savings-green/10 border border-savings-green/20 p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-savings-green/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-savings-green" />
              </div>
              <div>
                <p className="text-xs font-medium text-soft-white/60 uppercase tracking-wide">Frequency</p>
                <p className="text-sm text-soft-white/80">Investment schedule</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-soft-white font-sora">{strategy.frequency}</p>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3 text-savings-green" />
                <span className="text-xs text-savings-green font-medium">Automated</span>
              </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-savings-green/20 to-transparent rounded-full blur-xl"></div>
          </div>

          {/* Timeline */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-soft-white/5 to-soft-white/10 border border-soft-white/20 p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-soft-white/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-soft-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-soft-white/60 uppercase tracking-wide">Timeline</p>
                <p className="text-sm text-soft-white/80">To reach goal</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-soft-white font-sora">{strategy.estimatedTime}</p>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3 text-soft-white/60" />
                <span className="text-xs text-soft-white/60 font-medium">Estimated</span>
              </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-soft-white/10 to-transparent rounded-full blur-xl"></div>
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="relative rounded-xl bg-gradient-to-r from-background/30 to-background/50 border border-border/20 p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-bitcoin-orange/20 to-savings-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="h-4 w-4 text-soft-white" />
            </div>
            <div className="space-y-2 flex-1">
              <h4 className="font-medium text-soft-white font-sora">AI Analysis</h4>
              <p className="text-soft-white/80 text-sm leading-relaxed">{strategy.reasoning}</p>
            </div>
          </div>

          {/* Subtle animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-bitcoin-orange/5 via-transparent to-savings-green/5 rounded-xl opacity-50"></div>
        </div>

        {/* Strategy Summary */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-background/20 border border-border/10">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-bitcoin-orange animate-pulse"></div>
              <span className="text-sm text-soft-white/80">Strategy optimized for</span>
            </div>
            <Badge variant="outline" className={getRiskLevelColor(strategy.riskLevel)}>
              {strategy.riskLevel} risk profile
            </Badge>
          </div>

          <div className="text-right">
            <p className="text-xs text-soft-white/60">Goal: {strategy.goalName}</p>
            <p className="text-xs text-soft-white/40">Generated by AI</p>
          </div>
        </div>

        {/* Apply Button */}
        {showApplyButton && onApply && (
          <button
            onClick={onApply}
            className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-bitcoin-orange to-bitcoin-orange/90 hover:from-bitcoin-orange/90 hover:to-bitcoin-orange text-white font-medium py-4 px-6 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center justify-center space-x-2">
              <Target className="h-5 w-5" />
              <span className="font-sora">Apply as New Vault</span>
            </div>

            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        )}
      </CardContent>
    </Card>
  )
}
