import type { Meta, StoryObj } from '@storybook/react';

import {StringCell} from './index';

const meta = {
  component: StringCell,
  title: 'Cells/StringCell',
  tags: ['autodocs']
} satisfies Meta<typeof StringCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "foo",
    columnId: "foo",
    type: "string",
  },
};

export const Editable: Story = {
  args: {
    value: "foo",
    columnId: "foo",
    type: "string",
    editable: true
  }
};
