import type {Meta, StoryObj} from '@storybook/react';

import {LatLongCell} from './index';

const meta = {
  component: LatLongCell,
  title: 'Cells/LatLongCell',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "A cell for displaying a location given by a latitude and longitude combo. The editor will validate the form, as well as the range of the number (i.e. " +
        "latitude ranges from -90 to +90, and longitude ranges from -180 to +180). **Note that lat/long must be given as a number, not in the form 'xxx [N|S], yyy [E|W]'**."
      }
    }
  }

} satisfies Meta<typeof LatLongCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "37.7749,-122.4194",
    columnId: "foo",
    dataId: 1,
    type: "latlong",
  },
};

export const Editable: Story = {
  args: {
    value: "37.7749,-122.4194",
    columnId: "foo",
    dataId: 1,
    type: "latlong",
    editable: true
  }
};
