"use client"

import { useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";

const II_CANISTER_ID = "umunu-kh777-77774-qaaca-cai"; // tu canisterId local

export default function LoginButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState<string | null>(null);

  const login = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: `http://127.0.0.1:4943?canisterId=${II_CANISTER_ID}`,
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toText();
        setPrincipal(principal);
        setIsAuthenticated(true);
        console.log("✅ Logged in as:", principal);
      }
    });
  };

  return (
    <div className="p-4 flex flex-col gap-2">
      {!isAuthenticated ? (
        <button
          onClick={login}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Iniciar sesión con Internet Identity
        </button>
      ) : (
        <div className="text-sm text-green-600">
          Sesión iniciada como:<br /> <code>{principal}</code>
        </div>
      )}
    </div>
  );
}
