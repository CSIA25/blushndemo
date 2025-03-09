"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, Package, ShoppingBag, TrendingUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for demo purposes
const stats = {
  totalSales: 12500,
  totalOrders: 150,
  totalProducts: 17,
  totalCustomers: 120,
}

const recentOrders = [
  {
    id: "1",
    customer: "Sarah Johnson",
    product: "Luxury Gift Box",
    amount: "$49.99",
    status: "Delivered",
    date: "2024-03-15",
  },
  {
    id: "2",
    customer: "Michael Chen",
    product: "Personalized Jewelry",
    amount: "$79.99",
    status: "Processing",
    date: "2024-03-14",
  },
  {
    id: "3",
    customer: "Emily Rodriguez",
    product: "Artisan Candle Set",
    amount: "$34.99",
    status: "Shipped",
    date: "2024-03-13",
  },
]

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("adminAuth") === "true"
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  if (isLoading) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-pink-500" />
            <span className="text-xl font-bold">BlushN Admin</span>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-500">Welcome to your admin dashboard</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <TrendingUp className="h-4 w-4 text-pink-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.totalSales}</div>
                <p className="text-xs text-gray-500">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingBag className="h-4 w-4 text-pink-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
                <p className="text-xs text-gray-500">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-pink-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <p className="text-xs text-gray-500">+2 new this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-pink-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCustomers}</div>
                <p className="text-xs text-gray-500">+8.2% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
            <div className="rounded-lg border">
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-gray-500">{order.product}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.amount}</p>
                        <p className="text-sm text-gray-500">{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 