import type { Meta, StoryObj } from '@storybook/react';

import {UsersCell} from './index';

const meta = {
  component: UsersCell,
  title: 'Cells/UsersCell',
  tags: ['autodocs']
} satisfies Meta<typeof UsersCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: ["alice"],
    columnId: "foo",
    type: "users",
  },
};

export const MultipleUsers: Story = {
  args: {
    value: ["alice", "bob", "christy"],
    columnId: "foo",
    type: "users"
  }
};

export const Editable: Story = {
    args: {
      value: ["alice", "bob"],
      columnId: "foo",
      type: "users",
      editable: true
    }
  };
  