import {Avatar} from '@mui/material';
import './index.css';
import {iUser} from './interfaces';

// Render a user entity, including avatar and name
export function User(props: iUser) {
    return (
        <span className="user">
            <Avatar src={props.avatarUri} alt={props.name} />
            <span className="user-name">{props.name}</span>
        </span>
    )
}
