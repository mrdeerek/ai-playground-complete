import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Primary button',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost button',
    variant: 'ghost',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline button',
    variant: 'outline',
  },
}
