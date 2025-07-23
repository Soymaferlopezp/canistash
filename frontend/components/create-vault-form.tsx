"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, User, Users, Bitcoin, Shield, Info } from "lucide-react"
import { format } from "date-fns"

interface CreateVaultFormData {
  goalName: string
  vaultType: "individual" | "collaborative" | ""
  targetAmount: string
  targetUnit: "btc" | "sats"
  targetDate: Date | undefined
  dcaFrequency: string
  isPrivate: boolean
}

interface CreateVaultFormProps {
  onSubmit: (data: CreateVaultFormData) => void
  onCancel: () => void
}

export default function CreateVaultForm({ onSubmit, onCancel }: CreateVaultFormProps) {
  const [formData, setFormData] = useState<CreateVaultFormData>({
    goalName: "",
    vaultType: "",
    targetAmount: "",
    targetUnit: "btc",
    targetDate: undefined,
    dcaFrequency: "",
    isPrivate: true,
  })

  const [errors, setErrors] = useState<Partial<CreateVaultFormData>>({})
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const validateForm = () => {
    const newErrors: Partial<CreateVaultFormData> = {}

    if (!formData.goalName.trim()) {
      newErrors.goalName = "Goal name is required"
    }

    if (!formData.vaultType) {
      newErrors.vaultType = "Please select a vault type"
    }

    if (!formData.targetAmount || Number.parseFloat(formData.targetAmount) <= 0) {
      newErrors.targetAmount = "Please enter a valid target amount"
    }

    if (!formData.targetDate) {
      newErrors.targetDate = "Please select a target date"
    }

    if (!formData.dcaFrequency) {
      newErrors.dcaFrequency = "Please select DCA frequency"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const updateFormData = (field: keyof CreateVaultFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const accentColor = formData.vaultType === "individual" ? "bitcoin-orange" : "savings-green"
  const accentHex = formData.vaultType === "individual" ? "#F7931A" : "#00C896"

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-sora text-foreground">Create New Vault</h1>
        <p className="text-muted-foreground">Set up a new Bitcoin savings goal with automated DCA strategy.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Form Card */}
        <Card className="bg-[#1F2E45] border-border/30">
          <CardHeader>
            <CardTitle className="font-sora text-xl text-soft-white flex items-center space-x-2">
              <Bitcoin className="h-5 w-5 text-bitcoin-orange" />
              <span>Vault Configuration</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Goal Name */}
            <div className="space-y-2">
              <Label htmlFor="goalName" className="text-sm font-medium text-soft-white">
                Goal Name *
              </Label>
              <Input
                id="goalName"
                placeholder="e.g., Emergency Fund, Vacation Savings, House Down Payment"
                value={formData.goalName}
                onChange={(e) => updateFormData("goalName", e.target.value)}
                className={`
                  bg-background/50 border-border/40 text-soft-white placeholder:text-soft-white/40
                  focus:border-${accentColor} focus:ring-1 focus:ring-${accentColor}/20
                  ${errors.goalName ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
                `}
              />
              {errors.goalName && <p className="text-sm text-red-500">{errors.goalName}</p>}
            </div>

            {/* Vault Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-soft-white">Vault Type *</Label>
              <Select
                value={formData.vaultType}
                onValueChange={(value: "individual" | "collaborative") => updateFormData("vaultType", value)}
              >
                <SelectTrigger
                  className={`
                    bg-background/50 border-border/40 text-soft-white
                    focus:border-${accentColor} focus:ring-1 focus:ring-${accentColor}/20
                    ${errors.vaultType ? "border-red-500" : ""}
                  `}
                >
                  <SelectValue placeholder="Choose vault type" />
                </SelectTrigger>
                <SelectContent className="bg-[#1F2E45] border-border/40">
                  <SelectItem value="individual" className="text-soft-white hover:bg-bitcoin-orange/10">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-bitcoin-orange" />
                      <span>Individual</span>
                      <Badge
                        variant="outline"
                        className="ml-2 bg-bitcoin-orange/10 text-bitcoin-orange border-bitcoin-orange/20"
                      >
                        Private
                      </Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="collaborative" className="text-soft-white hover:bg-savings-green/10">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-savings-green" />
                      <span>Collaborative</span>
                      <Badge
                        variant="outline"
                        className="ml-2 bg-savings-green/10 text-savings-green border-savings-green/20"
                      >
                        Shared
                      </Badge>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.vaultType && <p className="text-sm text-red-500">{errors.vaultType}</p>}
            </div>

            {/* Target Amount */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="targetAmount" className="text-sm font-medium text-soft-white">
                  Target Amount *
                </Label>
                <Input
                  id="targetAmount"
                  type="number"
                  step="any"
                  placeholder="0.00"
                  value={formData.targetAmount}
                  onChange={(e) => updateFormData("targetAmount", e.target.value)}
                  className={`
                    bg-background/50 border-border/40 text-soft-white placeholder:text-soft-white/40
                    focus:border-${accentColor} focus:ring-1 focus:ring-${accentColor}/20
                    ${errors.targetAmount ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
                  `}
                />
                {errors.targetAmount && <p className="text-sm text-red-500">{errors.targetAmount}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-soft-white">Unit</Label>
                <Select
                  value={formData.targetUnit}
                  onValueChange={(value: "btc" | "sats") => updateFormData("targetUnit", value)}
                >
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
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Target Date */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-soft-white">Target Date *</Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`
                      w-full justify-start text-left font-normal bg-background/50 border-border/40 text-soft-white
                      hover:bg-background/70 focus:border-${accentColor} focus:ring-1 focus:ring-${accentColor}/20
                      ${errors.targetDate ? "border-red-500" : ""}
                      ${!formData.targetDate && "text-soft-white/40"}
                    `}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.targetDate ? format(formData.targetDate, "PPP") : "Pick a target date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#1F2E45] border-border/40" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.targetDate}
                    onSelect={(date) => {
                      updateFormData("targetDate", date)
                      setIsCalendarOpen(false)
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="text-soft-white"
                  />
                </PopoverContent>
              </Popover>
              {errors.targetDate && <p className="text-sm text-red-500">{errors.targetDate}</p>}
            </div>

            {/* DCA Frequency */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-soft-white">DCA Frequency *</Label>
              <Select value={formData.dcaFrequency} onValueChange={(value) => updateFormData("dcaFrequency", value)}>
                <SelectTrigger
                  className={`
                    bg-background/50 border-border/40 text-soft-white
                    focus:border-${accentColor} focus:ring-1 focus:ring-${accentColor}/20
                    ${errors.dcaFrequency ? "border-red-500" : ""}
                  `}
                >
                  <SelectValue placeholder="How often do you want to invest?" />
                </SelectTrigger>
                <SelectContent className="bg-[#1F2E45] border-border/40">
                  <SelectItem value="weekly" className="text-soft-white">
                    Weekly
                  </SelectItem>
                  <SelectItem value="biweekly" className="text-soft-white">
                    Bi-weekly
                  </SelectItem>
                  <SelectItem value="monthly" className="text-soft-white">
                    Monthly
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.dcaFrequency && <p className="text-sm text-red-500">{errors.dcaFrequency}</p>}
            </div>

            {/* Privacy Settings */}
            <div className="space-y-4 p-4 rounded-lg bg-background/30 border border-border/20">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-savings-green" />
                <span className="font-medium text-soft-white">Privacy Settings</span>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="privacy"
                  checked={formData.isPrivate}
                  onCheckedChange={(checked) => updateFormData("isPrivate", checked)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="privacy" className="text-sm font-medium text-soft-white cursor-pointer">
                    This vault will be private
                  </Label>
                  <div className="flex items-start space-x-2">
                    <Info className="h-4 w-4 text-soft-white/60 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-soft-white/60 leading-relaxed">
                      Private vaults are only visible to you
                      {formData.vaultType === "collaborative" ? " and invited participants" : ""}. Your transaction
                      history and balance remain completely confidential on the Internet Computer blockchain.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="bg-transparent border-border/40 text-soft-white hover:bg-background/50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            style={{ backgroundColor: "#F7931A" }}
            className="text-white hover:opacity-90 font-medium px-8"
          >
            Create Vault
          </Button>
        </div>
      </form>
    </div>
  )
}
