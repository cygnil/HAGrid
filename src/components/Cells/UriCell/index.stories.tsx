import type {Meta, StoryObj} from '@storybook/react';

import {UriCell} from './index';

const meta = {
  component: UriCell,
  title: 'Cells/UriCell',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "A cell for displaying a URI. It's recommended to use the opts.newTab parameter so that users aren't navigated away from your table."
      }
    }
  }

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
