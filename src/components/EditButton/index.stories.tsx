import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import {EditButton} from './index';

const meta = {
  component: EditButton,
  title: 'EditButton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "This is a simple edit button for use in editable cells. No frills, no muss."
      }
    }
  }
} satisfies Meta<typeof EditButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: action("Edit button clicked")
  },
};
