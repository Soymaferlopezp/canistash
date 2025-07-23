"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Plus, Vault, Brain, Zap, Settings, LogOut, Menu, X, Sun, Moon } from "lucide-react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  isDark: boolean
  toggleTheme: () => void
  onLogout: () => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "create-vault", label: "Create new vault", icon: Plus },
  { id: "my-vaults", label: "My vaults", icon: Vault },
  { id: "ai-planner", label: "AI Planner", icon: Brain },
  { id: "automation", label: "Automation", icon: Zap },
  { id: "settings", label: "Settings", icon: Settings },
]

export default function Sidebar({ activeSection, onSectionChange, isDark, toggleTheme, onLogout }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen)

  const handleMenuClick = (sectionId: string) => {
    onSectionChange(sectionId)
    if (isMobile) {
      setIsMobileOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Header */}
      <div
        className={`md:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b h-16 flex items-center justify-between px-4 ${
          isDark ? "bg-background/95 border-border" : "bg-[#F5F8FA]/95 border-[#D1D5DB]/60"
        }`}
      >
        <div className="flex items-center space-x-3">
          <Image src="/canistash-logo.png" alt="CANISTASH" width={28} height={28} className="h-7 w-7" />
          <span className={`font-sora text-lg font-bold ${isDark ? "text-foreground" : "text-petroleum"}`}>
            CANISTASH
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className={`button-hover ${isDark ? "" : "hover:bg-petroleum/5"}`}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobile}
            className={`button-hover ${isDark ? "" : "hover:bg-petroleum/5"}`}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleMobile} />}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-72 z-40 sidebar-transition overflow-hidden
          md:translate-x-0 md:static md:z-auto
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isDark ? "bg-petroleum border-r border-border/40" : "bg-[#F5F8FA] border-r border-[#D1D5DB]/60"}
          ${isMobile ? "top-16 h-[calc(100vh-4rem)]" : ""}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Desktop Logo */}
          <div
            className={`hidden md:flex items-center space-x-3 p-6 flex-shrink-0 ${
              isDark ? "border-b border-border/40" : "border-b border-[#D1D5DB]/40"
            }`}
          >
            <Image
              src={isDark ? "/canistash-logo.png" : "/canistash-logo.png"}
              alt="CANISTASH"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className={`font-sora text-xl font-bold ${isDark ? "text-soft-white" : "text-petroleum"}`}>
              CANISTASH
            </span>
          </div>

          {/* Navigation - scrollable if needed */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 button-hover
                    ${
                      isActive
                        ? isDark
                          ? "bg-bitcoin-orange/15 text-bitcoin-orange border border-bitcoin-orange/25 shadow-sm"
                          : "bg-bitcoin-orange/10 text-bitcoin-orange border border-bitcoin-orange/20 shadow-sm"
                        : isDark
                          ? "text-soft-white/80 hover:text-soft-white hover:bg-soft-white/8 hover:border hover:border-soft-white/10"
                          : "text-petroleum/80 hover:text-petroleum hover:bg-petroleum/5 hover:border hover:border-petroleum/10 hover:shadow-sm"
                    }
                  `}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isActive ? "text-bitcoin-orange" : isDark ? "text-soft-white/60" : "text-petroleum/60"
                    }`}
                  />
                  <span className="font-inter font-medium text-sm">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Bottom actions - fixed at bottom */}
          <div
            className={`p-4 space-y-2 flex-shrink-0 ${isDark ? "border-t border-border/40" : "border-t border-[#D1D5DB]/40"}`}
          >
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className={`w-full justify-start button-hover h-11 ${
                isDark
                  ? "text-soft-white/80 hover:text-soft-white hover:bg-soft-white/8"
                  : "text-petroleum/80 hover:text-petroleum hover:bg-petroleum/5 hover:shadow-sm"
              }`}
            >
              {isDark ? <Sun className="h-5 w-5 mr-3" /> : <Moon className="h-5 w-5 mr-3" />}
              <span className="font-inter text-sm">{isDark ? "Light mode" : "Dark mode"}</span>
            </Button>

            <button
              onClick={onLogout}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 button-hover ${
                isDark
                  ? "text-soft-white/80 hover:text-soft-white hover:bg-red-500/10 hover:border hover:border-red-500/20"
                  : "text-petroleum/80 hover:text-red-600 hover:bg-red-500/5 hover:border hover:border-red-500/15 hover:shadow-sm"
              }`}
            >
              <LogOut className={`h-5 w-5 ${isDark ? "text-soft-white/60" : "text-petroleum/60"}`} />
              <span className="font-inter font-medium text-sm">Log out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
