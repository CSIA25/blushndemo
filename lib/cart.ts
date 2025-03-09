export type CustomizationOptions = {
  name?: string
  color?: string
}

export type CartItem = {
  id: string
  name: string
  price: string
  image: string
  quantity: number
  customization?: CustomizationOptions
}

// Helper to get numeric price from string (e.g. "$49.99" -> 49.99)
export const getPriceNumber = (price: string): number => {
  return Number.parseFloat(price.replace("$", ""))
}

// Get cart from localStorage
export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return []

  const cart = localStorage.getItem("blushn-cart")
  return cart ? JSON.parse(cart) : []
}

// Save cart to localStorage
export const saveCart = (cart: CartItem[]): void => {
  if (typeof window === "undefined") return

  localStorage.setItem("blushn-cart", JSON.stringify(cart))
}

// Add item to cart
export const addToCart = (item: CartItem): void => {
  const cart = getCart()

  // Check if item with same ID and customization already exists
  const existingItemIndex = cart.findIndex(
    (cartItem) =>
      cartItem.id === item.id && JSON.stringify(cartItem.customization) === JSON.stringify(item.customization),
  )

  if (existingItemIndex > -1) {
    // Update quantity if item exists
    cart[existingItemIndex].quantity += item.quantity
  } else {
    // Add new item
    cart.push(item)
  }

  saveCart(cart)
}

// Remove item from cart
export const removeFromCart = (index: number): void => {
  const cart = getCart()
  cart.splice(index, 1)
  saveCart(cart)
}

// Update item quantity
export const updateCartItemQuantity = (index: number, quantity: number): void => {
  const cart = getCart()
  if (index >= 0 && index < cart.length) {
    cart[index].quantity = quantity
    saveCart(cart)
  }
}

// Calculate cart total
export const getCartTotal = (): number => {
  const cart = getCart()
  return cart.reduce((total, item) => {
    return total + getPriceNumber(item.price) * item.quantity
  }, 0)
}

// Get cart count
export const getCartCount = (): number => {
  const cart = getCart()
  return cart.reduce((count, item) => count + item.quantity, 0)
}

// Clear cart
export const clearCart = (): void => {
  saveCart([])
}

