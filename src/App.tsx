import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { SessionProvider } from './context/SessionContext'
import { LayoutShell } from './components/LayoutShell'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SessionProvider>
        <LayoutShell />
      </SessionProvider>
    </ThemeProvider>
  )
}

export default App
