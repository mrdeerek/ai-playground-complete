import React, { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { ModelSelector } from './ModelSelector'
import { ParametersPanel } from './ParametersPanel'
import { PromptEditor } from './PromptEditor'
import { ChatOutput } from './ChatOutput'

export const LayoutShell: React.FC = () => {
  const [sending, setSending] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-4 space-y-4">
        <header className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 border border-slate-800 px-2 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-300">
                AI Playground • Frontend prototype
              </span>
            </div>
            <h1 className="text-lg font-semibold text-white">Unified AI Interface</h1>
            <p className="text-xs text-slate-400 max-w-xl">
              Explore different models, tweak parameters, and inspect responses – all in a single, focused workspace.
              This assessment intentionally uses a mock API so you can review the UI in isolation.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>

        <main className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)] items-stretch">
          <div className="space-y-3">
            <ModelSelector />
            <ParametersPanel />
          </div>
          <div className="space-y-3 lg:h-[540px] flex flex-col">
            <PromptEditor onSendingChange={setSending} />
            <div className="relative flex-1">
              {sending && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="glass-panel px-4 py-2 text-[11px] text-slate-200 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand animate-ping" aria-hidden="true" />
                    <span>Talking to mock API…</span>
                  </div>
                </div>
              )}
              <ChatOutput />
            </div>
          </div>
        </main>

        <footer className="pt-2 border-t border-slate-900/80 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <p>
            Keyboard friendly: use <span className="kbd">Tab</span> to move between inputs,{' '}
            <span className="kbd">Shift</span> + <span className="kbd">Tab</span> to go back.
          </p>
          <p>Prototype only • No real AI requests are sent.</p>
        </footer>
      </div>
    </div>
  )
}
