import React from 'react'
import { useSession } from '../context/SessionContext'
import { ChatBubble } from './ui/ChatBubble'
import { Button } from './ui/Button'

const downloadJson = (data: unknown, filename: string) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export const ChatOutput: React.FC = () => {
  const { session } = useSession()

  const handleCopy = async () => {
    const text = session.messages.map((m) => `${m.role}: ${m.content}`).join('\n\n')
    await navigator.clipboard.writeText(text || 'No messages yet.')
  }

  const handleDownloadJson = () => {
    downloadJson(session, `ai-playground-session-${session.id}.json`)
  }

  return (
    <section className="glass-panel p-4 flex flex-col h-full" aria-label="Chat output">
      <header className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/80 mb-3">
        <div>
          <h2 className="text-xs font-semibold text-slate-100">Conversation</h2>
          <p className="text-[11px] text-slate-400">Prompts and responses from the mock assistant.</p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={handleCopy} className="text-[11px] px-2 py-1">
            Copy
          </Button>
          <Button type="button" variant="outline" onClick={handleDownloadJson} className="text-[11px] px-2 py-1">
            JSON
          </Button>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 scroll-thin text-sm">
        {session.messages.length === 0 ? (
          <p className="text-[12px] text-slate-400">
            Send a prompt to see the mock assistant respond. This prototype focuses on UI and UX, so responses are
            simulated.
          </p>
        ) : (
          session.messages.map((m) => (
            <ChatBubble key={m.id} role={m.role === 'system' ? 'assistant' : m.role} content={m.content} />
          ))
        )}
      </div>
    </section>
  )
}
