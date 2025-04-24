import type { Meta, StoryObj } from '@storybook/react';

import {UriCell} from './index';

const meta = {
  component: UriCell,
  title: 'Cells/UriCell',
  tags: ['autodocs']
} satisfies Meta<typeof UriCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "https://example.com",
    columnId: "foo",
    dataId: 1,
    type: "uri"
  },
};

export const NewTab: Story = {
  args: {
    value: "https://example.com",
    columnId: "foo",
    dataId: 1,
    type: "uri",
    opts: {
      newTab: true,
    }
  },
};

export const Editable: Story = {
  args: {
    value: "https://example.com",
    columnId: "foo",
    dataId: 1,
    type: "uri",
    editable: true
  },
};
