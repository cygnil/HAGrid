import React, {useEffect} from 'react';
import {LoadingState} from '../LoadingState';
import {Grid} from '../Grid';
import './App.css'
import {iDataRow, iDataContext, iUser, iUsersContext} from './interfaces';
import gridDefinition from '../../assets/gridDefinition.json';
import config from '../../config.json';

export const DataContext = React.createContext<iDataContext>({data: [], setData: () => {return}});
export const UsersContext = React.createContext<iUsersContext>({users: [], setUsers: () => {return}});

// Plain and simple grid, but we've added a bit with a loading state and some basic error reporting
function App() {
  const [data, setData] = React.useState<iDataRow[]>([]);
  const [users, setUsers] = React.useState<iUser[]>([]);
  const [errors, setErrors] = React.useState<string[]>([]);

  useEffect(() => {
    const serverBaseUri = config.server.protocol + "://" + config.server.host + ":" + config.server.port;

    const fetchData = async () => {
      const response = await fetch(serverBaseUri + "/data", {method: "POST", headers: {"Content-Type": "application/json"}});
      if (!response.ok) {
        setErrors(errors.concat("Network response was not ok when fetching data"));
      } else {
        const json: iDataRow[] = await response.json()
        setData(json);
      }
    }

    const fetchUsers = async () => {
      const response = await fetch(serverBaseUri + "/users", {method: "POST", headers: {"Content-Type": "application/json"}});
      if (!response.ok) {
        setErrors(errors.concat("Network response was not ok when fetching users"));
      } else {
        const json: iUser[] = await response.json()
        setUsers(json);
      }
    }

    fetchData();
    fetchUsers();
  }
  , []);

  if (errors.length > 0) {
    return (<div className="error-list">
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>);
  }

  if (data.length === 0 || users.length === 0) {
    return (<LoadingState />);
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
