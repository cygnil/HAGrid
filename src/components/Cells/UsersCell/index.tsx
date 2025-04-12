import {useState} from 'react';
import {Tooltip} from 'react-tooltip';
import {iUsersCell} from './interfaces';
import {User} from '../../User';
import {UserEditor} from '../../UserEditor';
// TODO: Break users out into more effcient access method. Maybe redux?
import users from '../../../assets/users.json';
import {iUser} from '../../User/interfaces';

export function UsersCell(props: iUsersCell) {
    const [isEditing, setIsEditing] = useState(false);

    // This really pains me to write, it's so inefficient. But we'll improve it later, for now let's use it to just move on with development
    // Using a Map because it plays better with TypeScript; defining an entire interface is too heavyweight for this
    const userMap = new Map<string, iUser>();
    users.forEach((user: iUser) => {
        userMap.set(user.userId, user);
    });

    // This has some obvious problems if we're using the userId as a key for anything, especially if there's more than one null user
    // TODO: Clean this up
    const nullUser = {userId: '', name: '', avatarUri: ''};

    const editButton = <button className="edit-button" onClick={() => {setIsEditing(true)}}>Edit</button>

    return (
        <div className="users-cell">
            <User {...(userMap.get(props.value[0]) || nullUser)} />
            {props.value.length > 1 &&
                <>
                    <span className="users-show-more" data-tooltip-id="show-users">+{props.value.length - 1}</span>
                    <Tooltip id="show-users" place="top" className="tooltip" variant="info">
                        {props.value.slice(1).map((userId: string) => {
                            const user = userMap.get(userId) || nullUser;
                            return <User key={user.userId} {...user} />;
                        })}
                    </Tooltip>
                </>
            }
            {props.editable && editButton}
            {isEditing && <UserEditor value={props.value} />}
        </div>
    );
}
