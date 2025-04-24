import type { Meta, StoryObj } from '@storybook/react';

import {NumberCell} from './index';

const meta = {
  component: NumberCell,
  title: 'Cells/NumberCell',
  tags: ['autodocs']
} satisfies Meta<typeof NumberCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 5,
    columnId: "foo",
    dataId: 1,
    type: "number",
  },
};

export const Editable: Story = {
  args: {
    value: 5,
    columnId: "foo",
    dataId: 1,
    type: "number",
    editable: true
  }
};
