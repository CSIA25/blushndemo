"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductCustomizationModal } from "./product-customization-modal"

type ProductQuickViewModalProps = {
  product: {
    id: string
    name: string
    price: string
    image: string
    tag?: string
    description?: string
  }
  onClose: () => void
}

export function ProductQuickViewModal({ product, onClose }: ProductQuickViewModalProps) {
  const [showCustomization, setShowCustomization] = useState(false)

  const handleAddToCart = () => {
    setShowCustomization(true)
  }

  if (showCustomization) {
    return (
      <ProductCustomizationModal
        product={product}
        onClose={() => {
          setShowCustomization(false)
          onClose()
        }}
      />
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100">
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-md">
            {product.tag && (
              <div className="absolute top-2 right-2 z-10 rounded-full bg-pink-500 px-2 py-1 text-xs font-medium text-white">
                {product.tag}
              </div>
            )}
            <Image
              src={product.image || `/images/product-${product.id}.jpg`}
              alt={product.name}
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="mt-2 text-xl font-semibold text-pink-600">{product.price}</p>

            <div className="mt-4 space-y-2">
              <p className="text-gray-600">
                {product.description ||
                  "The perfect gift for any occasion. This beautiful item is handcrafted with care and attention to detail, making it a unique and thoughtful present for your loved ones."}
              </p>

              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-500">• Handcrafted with premium materials</p>
                <p className="text-sm text-gray-500">• Customizable with personal messages</p>
                <p className="text-sm text-gray-500">• Gift wrapping available</p>
                <p className="text-sm text-gray-500">• Fast shipping</p>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <Button onClick={handleAddToCart} className="w-full bg-pink-500 hover:bg-pink-600">
                Add to Cart
              </Button>
              <p className="mt-2 text-center text-xs text-gray-500">Free shipping on orders over $50</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

