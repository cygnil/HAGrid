import {Avatar, Chip} from '@mui/material';
import './index.css';
import {iUser} from '../App/interfaces';

// Render a user entity, including avatar and name
export function User(props: iUser) {
    return (
        <Chip
            className="user"
            avatar={<Avatar src={props.avatarUri} alt={props.name} sx={{width: 32, height: 32, bgcolor: "#e7e7e7"}}>{props.name.slice(0, 1)}</Avatar>}
            label={props.name}
            variant="outlined"
        />
    )
}
