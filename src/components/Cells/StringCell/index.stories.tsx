import type {Meta, StoryObj} from '@storybook/react';

import {StringCell} from './index';

const meta = {
  component: StringCell,
  title: 'Cells/StringCell',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "A cell for displaying strings. It has no length limit on it, so note that this could get quite long indeed. Don't put a novel in here if you want a clean table!"
      }
    }
  }

} satisfies Meta<typeof StringCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "foo",
    columnId: "foo",
    dataId: 1,
    type: "string",
  },
};

export const Editable: Story = {
  args: {
    value: "foo",
    columnId: "foo",
    dataId: 1,
    type: "string",
    editable: true
  }
};
