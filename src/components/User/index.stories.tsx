import type {Meta, StoryObj} from '@storybook/react';

import {User} from './index';

const meta = {
  component: User,
  title: 'User',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "A User component, which is a tag with an avatar and the user's name. It's length-restricted, with overflow generating ellipsis (thanks, CSS text-overflow!)"
      }
    }
  }

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

export const TextOverflow: Story = {
  args: {
    userId: "alice",
    name: "Ann Ransibrahmanakul",
    avatarUri: "https://octodex.github.com/images/original.png",
  },
};
