import type {Meta, StoryObj} from '@storybook/react';

import {UserEditor} from './index';
import {action} from '@storybook/addon-actions';

const meta = {
  component: UserEditor,
  title: 'UserEditor',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "An editor that lets the user filter, add, and remove users. The adding and removing are done immediately on click--an optimized version would be to " +
        "batch updates and send everything at a certain point, either when the user clicks a button or exits the popup. Note that this will not scale to hundreds of users " +
        "added to the cell very well--the top will be almost entirely full of included users!"
      }
    }
  }

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
