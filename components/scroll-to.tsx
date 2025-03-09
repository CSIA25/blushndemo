"use client"

import { useEffect } from "react"

/**
 * This component automatically scrolls to the section specified in the URL hash
 * when the page loads.
 */
export default function ScrollTo() {
  useEffect(() => {
    // Check if there's a hash in the URL and scroll to that section
    if (window.location.hash) {
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)

      if (element) {
        // Add a small delay to ensure the page has fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    }
  }, [])

  return null
}

