"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Toggle } from "@/components/ui/toggle"


export default function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"

  const handleToggleChange = () => {
    if (isDarkMode) {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  return (
    <Toggle
      pressed={isDarkMode}
      onPressedChange={() => handleToggleChange()}
      aria-label="Toggle dark mode"
      className="size-12 rounded-full hover:bg-accent"
    >
      <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />    
    </Toggle>
  )
}
