import {memo, useState, useContext} from 'react';
import {Chip, Popover, Tooltip} from '@mui/material';
import {TooltipProps, tooltipClasses} from '@mui/material/Tooltip';
import {styled} from '@mui/material/styles';
import {iUsersCell} from './interfaces';
import User from '../../User';
import {UserEditor} from '../../UserEditor';
import {AlertsContext, UserMapContext} from '../../App/App';
import {EditButton} from '../../EditButton';
import {onUpdateFactory} from '../../../server-effects';
import './index.css';

export function UsersCell(props: iUsersCell) {
    const [value = [], setValue] = useState(props.value);
    const [isEditing, setIsEditing] = useState(false);
    const {alerts, setAlerts} = useContext(AlertsContext);
    const {userMap} = useContext(UserMapContext);
    const {maxUsers = 3} = props.opts || {};

    // This has some obvious problems if we're using the userId as a key for anything, especially if there's more than one null user
    const nullUser = {userId: '', name: '', avatarUri: ''};

    const onUpdate = onUpdateFactory(props.columnId, props.dataId, alerts, setAlerts);
    const onUpdateFinished = (success: boolean, value : string[]) => {if (success) setValue(value)};

    const userElements = [];
    for (let i = 0; i < Math.min(value.length, maxUsers); i++) {
      userElements.push(<User {...(userMap.get(value[i]) || nullUser)} />);
    }

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
        <div className={`users-cell row-id-${props.dataId}`}>
            {userElements}
            {value.length > maxUsers &&
                <>
                    <LightTooltip className='more-users' title={value.slice(maxUsers).map((userId: string) => {
                            const user = userMap.get(userId) || nullUser;
                            return <User key={user.userId} {...user} />;
                        })}>
                        <Chip className="users-show-more" data-tooltip-id="show-users" label={"+" + (value.length - maxUsers)} />
                    </LightTooltip>
                </>
            }
            {props.editable && <EditButton onClick={() => {setIsEditing(!isEditing)}} />}
            <Popover
              open={isEditing}
              anchorEl={document.querySelector(`.row-id-${props.dataId} .edit-button`)}
              onClose={() => setIsEditing(false)}
              anchorOrigin={{
                vertical: 'bottom',
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

const UsersCellMemoized = memo(UsersCell, (prev : iUsersCell, next : iUsersCell) => {
  // It's more correct to compare the content of the two arrays to see if they're the same (e.g. we shouldn't re-render comparing [1, 2] and [2, 1]), but
  // that would incur a performance hit that would become almost impossible to deal with using larger data sets or more users
  if (prev.value.length !== next.value.length || prev.editable !== next.editable) {return false;}
  for (let i = 0; i < prev.value.length; i++) {
    if (prev.value[i] !== next.value[i]) {return false};
  }
  return true;
})

export default UsersCellMemoized;
