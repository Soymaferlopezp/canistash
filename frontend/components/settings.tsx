"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useUser } from "@/hooks/useUser"
import { Badge } from "@/components/ui/badge"
import {
  SettingsIcon,
  User,
  Globe,
  Sun,
  Moon,
  Download,
  Shield,
  Bell,
  Smartphone,
  Mail,
  Key,
  Trash2,
} from "lucide-react"

interface SettingsProps {
  isDark: boolean
  toggleTheme: () => void
}

export default function Settings({ isDark, toggleTheme }: SettingsProps) {
  const [language, setLanguage] = useState("en")
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  })
  const [privacy, setPrivacy] = useState({
    analytics: false,
    marketing: false,
  })

  const { principalId } = useUser()

  const handleDownloadData = () => {
    console.log("Downloading user data...")
    // Simulate download
    const data = {
      vaults: [],
      transactions: [],
      settings: {},
      exportDate: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "canistash-data.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-sora text-foreground flex items-center space-x-3">
          <SettingsIcon className="h-8 w-8 text-bitcoin-orange" />
          <span>Settings</span>
        </h1>
        <p className="text-muted-foreground">Manage your account preferences and security settings.</p>
      </div>

      {/* Profile Section */}
      <Card className="bg-card border-border/40">
        <CardHeader>
          <CardTitle className="font-sora text-xl text-card-foreground flex items-center space-x-2">
            <User className="h-5 w-5 text-bitcoin-orange" />
            <span>Profile & Identity</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-muted/50 border border-border/20">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bitcoin-orange to-savings-green flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-card-foreground">Anonymous User</h3>
              <p className="text-sm text-muted-foreground">Connected via Internet Computer</p>
            </div>
            <Badge variant="outline" className="bg-savings-green/10 text-savings-green border-savings-green/20">
              <Shield className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-card-foreground">Principal ID</Label>
              <div className="p-3 bg-muted/30 rounded-lg border border-border/20">
              <p className="text-xs font-mono text-muted-foreground break-all">
                {principalId || "Loading..."}
              </p>

              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-card-foreground">Account Type</Label>
              <div className="p-3 bg-muted/30 rounded-lg border border-border/20">
                <p className="text-sm text-card-foreground">Internet Identity</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences Section */}
      <Card className="bg-card border-border/40">
        <CardHeader>
          <CardTitle className="font-sora text-xl text-card-foreground flex items-center space-x-2">
            <Globe className="h-5 w-5 text-savings-green" />
            <span>Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-card-foreground">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-background/50 border-border/40 text-card-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border/40">
                  <SelectItem value="en" className="text-card-foreground">
                    English
                  </SelectItem>
                  <SelectItem value="es" className="text-card-foreground">
                    Español
                  </SelectItem>
                  <SelectItem value="fr" className="text-card-foreground">
                    Français
                  </SelectItem>
                  <SelectItem value="de" className="text-card-foreground">
                    Deutsch
                  </SelectItem>
                  <SelectItem value="ja" className="text-card-foreground">
                    日本語
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-card-foreground">Theme</Label>
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg border border-border/20">
                <div className="flex items-center space-x-2">
                  {isDark ? (
                    <Moon className="h-4 w-4 text-card-foreground" />
                  ) : (
                    <Sun className="h-4 w-4 text-card-foreground" />
                  )}
                  <span className="text-sm text-card-foreground">{isDark ? "Dark" : "Light"} Mode</span>
                </div>
                <Switch checked={isDark} onCheckedChange={toggleTheme} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card className="bg-card border-border/40">
        <CardHeader>
          <CardTitle className="font-sora text-xl text-card-foreground flex items-center space-x-2">
            <Bell className="h-5 w-5 text-bitcoin-orange" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/20">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">DCA confirmations and vault updates</p>
                </div>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/20">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">Real-time alerts on your device</p>
                </div>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/20">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">SMS Notifications</p>
                  <p className="text-xs text-muted-foreground">Critical security alerts only</p>
                </div>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security Section */}
      <Card className="bg-card border-border/40">
        <CardHeader>
          <CardTitle className="font-sora text-xl text-card-foreground flex items-center space-x-2">
            <Shield className="h-5 w-5 text-savings-green" />
            <span>Privacy & Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/20">
              <div className="flex items-center space-x-3">
                <Key className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Analytics Data</p>
                  <p className="text-xs text-muted-foreground">Help improve CANISTASH with usage data</p>
                </div>
              </div>
              <Switch
                checked={privacy.analytics}
                onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, analytics: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/20">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Marketing Communications</p>
                  <p className="text-xs text-muted-foreground">Product updates and Bitcoin insights</p>
                </div>
              </div>
              <Switch
                checked={privacy.marketing}
                onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, marketing: checked }))}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border/20">
            <h4 className="font-medium text-card-foreground mb-3">Data Management</h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleDownloadData}
                variant="outline"
                className="bg-transparent border-bitcoin-orange/20 text-bitcoin-orange hover:bg-bitcoin-orange/10 button-hover"
              >
                <Download className="h-4 w-4 mr-2" />
                Download My Data
              </Button>

              <Button
                variant="outline"
                className="bg-transparent border-red-500/20 text-red-500 hover:bg-red-500/10 button-hover"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card className="bg-card border-border/40">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <img src="/canistash-logo.png" alt="CANISTASH" className="h-8 w-8" />
              <span className="font-sora text-xl font-bold text-card-foreground">CANISTASH</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
              <p className="text-xs text-muted-foreground">
                Built on Internet Computer for maximum privacy and decentralization.
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <button className="hover:text-card-foreground transition-colors">Privacy Policy</button>
                <button className="hover:text-card-foreground transition-colors">Terms of Service</button>
                <button className="hover:text-card-foreground transition-colors">Support</button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
