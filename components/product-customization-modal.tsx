"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type CartItem, addToCart } from "@/lib/cart"

type ProductCustomizationModalProps = {
  product: {
    id: string
    name: string
    price: string
    image: string
  }
  onClose: () => void
}

export function ProductCustomizationModal({ product, onClose }: ProductCustomizationModalProps) {
  const [customName, setCustomName] = useState("")
  const [customColor, setCustomColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      customization: {
        name: customName,
        color: customColor,
      },
    }

    addToCart(cartItem)

    // Dispatch custom event to notify cart has been updated
    window.dispatchEvent(new Event("cart-updated"))

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100">
          <X className="h-5 w-5" />
        </button>

        <h3 className="mb-4 text-xl font-bold">{product.name}</h3>
        <p className="mb-6 text-sm text-gray-500">Customize your product before adding to cart</p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="custom-name">Custom Name or Message</Label>
            <Input
              id="custom-name"
              placeholder="Enter name or message to be printed"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-color">Color</Label>
            <Select value={customColor} onValueChange={setCustomColor}>
              <SelectTrigger id="custom-color">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pink">Pink</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="white">White</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <div className="flex items-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-9 w-9 rounded-r-none p-0"
              >
                -
              </Button>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                className="h-9 rounded-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                className="h-9 w-9 rounded-l-none p-0"
              >
                +
              </Button>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleAddToCart} className="w-full bg-pink-500 hover:bg-pink-600">
              Add to Cart - {product.price}
            </Button>
          </div>
        </div>

        <Image
          src={product.image || `/images/product-${product.id}.jpg`}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

