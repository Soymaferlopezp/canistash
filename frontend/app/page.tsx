"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Moon, Sun, Users, Zap, Brain, User, Shield, Repeat } from "lucide-react"
import Dashboard from "./dashboard"
import LoginButton from "@/components/LoginButton"

export default function LandingPage() {
  const [isDark, setIsDark] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("light")
  }

  if (isLoggedIn) {
    return <Dashboard isDark={isDark} toggleTheme={toggleTheme} onLogout={() => setIsLoggedIn(false)} />
  }

  return (
    <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <Image src="/canistash-logo.png" alt="CANISTASH" width={32} height={32} className="h-8 w-8" />
            <span className="font-sora text-xl font-bold text-foreground">CANISTASH</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Button style={{ backgroundColor: "#F7931A" }} className="text-white hover:opacity-90 font-medium">
              Get Started
            </Button>

            {/* Internet Identity Login */}
            <LoginButton />

            <Button variant="ghost" size="sm" onClick={toggleTheme} className="ml-2">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Rest of the landing page remains the same */}
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-sora tracking-tight">
                Save in Bitcoin with{" "}
                <span className="bg-gradient-to-r from-bitcoin-orange to-savings-green bg-clip-text text-transparent">
                  purpose and autonomy
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Create private, automated and collaborative financial goals.
              </p>
            </div>

            <Button
              size="lg"
              style={{ backgroundColor: "#F7931A" }}
              className="text-white hover:opacity-90 font-medium text-lg px-8 py-6 rounded-xl"
            >
              Create your first vault
            </Button>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Privacy-first</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Automated</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Collaborative</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-sora">Four ways to build your Bitcoin wealth</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the DCA strategy that fits your lifestyle and financial goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Individual DCA */}
            <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-sora">Individual DCA</CardTitle>
                <CardDescription>Private and automated Bitcoin accumulation just for you</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Complete privacy</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Automated purchases</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Flexible scheduling</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Collaborative DCA */}
            <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl font-sora">Collaborative DCA</CardTitle>
                <CardDescription>Multiple users working towards a shared financial goal</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <span>Shared vaults</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <span>Group contributions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <span>Transparent tracking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Automatic DCA */}
            <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Repeat className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-sora">Automatic DCA</CardTitle>
                <CardDescription>Triggered by your behavior and spending patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Behavior triggers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Smart automation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Effortless saving</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* AI Planner DCA */}
            <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Brain className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl font-sora">AI Planner DCA</CardTitle>
                <CardDescription>Strategy suggested by AI based on your financial profile</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <span>AI-powered insights</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <span>Personalized strategy</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <span>Optimized timing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Image src="/canistash-logo.png" alt="CANISTASH" width={24} height={24} className="h-6 w-6" />
              <span className="font-sora font-bold text-foreground">CANISTASH</span>
            </div>

            <nav className="flex items-center space-x-6">
              <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#icp" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Powered by ICP
              </Link>
            </nav>
          </div>

          <div className="mt-8 pt-8 border-t border-border/40 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 CANISTASH. Built on Internet Computer for maximum privacy and decentralization.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
