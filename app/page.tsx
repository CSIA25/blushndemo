"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Gift, Heart, Package, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import ScrollTo from "@/components/scroll-to"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollTo />
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-pink-500" />
            <span className="text-xl font-bold">BlushN</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Shop
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              className="bg-pink-500 hover:bg-pink-600"
              onClick={() => (window.location.href = "/shop")}
            >
              Shop Now
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section id="home" className="w-full py-12 md:py-24 lg:py-32 bg-pink-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-700">
                  Perfect Gifts For Every Occasion
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Find the Perfect Gift at <span className="text-pink-500">BlushN</span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Discover unique, thoughtful gifts that will make your loved ones smile. From handcrafted items to
                  luxury presents, we have something for everyone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-pink-500 hover:bg-pink-600" onClick={() => (window.location.href = "/shop")}>
                    Shop Now
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    View Collections
                  </Button>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-background bg-pink-200 flex items-center justify-center text-xs font-medium"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">500+</span> happy customers this month
                  </div>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px] relative">
                <div className="aspect-square overflow-hidden rounded-xl bg-gray-200">
                  <Image
                    src="/images/product-1.jpg"
                    alt="Featured gift collection"
                    width={600}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 rounded-lg bg-white p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-sm font-medium">4.9/5 rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-700">Why Choose Us</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">The BlushN Difference</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We're more than just a gift shop. We're your partner in creating memorable moments.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Gift className="h-12 w-12 text-pink-500" />
                <h3 className="text-xl font-bold">Unique Selection</h3>
                <p className="text-center text-sm text-gray-500">Carefully curated gifts you won't find elsewhere</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Package className="h-12 w-12 text-pink-500" />
                <h3 className="text-xl font-bold">Beautiful Packaging</h3>
                <p className="text-center text-sm text-gray-500">Every gift comes wrapped to perfection</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Truck className="h-12 w-12 text-pink-500" />
                <h3 className="text-xl font-bold">Fast Delivery</h3>
                <p className="text-center text-sm text-gray-500">Same-day delivery available in select areas</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Heart className="h-12 w-12 text-pink-500" />
                <h3 className="text-xl font-bold">Satisfaction Guaranteed</h3>
                <p className="text-center text-sm text-gray-500">Love it or we'll make it right</p>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="w-full py-12 md:py-24 lg:py-32 bg-pink-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-700">
                  Featured Products
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Most Popular Gifts</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our bestsellers that customers love to give and receive.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
              {[
                { name: "Luxury Gift Box", price: "$49.99", tag: "Bestseller" },
                { name: "Personalized Jewelry", price: "$79.99", tag: "New" },
                { name: "Artisan Candle Set", price: "$34.99", tag: "Popular" },
                { name: "Custom Photo Frame", price: "$29.99", tag: "Limited" },
              ].map((product, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="absolute top-2 right-2 z-10 rounded-full bg-pink-500 px-2 py-1 text-xs font-medium text-white">
                    {product.tag}
                  </div>
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={`/images/product-${i + 1}.jpg`}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">The perfect gift for any occasion</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-bold text-pink-600">{product.price}</span>
                      <Button
                        size="sm"
                        className="bg-pink-500 hover:bg-pink-600"
                        onClick={() => (window.location.href = "/shop")}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Button className="group bg-pink-500 hover:bg-pink-600" onClick={() => (window.location.href = "/shop")}>
                View All Products
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-700">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers Say</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it. Here's what our happy customers have to say.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  name: "Sarah Johnson",
                  text: "The gift I ordered for my mom was absolutely perfect! The packaging was beautiful and the delivery was faster than expected. Will definitely shop here again!",
                  rating: 5,
                },
                {
                  name: "Michael Chen",
                  text: "I was struggling to find a unique gift for my wife's birthday. The team at BlushN helped me pick the perfect present. She loved it!",
                  rating: 5,
                },
                {
                  name: "Emily Rodriguez",
                  text: "The quality of the products is outstanding. I've ordered multiple times and have never been disappointed. Their customer service is also top-notch!",
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <div key={i} className="flex flex-col justify-between rounded-lg border p-6 shadow-sm">
                  <div>
                    <div className="flex mb-4">
                      {Array(testimonial.rating)
                        .fill(null)
                        .map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                    <p className="text-gray-500">{testimonial.text}</p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">Verified Customer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-500 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Follow Us on Instagram</h2>
                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get inspired with our latest gift ideas, behind-the-scenes content, and exclusive offers.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-4 mx-auto lg:mx-0 lg:ml-auto">
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-lg">
                      <Image
                        src={`/images/product-${i}.jpg`}
                        alt={`Instagram post ${i}`}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
                <a href="https://www.instagram.com/blushn__/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-white text-pink-500 hover:bg-white/90">
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
                      className="h-5 w-5 mr-2"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    Follow @blushn__
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Find the Perfect Gift?</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Visit our store or shop online today. Our gift experts are ready to help you find exactly what you're
                looking for.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-pink-500 hover:bg-pink-600" onClick={() => (window.location.href = "/shop")}>
                  Shop Now
                </Button>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <div className="grid gap-4">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-500">
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
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Call Us</p>
                    <p className="text-xs text-gray-500">(123) 456-7890</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-500">
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
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Email Us</p>
                    <p className="text-xs text-gray-500">hello@blushn.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-500">
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
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Visit Us</p>
                    <p className="text-xs text-gray-500">123 Gift Street, Shopville, CA 90210</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
                  <Link href="#home" className="text-gray-500 hover:text-pink-500 transition-colors">
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
                  <Link href="#contact" className="text-gray-500 hover:text-pink-500 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Help</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#contact" className="text-gray-500 hover:text-pink-500 transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-500 hover:text-pink-500 transition-colors">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-500 hover:text-pink-500 transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-500 hover:text-pink-500 transition-colors">
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

