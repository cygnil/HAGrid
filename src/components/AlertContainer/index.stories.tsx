import type {Meta, StoryObj} from '@storybook/react';

import {AlertContainer} from './index';

const meta = {
  component: AlertContainer,
  title: 'AlertContainer',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "A box for showing various alerts. It takes the same severity parameters as the MUI Alert (success|info|warning|error) and display as many alerts " +
        "as are fed to it. Note that the developer is on the hook for managing when alerts disappear."
      }
    }
  }
} satisfies Meta<typeof AlertContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    alerts: [
      {severity: 'info', message: 'This is an info alert'},
      {severity: 'success', message: 'This is a success alert'},
      {severity: 'warning', message: 'This is a warning alert'},
      {severity: 'error', message: 'This is an error alert'}
    ]
  },
};
