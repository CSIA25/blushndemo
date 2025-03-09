"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { type CartItem, getCart, getCartCount } from "@/lib/cart"

type CartContextType = {
  items: CartItem[]
  count: number
  refreshCart: () => void
}

const CartContext = createContext<CartContextType>({
  items: [],
  count: 0,
  refreshCart: () => {},
})

export const useCart = () => useContext(CartContext)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [count, setCount] = useState(0)

  const refreshCart = () => {
    setItems(getCart())
    setCount(getCartCount())
  }

  useEffect(() => {
    refreshCart()

    // Listen for storage events to update cart when changed in another tab
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "blushn-cart") {
        refreshCart()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Custom event for cart updates within the same tab
    window.addEventListener("cart-updated", refreshCart)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("cart-updated", refreshCart)
    }
  }, [])

  return <CartContext.Provider value={{ items, count, refreshCart }}>{children}</CartContext.Provider>
}

