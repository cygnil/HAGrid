import type {Meta, StoryObj} from '@storybook/react';

import {NumberCell} from './index';

const meta = {
  component: NumberCell,
  title: 'Cells/NumberCell',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "A cell for dsplaying a number. **Note that the editable version will not validate** scientific notation (e.g. 1.34e5) or European format numbers (e.g. '1,34' instead of '1.34')"
      }
    }
  }

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
