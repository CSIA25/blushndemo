"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Filter, Heart, Search, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductCustomizationModal } from "@/components/product-customization-modal"
import { useCart } from "@/components/cart-provider"
import { ProductQuickViewModal } from "@/components/product-quick-view-modal"

// Product data
const PRODUCTS = [
  {
    id: "1",
    name: "Luxury Gift Box",
    price: "$49.99",
    tag: "Bestseller",
    rating: 5,
    category: "gift-boxes",
    priceRange: "$25 - $50",
    occasion: "birthday",
  },
  {
    id: "2",
    name: "Personalized Jewelry",
    price: "$79.99",
    tag: "New",
    rating: 4,
    category: "jewelry",
    priceRange: "$50 - $100",
    occasion: "anniversary",
  },
  {
    id: "3",
    name: "Artisan Candle Set",
    price: "$34.99",
    tag: "Popular",
    rating: 5,
    category: "candles",
    priceRange: "$25 - $50",
    occasion: "thank-you",
  },
  {
    id: "4",
    name: "Custom Photo Frame",
    price: "$29.99",
    tag: "Limited",
    rating: 4,
    category: "home-decor",
    priceRange: "$25 - $50",
    occasion: "wedding",
  },
  {
    id: "5",
    name: "Handcrafted Mug",
    price: "$24.99",
    tag: "",
    rating: 4,
    category: "home-decor",
    priceRange: "Under $25",
    occasion: "birthday",
  },
  {
    id: "6",
    name: "Scented Bath Set",
    price: "$39.99",
    tag: "Sale",
    rating: 5,
    category: "gift-boxes",
    priceRange: "$25 - $50",
    occasion: "just-because",
  },
  {
    id: "7",
    name: "Gourmet Chocolate Box",
    price: "$44.99",
    tag: "",
    rating: 5,
    category: "gift-boxes",
    priceRange: "$25 - $50",
    occasion: "thank-you",
  },
  {
    id: "8",
    name: "Silk Scarf",
    price: "$59.99",
    tag: "New",
    rating: 4,
    category: "accessories",
    priceRange: "$50 - $100",
    occasion: "birthday",
  },
  {
    id: "9",
    name: "Leather Journal",
    price: "$32.99",
    tag: "",
    rating: 4,
    category: "stationery",
    priceRange: "$25 - $50",
    occasion: "graduation",
  },
  {
    id: "10",
    name: "Succulent Planter",
    price: "$27.99",
    tag: "Popular",
    rating: 5,
    category: "home-decor",
    priceRange: "$25 - $50",
    occasion: "housewarming",
  },
  {
    id: "11",
    name: "Essential Oil Diffuser",
    price: "$49.99",
    tag: "",
    rating: 4,
    category: "home-decor",
    priceRange: "$25 - $50",
    occasion: "just-because",
  },
  {
    id: "12",
    name: "Wine Gift Set",
    price: "$89.99",
    tag: "Limited",
    rating: 5,
    category: "gift-boxes",
    priceRange: "Over $100",
    occasion: "anniversary",
  },
  {
    id: "13",
    name: "Personalized Necklace",
    price: "$79.99",
    tag: "New",
    rating: 4,
    category: "jewelry",
    priceRange: "$50 - $100",
    occasion: "anniversary",
  },
  {
    id: "14",
    name: "Birthstone Bracelet",
    price: "$64.99",
    tag: "",
    rating: 5,
    category: "jewelry",
    priceRange: "$50 - $100",
    occasion: "birthday",
  },
  {
    id: "15",
    name: "Initial Earrings",
    price: "$49.99",
    tag: "Popular",
    rating: 5,
    category: "jewelry",
    priceRange: "$25 - $50",
    occasion: "graduation",
  },
  {
    id: "16",
    name: "Charm Anklet",
    price: "$39.99",
    tag: "",
    rating: 4,
    category: "jewelry",
    priceRange: "$25 - $50",
    occasion: "just-because",
  },
  {
    id: "17",
    name: "Self-Care Gift Box",
    price: "$59.99",
    tag: "New",
    rating: 4,
    category: "gift-boxes",
    priceRange: "$50 - $100",
    occasion: "just-because",
  },
]

export default function ShopPage() {
  const { count, refreshCart } = useCart()
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [selectedPriceRange, setSelectedPriceRange] = useState("")
  const [selectedOccasion, setSelectedOccasion] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("featured")
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS)
  const [customizingProduct, setCustomizingProduct] = useState<any>(null)
  const [viewingProduct, setViewingProduct] = useState<any>(null)

  // Apply filters
  useEffect(() => {
    let result = [...PRODUCTS]

    // Filter by tab/category
    if (activeTab !== "all") {
      result = result.filter((product) => product.category === activeTab)
    }

    // Filter by sidebar category
    if (selectedCategory !== "All Products") {
      const categoryMap: Record<string, string> = {
        "Gift Boxes": "gift-boxes",
        Jewelry: "jewelry",
        "Home Decor": "home-decor",
        Candles: "candles",
        "Photo Frames": "home-decor",
        "Custom Gifts": "custom",
      }
      const categoryValue = categoryMap[selectedCategory]
      if (categoryValue) {
        result = result.filter((product) => product.category === categoryValue)
      }
    }

    // Filter by price range
    if (selectedPriceRange) {
      result = result.filter((product) => product.priceRange === selectedPriceRange)
    }

    // Filter by occasion
    if (selectedOccasion) {
      const occasionMap: Record<string, string> = {
        Birthday: "birthday",
        Anniversary: "anniversary",
        Wedding: "wedding",
        Graduation: "graduation",
        "Thank You": "thank-you",
        "Just Because": "just-because",
      }
      const occasionValue = occasionMap[selectedOccasion]
      if (occasionValue) {
        result = result.filter((product) => product.occasion === occasionValue)
      }
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((product) => product.name.toLowerCase().includes(query))
    }

    // Sort products
    switch (sortOrder) {
      case "newest":
        // For demo purposes, we'll just reverse the array
        result = [...result].reverse()
        break
      case "price-asc":
        result = [...result].sort(
          (a, b) => Number.parseFloat(a.price.replace("$", "")) - Number.parseFloat(b.price.replace("$", "")),
        )
        break
      case "price-desc":
        result = [...result].sort(
          (a, b) => Number.parseFloat(b.price.replace("$", "")) - Number.parseFloat(a.price.replace("$", "")),
        )
        break
      case "best-selling":
        // For demo purposes, sort by rating
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      // Default is "featured", no sorting needed
    }

    setFilteredProducts(result)
  }, [activeTab, selectedCategory, selectedPriceRange, selectedOccasion, searchQuery, sortOrder])

  const handleAddToCart = (product: any) => {
    setCustomizingProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      image: `/images/product-${(parseInt(product.id) % 4) + 1}.jpg`,
    })
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
            <Link href="/shop" className="text-sm font-medium text-pink-500 transition-colors">
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
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-pink-500 text-xs text-white flex items-center justify-center">
                  {count}
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
              <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
              <p className="text-muted-foreground">Browse our collection of unique gifts for every occasion</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
            <div className="hidden md:block space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-semibold">Categories</h3>
                <div className="space-y-1">
                  {[
                    "All Products",
                    "Gift Boxes",
                    "Jewelry",
                    "Home Decor",
                    "Candles",
                    "Photo Frames",
                    "Custom Gifts",
                  ].map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className={`w-full justify-start ${selectedCategory === category ? "bg-pink-500 hover:bg-pink-600" : ""}`}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">Price Range</h3>
                <div className="space-y-1">
                  {["Under $25", "$25 - $50", "$50 - $100", "Over $100"].map((range) => (
                    <Button
                      key={range}
                      variant={selectedPriceRange === range ? "default" : "ghost"}
                      className={`w-full justify-start ${selectedPriceRange === range ? "bg-pink-500 hover:bg-pink-600" : ""}`}
                      size="sm"
                      onClick={() => setSelectedPriceRange(range === selectedPriceRange ? "" : range)}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">Occasion</h3>
                <div className="space-y-1">
                  {["Birthday", "Anniversary", "Wedding", "Graduation", "Thank You", "Just Because"].map((occasion) => (
                    <Button
                      key={occasion}
                      variant={selectedOccasion === occasion ? "default" : "ghost"}
                      className={`w-full justify-start ${selectedOccasion === occasion ? "bg-pink-500 hover:bg-pink-600" : ""}`}
                      size="sm"
                      onClick={() => setSelectedOccasion(occasion === selectedOccasion ? "" : occasion)}
                    >
                      {occasion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 md:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Filter Products</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6 space-y-6">
                        <div>
                          <h3 className="mb-2 text-lg font-semibold">Categories</h3>
                          <div className="space-y-1">
                            {[
                              "All Products",
                              "Gift Boxes",
                              "Jewelry",
                              "Home Decor",
                              "Candles",
                              "Photo Frames",
                              "Custom Gifts",
                            ].map((category) => (
                              <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "ghost"}
                                className={`w-full justify-start ${selectedCategory === category ? "bg-pink-500 hover:bg-pink-600" : ""}`}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                              >
                                {category}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="mb-2 text-lg font-semibold">Price Range</h3>
                          <div className="space-y-1">
                            {["Under $25", "$25 - $50", "$50 - $100", "Over $100"].map((range) => (
                              <Button
                                key={range}
                                variant={selectedPriceRange === range ? "default" : "ghost"}
                                className={`w-full justify-start ${selectedPriceRange === range ? "bg-pink-500 hover:bg-pink-600" : ""}`}
                                size="sm"
                                onClick={() => setSelectedPriceRange(range === selectedPriceRange ? "" : range)}
                              >
                                {range}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="mb-2 text-lg font-semibold">Occasion</h3>
                          <div className="space-y-1">
                            {["Birthday", "Anniversary", "Wedding", "Graduation", "Thank You", "Just Because"].map(
                              (occasion) => (
                                <Button
                                  key={occasion}
                                  variant={selectedOccasion === occasion ? "default" : "ghost"}
                                  className={`w-full justify-start ${selectedOccasion === occasion ? "bg-pink-500 hover:bg-pink-600" : ""}`}
                                  size="sm"
                                  onClick={() => setSelectedOccasion(occasion === selectedOccasion ? "" : occasion)}
                                >
                                  {occasion}
                                </Button>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="flex flex-1 items-center gap-2 md:max-w-xs">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="best-selling">Best Selling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6 w-full justify-start overflow-auto">
                  <TabsTrigger value="all">All Products</TabsTrigger>
                  <TabsTrigger value="gift-boxes">Gift Boxes</TabsTrigger>
                  <TabsTrigger value="jewelry">Jewelry</TabsTrigger>
                  <TabsTrigger value="home-decor">Home Decor</TabsTrigger>
                  <TabsTrigger value="candles">Candles</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-0">
                  {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <p className="text-lg font-medium">No products found</p>
                      <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                      <Button
                        className="mt-4 bg-pink-500 hover:bg-pink-600"
                        onClick={() => {
                          setSelectedCategory("All Products")
                          setSelectedPriceRange("")
                          setSelectedOccasion("")
                          setSearchQuery("")
                          setSortOrder("featured")
                          setActiveTab("all")
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {filteredProducts.map((product, i) => (
                        <Card key={i} className="group overflow-hidden">
                          <CardHeader className="p-0">
                            <div className="relative aspect-square overflow-hidden">
                              {product.tag && (
                                <div className="absolute top-2 right-2 z-10 rounded-full bg-pink-500 px-2 py-1 text-xs font-medium text-white">
                                  {product.tag}
                                </div>
                              )}
                              <Image
                                src={`/images/product-${(parseInt(product.id) % 4) + 1}.jpg`}
                                alt={product.name}
                                width={400}
                                height={400}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                                <Button
                                  className="bg-white text-pink-500 hover:bg-white/90"
                                  onClick={() =>
                                    setViewingProduct({
                                      id: product.id,
                                      name: product.name,
                                      price: product.price,
                                      image: `/images/product-${(parseInt(product.id) % 4) + 1}.jpg`,
                                      tag: product.tag,
                                    })
                                  }
                                >
                                  Quick View
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4">
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-gray-500">The perfect gift for any occasion</p>
                          </CardContent>
                          <CardFooter className="p-4 pt-0">
                            <div className="flex w-full items-center justify-between">
                              <span className="font-bold text-pink-600">{product.price}</span>
                              <Button
                                size="sm"
                                className="bg-pink-500 hover:bg-pink-600"
                                onClick={() => handleAddToCart(product)}
                              >
                                Add to Cart
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              {filteredProducts.length > 0 && (
                <div className="flex justify-center">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" disabled>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-pink-500 text-white hover:bg-pink-600">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      4
                    </Button>
                    <Button variant="outline" size="icon">
                      <ChevronLeft className="h-4 w-4 rotate-180" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
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

      {customizingProduct && (
        <ProductCustomizationModal product={customizingProduct} onClose={() => setCustomizingProduct(null)} />
      )}
      {viewingProduct && <ProductQuickViewModal product={viewingProduct} onClose={() => setViewingProduct(null)} />}
    </div>
  )
}

