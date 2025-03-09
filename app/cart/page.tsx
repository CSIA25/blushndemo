"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Heart, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { type CartItem, getCart, getCartTotal, removeFromCart, updateCartItemQuantity } from "@/lib/cart"
import { useCart } from "@/components/cart-provider"
import { toast } from "sonner"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartTotal, setCartTotal] = useState(0)
  const { refreshCart } = useCart()
  const router = useRouter()

  useEffect(() => {
    setCartItems(getCart())
    setCartTotal(getCartTotal())
  }, [])

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return

    updateCartItemQuantity(index, newQuantity)
    setCartItems(getCart())
    setCartTotal(getCartTotal())
    refreshCart()
  }

  const handleRemoveItem = (index: number) => {
    removeFromCart(index)
    setCartItems(getCart())
    setCartTotal(getCartTotal())
    refreshCart()
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <span className="text-xl font-bold">BlushN</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Shop
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Testimonials
            </Link>
            <Link href="/#contact" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5 text-pink-500" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-pink-500 text-xs text-white flex items-center justify-center">
                  {cartItems.reduce((count, item) => count + item.quantity, 0)}
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {cartItems.length === 0
                  ? "Your cart is empty"
                  : `You have ${cartItems.reduce((count, item) => count + item.quantity, 0)} item(s) in your cart`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/shop">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="mt-12 flex flex-col items-center justify-center space-y-4">
              <ShoppingBag className="h-16 w-16 text-gray-300" />
              <h2 className="text-xl font-medium">Your cart is empty</h2>
              <p className="text-center text-gray-500">Looks like you haven't added any items to your cart yet.</p>
              <Link href="/shop">
                <Button className="mt-4 bg-pink-500 hover:bg-pink-600">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <div className="rounded-lg border">
                  <div className="p-6">
                    <h2 className="text-lg font-medium">Cart Items</h2>
                  </div>
                  <Separator />
                  <div className="divide-y">
                    {cartItems.map((item, index) => (
                      <div key={index} className="p-6">
                        <div className="flex flex-col gap-4 sm:flex-row">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                            <Image
                              src={item.image || `/images/product-${index + 1}.jpg`}
                              alt={item.name}
                              width={96}
                              height={96}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="font-medium text-pink-600">{item.price}</p>
                            </div>
                            {item.customization && (
                              <div className="mt-1 text-sm text-gray-500">
                                {item.customization.name && <p>Name: {item.customization.name}</p>}
                                {item.customization.color && <p>Color: {item.customization.color}</p>}
                              </div>
                            )}
                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-r-none"
                                  onClick={() => handleQuantityChange(index, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <Input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(index, Number.parseInt(e.target.value) || 1)}
                                  className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                />
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-l-none"
                                  onClick={() => handleQuantityChange(index, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:bg-red-50 hover:text-red-600"
                                onClick={() => handleRemoveItem(index)}
                              >
                                <Trash2 className="mr-1 h-4 w-4" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="rounded-lg border">
                  <div className="p-6">
                    <h2 className="text-lg font-medium">Order Summary</h2>
                  </div>
                  <Separator />
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <Button 
                      className="mt-4 w-full bg-pink-500 hover:bg-pink-600"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 md:py-12 lg:py-16 px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-pink-500" />
                <span className="text-xl font-bold">BlushN</span>
              </div>
              <p className="text-sm text-gray-500">Making gift-giving a joyful experience since 2015.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/shop" className="text-gray-500 hover:text-pink-500 transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="text-gray-500 hover:text-pink-500 transition-colors">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="text-gray-500 hover:text-pink-500 transition-colors">
                    Bestsellers
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="text-gray-500 hover:text-pink-500 transition-colors">
                    Gift Cards
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/#home" className="text-gray-500 hover:text-pink-500 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-pink-500 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-pink-500 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-gray-500 hover:text-pink-500 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Help</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/#contact" className="text-gray-500 hover:text-pink-500 transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-gray-500 hover:text-pink-500 transition-colors">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-gray-500 hover:text-pink-500 transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-gray-500 hover:text-pink-500 transition-colors">
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
            <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} BlushN. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-pink-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-pink-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-pink-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-pink-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

