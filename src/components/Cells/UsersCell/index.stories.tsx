import type {Meta, StoryObj} from '@storybook/react';
import {iUser} from '../../App/interfaces';
import {UserMapContext} from '../../App/App';
import users from '../../../assets/users.json';

import {UsersCell} from './index';

const userMap = new Map<string, iUser>();
users.forEach((user: iUser) => {
    userMap.set(user.userId, user);
});

const meta = {
  component: UsersCell,
  title: 'Cells/UsersCell',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "A cell for displaying users. Or at least, one user and a tag with the names of everyone else. The editable version will open a popup with a " +
        "userEditor component. You can define a maximum number of users to display (default 3) in the opts object. This requires both the AlertsContext and UserMapContext."
      }
    }
  },
  render: (args) => {
    return (
      <UserMapContext.Provider value={{userMap, setUserMap: () => {return}}}>
        <UsersCell {...args} />
      </UserMapContext.Provider>
    );
  }

} satisfies Meta<typeof UsersCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dataId: 0,
    value: ["alice"],
    columnId: "foo",
    type: "users",
  },
};

export const MultipleUsers: Story = {
  args: {
    dataId: 0,
    value: ["alice", "bob", "christy", "david"],
    columnId: "foo",
    type: "users"
  }
};

export const DifferentMaxUsers: Story = {
  args: {
    dataId: 0,
    value: ["alice", "bob", "christy", "david"],
    columnId: "foo",
    type: "users",
    opts: {
      maxUsers: 1
    }
  }
};

export const Editable: Story = {
  args: {
    dataId: 0,
    value: ["alice", "bob"],
    columnId: "foo",
    type: "users",
    editable: true
  }
};
  