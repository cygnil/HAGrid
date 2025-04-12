import type { Meta, StoryObj } from '@storybook/react';

import {UserEditor} from './index';

const meta = {
  component: UserEditor,
  title: 'UserEditor',
  tags: ['autodocs']
} satisfies Meta<typeof UserEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: ["alice", "bob"]
  },
};
