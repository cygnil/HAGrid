import {Avatar} from '../Avatar';
import './index.css';
import {iUser} from './interfaces';

// Render a user entity, including avatar and name
export function User(props: iUser) {
    return (
        <span className="user">
            <Avatar imageUri={props.avatarUri} name={props.name} />
            <span className="user-name">{props.name}</span>
        </span>
    )
}
