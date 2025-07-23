"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Bitcoin, Calendar, TrendingUp, Edit3, XCircle, CheckCircle, Play, Clock } from "lucide-react"
import { format } from "date-fns"

interface ContributionHistory {
  id: string
  date: string
  amount: number
  status: "completed" | "pending" | "failed"
  transactionId?: string
}

interface VaultDetailData {
  id: string
  name: string
  type: "individual"
  targetAmount: number
  currentAmount: number
  unit: "btc" | "sats"
  progress: number
  estimatedCompletion: string
  dcaFrequency: string
  dcaAmount: number
  status: "active" | "completed" | "cancelled"
  createdDate: string
  contributions: ContributionHistory[]
}

interface VaultDetailViewProps {
  vault: VaultDetailData
  onBack: () => void
  onEdit: () => void
  onCancel: () => void
}

export default function VaultDetailView({ vault, onBack, onEdit, onCancel }: VaultDetailViewProps) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const formatAmount = (amount: number) => {
    if (vault.unit === "btc") {
      return `₿ ${(amount / 100000000).toFixed(8)}`
    }
    return `${amount.toLocaleString()} sats`
  }

  const getStatusIcon = () => {
    switch (vault.status) {
      case "active":
        return <Play className="h-5 w-5 text-savings-green" />
      case "completed":
        return <CheckCircle className="h-5 w-5 text-savings-green" />
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />
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

  const getContributionStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-savings-green" />
      case "pending":
        return <Clock className="h-4 w-4 text-bitcoin-orange" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getContributionStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-savings-green/10 text-savings-green border-savings-green/20"
      case "pending":
        return "bg-bitcoin-orange/10 text-bitcoin-orange border-bitcoin-orange/20"
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/20"
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Main Info Card */}
      <Card className="bg-card border-border/40">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold font-sora text-card-foreground">{vault.name}</h1>
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                <Badge variant="outline" className="bg-bitcoin-orange/10 text-bitcoin-orange border-bitcoin-orange/20">
                  Individual Vault
                </Badge>
                <Badge variant="outline" className={getStatusColor()}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon()}
                    <span>{vault.status.charAt(0).toUpperCase() + vault.status.slice(1)}</span>
                  </div>
                </Badge>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={onEdit}
                className="bg-transparent border-bitcoin-orange/20 text-bitcoin-orange hover:bg-bitcoin-orange/10 button-hover"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Vault
              </Button>
              {vault.status === "active" && (
                <Button
                  variant="outline"
                  onClick={() => setShowCancelConfirm(true)}
                  className="bg-transparent border-red-500/20 text-red-500 hover:bg-red-500/10 button-hover"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel Goal
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Progress Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Amount Progress */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold font-sora text-card-foreground">Progress Overview</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Amount</span>
                    <div className="flex items-center space-x-2">
                      <Bitcoin className="h-4 w-4 text-bitcoin-orange" />
                      <span className="font-bold text-card-foreground text-lg">
                        {formatAmount(vault.currentAmount)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Target Amount</span>
                    <span className="text-card-foreground">{formatAmount(vault.targetAmount)}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="font-bold text-card-foreground">{vault.progress}%</span>
                    </div>

                    <div className="relative">
                      <Progress value={vault.progress} className="h-3 bg-muted" />
                      <div
                        className="absolute top-0 left-0 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${vault.progress}%`,
                          backgroundColor: "#F7931A",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Remaining Amount */}
              <div className="p-4 rounded-lg bg-muted/30 border border-border/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Remaining to Goal</span>
                  <span className="font-medium text-card-foreground">
                    {formatAmount(vault.targetAmount - vault.currentAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* DCA Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold font-sora text-card-foreground">DCA Strategy</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/20">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-bitcoin-orange" />
                    <div>
                      <p className="font-medium text-card-foreground">DCA Amount</p>
                      <p className="text-sm text-muted-foreground">{vault.dcaFrequency}</p>
                    </div>
                  </div>
                  <span className="font-bold text-card-foreground">{formatAmount(vault.dcaAmount)}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/20">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-savings-green" />
                    <div>
                      <p className="font-medium text-card-foreground">Estimated Completion</p>
                      <p className="text-sm text-muted-foreground">Based on current DCA</p>
                    </div>
                  </div>
                  <span className="font-medium text-card-foreground">{vault.estimatedCompletion}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/20">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-card-foreground">Created</p>
                      <p className="text-sm text-muted-foreground">Vault start date</p>
                    </div>
                  </div>
                  <span className="font-medium text-card-foreground">{vault.createdDate}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contribution History */}
      <Card className="bg-card border-border/40">
        <CardHeader>
          <CardTitle className="font-sora text-xl text-card-foreground">Contribution History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vault.contributions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No contributions yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {vault.contributions.map((contribution) => (
                  <div
                    key={contribution.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/20 hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      {getContributionStatusIcon(contribution.status)}
                      <div>
                        <p className="font-medium text-card-foreground">{formatAmount(contribution.amount)}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(contribution.date), "MMM dd, yyyy 'at' HH:mm")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className={getContributionStatusColor(contribution.status)}>
                        {contribution.status.charAt(0).toUpperCase() + contribution.status.slice(1)}
                      </Badge>
                      {contribution.transactionId && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-card-foreground text-xs button-hover"
                        >
                          View TX
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-card border-border/40 max-w-md w-full">
            <CardHeader>
              <CardTitle className="font-sora text-xl text-card-foreground flex items-center space-x-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <span>Cancel Vault</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Are you sure you want to cancel "{vault.name}"? This action cannot be undone, but your accumulated
                Bitcoin will remain in your account.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 bg-transparent border-border/40 text-card-foreground hover:bg-muted/50 button-hover"
                >
                  Keep Vault
                </Button>
                <Button
                  onClick={() => {
                    onCancel()
                    setShowCancelConfirm(false)
                  }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white button-hover"
                >
                  Cancel Vault
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
