"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Sparkles, Bitcoin } from "lucide-react"
import AIStrategyCard from "./ai-strategy-card"
import LoadingState from "./ui-states/loading-state"
import SuccessState from "./ui-states/success-state"
import ErrorState from "./ui-states/error-state"

interface AIStrategy {
  goalName: string
  recommendedAmount: number
  frequency: string
  estimatedTime: string
  riskLevel: string
  reasoning: string
  currency: string
}

interface AIPlannersProps {
  onCreateVault: (strategy: AIStrategy) => void
}

export default function AIPlanner({ onCreateVault }: AIPlannersProps) {
  const [goalDescription, setGoalDescription] = useState("")
  const [currency, setCurrency] = useState("btc")
  const [riskLevel, setRiskLevel] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [strategy, setStrategy] = useState<AIStrategy | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const generateStrategy = async () => {
    if (!goalDescription.trim() || !riskLevel) {
      setError("Please fill in all fields before generating a strategy")
      return
    }

    setIsGenerating(true)
    setError("")
    setSuccess("")
    setStrategy(null)

    // Simulate AI processing with potential for error
    setTimeout(() => {
      // Simulate random error (20% chance)
      if (Math.random() < 0.2) {
        setError("There was a problem generating your strategy")
        setIsGenerating(false)
        return
      }

      const strategies = {
        conservative: {
          amount: currency === "btc" ? 0.001 : currency === "sats" ? 100000 : 50,
          frequency: "Monthly",
          time: "24 months",
        },
        balanced: {
          amount: currency === "btc" ? 0.002 : currency === "sats" ? 200000 : 100,
          frequency: "Bi-weekly",
          time: "18 months",
        },
        aggressive: {
          amount: currency === "btc" ? 0.005 : currency === "sats" ? 500000 : 250,
          frequency: "Weekly",
          time: "12 months",
        },
      }

      const selectedStrategy = strategies[riskLevel as keyof typeof strategies]

      const newStrategy: AIStrategy = {
        goalName: goalDescription.split(" ").slice(0, 3).join(" ") || "Savings Goal",
        recommendedAmount: selectedStrategy.amount,
        frequency: selectedStrategy.frequency,
        estimatedTime: selectedStrategy.time,
        riskLevel: riskLevel,
        reasoning: `Based on your ${riskLevel} risk profile and goal "${goalDescription}", I recommend a ${selectedStrategy.frequency.toLowerCase()} DCA strategy. This approach balances consistent accumulation with your risk tolerance.`,
        currency: currency,
      }

      setStrategy(newStrategy)
      setIsGenerating(false)
    }, 2000)
  }

  const applyStrategy = () => {
    if (strategy) {
      onCreateVault(strategy)
      setSuccess("Your vault was successfully created 🎉")
      setTimeout(() => {
        setSuccess("")
        setStrategy(null)
        setGoalDescription("")
        setRiskLevel("")
      }, 3000)
    }
  }

  const retryGeneration = () => {
    setError("")
    generateStrategy()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-sora text-foreground flex items-center space-x-3">
          <Brain className="h-8 w-8 text-savings-green" />
          <span>AI Planner</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Describe your savings goal and get a personalized Bitcoin investment strategy powered by AI.
        </p>
      </div>

      {/* Success State */}
      {success && (
        <SuccessState
          message={success}
          description="Your new vault is ready and DCA automation has been activated. Start saving Bitcoin with your personalized strategy!"
          actionLabel="View My Vaults"
          onAction={() => console.log("Navigate to vaults")}
          autoHide={true}
          autoHideDelay={5000}
          onAutoHide={() => setSuccess("")}
        />
      )}

      {/* Error State */}
      {error && (
        <ErrorState
          message={error}
          description="Our AI service is temporarily unavailable. Please check your connection and try again."
          errorCode="AI_GEN_001"
          showErrorCode={true}
          onRetry={retryGeneration}
          onBack={() => setError("")}
        />
      )}

      {/* Loading State */}
      {isGenerating && (
        <LoadingState
          title="Generating Strategy"
          message="Our AI is analyzing your goal and creating a personalized Bitcoin savings strategy..."
          type="ai"
          showSkeleton={false}
        />
      )}

      {/* Input Form - Hide when loading or showing success/error */}
      {!isGenerating && !success && !error && (
        <Card className="bg-[#1F2E45] border-border/30">
          <CardHeader>
            <CardTitle className="font-sora text-xl text-soft-white flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-bitcoin-orange" />
              <span>Describe Your Goal</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Goal Description */}
            <div className="space-y-2">
              <Label htmlFor="goalDescription" className="text-sm font-medium text-soft-white">
                What do you want to save for? *
              </Label>
              <Textarea
                id="goalDescription"
                placeholder="e.g., I want to save for a house down payment in 2 years, or I'm planning a vacation to Japan next summer, or I want to build an emergency fund..."
                value={goalDescription}
                onChange={(e) => setGoalDescription(e.target.value)}
                className="min-h-[120px] bg-background/50 border-border/40 text-soft-white placeholder:text-soft-white/40 focus:border-savings-green focus:ring-1 focus:ring-savings-green/20"
              />
            </div>

            {/* Currency and Risk Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-soft-white">Preferred Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="bg-background/50 border-border/40 text-soft-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F2E45] border-border/40">
                    <SelectItem value="btc" className="text-soft-white">
                      <div className="flex items-center space-x-2">
                        <Bitcoin className="h-4 w-4 text-bitcoin-orange" />
                        <span>BTC</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="sats" className="text-soft-white">
                      <div className="flex items-center space-x-2">
                        <Bitcoin className="h-4 w-4 text-bitcoin-orange" />
                        <span>Sats</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="usd" className="text-soft-white">
                      <div className="flex items-center space-x-2">
                        <span className="text-savings-green">$</span>
                        <span>USD</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-soft-white">Risk Level *</Label>
                <Select value={riskLevel} onValueChange={setRiskLevel}>
                  <SelectTrigger className="bg-background/50 border-border/40 text-soft-white">
                    <SelectValue placeholder="Select risk tolerance" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F2E45] border-border/40">
                    <SelectItem value="conservative" className="text-soft-white">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-savings-green"></div>
                        <span>Conservative</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="balanced" className="text-soft-white">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-bitcoin-orange"></div>
                        <span>Balanced</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="aggressive" className="text-soft-white">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Aggressive</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generateStrategy}
              disabled={!goalDescription.trim() || !riskLevel}
              className="w-full bg-savings-green hover:bg-savings-green/90 text-white font-medium"
            >
              <Brain className="h-4 w-4 mr-2" />
              Generate Strategy
            </Button>
          </CardContent>
        </Card>
      )}

      {/* AI Strategy Output */}
      {strategy && !success && (
        <AIStrategyCard
          strategy={strategy}
          onApply={applyStrategy}
          showApplyButton={true}
          className="animate-in slide-in-from-bottom-4 duration-500"
        />
      )}
    </div>
  )
}
