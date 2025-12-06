import type { Meta, StoryObj } from '@storybook/react'
import { ChatBubble } from './ChatBubble'

const meta: Meta<typeof ChatBubble> = {
  title: 'UI/ChatBubble',
  component: ChatBubble,
}

export default meta
type Story = StoryObj<typeof ChatBubble>

export const User: Story = {
  args: {
    role: 'user',
    content: 'How can I improve this prototype?',
  },
}

export const Assistant: Story = {
  args: {
    role: 'assistant',
    content: 'Here are three suggestions you can try…',
  },
}
