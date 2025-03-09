"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">BlushN</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/products"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/products" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Products
            </Link>
            <Link
              href="/categories"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/categories" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Categories
            </Link>
            <Link
              href="/about"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/about" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
} 