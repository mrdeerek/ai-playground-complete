import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Modal } from './Modal'
import { Button } from './Button'

const Demo: React.FC = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm reset"
        description="This is a small example modal."
      >
        You can reuse this component for confirmations and contextual information.
      </Modal>
    </>
  )
}

const meta: Meta<typeof Demo> = {
  title: 'UI/Modal',
  component: Demo,
}

export default meta
type Story = StoryObj<typeof Demo>

export const Example: Story = {}
