import React, { useEffect, useState } from 'react'
import { useSession } from '../context/SessionContext'
import { fetchTemplates, type Template, sendPrompt } from '../api/mockApi'
import { Button } from './ui/Button'

const LOCAL_KEY = 'ai-playground-last-prompt'

interface PromptEditorProps {
  onSendingChange: (sending: boolean) => void
}

export const PromptEditor: React.FC<PromptEditorProps> = ({ onSendingChange }) => {
  const { session, appendMessage } = useSession()
  const [prompt, setPrompt] = useState('')
  const [templates, setTemplates] = useState<Template[]>([])
  const [loadingTemplates, setLoadingTemplates] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCAL_KEY)
    if (stored) setPrompt(stored)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(LOCAL_KEY, prompt)
  }, [prompt])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const data = await fetchTemplates()
        if (!cancelled) setTemplates(data)
      } catch (err) {
        console.error(err)
      } finally {
        if (!cancelled) setLoadingTemplates(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return
    setSending(true)
    setError(null)
    onSendingChange(true)
    try {
      appendMessage({ role: 'user', content: prompt })
      const { assistantMessage } = await sendPrompt({
        modelId: session.modelId,
        prompt,
        temperature: session.temperature,
        maxTokens: session.maxTokens,
      })
      appendMessage(assistantMessage)
    } catch (err) {
      console.error(err)
      setError('Something went wrong while talking to the mock API.')
    } finally {
      setSending(false)
      onSendingChange(false)
    }
  }

  const applyTemplate = (tpl: Template) => {
    setPrompt((prev) => (prev ? prev + '\n\n' + tpl.prompt : tpl.prompt))
  }

  return (
    <section className="glass-panel p-4 space-y-3" aria-label="Prompt editor">
      <header className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xs font-semibold text-slate-100">Prompt</h2>
          <p className="text-[11px] text-slate-400">Describe what you want the model to do.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block kbd">Ctrl</span>
          <span className="hidden sm:inline-block kbd">Enter</span>
          <span className="text-[10px] text-slate-500 hidden sm:inline">to send</span>
        </div>
      </header>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <textarea
          className="w-full min-h-[140px] resize-y rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          placeholder="Ask anything…"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        {error && (
          <p className="text-[11px] text-rose-400 bg-rose-950/40 border border-rose-800/80 rounded-md px-2 py-1">
            {error}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {loadingTemplates ? (
              <span className="text-[11px] text-slate-500">Loading templates…</span>
            ) : (
              templates.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  className="pill hover:bg-slate-800/90"
                  onClick={() => applyTemplate(tpl)}
                >
                  {tpl.label}
                </button>
              ))
            )}
          </div>
          <Button type="submit" disabled={sending}>
            {sending ? 'Sending…' : 'Send'}
          </Button>
        </div>
      </form>
    </section>
  )
}
