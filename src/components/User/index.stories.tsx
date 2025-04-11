import type { Meta, StoryObj } from '@storybook/react';

import {User} from './index';

const meta = {
  component: User,
  title: 'User',
  tags: ['autodocs']
} satisfies Meta<typeof User>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userId: "alice",
    name: "Alice",
    avatarUri: "https://octodex.github.com/images/original.png",
  },
};
