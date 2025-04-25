import {iAlert} from "../AlertContainer/interfaces";

export interface iDataRow {
    id: number; // Unique identifier for the row
    codeName: string; // A basic string
    profile: string; // A link for testing link cells
    users: string[]; // List of user IDs associated with the row
}

export interface iUser {
    userId: string;
    name: string;
    avatarUri: string;
};

export interface iDataContext {
    data: iDataRow[]; // The data to be displayed in the grid
    setData: (data: iDataRow[]) => void; // Function to update the data
}

export interface iUsersContext {
    users: iUser[]; // The list of users
    setUsers: (users: iUser[]) => void; // Function to update the users
}

export interface iUserMapContext {
    userMap: Map<string, iUser>;
    setUserMap: (userMap: Map<string, iUser>) => void;
}

export interface iAlertsContext {
    alerts: iAlert[]; // All queued alerts
    setAlerts: (users: iAlert[]) => void; // Function to update the alerts
}
