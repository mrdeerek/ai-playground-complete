import type { ChatMessage } from '../context/SessionContext'
import modelsData from '../data/models.json'
import templatesData from '../data/templates.json'

export type Model = {
  id: string
  label: string
  description: string
  tags: string[]
}

export type Template = {
  id: string
  label: string
  prompt: string
}

export interface SendPromptPayload {
  modelId: string
  prompt: string
  temperature: number
  maxTokens: number
}

export interface SendPromptResult {
  assistantMessage: ChatMessage
}

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchModels = async (): Promise<Model[]> => {
  await delay(300)
  return modelsData as Model[]
}

export const fetchTemplates = async (): Promise<Template[]> => {
  await delay(200)
  return templatesData as Template[]
}

export const sendPrompt = async (payload: SendPromptPayload): Promise<SendPromptResult> => {
  const { modelId, prompt, temperature, maxTokens } = payload
  await delay(800)

  const teaser =
    prompt.length > 140 ? prompt.slice(0, 140).trimEnd() + '…' : prompt.trim() || 'your (currently empty) prompt'

  const content = `Pretend response from **${modelId}**

I received: "${teaser}"

Temperature: ${temperature.toFixed(2)}, max tokens: ${maxTokens}.
In a real app this would be where the model output appears.`

  const message: ChatMessage = {
    id: crypto.randomUUID(),
    role: 'assistant',
    content,
    createdAt: new Date().toISOString(),
  }

  return { assistantMessage: message }
}
