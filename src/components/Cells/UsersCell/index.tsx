import {useState, useContext} from 'react';
import {Tooltip} from 'react-tooltip';
import {Chip} from '@mui/material';
import {iUsersCell} from './interfaces';
import {User} from '../../User';
import {UserEditor} from '../../UserEditor';
// TODO: Break users out into more effcient access method. Maybe redux?
import {iUser} from '../../User/interfaces';
import {UsersContext} from '../../App/App';
import config from '../../../config.json';
import './index.css';

export function UsersCell(props: iUsersCell) {
    const [value, setValue] = useState(props.value);
    const [isEditing, setIsEditing] = useState(false);
    const {users} = useContext(UsersContext);

    // This really pains me to write, it's so inefficient. But we'll improve it later, for now let's use it to just move on with development
    // Using a Map because it plays better with TypeScript; defining an entire interface is too heavyweight for this
    const userMap = new Map<string, iUser>();
    users.forEach((user: iUser) => {
        userMap.set(user.userId, user);
    });

    // This has some obvious problems if we're using the userId as a key for anything, especially if there's more than one null user
    // TODO: Clean this up
    const nullUser = {userId: '', name: '', avatarUri: ''};

    const editButton = <button className="edit-button" onClick={() => {setIsEditing(!isEditing)}}>Edit</button>

    // It's a dilemma whether to put the update function here or somewhere else. In a real application I would opt for keeping
    // side effects like server updates separate (we'd probably even be using GraphQL!), but for this demo it's easier to keep it here
    // both for practical concerns and for ease of reference when reviewing the code.
    const onUpdate = async (val: string[]) => {
        const baseServerUri = config.server.protocol + "://" + config.server.host + ":" + config.server.port;
        const updateUser = async () => {
          const response = await fetch(baseServerUri + "/update", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: props.dataId, values: [{column: "users", value: val}]}),
          });
          if (!response.ok) {
            throw new Error("Network response was not ok when updating user " + props.dataId);
          } else {
            setValue(val);
          }
          return response.ok;
        }

        const success = await updateUser();
        return success;
    };
    const onUpdateFinished = () => {return null};

    return (
        <div className="users-cell">
            <User {...(userMap.get(value[0]) || nullUser)} />
            {value.length > 1 &&
                <>
                    <Chip className="users-show-more" data-tooltip-id="show-users" label={"+" + (value.length - 1)} />
                    <Tooltip id="show-users" place="top" className="tooltip" variant="info">
                        {value.slice(1).map((userId: string) => {
                            const user = userMap.get(userId) || nullUser;
                            return <User key={user.userId} {...user} />;
                        })}
                    </Tooltip>
                </>
            }
            {props.editable && editButton}
            {isEditing && <UserEditor value={value} onUpdate={onUpdate} onUpdateFinished={onUpdateFinished} />}
        </div>
    );
}
