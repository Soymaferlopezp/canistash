"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, Users, Calendar, UserPlus, CheckCircle, XCircle, Play, MoreHorizontal, Bitcoin } from "lucide-react"

export interface VaultData {
  id: string
  name: string
  type: "individual" | "collaborative"
  progress: number
  accumulatedSats: number
  targetSats?: number
  nextContribution: {
    date: string
    frequency: string
    amount: number
  }
  status: "active" | "completed" | "cancelled"
  participants?: {
    count: number
    avatars: string[]
  }
  contributions?: {
    userId: string
    amount: number
    percentage: number
  }[]
}

interface VaultCardProps {
  vault: VaultData
  onInvite?: () => void
  onViewDetails?: () => void
}

export default function VaultCard({ vault, onInvite, onViewDetails }: VaultCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const formatSats = (sats: number) => {
    if (sats >= 100000000) {
      return `₿ ${(sats / 100000000).toFixed(8)}`
    }
    return `${sats.toLocaleString()} sats`
  }

  const getStatusIcon = () => {
    switch (vault.status) {
      case "active":
        return <Play className="h-4 w-4 text-savings-green" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-savings-green" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = () => {
    switch (vault.status) {
      case "active":
        return "bg-savings-green/10 text-savings-green border-savings-green/20"
      case "completed":
        return "bg-savings-green/10 text-savings-green border-savings-green/20"
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20"
    }
  }

  const accentColor = vault.type === "individual" ? "bitcoin-orange" : "savings-green"
  const progressColor = vault.type === "individual" ? "#F7931A" : "#00C896"

  return (
    <Card
      className={`
        relative overflow-hidden transition-all duration-300 cursor-pointer hover-lift
        bg-card border-border/40 hover:border-border/60 hover:shadow-lg
        ${isHovered ? "shadow-xl" : "shadow-md"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onViewDetails}
    >
      {/* Accent border */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: progressColor }} />

      <CardHeader className="pb-4 pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-sora font-semibold text-lg text-card-foreground truncate pr-2">{vault.name}</h3>
              {getStatusIcon()}
            </div>

            <div className="flex items-center space-x-2 flex-wrap gap-1">
              <Badge
                variant="outline"
                className={`
                  text-xs font-medium border
                  ${
                    vault.type === "individual"
                      ? "bg-bitcoin-orange/10 text-bitcoin-orange border-bitcoin-orange/20"
                      : "bg-savings-green/10 text-savings-green border-savings-green/20"
                  }
                `}
              >
                {vault.type === "individual" ? <User className="h-3 w-3 mr-1" /> : <Users className="h-3 w-3 mr-1" />}
                {vault.type === "individual" ? "Individual" : "Collaborative"}
              </Badge>

              <Badge variant="outline" className={getStatusColor()}>
                {vault.status.charAt(0).toUpperCase() + vault.status.slice(1)}
              </Badge>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-card-foreground button-hover flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pb-6">
        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Progress</span>
            <span className="text-sm font-bold text-card-foreground">{vault.progress}%</span>
          </div>

          <div className="relative">
            <Progress value={vault.progress} className="h-2.5 bg-muted" />
            <div
              className="absolute top-0 left-0 h-2.5 rounded-full transition-all duration-500"
              style={{
                width: `${vault.progress}%`,
                backgroundColor: progressColor,
              }}
            />
          </div>
        </div>

        {/* Amount Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Accumulated</span>
            <div className="flex items-center space-x-1">
              <Bitcoin className="h-4 w-4 text-bitcoin-orange" />
              <span className="font-bold text-card-foreground text-sm">{formatSats(vault.accumulatedSats)}</span>
            </div>
          </div>

          {vault.targetSats && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Target</span>
              <span className="text-sm text-muted-foreground">{formatSats(vault.targetSats)}</span>
            </div>
          )}
        </div>

        {/* Next Contribution */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Next DCA</span>
          </div>
          <div className="pl-6 space-y-1">
            <p className="text-sm font-medium text-card-foreground">
              {formatSats(vault.nextContribution.amount)} • {vault.nextContribution.frequency}
            </p>
            <p className="text-xs text-muted-foreground">{vault.nextContribution.date}</p>
          </div>
        </div>

        {/* Collaborative Features */}
        {vault.type === "collaborative" && (
          <div className="space-y-4 pt-4 border-t border-border/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-savings-green" />
                <span className="text-sm text-muted-foreground">{vault.participants?.count} participants</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onInvite?.()
                }}
                className="text-savings-green hover:text-savings-green hover:bg-savings-green/10 button-hover"
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Invite
              </Button>
            </div>

            {/* Participant Avatars */}
            {vault.participants?.avatars && (
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {vault.participants.avatars.slice(0, 3).map((avatar, index) => (
                    <div
                      key={index}
                      className="w-7 h-7 rounded-full bg-gradient-to-br from-bitcoin-orange to-savings-green border-2 border-card flex items-center justify-center"
                    >
                      <span className="text-xs font-bold text-white">{String.fromCharCode(65 + index)}</span>
                    </div>
                  ))}
                  {vault.participants.count > 3 && (
                    <div className="w-7 h-7 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                      <span className="text-xs font-bold text-muted-foreground">+{vault.participants.count - 3}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contribution Breakdown */}
            {vault.contributions && (
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground">Contributions</span>
                <div className="space-y-1">
                  {vault.contributions.slice(0, 2).map((contribution, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">User {index + 1}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-card-foreground">{formatSats(contribution.amount)}</span>
                        <span className="text-muted-foreground">({contribution.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
