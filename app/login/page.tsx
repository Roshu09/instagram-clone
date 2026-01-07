"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const router = useRouter()

  const handleLogin = () => {
    if (username.trim()) {
      router.push("/feed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-2" style={{ fontFamily: "serif" }}>
            Instagram
          </h1>
          <p className="text-[#8e8e8e] text-sm md:text-base">Sign in to continue</p>
        </div>

        <div className="space-y-4 bg-white p-6 md:p-8 rounded-lg border border-[#dbdbdb]">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full border-[#dbdbdb] focus:border-[#0095f6]"
          />
          <Button onClick={handleLogin} className="w-full bg-[#0095f6] hover:bg-[#0095f6]/90 text-white">
            Log In
          </Button>
        </div>
      </div>
    </div>
  )
}
