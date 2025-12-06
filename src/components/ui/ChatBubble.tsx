import React from 'react'

interface ChatBubbleProps {
  role: 'user' | 'assistant'
  content: string
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ role, content }) => {
  const isUser = role === 'user'
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
          isUser
            ? 'bg-brand text-white rounded-br-sm'
            : 'bg-slate-800/80 text-slate-50 border border-slate-700/70 rounded-bl-sm'
        }`}
      >
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  )
}
