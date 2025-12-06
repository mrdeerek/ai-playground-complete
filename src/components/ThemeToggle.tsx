import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { Button } from './ui/Button'

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <Button
      variant="ghost"
      type="button"
      aria-label={label}
      onClick={toggleTheme}
      className="gap-1 text-xs px-2 py-1"
    >
      <span className="text-lg" aria-hidden="true">
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
      <span className="hidden sm:inline">{theme === 'dark' ? 'Dark' : 'Light'} mode</span>
    </Button>
  )
}
