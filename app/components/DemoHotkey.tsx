"use client"

import { useEffect } from "react"

export default function DemoHotkey() {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "d") {
        window.location.href = "/demo/run"
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return null
}
