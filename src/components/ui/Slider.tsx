import React from 'react'

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  value: number
}

export const Slider: React.FC<SliderProps> = ({ label, value, min = 0, max = 1, step = 0.1, ...rest }) => {
  return (
    <label className="flex flex-col gap-1 text-xs text-slate-300">
      <div className="flex items-center justify-between">
        <span>{label}</span>
        <span className="tabular-nums text-slate-400">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        className="w-full accent-brand"
        {...rest}
      />
    </label>
  )
}
