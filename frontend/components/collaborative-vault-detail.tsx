"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bitcoin, Users, UserPlus, QrCode, Copy, Lock, CheckCircle, Play, Clock, XCircle, Trophy } from "lucide-react"
import { format } from "date-fns"

interface Participant {
  id: string
  name: string
  avatar?: string
  totalContributed: number
  percentage: number
  isOwner: boolean
  joinedDate: string
}

interface CollaborativeContribution {
  id: string
  participantId: string
  participantName: string
  date: string
  amount: number
  status: "completed" | "pending" | "failed"
  transactionId?: string
}

interface CollaborativeVaultData {
  id: string
  name: string
  type: "collaborative"
  targetAmount: number
  currentAmount: number
  unit: "btc" | "sats"
  progress: number
  status: "active" | "locked" | "completed"
  createdDate: string
  participants: Participant[]
  contributions: CollaborativeContribution[]
  inviteCode: string
  currentUserIsOwner: boolean
  currentUserId: string
}

interface CollaborativeVaultDetailProps {
  vault: CollaborativeVaultData
  onBack: () => void
  onContribute: () => void
  onInvite: () => void
  onLockVault: () => void
  onFinishGoal: () => void
}

export default function CollaborativeVaultDetail({
  vault,
  onBack,
  onContribute,
  onInvite,
  onLockVault,
  onFinishGoal,
}: CollaborativeVaultDetailProps) {
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showLockConfirm, setShowLockConfirm] = useState(false)
  const [inviteLinkCopied, setInviteLinkCopied] = useState(false)

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
      case "locked":
        return <Lock className="h-5 w-5 text-gray-400" />
      case "completed":
        return <Trophy className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusColor = () => {
    switch (vault.status) {
      case "active":
        return "bg-savings-green/10 text-savings-green border-savings-green/20"
      case "locked":
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
      case "completed":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
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

  const copyInviteLink = () => {
    const inviteLink = `https://canistash.app/invite/${vault.inviteCode}`
    navigator.clipboard.writeText(inviteLink)
    setInviteLinkCopied(true)
    setTimeout(() => setInviteLinkCopied(false), 2000)
  }

  const currentUserParticipant = vault.participants.find((p) => p.id === vault.currentUserId)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Main Info Card */}
      <Card className="bg-card border-border/40">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold font-sora text-card-foreground">{vault.name}</h1>
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                <Badge variant="outline" className="bg-savings-green/10 text-savings-green border-savings-green/20">
                  <Users className="h-3 w-3 mr-1" />
                  Collaborative Vault
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
              {vault.status === "active" && currentUserParticipant && (
                <Button
                  onClick={onContribute}
                  style={{ backgroundColor: "#F7931A" }}
                  className="text-white hover:opacity-90 font-medium button-hover"
                >
                  <Bitcoin className="h-4 w-4 mr-2" />
                  Contribute
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => setShowInviteModal(true)}
                className="bg-transparent border-savings-green/20 text-savings-green hover:bg-savings-green/10 button-hover"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite
              </Button>

              {vault.currentUserIsOwner && vault.status === "active" && (
                <Button
                  variant="outline"
                  onClick={() => setShowLockConfirm(true)}
                  className="bg-transparent border-gray-500/20 text-gray-400 hover:bg-gray-500/10 button-hover"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Lock Vault
                </Button>
              )}

              {vault.currentUserIsOwner && vault.progress >= 100 && vault.status !== "completed" && (
                <Button
                  onClick={onFinishGoal}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium button-hover"
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Finish Goal
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Progress Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Group Progress */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold font-sora text-card-foreground">Group Progress</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Raised</span>
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
                          backgroundColor: "#00C896",
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

            {/* Participants Overview */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold font-sora text-card-foreground">Participants</h3>
                <Badge variant="outline" className="bg-savings-green/10 text-savings-green border-savings-green/20">
                  {vault.participants.length} members
                </Badge>
              </div>

              <div className="space-y-3">
                {vault.participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/20"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-br from-bitcoin-orange to-savings-green text-white text-sm">
                          {participant.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-card-foreground">{participant.name}</p>
                          {participant.isOwner && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-bitcoin-orange/10 text-bitcoin-orange border-bitcoin-orange/20"
                            >
                              Owner
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Joined {format(new Date(participant.joinedDate), "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-medium text-card-foreground">{formatAmount(participant.totalContributed)}</p>
                      <p className="text-xs text-muted-foreground">{participant.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Individual Contributions Visualization */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-sora text-card-foreground">Contribution Breakdown</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Individual contributions</span>
                <span>Percentage of total</span>
              </div>

              <div className="space-y-2">
                {vault.participants.map((participant, index) => (
                  <div key={participant.id} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-card-foreground">{participant.name}</span>
                      <span className="text-muted-foreground">{participant.percentage}%</span>
                    </div>
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${participant.percentage}%`,
                          backgroundColor: index % 2 === 0 ? "#F7931A" : "#00C896",
                        }}
                      />
                    </div>
                  </div>
                ))}
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
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-card-foreground">{formatAmount(contribution.amount)}</p>
                          <span className="text-sm text-muted-foreground">by {contribution.participantName}</span>
                        </div>
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

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-card border-border/40 max-w-md w-full">
            <CardHeader>
              <CardTitle className="font-sora text-xl text-card-foreground flex items-center space-x-2">
                <UserPlus className="h-5 w-5 text-savings-green" />
                <span>Invite Participants</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto bg-white rounded-lg flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-black" />
                </div>
                <p className="text-sm text-muted-foreground">Scan QR code or share the invite link below</p>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-muted/30 rounded-lg border border-border/20">
                  <p className="text-xs text-muted-foreground mb-1">Invite Link</p>
                  <p className="text-sm text-card-foreground font-mono break-all">
                    https://canistash.app/invite/{vault.inviteCode}
                  </p>
                </div>

                <Button
                  onClick={copyInviteLink}
                  className="w-full bg-savings-green hover:bg-savings-green/90 text-white button-hover"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {inviteLinkCopied ? "Copied!" : "Copy Link"}
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowInviteModal(false)}
                className="w-full bg-transparent border-border/40 text-card-foreground hover:bg-muted/50 button-hover"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Lock Confirmation Modal */}
      {showLockConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-card border-border/40 max-w-md w-full">
            <CardHeader>
              <CardTitle className="font-sora text-xl text-card-foreground flex items-center space-x-2">
                <Lock className="h-5 w-5 text-gray-400" />
                <span>Lock Vault</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Are you sure you want to lock "{vault.name}"? This will prevent new contributions and participants from
                joining.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowLockConfirm(false)}
                  className="flex-1 bg-transparent border-border/40 text-card-foreground hover:bg-muted/50 button-hover"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    onLockVault()
                    setShowLockConfirm(false)
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white button-hover"
                >
                  Lock Vault
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
