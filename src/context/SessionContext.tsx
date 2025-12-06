import React, { createContext, useContext, useState } from 'react'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt: string
}

export interface PlaygroundSession {
  id: string
  modelId: string
  temperature: number
  maxTokens: number
  messages: ChatMessage[]
}

interface SessionContextValue {
  session: PlaygroundSession
  updateSession: (update: Partial<PlaygroundSession>) => void
  appendMessage: (msg: Omit<ChatMessage, 'id' | 'createdAt'>) => void
  resetSession: () => void
}

const createInitialSession = (): PlaygroundSession => ({
  id: 'session-1',
  modelId: 'gpt-4.1-mini',
  temperature: 0.7,
  maxTokens: 512,
  messages: [],
})

const SessionContext = createContext<SessionContextValue | undefined>(undefined)

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<PlaygroundSession>(createInitialSession)

  const updateSession = (update: Partial<PlaygroundSession>) => {
    setSession((prev) => ({ ...prev, ...update }))
  }

  const appendMessage: SessionContextValue['appendMessage'] = (msg) => {
    setSession((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          ...msg,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
      ],
    }))
  }

  const resetSession = () => setSession(createInitialSession())

  return (
    <SessionContext.Provider value={{ session, updateSession, appendMessage, resetSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = (): SessionContextValue => {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used within SessionProvider')
  return ctx
}
