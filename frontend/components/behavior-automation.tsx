"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Zap, Plus, TrendingDown, Target, Calendar, CheckCircle, Pause, Play } from "lucide-react"
import { format } from "date-fns"

interface AutomationRule {
  id: string
  type: "spending" | "habit"
  description: string
  condition: string
  action: string
  amount: number
  isActive: boolean
  createdDate: string
}

interface AutomationHistory {
  id: string
  ruleId: string
  date: string
  description: string
  amount: number
  status: "completed" | "failed"
}

export default function BehaviorAutomation() {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: "1",
      type: "spending",
      description: "Coffee savings rule",
      condition: "Spend less than $20 on coffee",
      action: "Save to Emergency Fund",
      amount: 50000, // sats
      isActive: true,
      createdDate: "2024-01-01T00:00:00Z",
    },
    {
      id: "2",
      type: "habit",
      description: "Workout reward",
      condition: "Complete daily workout",
      action: "Save to Vacation Fund",
      amount: 25000, // sats
      isActive: false,
      createdDate: "2024-01-05T00:00:00Z",
    },
  ])

  const [history] = useState<AutomationHistory[]>([
    {
      id: "1",
      ruleId: "1",
      date: "2024-01-08T10:30:00Z",
      description: "Spent $15 on coffee → Saved 50,000 sats",
      amount: 50000,
      status: "completed",
    },
    {
      id: "2",
      ruleId: "2",
      date: "2024-01-07T18:45:00Z",
      description: "Completed workout → Saved 25,000 sats",
      amount: 25000,
      status: "completed",
    },
    {
      id: "3",
      ruleId: "1",
      date: "2024-01-06T12:15:00Z",
      description: "Spent $25 on coffee → Rule not triggered",
      amount: 0,
      status: "failed",
    },
  ])

  const [showAddRule, setShowAddRule] = useState(false)
  const [newRuleType, setNewRuleType] = useState<"spending" | "habit">("spending")

  const toggleRule = (ruleId: string) => {
    setRules((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule)))
  }

  const formatSats = (sats: number) => {
    return `${sats.toLocaleString()} sats`
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-sora text-foreground flex items-center space-x-3">
          <Zap className="h-8 w-8 text-bitcoin-orange" />
          <span>Behavior-Based Automation</span>
        </h1>
        <p className="text-muted-foreground mt-2">Automate your savings through your behavior and daily habits.</p>
      </div>

      {/* Introduction */}
      <Card className="bg-[#1F2E45] border-border/30">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-bitcoin-orange/10 flex items-center justify-center flex-shrink-0">
              <Zap className="h-6 w-6 text-bitcoin-orange" />
            </div>
            <div className="space-y-2">
              <h3 className="font-sora font-semibold text-soft-white">Automate your savings through your behavior</h3>
              <p className="text-soft-white/80 text-sm leading-relaxed">
                Set up rules that automatically save Bitcoin based on your spending habits or completed activities. The
                more you stick to your goals, the more you save!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automation Rules */}
      <Card className="bg-[#1F2E45] border-border/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-sora text-xl text-soft-white">Automation Rules</CardTitle>
            <Button
              onClick={() => setShowAddRule(!showAddRule)}
              variant="outline"
              className="bg-transparent border-bitcoin-orange/20 text-bitcoin-orange hover:bg-bitcoin-orange/10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Rule
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Add New Rule Form */}
          {showAddRule && (
            <Card className="bg-background/30 border-border/20">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center space-x-4">
                  <Button
                    variant={newRuleType === "spending" ? "default" : "outline"}
                    onClick={() => setNewRuleType("spending")}
                    className={
                      newRuleType === "spending"
                        ? "bg-bitcoin-orange text-white"
                        : "bg-transparent border-border/40 text-soft-white"
                    }
                  >
                    <TrendingDown className="h-4 w-4 mr-2" />
                    Spending Rule
                  </Button>
                  <Button
                    variant={newRuleType === "habit" ? "default" : "outline"}
                    onClick={() => setNewRuleType("habit")}
                    className={
                      newRuleType === "habit"
                        ? "bg-savings-green text-white"
                        : "bg-transparent border-border/40 text-soft-white"
                    }
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Habit Rule
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-soft-white">
                      {newRuleType === "spending" ? "If I spend less than" : "If I complete"}
                    </Label>
                    <Input
                      placeholder={newRuleType === "spending" ? "$50 on dining out" : "30 minutes of exercise"}
                      className="bg-background/50 border-border/40 text-soft-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-soft-white">Then save</Label>
                    <Input placeholder="100,000 sats" className="bg-background/50 border-border/40 text-soft-white" />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="bg-savings-green hover:bg-savings-green/90 text-white">
                    Create Rule
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowAddRule(false)}
                    className="bg-transparent border-border/40 text-soft-white"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Existing Rules */}
          <div className="space-y-3">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between p-4 rounded-lg bg-background/30 border border-border/20"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      rule.type === "spending" ? "bg-bitcoin-orange/10" : "bg-savings-green/10"
                    }`}
                  >
                    {rule.type === "spending" ? (
                      <TrendingDown
                        className={`h-5 w-5 ${rule.type === "spending" ? "text-bitcoin-orange" : "text-savings-green"}`}
                      />
                    ) : (
                      <Target
                        className={`h-5 w-5 ${rule.type === "spending" ? "text-bitcoin-orange" : "text-savings-green"}`}
                      />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-soft-white">{rule.description}</p>
                      <Badge
                        variant="outline"
                        className={
                          rule.isActive
                            ? "bg-savings-green/10 text-savings-green border-savings-green/20"
                            : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                        }
                      >
                        {rule.isActive ? (
                          <>
                            <Play className="h-3 w-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <Pause className="h-3 w-3 mr-1" />
                            Paused
                          </>
                        )}
                      </Badge>
                    </div>
                    <p className="text-sm text-soft-white/60">
                      {rule.condition} → Save {formatSats(rule.amount)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Switch checked={rule.isActive} onCheckedChange={() => toggleRule(rule.id)} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Automation History */}
      <Card className="bg-[#1F2E45] border-border/30">
        <CardHeader>
          <CardTitle className="font-sora text-xl text-soft-white flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-savings-green" />
            <span>Automation History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 rounded-lg bg-background/30 border border-border/20"
              >
                <div className="flex items-center space-x-3">
                  {entry.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-savings-green" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-400"></div>
                  )}
                  <div>
                    <p className="font-medium text-soft-white">{entry.description}</p>
                    <p className="text-sm text-soft-white/60">
                      {format(new Date(entry.date), "MMM dd, yyyy 'at' HH:mm")}
                    </p>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className={
                    entry.status === "completed"
                      ? "bg-savings-green/10 text-savings-green border-savings-green/20"
                      : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                  }
                >
                  {entry.status === "completed" ? "Completed" : "Not Triggered"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
