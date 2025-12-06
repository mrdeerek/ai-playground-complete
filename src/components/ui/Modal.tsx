import React from 'react'
import { Button } from './Button'

interface ModalProps {
  title: string
  description?: string
  open: boolean
  onClose: () => void
  primaryActionLabel?: string
  onPrimaryAction?: () => void
}

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  title,
  description,
  open,
  onClose,
  primaryActionLabel = 'Close',
  onPrimaryAction,
  children,
}) => {
  if (!open) return null

  const handlePrimary = () => {
    onPrimaryAction?.()
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="glass-panel max-w-md w-full p-5 space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="space-y-1">
          <h2 id="modal-title" className="text-sm font-semibold text-white">
            {title}
          </h2>
          {description && <p className="text-xs text-slate-300">{description}</p>}
        </header>
        <div className="text-sm text-slate-200">{children}</div>
        <footer className="flex justify-end gap-2 pt-1">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handlePrimary}>{primaryActionLabel}</Button>
        </footer>
      </div>
    </div>
  )
}
