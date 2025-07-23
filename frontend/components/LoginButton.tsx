// components/LoginButton.tsx
"use client"

import { loginWithInternetIdentity } from "@/lib/auth-client"
import { Button } from "./ui/button"

interface LoginButtonProps {
  onLoginSuccess: () => void
}

export default function LoginButton({ onLoginSuccess }: LoginButtonProps) {
  return (
    <Button
      onClick={() =>
        loginWithInternetIdentity(
          () => {
            console.log("✅ Login successful")
            onLoginSuccess()
          },
          (error) => {
            console.error("❌ Login failed", error)
          }
        )
      }
      className="bg-bitcoin-orange text-white hover:opacity-90 font-medium"
    >
      Login
    </Button>
  )
}

