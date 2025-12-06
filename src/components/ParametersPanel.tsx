import React from 'react'
import { useSession } from '../context/SessionContext'
import { Slider } from './ui/Slider'

export const ParametersPanel: React.FC = () => {
  const { session, updateSession } = useSession()

  return (
    <section className="glass-panel p-4 space-y-3" aria-label="Model parameters">
      <header>
        <h2 className="text-xs font-semibold text-slate-100">Parameters</h2>
        <p className="text-[11px] text-slate-400">Tune the behaviour of the model.</p>
      </header>
      <div className="space-y-3">
        <Slider
          label="Temperature"
          min={0}
          max={1}
          step={0.1}
          value={session.temperature}
          onChange={(e) => updateSession({ temperature: Number(e.target.value) })}
        />
        <Slider
          label="Max tokens"
          min={64}
          max={2048}
          step={64}
          value={session.maxTokens}
          onChange={(e) => updateSession({ maxTokens: Number(e.target.value) })}
        />
      </div>
      <p className="text-[10px] text-slate-500">
        Temperature controls randomness. Higher values make outputs more creative; lower values make them more focused
        and deterministic.
      </p>
    </section>
  )
}
