import type {Meta, StoryObj} from '@storybook/react';

import {NumberCell} from './index';

const meta = {
  component: NumberCell,
  title: 'Cells/NumberCell',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "A cell for dsplaying a number. **Note that the editable version will not validate** scientific notation (e.g. 1.34e5) or European format " +
        "numbers (e.g. '1,34' instead of '1.34'). It will validate min and max values if those are passed in the options. If both min and max are passed, you" +
        "may optionally include the visualize argument to show a small progress bar for each value."
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

export const MinMax: Story = {
  args: {
    value: 5,
    columnId: "foo",
    dataId: 1,
    type: "number",
    editable: true,
    opts: {
      min: 0,
      max: 11
    }
  }
};

export const Visualize: Story = {
  args: {
    value: 34,
    columnId: "foo",
    dataId: 1,
    type: "number",
    editable: true,
    opts: {
      min: 0,
      max: 100,
      visualize: true
    }
  }
};
