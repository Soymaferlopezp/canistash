"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bitcoin, TrendingUp, Wallet, Users } from "lucide-react"
import VaultCard, { type VaultData } from "@/components/vault-card"
import { Button } from "@/components/ui/button"
import CreateVaultForm from "@/components/create-vault-form"
import VaultDetailView from "@/components/vault-detail-view"
import CollaborativeVaultDetail from "@/components/collaborative-vault-detail"
import AIPlanner from "@/components/ai-planner"
import BehaviorAutomation from "@/components/behavior-automation"
import Settings from "@/components/settings"

// Add sample collaborative vault detail data
const sampleCollaborativeVaultDetail = {
  id: "2",
  name: "Vacation Fund",
  type: "collaborative" as const,
  targetAmount: 20000000, // sats
  currentAmount: 8500000, // sats
  unit: "sats" as const,
  progress: 42,
  status: "active" as const,
  createdDate: "November 15, 2023",
  participants: [
    {
      id: "user1",
      name: "Alice Johnson",
      totalContributed: 3500000,
      percentage: 41,
      isOwner: true,
      joinedDate: "2023-11-15T00:00:00Z",
    },
    {
      id: "user2",
      name: "Bob Smith",
      totalContributed: 2800000,
      percentage: 33,
      isOwner: false,
      joinedDate: "2023-11-20T00:00:00Z",
    },
    {
      id: "user3",
      name: "Carol Davis",
      totalContributed: 2200000,
      percentage: 26,
      isOwner: false,
      joinedDate: "2023-12-01T00:00:00Z",
    },
  ],
  contributions: [
    {
      id: "1",
      participantId: "user1",
      participantName: "Alice Johnson",
      date: "2024-01-08T10:30:00Z",
      amount: 750000,
      status: "completed" as const,
      transactionId: "tx_collab_abc123",
    },
    {
      id: "2",
      participantId: "user2",
      participantName: "Bob Smith",
      date: "2024-01-05T14:15:00Z",
      amount: 600000,
      status: "completed" as const,
      transactionId: "tx_collab_def456",
    },
    {
      id: "3",
      participantId: "user3",
      participantName: "Carol Davis",
      date: "2024-01-03T09:45:00Z",
      amount: 500000,
      status: "pending" as const,
    },
    {
      id: "4",
      participantId: "user1",
      participantName: "Alice Johnson",
      date: "2023-12-28T16:20:00Z",
      amount: 750000,
      status: "completed" as const,
      transactionId: "tx_collab_ghi789",
    },
  ],
  inviteCode: "VACATION2024",
  currentUserIsOwner: true,
  currentUserId: "user1",
}

// Add sample vault detail data
const sampleVaultDetail = {
  id: "1",
  name: "Emergency Fund",
  type: "individual" as const,
  targetAmount: 23000000, // sats
  currentAmount: 15000000, // sats
  unit: "sats" as const,
  progress: 65,
  estimatedCompletion: "March 15, 2024",
  dcaFrequency: "Weekly",
  dcaAmount: 500000, // sats
  status: "active" as const,
  createdDate: "October 1, 2023",
  contributions: [
    {
      id: "1",
      date: "2024-01-08T10:30:00Z",
      amount: 500000,
      status: "completed" as const,
      transactionId: "tx_abc123",
    },
    {
      id: "2",
      date: "2024-01-01T10:30:00Z",
      amount: 500000,
      status: "completed" as const,
      transactionId: "tx_def456",
    },
    {
      id: "3",
      date: "2023-12-25T10:30:00Z",
      amount: 500000,
      status: "completed" as const,
      transactionId: "tx_ghi789",
    },
    {
      id: "4",
      date: "2023-12-18T10:30:00Z",
      amount: 500000,
      status: "pending" as const,
    },
    {
      id: "5",
      date: "2023-12-11T10:30:00Z",
      amount: 500000,
      status: "failed" as const,
    },
  ],
}

// Add this sample data after the imports
const sampleVaults: VaultData[] = [
  {
    id: "1",
    name: "Emergency Fund",
    type: "individual",
    progress: 65,
    accumulatedSats: 15000000,
    targetSats: 23000000,
    nextContribution: {
      date: "Jan 15, 2024",
      frequency: "Weekly",
      amount: 500000,
    },
    status: "active",
  },
  {
    id: "2",
    name: "Vacation Fund",
    type: "collaborative",
    progress: 42,
    accumulatedSats: 8500000,
    targetSats: 20000000,
    nextContribution: {
      date: "Jan 12, 2024",
      frequency: "Bi-weekly",
      amount: 750000,
    },
    status: "active",
    participants: {
      count: 3,
      avatars: ["A", "B", "C"],
    },
    contributions: [
      { userId: "user1", amount: 3500000, percentage: 41 },
      { userId: "user2", amount: 2800000, percentage: 33 },
      { userId: "user3", amount: 2200000, percentage: 26 },
    ],
  },
  {
    id: "3",
    name: "House Down Payment",
    type: "individual",
    progress: 28,
    accumulatedSats: 45000000,
    targetSats: 160000000,
    nextContribution: {
      date: "Jan 20, 2024",
      frequency: "Monthly",
      amount: 2000000,
    },
    status: "active",
  },
  {
    id: "4",
    name: "Wedding Fund",
    type: "collaborative",
    progress: 100,
    accumulatedSats: 12000000,
    targetSats: 12000000,
    nextContribution: {
      date: "Completed",
      frequency: "N/A",
      amount: 0,
    },
    status: "completed",
    participants: {
      count: 2,
      avatars: ["A", "B"],
    },
    contributions: [
      { userId: "user1", amount: 6000000, percentage: 50 },
      { userId: "user2", amount: 6000000, percentage: 50 },
    ],
  },
]

interface DashboardProps {
  isDark: boolean
  toggleTheme: () => void
  onLogout: () => void
}

export default function Dashboard({ isDark, toggleTheme, onLogout }: DashboardProps) {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [selectedVaultId, setSelectedVaultId] = useState<string | null>(null)
  const [selectedVaultType, setSelectedVaultType] = useState<"individual" | "collaborative" | null>(null)

  const renderContent = () => {
    // Show vault detail view if a vault is selected
    if (selectedVaultId && activeSection === "vault-detail") {
      if (selectedVaultType === "individual") {
        return (
          <VaultDetailView
            vault={sampleVaultDetail}
            onBack={() => {
              setSelectedVaultId(null)
              setSelectedVaultType(null)
              setActiveSection("dashboard")
            }}
            onEdit={() => {
              console.log("Edit vault:", selectedVaultId)
            }}
            onCancel={() => {
              console.log("Cancel vault:", selectedVaultId)
              setSelectedVaultId(null)
              setSelectedVaultType(null)
              setActiveSection("dashboard")
            }}
          />
        )
      } else if (selectedVaultType === "collaborative") {
        return (
          <CollaborativeVaultDetail
            vault={sampleCollaborativeVaultDetail}
            onBack={() => {
              setSelectedVaultId(null)
              setSelectedVaultType(null)
              setActiveSection("dashboard")
            }}
            onContribute={() => {
              console.log("Contribute to vault:", selectedVaultId)
            }}
            onInvite={() => {
              console.log("Invite to vault:", selectedVaultId)
            }}
            onLockVault={() => {
              console.log("Lock vault:", selectedVaultId)
            }}
            onFinishGoal={() => {
              console.log("Finish goal:", selectedVaultId)
            }}
          />
        )
      }
    }

    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold font-sora text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's your Bitcoin savings overview.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <Card className="border-border/50 bg-card hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Total Balance</CardTitle>
                  <Bitcoin className="h-4 w-4 text-bitcoin-orange" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">₿ 0.80500</div>
                  <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Active Vaults</CardTitle>
                  <Wallet className="h-4 w-4 text-savings-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">4</div>
                  <p className="text-xs text-muted-foreground">3 active, 1 completed</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Monthly DCA</CardTitle>
                  <TrendingUp className="h-4 w-4 text-bitcoin-orange" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">$500</div>
                  <p className="text-xs text-muted-foreground">Next purchase in 5 days</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Collaborators</CardTitle>
                  <Users className="h-4 w-4 text-savings-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">3</div>
                  <p className="text-xs text-muted-foreground">In shared vaults</p>
                </CardContent>
              </Card>
            </div>

            {/* Vault Cards */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-bold font-sora text-foreground">Your Vaults</h2>
                <Button
                  variant="outline"
                  className="border-bitcoin-orange/20 text-bitcoin-orange hover:bg-bitcoin-orange/10 bg-transparent button-hover self-start sm:self-auto"
                >
                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {sampleVaults.map((vault) => (
                  <VaultCard
                    key={vault.id}
                    vault={vault}
                    onInvite={() => console.log(`Invite to ${vault.name}`)}
                    onViewDetails={() => {
                      setSelectedVaultId(vault.id)
                      setSelectedVaultType(vault.type)
                      setActiveSection("vault-detail")
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )

      case "create-vault":
        return (
          <CreateVaultForm
            onSubmit={(data) => {
              console.log("Creating vault with data:", data)
              setActiveSection("dashboard")
            }}
            onCancel={() => setActiveSection("dashboard")}
          />
        )

      case "my-vaults":
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold font-sora text-foreground">My Vaults</h1>
              <p className="text-muted-foreground">Manage your Bitcoin savings vaults and track progress.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {sampleVaults.map((vault) => (
                <VaultCard
                  key={vault.id}
                  vault={vault}
                  onInvite={() => console.log(`Invite to ${vault.name}`)}
                  onViewDetails={() => {
                    setSelectedVaultId(vault.id)
                    setSelectedVaultType(vault.type)
                    setActiveSection("vault-detail")
                  }}
                />
              ))}
            </div>
          </div>
        )

      case "ai-planner":
        return (
          <AIPlanner
            onCreateVault={(strategy) => {
              console.log("Creating vault from AI strategy:", strategy)
            }}
          />
        )

      case "automation":
        return <BehaviorAutomation />

      case "settings":
        return <Settings isDark={isDark} toggleTheme={toggleTheme} />

      default:
        return null
    }
  }

  return (
    <div className={`h-screen flex ${isDark ? "dark" : ""}`}>
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onLogout={onLogout}
      />

      {/* Main content - scrollable area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-full">{renderContent()}</div>
      </main>
    </div>
  )
}
