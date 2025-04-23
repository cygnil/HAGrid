import React, {useEffect} from 'react';
import {Grid} from '../Grid';
import './App.css'
import {iDataContext, iUsersContext} from './interfaces';
import gridDefinition from '../../assets/gridDefinition.json';
import config from '../../config.json';

export const DataContext = React.createContext<iDataContext>({data: [], setData: () => {return}});
export const UsersContext = React.createContext<iUsersContext>({users: [], setUsers: () => {return}});

// Plain and simple grid, nothing more. Pass the data, users and definition
function App() {
  const [data, setData] = React.useState<iDataContext[]>([]);
  const [users, setUsers] = React.useState<iUsersContext[]>([]);

  useEffect(() => {
    const serverBaseUri = config.server.protocol + "://" + config.server.host + ":" + config.server.port;

    const fetchData = async () => {
      const response = await fetch(serverBaseUri + "/data", {method: "POST", headers: {"Content-Type": "application/json"}});
      if (!response.ok) {
        throw new Error("Network response was not ok when fetching data");
      }

      const json: iDataContext[] = await response.json()
      setData(json);
    }

    const fetchUsers = async () => {
      const response = await fetch(serverBaseUri + "/users", {method: "POST", headers: {"Content-Type": "application/json"}});
      if (!response.ok) {
        throw new Error("Network response was not ok when fetching users");
      }

      const json: iUsersContext[] = await response.json()
      setUsers(json);
    }

    fetchData();
    fetchUsers();
  }
  , []);

  // TODO: Add a loading state for when the data is being fetched
  const loadingState = (
    <div className="loading-state">
      <p>Loading...</p>
    </div>
  );

  if (data.length === 0 || users.length === 0) {
    return loadingState;
  }

  return (
    <DataContext.Provider value={{data: data, setData: setData}}>
      <UsersContext.Provider value={{users: users, setUsers: setUsers}}>
        <Grid data={data} definition={gridDefinition} />
      </UsersContext.Provider>
    </DataContext.Provider>
  )
}

export default App
