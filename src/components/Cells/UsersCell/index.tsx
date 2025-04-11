import {iCell} from '../interfaces';
import {User} from '../../User';
// TODO: Break users out into more effcient access method. Maybe redux?
import users from '../../../assets/users.json';
import {iUser} from '../../User/interfaces';

export function UsersCell(props: iCell) {

    // This really pains me to write, it's so inefficient. But we'll improve it later, for now let's use it to just move on with development
    // Using a Map because it plays better with TypeScript; defining an entire interface is too heavyweight for this
    const userMap = new Map<string, iUser>();
    users.forEach((user: iUser) => {
        userMap.set(user.userId, user);
    });

    // This has some obvious problems if we're using the userId as a key for anything, especially if there's more than one null user
    // TODO: Clean this up
    const nullUser = {userId: '', name: '', avatarUri: ''};

    return (
        <div className="users-cell">
            {props.value.map((userId : string) => <User {...(userMap.get(userId) || nullUser)} />)}
        </div>
    );
}
