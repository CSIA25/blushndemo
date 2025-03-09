"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // For demo purposes, using hardcoded credentials
    // In production, you should use proper authentication
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminAuth", "true")
      router.push("/admin/dashboard")
    } else {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-pink-500" />
            <span className="text-xl font-bold">BlushN</span>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6 p-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Admin Login</h1>
            <p className="text-gray-500">Enter your credentials to access the admin dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
              Login
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
} 