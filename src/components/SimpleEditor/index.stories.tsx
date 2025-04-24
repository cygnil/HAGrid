import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import {SimpleEditor} from './index';

const meta = {
  component: SimpleEditor,
  title: 'SimpleEditor',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "An editor suitable for most data types. It can take a validation function and make sure that the input is valid before sending off an update, which is " +
        "strongly recommended for most data types"
      }
    }
  }

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
      return {isValid: value.match(/^[a-zA-Z]+$/) !== null, message: "Input contains non-letter characters"};
    },
    onUpdate: () => new Promise<boolean>((resolve) => {action("Updating"); resolve(true);}),
    onUpdateFinished: action("Update finished")
  }
};
