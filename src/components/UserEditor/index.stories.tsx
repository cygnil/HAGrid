import type { Meta, StoryObj } from '@storybook/react';

import {UserEditor} from './index';
import {action} from '@storybook/addon-actions';

const meta = {
  component: UserEditor,
  title: 'UserEditor',
  tags: ['autodocs']
} satisfies Meta<typeof UserEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: ["alice", "bob"],
    onUpdate: () => new Promise<boolean>((resolve) => {action("onUpdate"); resolve(true);}),
    onUpdateFinished: action('onUpdateFinished')
  },
};
