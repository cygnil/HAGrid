import type {Meta, StoryObj} from '@storybook/react';
import {UserMapContext, UsersContext} from '../App/App';
import {iUser} from '../App/interfaces';
import usersJson from '../../assets/users.json';

import {UserEditor} from './index';
import {action} from '@storybook/addon-actions';

const userMap = new Map<string, iUser>();
usersJson.forEach((user: iUser) => {
    userMap.set(user.userId, user);
});

const meta = {
  component: UserEditor,
  title: 'UserEditor',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "An editor that lets the user filter, add, and remove users. The adding and removing are done immediately on click--an optimized version would be to " +
        "batch updates and send everything at a certain point, either when the user clicks a button or exits the popup. Note that this will not scale to hundreds of users " +
        "added to the cell very well--the top will be almost entirely full of included users! Requires UsersContext and UserMapContext."
      }
    }
  },
  render: (args) => {
    return (
      <UsersContext.Provider value={{users: usersJson, setUsers: () => {return}}}>
        <UserMapContext.Provider value={{userMap, setUserMap: () => {return}}}>
          <UserEditor {...args} />
        </UserMapContext.Provider>
      </UsersContext.Provider>
    );
  }

} satisfies Meta<typeof UserEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: ["alice", "bob"],
    onUpdate: () => new Promise<boolean>((resolve) => {action("onUpdate"); resolve(true);}),
    onUpdateFinished: action('onUpdateFinished')
  },
};
