import React, { useEffect, useState } from 'react'
import { useSession } from '../context/SessionContext'
import { fetchModels, type Model } from '../api/mockApi'

export const ModelSelector: React.FC = () => {
  const { session, updateSession } = useSession()
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const data = await fetchModels()
        if (!cancelled) {
          setModels(data)
          setError(null)
        }
      } catch (err) {
        console.error(err)
        if (!cancelled) setError('Unable to load models.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="glass-panel p-4 space-y-3" aria-label="Model selector">
      <header className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xs font-semibold text-slate-100">Model</h2>
          <p className="text-[11px] text-slate-400">Pick a model to experiment with.</p>
        </div>
        {loading && <span className="text-[11px] text-slate-400">Loading…</span>}
      </header>

      {error && (
        <p className="text-[11px] text-rose-400 bg-rose-950/40 border border-rose-800/80 rounded-md px-2 py-1">
          {error}
        </p>
      )}

      <div className="space-y-1 max-h-52 overflow-y-auto scroll-thin">
        {models.map((model) => {
          const active = session.modelId === model.id
          return (
            <button
              key={model.id}
              type="button"
              onClick={() => updateSession({ modelId: model.id })}
              className={`w-full rounded-xl px-3 py-2 text-left text-xs transition-colors border ${
                active
                  ? 'border-brand bg-brand-soft text-brand-dark'
                  : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{model.label}</span>
                {active && <span className="pill bg-brand text-[10px] text-white border-transparent">Active</span>}
              </div>
              <p className="mt-0.5 text-[11px] text-slate-300">{model.description}</p>
              {model.tags && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {model.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/70 text-[10px] uppercase tracking-wide text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}
