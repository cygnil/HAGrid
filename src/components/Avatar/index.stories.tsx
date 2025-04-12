import type { Meta, StoryObj } from '@storybook/react';

import {Avatar} from './index';

const meta = {
  component: Avatar,
  title: 'Avatar',
  tags: ['autodocs']
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUri: "https://octodex.github.com/images/original.png",
    name: "John Doe"
  },
};

export const WithBackground: Story = {
  args: {
    imageUri: "https://octodex.github.com/images/original.png",
    name: "John Doe",
    bgColor: "#ff00ff"
  },
};
  