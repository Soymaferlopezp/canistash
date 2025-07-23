// lib/auth-client.ts
import { AuthClient } from "@dfinity/auth-client"
import { supabase } from "@/services/supabase"

export async function createAuthClient() {
  return await AuthClient.create()
}

export async function loginWithInternetIdentity(onSuccess: () => void, onFailure: (error: any) => void) {
  const client = await createAuthClient()

  client.login({
    identityProvider: `https://identity.ic0.app/#authorize`,
    onSuccess: async () => {
      const identity = client.getIdentity()
      const principal = identity.getPrincipal().toText()

      const { error, data } = await supabase
      .from("users")
      .upsert(
        {
          principal_id: principal,
          account_type: "Internet Identity",
          display_name: "Anonymous User",
          avatar_url: null,
        },
        { onConflict: "principal_id" } // ← muy importante
      )
      .select()

      if (error) {
        console.error("❌ Error al guardar usuario en Supabase:", error?.message || error)
        onFailure(error)
      } else {
        console.log("✅ Usuario guardado en Supabase:", data)
        onSuccess()
      }
    },
    onError: (err) => {
      console.error("❌ Error en login:", err)
      onFailure(err)
    },
  })
}
