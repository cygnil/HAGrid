import {useState, useContext} from 'react';
import {Chip, IconButton, Popover, Tooltip} from '@mui/material';
import {TooltipProps, tooltipClasses} from '@mui/material/Tooltip';
import {styled} from '@mui/material/styles';
import {Edit} from '@mui/icons-material';
import {iUsersCell} from './interfaces';
import {User} from '../../User';
import {UserEditor} from '../../UserEditor';
// TODO: Break users out into more effcient access method. Maybe redux?
import {iUser} from '../../App/interfaces';
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

    // It's a dilemma whether to put the update function here or somewhere else. In a real application I would opt for keeping
    // side effects like server updates separate (we'd probably even be using GraphQL!), but for this demo it's easier to keep it here
    // both for practical concerns and for ease of reference when reviewing the code. One big downside with keeping it here is that a new function
    // is created every time the component is rendered, which is a big performance hit.
    const onUpdate = async (val: string[]) => {
        const baseServerUri = config.server.protocol + "://" + config.server.host + (config.server.port ? ":" + config.server.port : "");
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

    const LightTooltip = styled(({className, ...props}: TooltipProps) => (
        <Tooltip {...props} classes={{popper: className}} />
      ))(({theme}) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.white,
          color: 'rgba(0, 0, 0, 0.87)',
          boxShadow: theme.shadows[1],
          fontSize: 11,
        },
      }));

    return (
        <div className="users-cell">
            <User {...(userMap.get(value[0]) || nullUser)} />
            {value.length > 1 &&
                <>
                    <LightTooltip className='more-users' title={value.slice(1).map((userId: string) => {
                            const user = userMap.get(userId) || nullUser;
                            return <User key={user.userId} {...user} />;
                        })}>
                        <Chip className="users-show-more" data-tooltip-id="show-users" label={"+" + (value.length - 1)} />
                    </LightTooltip>
                </>
            }
            {props.editable && 
                <>
                    <Tooltip title="Edit">
                        <IconButton className="edit-button" size="small" onClick={() => {setIsEditing(!isEditing)}}>
                            <Edit />
                        </IconButton>
                    </Tooltip>
                </>
            }
            <Popover
                open={isEditing}
                anchorEl={document.querySelector('.edit-button')}
                onClose={() => setIsEditing(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div className="popover-content">
                    <UserEditor value={value} onUpdate={onUpdate} onUpdateFinished={onUpdateFinished} />
                </div>
            </Popover>
        </div>
    );
}
