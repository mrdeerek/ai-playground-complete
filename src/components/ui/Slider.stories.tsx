import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './Slider'

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  args: {
    label: 'Temperature',
    value: 0.7,
    min: 0,
    max: 1,
    step: 0.1,
  },
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {}
