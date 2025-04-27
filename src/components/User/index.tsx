import {memo} from 'react';
import {Avatar, Chip, Tooltip} from '@mui/material';
import './index.css';
import {iUser} from '../App/interfaces';

// Render a user entity, including avatar and name
export function User(props: iUser) {
  return (
    <Tooltip title={props.name} followCursor>
      <Chip
        className="user"
        avatar={<Avatar src={props.avatarUri} alt={props.name} sx={{width: 32, height: 32, bgcolor: "#e7e7e7"}}>{props.name.slice(0, 1)}</Avatar>}
        label={props.name}
        variant="outlined"
      />
    </Tooltip>
  )
}

const UserMemoized = memo(User, (prev : iUser, next : iUser) => {
  return prev.avatarUri === next.avatarUri && prev.name === next.name;
})

export default UserMemoized;
