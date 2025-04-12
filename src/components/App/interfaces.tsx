import {iUser} from '../User/interfaces';

export interface iDataContext {
    data: any[]; // The data to be displayed in the grid
    setData: (data: any[]) => void; // Function to update the data
}

export interface iUsersContext {
    users: iUser[]; // The list of users
    setUsers: (users: iUser[]) => void; // Function to update the users
}
