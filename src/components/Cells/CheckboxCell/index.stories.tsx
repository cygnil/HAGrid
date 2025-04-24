import type { Meta, StoryObj } from '@storybook/react';

import {CheckboxCell} from './index';

const meta = {
  component: CheckboxCell,
  title: 'Cells/CheckboxCell',
  tags: ['autodocs']
} satisfies Meta<typeof CheckboxCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: false,
    columnId: "foo",
    dataId: 0,
    type: "checkbox",
  },
};

export const Prechecked: Story = {
  args: {
    value: true,
    columnId: "foo",
    dataId: 0,
    type: "checkbox"
  }
};
