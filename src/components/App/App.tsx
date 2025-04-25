import React, {useEffect} from 'react';
import {LoadingState} from '../LoadingState';
import {AlertContainer} from '../AlertContainer';
import {Grid} from '../Grid';
import './App.css'
import {iAlertsContext, iDataRow, iDataContext, iUser, iUsersContext, iUserMapContext} from './interfaces';
import {iAlert} from '../AlertContainer/interfaces';
import gridDefinition from '../../assets/gridDefinition.json';
import config from '../../config.json';

export const DataContext = React.createContext<iDataContext>({data: [], setData: () => {return}});
export const UsersContext = React.createContext<iUsersContext>({users: [], setUsers: () => {return}});
export const UserMapContext = React.createContext<iUserMapContext>({userMap: new Map<string, iUser>(), setUserMap: () => {return}});
export const AlertsContext = React.createContext<iAlertsContext>({alerts: [], setAlerts: () => {return}});

// Plain and simple grid, but we've added a bit with a loading state and some basic error reporting
function App() {
  const [data, setData] = React.useState<iDataRow[]>([]);
  const [users, setUsers] = React.useState<iUser[]>([]);
  const [userMap, setUserMap] = React.useState<Map<string, iUser>>(new Map<string, iUser>);
  const [alerts, setAlerts] = React.useState<iAlert[]>([]);

  // Avoid network race conditions in development envs, even though it's the same static data
  let fetchingData = false;
  let fetchingUsers = false;

  // Effect right off the bat to simultaneously fetch data and users from the server
  useEffect(() => {
    const serverBaseUri = config.server.protocol + "://" + config.server.host + (config.server.port ? ":" + config.server.port : "");

    const fetchData = async () => {
      if (!fetchingData) {
        fetchingData = true;
        const response = await fetch(serverBaseUri + "/data", {method: "POST", headers: {"Content-Type": "application/json"}});
        if (!response.ok) {
          setAlerts(alerts.concat({severity: "error", message: "Network response was not ok when fetching data"}));
        } else {
          const json: iDataRow[] = await response.json()
          setData(json);
        }
        fetchingData = false;
      }
    }

    const fetchUsers = async () => {
      if (!fetchingUsers) {
        fetchingUsers = true;
        const response = await fetch(serverBaseUri + "/users", {method: "POST", headers: {"Content-Type": "application/json"}});
        if (!response.ok) {
          setAlerts(alerts.concat({severity: "error", message: "Network response was not ok when fetching users"}));
        } else {
          const json: iUser[] = await response.json()
          setUsers(json);

          // When data is loaded, assign each user to a map for easy lookup based on user ID--much better than iterating through arrays! Share this through a context
          const newUserMap = new Map<string, iUser>();
          users.forEach((user: iUser) => {
              newUserMap.set(user.userId, user);
          });
          setUserMap(newUserMap);
        }
        fetchingUsers = false;
      }
    }

    fetchData();
    fetchUsers();
  }
  , []);

  if (data.length === 0 || users.length === 0) {
    if (alerts.length > 0) {
      return <AlertContainer alerts={alerts} />;
    } else {
      return (<LoadingState />);
    }
  }

  return (
    <DataContext.Provider value={{data: data, setData: setData}}>
      <UsersContext.Provider value={{users: users, setUsers: setUsers}}>
        <UserMapContext.Provider value={{userMap: userMap, setUserMap: setUserMap}}>
          <AlertsContext.Provider value={{alerts: alerts, setAlerts: setAlerts}}>
            <div className="alert-area"><AlertContainer alerts={alerts} /></div>
            {(data.length === 0 || users.length === 0) ? <LoadingState /> : <Grid data={data} definition={gridDefinition} />}
          </AlertsContext.Provider>
        </UserMapContext.Provider>
      </UsersContext.Provider>
    </DataContext.Provider>
  )
}

export default App
