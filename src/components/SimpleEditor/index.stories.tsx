import type { Meta, StoryObj } from '@storybook/react';
import {action} from '@storybook/addon-actions';

import {SimpleEditor} from './index';

const meta = {
  component: SimpleEditor,
  title: 'SimpleEditor',
  tags: ['autodocs']
} satisfies Meta<typeof SimpleEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "foo",
    onUpdate: () => new Promise<boolean>((resolve) => {action("Updating"); resolve(true);}),
    onUpdateFinished: action("Update finished")
  },
};

export const WithValidation: Story = {
  args: {
    value: "LettersOnly",
    validate: (value: string) => {
      return value.match(/^[a-zA-Z]+$/) !== null;
    },
    onUpdate: () => new Promise<boolean>((resolve) => {action("Updating"); resolve(true);}),
    onUpdateFinished: action("Update finished")
  }
};
