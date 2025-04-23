import type {Meta, StoryObj} from '@storybook/react';

import {LoadingState} from './index';

const meta = {
  component: LoadingState,
  title: 'LoadingState',
  tags: ['autodocs']
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
