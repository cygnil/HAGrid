import React, {useEffect} from 'react';
import {Grid} from '../Grid';
import './App.css'
import {iDataContext, iUsersContext} from './interfaces';
import dataJson from '../../assets/data.json';
import usersJson from '../../assets/users.json';
import gridDefinition from '../../assets/gridDefinition.json';

export const DataContext = React.createContext<iDataContext>({data: [], setData: () => {return}});
export const UsersContext = React.createContext<iUsersContext>({users: [], setUsers: () => {return}});

// Plain and simple grid, nothing more. Pass the data, users and definition
function App() {
  const [data, setData] = React.useState<iDataContext[]>([]);
  const [users, setUsers] = React.useState<iUsersContext[]>([]);

  // TODO: Actually load data and users from the server
  useEffect(() => {
    // Simulate fetching data from a server
    setTimeout(() => {
      setData(dataJson);
      setUsers(usersJson);
    }, 1000); // Simulate a 1 second delay
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
