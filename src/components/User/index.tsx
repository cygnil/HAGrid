import './index.css';
import {iUser} from './interfaces';

// Render a user entity, including avatar and name
export function User(props: iUser) {
    return (
        <span className="user">
            <img src={props.avatarUri} alt={props.name} className="user-avatar" />
            <span className="user-name">{props.name}</span>
        </span>
    )
}
