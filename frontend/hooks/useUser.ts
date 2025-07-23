"use client"

import { useEffect, useState } from "react"
import { AuthClient } from "@dfinity/auth-client"

export function useUser() {
  const [principalId, setPrincipalId] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrincipal = async () => {
      const client = await AuthClient.create()
      const isAuthed = await client.isAuthenticated()
  
      if (isAuthed) {
        const identity = client.getIdentity()
        const principal = identity.getPrincipal().toText()
        setPrincipalId(principal)
      }
    }
  
    fetchPrincipal()
  }, [])
  return { principalId }
}
