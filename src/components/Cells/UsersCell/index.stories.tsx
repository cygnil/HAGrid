import type {Meta, StoryObj} from '@storybook/react';

import {UsersCell} from './index';

const meta = {
  component: UsersCell,
  title: 'Cells/UsersCell',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "A cell for displaying users. Or at least, one user and a tag with the names of everyone else. The editable version will open a popup with a userEditor component."
      }
    }
  }

} satisfies Meta<typeof UsersCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dataId: 0,
    value: ["alice"],
    columnId: "foo",
    type: "users",
  },
};

export const MultipleUsers: Story = {
  args: {
    dataId: 0,
    value: ["alice", "bob", "christy"],
    columnId: "foo",
    type: "users"
  }
};

export const Editable: Story = {
  args: {
    dataId: 0,
    value: ["alice", "bob"],
    columnId: "foo",
    type: "users",
    editable: true
  }
};
  